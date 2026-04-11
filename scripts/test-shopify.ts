import fs from 'fs';
import path from 'path';

/**
 * simple-test-shopify.ts
 * 
 * Run with: npx tsx scripts/test-shopify.ts
 */

// 1. Load .env.local manually for standalone script execution
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach((line) => {
    // Basic parser for .env lines
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      
      process.env[key] = value.trim();
    }
  });
}

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
// Support both variations found in the codebase and typical Shopify setups
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function testConnection() {
  console.log('\n🔍 Testing Shopify Storefront API Connection...');
  console.log('-------------------------------------------');
  console.log(`📍 Domain: ${SHOPIFY_DOMAIN || 'MISSING'}`);
  console.log(`🔑 Token:  ${STOREFRONT_TOKEN ? '****' + STOREFRONT_TOKEN.slice(-4) : 'MISSING'}`);
  console.log('-------------------------------------------\n');

  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
    console.error('❌ Error: Missing required environment variables.');
    console.log('Please check your .env.local file for:');
    console.log(' - NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN');
    console.log(' - NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN (or SHOPIFY_STOREFRONT_ACCESS_TOKEN)\n');
    return;
  }

  const query = `
    query {
      shop {
        name
        description
        primaryDomain {
          url
        }
      }
      products(first: 3) {
        nodes {
          id
          title
          handle
          availableForSale
        }
      }
    }
  `;

  const endpoint = `https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (response.ok && !data.errors) {
      console.log('✅ Connection Successful!\n');
      console.log('🏪 Shop Details:');
      console.log(`   Name: ${data.data.shop.name}`);
      console.log(`   URL:  ${data.data.shop.primaryDomain?.url || 'N/A'}`);
      
      console.log('\n📦 Sample Products:');
      if (data.data.products.nodes.length === 0) {
        console.log('   (No products found in this store)');
      } else {
        data.data.products.nodes.forEach((p: any, i: number) => {
          console.log(`   ${i + 1}. ${p.title} (${p.handle}) - ${p.availableForSale ? 'Available' : 'Out of Stock'}`);
        });
      }
      console.log('\n✨ Shopify is correctly configured.\n');
    } else {
      console.error('❌ API Error Response:');
      if (data.errors) {
        data.errors.forEach((err: any) => {
          console.error(`   - ${err.message}`);
        });
      } else {
        console.error(JSON.stringify(data, null, 2));
      }
      console.log('\nDouble-check your credentials in .env.local\n');
    }
  } catch (error: any) {
    console.error('❌ Network Error:');
    console.error(`   ${error.message}`);
    console.log('\nMake sure you have an active internet connection and the domain is correct.\n');
  }
}

testConnection();
