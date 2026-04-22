const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

console.log('🧪 JNTUK Placement Backend Comprehensive Test');
console.log('=============================================\n');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testEndpoint(url, expectedContent) {
  return new Promise((resolve) => {
    const request = http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (data.includes(expectedContent)) {
          resolve({ success: true, data });
        } else {
          resolve({ success: false, data });
        }
      });
    });
    
    request.on('error', () => {
      resolve({ success: false, error: 'Connection failed' });
    });
    
    request.setTimeout(5000, () => {
      request.destroy();
      resolve({ success: false, error: 'Timeout' });
    });
  });
}

async function runTests() {
  console.log('1. Testing Database Connection');
  console.log('------------------------------');
  
  try {
    // Test database connection
    require('dotenv').config();
    const { Pool } = require('pg');
    
    const pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5433,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'placement_portal',
    });
    
    const client = await pool.connect();
    const result = await client.query('SELECT COUNT(*) FROM companies');
    const companyCount = result.rows[0].count;
    
    console.log('✅ Database connection: Success');
    console.log(`✅ Companies in database: ${companyCount}`);
    
    client.release();
    await pool.end();
    
  } catch (error) {
    console.log('❌ Database connection: Failed');
    console.log(`   Error: ${error.message}`);
    return false;
  }
  
  console.log('\n2. Testing Server Startup');
  console.log('-------------------------');
  
  // Start the server
  const server = spawn('npm', ['run', 'dev'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    shell: true
  });
  
  let serverStarted = false;
  let serverOutput = '';
  
  server.stdout.on('data', (data) => {
    const output = data.toString();
    serverOutput += output;
    if (output.includes('Server running')) {
      serverStarted = true;
    }
  });
  
  server.stderr.on('data', (data) => {
    serverOutput += data.toString();
  });
  
  // Wait for server to start
  console.log('Starting server...');
  await sleep(5000);
  
  if (!serverStarted) {
    console.log('❌ Server startup: Failed');
    console.log('Server output:', serverOutput);
    server.kill();
    return false;
  }
  
  console.log('✅ Server startup: Success');
  
  console.log('\n3. Testing API Endpoints');
  console.log('------------------------');
  
  const tests = [
    {
      name: 'Main API',
      url: 'http://localhost:5000',
      expected: 'JNTUK'
    },
    {
      name: 'Health Check',
      url: 'http://localhost:5000/api/test/health',
      expected: 'healthy'
    },
    {
      name: 'Companies API',
      url: 'http://localhost:5000/api/public/companies',
      expected: 'Amazon'
    },
    {
      name: 'Placement Stats',
      url: 'http://localhost:5000/api/placements/stats',
      expected: 'total_placements'
    }
  ];
  
  let allTestsPassed = true;
  
  for (const test of tests) {
    const result = await testEndpoint(test.url, test.expected);
    if (result.success) {
      console.log(`✅ ${test.name}: Working`);
    } else {
      console.log(`❌ ${test.name}: Failed`);
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
      allTestsPassed = false;
    }
  }
  
  // Stop the server
  server.kill();
  
  console.log('\n4. Test Summary');
  console.log('---------------');
  
  if (allTestsPassed) {
    console.log('🎉 All tests passed!');
    console.log('✅ Database: Connected');
    console.log('✅ Server: Starting properly');
    console.log('✅ API Endpoints: All working');
    console.log('\n🚀 Your backend is ready to use!');
    console.log('\nTo start the server:');
    console.log('  npm run dev');
    console.log('\nServer will be available at:');
    console.log('  http://localhost:5000');
  } else {
    console.log('❌ Some tests failed');
    console.log('Please check the errors above and fix them');
  }
  
  return allTestsPassed;
}

// Run the tests
runTests().catch(error => {
  console.error('Test runner error:', error);
  process.exit(1);
});