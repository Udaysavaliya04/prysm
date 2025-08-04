#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting build process...');

try {
  // Set NODE_ENV to production
  process.env.NODE_ENV = 'production';
  
  console.log('📦 Installing backend dependencies...');
  execSync('npm install', { stdio: 'inherit', cwd: __dirname });
  
  console.log('📦 Installing frontend dependencies...');
  const frontendPath = path.join(__dirname, 'frontend');
  execSync('npm install', { stdio: 'inherit', cwd: frontendPath });
  
  console.log('🔨 Building React app...');
  execSync('npm run build', { stdio: 'inherit', cwd: frontendPath });
  
  // Check if build was successful
  const buildPath = path.join(frontendPath, 'build');
  if (fs.existsSync(buildPath)) {
    console.log('✅ Build completed successfully!');
    console.log('📁 Build directory created at:', buildPath);
    
    // List some key files to verify build
    const indexPath = path.join(buildPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      console.log('📄 index.html created successfully');
    } else {
      console.warn('⚠️ Warning: index.html not found in build directory');
    }
  } else {
    throw new Error('Build directory was not created');
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  console.error('\nTroubleshooting tips:');
  console.error('1. Make sure you have Node.js installed');
  console.error('2. Check that all dependencies can be installed');
  console.error('3. Verify that the frontend directory exists');
  console.error('4. Ensure you have write permissions in the project directory');
  process.exit(1);
}
