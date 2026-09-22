import { NextRequest, NextResponse } from 'next/server'
import {
  findCustomerByEmail,
  updateCustomerEmailMarketingConsent,
  createCustomerWithMarketingConsent,
} from '@/lib/shopify/admin-client'

// Simple sliding-window in-memory rate limiter for abuse protection
interface RateLimitRecord {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitRecord>()
const WINDOW_MS = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_IP = 6
const MAX_REQUESTS_PER_EMAIL = 4

// Clean up stale rate-limit keys periodically to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  const cleanupTimer = setInterval(() => {
    const now = Date.now()
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(key)
      }
    }
  }, 10 * 60 * 1000)
  cleanupTimer.unref?.()
}

function checkRateLimit(key: string, limit: number): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + WINDOW_MS })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count += 1
  return true
}

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

export async function POST(req: NextRequest) {
  try {
    let body: { email?: unknown; consent?: unknown; honeypot?: unknown }
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON request payload.' },
        { status: 400 }
      )
    }

    const { email, consent, honeypot } = body

    // 1. Honeypot anti-spam verification: bots often fill hidden inputs
    if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
      // Silently return success to mislead spambots
      return NextResponse.json({
        success: true,
        status: 'subscribed',
        message: 'Thank you for subscribing to ME byREIGN.',
      })
    }

    // 2. Validate email format
    if (typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.trim().toLowerCase()

    if (!EMAIL_REGEX.test(normalizedEmail) || normalizedEmail.length > 254) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // 3. Validate explicit marketing consent checkbox
    if (consent !== true) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please confirm that you agree to receive email updates and marketing communications.',
        },
        { status: 400 }
      )
    }

    // 4. Rate limiting: inspect client IP & email key
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'

    if (!checkRateLimit(`ip:${clientIp}`, MAX_REQUESTS_PER_IP)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please wait a moment before trying again.',
        },
        { status: 429 }
      )
    }

    if (!checkRateLimit(`email:${normalizedEmail}`, MAX_REQUESTS_PER_EMAIL)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many attempts with this email. Please try again later.',
        },
        { status: 429 }
      )
    }

    // 5. Check Admin API token configuration
    const adminToken =
      process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_ADMIN_API_TOKEN
    if (!adminToken) {
      console.error(
        '[Shopify /api/subscribe] SHOPIFY_ADMIN_ACCESS_TOKEN is missing in server environment.'
      )
      return NextResponse.json(
        {
          success: false,
          error:
            'Email subscription service is temporarily unconfigured. Please contact support.',
        },
        { status: 503 }
      )
    }

    // 6. Search for existing customer in Shopify
    const existingCustomer = await findCustomerByEmail(normalizedEmail)

    if (existingCustomer) {
      const currentMarketingState =
        existingCustomer.emailMarketingConsent?.marketingState ||
        existingCustomer.defaultEmailAddress?.marketingState

      // Check if already subscribed
      if (currentMarketingState === 'SUBSCRIBED') {
        return NextResponse.json({
          success: true,
          status: 'already_subscribed',
          message: 'You are already subscribed to our newsletter.',
        })
      }

      // Update marketing consent on existing record (works for guest purchasers too!)
      const updateResult = await updateCustomerEmailMarketingConsent(
        existingCustomer.id,
        'SINGLE_OPT_IN'
      )

      if (updateResult.userErrors && updateResult.userErrors.length > 0) {
        console.error(
          '[Shopify /api/subscribe] Consent update userErrors:',
          updateResult.userErrors
        )
        return NextResponse.json(
          {
            success: false,
            error:
              updateResult.userErrors[0]?.message ||
              'Unable to update marketing preferences. Please try again.',
          },
          { status: 422 }
        )
      }

      return NextResponse.json({
        success: true,
        status: 'subscribed',
        message: 'Thank you for subscribing to ME byREIGN.',
      })
    }

    // 7. Customer does not exist: create customer record with marketing consent
    // Does NOT create a password or customer login credentials.
    const createResult = await createCustomerWithMarketingConsent(
      normalizedEmail,
      'SINGLE_OPT_IN'
    )

    if (createResult.userErrors && createResult.userErrors.length > 0) {
      const isDuplicateError = createResult.userErrors.some((err) =>
        err.message?.toLowerCase().includes('already taken')
      )

      // Handle race condition or indexing delay where customer record already exists
      if (isDuplicateError) {
        // Wait 500ms in case Shopify's customer search index was lagging behind database insert
        await new Promise((resolve) => setTimeout(resolve, 500))
        const recheckCustomer = await findCustomerByEmail(normalizedEmail)

        if (recheckCustomer) {
          const currentMarketingState =
            recheckCustomer.emailMarketingConsent?.marketingState ||
            recheckCustomer.defaultEmailAddress?.marketingState

          if (currentMarketingState === 'SUBSCRIBED') {
            return NextResponse.json({
              success: true,
              status: 'already_subscribed',
              message: 'You are already subscribed to our newsletter.',
            })
          }

          await updateCustomerEmailMarketingConsent(
            recheckCustomer.id,
            'SINGLE_OPT_IN'
          )
          return NextResponse.json({
            success: true,
            status: 'subscribed',
            message: 'Thank you for subscribing to ME byREIGN.',
          })
        }

        // If Shopify's search index is still lagging, customer exists and was subscribed
        return NextResponse.json({
          success: true,
          status: 'already_subscribed',
          message: 'You are already subscribed to our newsletter.',
        })
      }

      console.error(
        '[Shopify /api/subscribe] Customer create userErrors:',
        createResult.userErrors
      )
      return NextResponse.json(
        {
          success: false,
          error:
            createResult.userErrors[0]?.message ||
            'Unable to create subscription. Please try again.',
        },
        { status: 422 }
      )
    }

    return NextResponse.json({
      success: true,
      status: 'subscribed',
      message: 'Thank you for subscribing to ME byREIGN.',
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown internal error'
    console.error('[Shopify /api/subscribe] Internal error:', message)
    return NextResponse.json(
      {
        success: false,
        error: message.includes('[Shopify Admin]')
          ? message
          : 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    )
  }
}
