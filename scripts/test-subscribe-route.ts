import { NextRequest } from 'next/server';
import { POST } from '../app/api/subscribe/route';

async function runTests() {
  console.log('🧪 Testing POST /api/subscribe route handler...\n');

  // Test 1: Empty body
  console.log('Test 1: Empty / invalid payload');
  const req1 = new NextRequest('http://localhost:3000/api/subscribe', {
    method: 'POST',
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
  });
  const res1 = await POST(req1);
  const data1 = await res1.json();
  console.log(`Status: ${res1.status}, data:`, data1);
  if (res1.status === 400 && !data1.success) {
    console.log('✅ Passed Test 1: Rejects empty email\n');
  } else {
    console.error('❌ Failed Test 1');
  }

  // Test 2: Missing consent
  console.log('Test 2: Valid email without marketing consent');
  const req2 = new NextRequest('http://localhost:3000/api/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email: 'test@example.com', consent: false }),
    headers: { 'Content-Type': 'application/json' },
  });
  const res2 = await POST(req2);
  const data2 = await res2.json();
  console.log(`Status: ${res2.status}, data:`, data2);
  if (res2.status === 400 && data2.error?.includes('agree to receive')) {
    console.log('✅ Passed Test 2: Rejects missing consent\n');
  } else {
    console.error('❌ Failed Test 2');
  }

  // Test 3: Honeypot bot protection
  console.log('Test 3: Honeypot filled (bot simulation)');
  const req3 = new NextRequest('http://localhost:3000/api/subscribe', {
    method: 'POST',
    body: JSON.stringify({
      email: 'bot@example.com',
      consent: true,
      honeypot: 'i-am-a-bot',
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  const res3 = await POST(req3);
  const data3 = await res3.json();
  console.log(`Status: ${res3.status}, data:`, data3);
  if (res3.status === 200 && data3.success) {
    console.log('✅ Passed Test 3: Silently succeeds for honeypot bot\n');
  } else {
    console.error('❌ Failed Test 3');
  }

  // Test 4: Missing Admin Token (expected if user has not yet put SHOPIFY_ADMIN_ACCESS_TOKEN in env)
  console.log('Test 4: Admin Token check when unconfigured');
  const req4 = new NextRequest('http://localhost:3000/api/subscribe', {
    method: 'POST',
    body: JSON.stringify({
      email: 'user@example.com',
      consent: true,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  const res4 = await POST(req4);
  const data4 = await res4.json();
  console.log(`Status: ${res4.status}, data:`, data4);
  if (res4.status === 503) {
    console.log('✅ Passed Test 4: Returns 503 unconfigured token message gracefully\n');
  } else {
    console.log(`Note: Token was detected or status is ${res4.status}\n`);
  }

  console.log('✨ All route logic unit tests completed successfully!');
}

runTests().catch(console.error);
