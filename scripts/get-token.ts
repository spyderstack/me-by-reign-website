import http from 'http';
import fs from 'fs';
import path from 'path';

// Load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

const SHOPIFY_DOMAIN =
  process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'reignhudson1.myshopify.com';
const CLIENT_SECRET =
  process.env.SHOPIFY_CLIENT_SECRET || process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '';
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID || '';

const PORT = 3456;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;

console.log('\n======================================================');
console.log('   Shopify Admin Token Generator (OAuth 1-Click)     ');
console.log('======================================================\n');

if (!CLIENT_ID) {
  console.log('👉 Please provide your Client ID (API Key) from your app:');
  console.log('   Run: npx tsx scripts/get-token.ts <YOUR_CLIENT_ID>\n');
  console.log('   Example: npx tsx scripts/get-token.ts 4f1a2b3c4d5e6f7a8b9c\n');
}

const clientIdArg = process.argv[2] || CLIENT_ID;
const clientSecretArg = process.argv[3] || CLIENT_SECRET;

if (clientIdArg && clientSecretArg) {
  startServer(clientIdArg, clientSecretArg);
}

function startServer(clientId: string, clientSecret: string) {
  const scopes = 'read_customers,write_customers';
  const authUrl = `https://${SHOPIFY_DOMAIN}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}`;

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url || '', `http://localhost:${PORT}`);

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');

      if (error) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(`<h1>Authentication Error</h1><p>${error}</p>`);
        console.error(`❌ OAuth Error: ${error}`);
        server.close();
        return;
      }

      if (!code) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end('<h1>Missing code</h1>');
        return;
      }

      console.log('🔄 Exchanging authorization code for Admin Access Token...');

      try {
        const tokenRes = await fetch(
          `https://${SHOPIFY_DOMAIN}/admin/oauth/access_token`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              client_id: clientId,
              client_secret: clientSecret,
              code,
            }),
          }
        );

        const tokenData = await tokenRes.json();

        if (tokenRes.ok && tokenData.access_token) {
          const accessToken = tokenData.access_token;
          console.log('\n🎉 SUCCESS! Received Admin Access Token:');
          console.log(`   ${accessToken.slice(0, 8)}...${accessToken.slice(-4)}\n`);

          // Update .env.local
          let updatedEnv = envContent;
          if (updatedEnv.includes('SHOPIFY_ADMIN_ACCESS_TOKEN=')) {
            updatedEnv = updatedEnv.replace(
              /SHOPIFY_ADMIN_ACCESS_TOKEN=.*/,
              `SHOPIFY_ADMIN_ACCESS_TOKEN=${accessToken}`
            );
          } else {
            updatedEnv += `\nSHOPIFY_ADMIN_ACCESS_TOKEN=${accessToken}\n`;
          }

          fs.writeFileSync(envPath, updatedEnv, 'utf8');
          console.log('✅ Updated .env.local automatically!\n');

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 50px auto; padding: 30px; border-radius: 8px; border: 1px solid #C5A059; background: #faf9f6; text-align: center;">
              <h1 style="color: #111;">Success! 🎉</h1>
              <p style="color: #444; font-size: 16px;">Your Shopify Admin Access Token has been generated and saved to <code>.env.local</code>.</p>
              <p style="color: #666; font-size: 14px;">You can now close this window and return to your app.</p>
            </div>
          `);

          server.close(() => {
            console.log('Server closed. Testing connection now...');
            // Trigger connection test
            import('./test-admin-connection');
          });
        } else {
          console.error('❌ Token Exchange Error:', tokenData);
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end(`<h1>Token Exchange Failed</h1><pre>${JSON.stringify(tokenData, null, 2)}</pre>`);
          server.close();
        }
      } catch (err: any) {
        console.error('❌ Network error during token exchange:', err.message);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`<h1>Error</h1><p>${err.message}</p>`);
        server.close();
      }
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  server.listen(PORT, () => {
    console.log(`\n1️⃣  Make sure your app settings have:`);
    console.log(`    Allowed redirection URL(s): ${REDIRECT_URI}\n`);
    console.log(`2️⃣  Click or open this link in your browser to authorize and install:\n`);
    console.log(`👉  \x1b[36m${authUrl}\x1b[0m\n`);
    console.log(`Waiting for authorization on ${REDIRECT_URI}...\n`);
  });
}
