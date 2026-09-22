import fs from 'fs';
import path from 'path';

// 1. Load .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      process.env[key] = value.trim();
    }
  });
}

const SHOPIFY_DOMAIN =
  process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN =
  process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_ADMIN_API_TOKEN;

async function testAdminConnection() {
  console.log('\n🔍 Testing Shopify Admin API Connection...');
  console.log('--------------------------------------------------');
  console.log(`📍 Domain: ${SHOPIFY_DOMAIN || 'MISSING'}`);
  console.log(
    `🔑 Token:  ${ADMIN_TOKEN ? ADMIN_TOKEN.slice(0, 6) + '...' + ADMIN_TOKEN.slice(-4) : 'MISSING / EMPTY'}`
  );
  console.log('--------------------------------------------------\n');

  if (!SHOPIFY_DOMAIN || !ADMIN_TOKEN) {
    console.error('❌ Error: Missing required Admin API environment variable in .env.local.');
    console.log('Please ensure you have saved .env.local with:');
    console.log('  SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxx\n');
    return false;
  }

  if (ADMIN_TOKEN.startsWith('shpss_')) {
    console.error('⚠️ Token Issue Detected:');
    console.error('The token starts with "shpss_", which is a Shopify App Secret (Client Secret).');
    console.error('The Admin API requires an Admin Access Token, which starts with "shpat_".\n');
  }

  // Test GraphQL query against Admin API
  const query = `
    query {
      shop {
        name
        email
        myshopifyDomain
      }
      customers(first: 1) {
        nodes {
          id
          email
        }
      }
    }
  `;

  const endpoint = `https://${SHOPIFY_DOMAIN}/admin/api/2024-07/graphql.json`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ADMIN_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();

    if (res.ok && !data.errors) {
      console.log('✅ Shopify Admin API Connection Successful!');
      console.log(`🏪 Store Name:    ${data.data?.shop?.name}`);
      console.log(`🌐 Store Domain:  ${data.data?.shop?.myshopifyDomain}`);
      console.log(`👥 Customer Scopes: Validated (read_customers active)\n`);
      return true;
    } else {
      console.error('❌ API Error Response:');
      if (data.errors) {
        console.error(JSON.stringify(data.errors, null, 2));
      } else {
        console.error(`HTTP ${res.status}: ${res.statusText}`);
      }
      console.log('\nDouble-check that the token has read_customers and write_customers scopes enabled.\n');
      return false;
    }
  } catch (err: any) {
    console.error('❌ Network error:', err.message);
    return false;
  }
}

testAdminConnection();
