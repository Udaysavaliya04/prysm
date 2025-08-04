#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting build process...');

try {
  // Set NODE_ENV to production
  process.env.NODE_ENV = 'production';
  
  console.log('📦 Installing backend dependencies...');
  execSync('npm install', { stdio: 'inherit', cwd: __dirname });
  
  console.log('📦 Checking frontend dependencies...');
  const frontendPath = path.join(__dirname, 'frontend');
  const nodeModulesPath = path.join(frontendPath, 'node_modules');
  
  if (!fs.existsSync(nodeModulesPath)) {
    console.log('📦 Installing frontend dependencies...');
    execSync('npm install', { stdio: 'inherit', cwd: frontendPath });
  } else {
    console.log('✅ Frontend dependencies already installed');
  }
  
  console.log('🔨 Building React app...');
  execSync('npm run build', { stdio: 'inherit', cwd: frontendPath });
  
  // Check if build was successful
  const frontendBuildPath = path.join(frontendPath, 'build');
  if (fs.existsSync(frontendBuildPath)) {
    console.log('✅ Frontend build completed successfully!');
    
    // Copy build to root for deployment
    const rootBuildPath = path.join(__dirname, 'build');
    
    // Remove existing build directory if it exists
    if (fs.existsSync(rootBuildPath)) {
      console.log('🗑️  Removing existing build directory...');
      fs.rmSync(rootBuildPath, { recursive: true, force: true });
    }
    
    // Copy frontend build to root using platform-specific command
    console.log('📁 Copying build files to root directory...');
    if (process.platform === 'win32') {
      // Windows: use robocopy for better handling
      execSync(`robocopy "${frontendBuildPath}" "${rootBuildPath}" /E /IS /IT`, { stdio: 'inherit' });
    } else {
      // Unix: use cp
      execSync(`cp -r "${frontendBuildPath}" "${rootBuildPath}"`, { stdio: 'inherit' });
    }
    
    // Verify the copy was successful
    const indexPath = path.join(rootBuildPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      console.log('✅ Build files copied successfully to root directory');
      console.log('📄 index.html verified at:', indexPath);
    } else {
      throw new Error('Failed to copy index.html to root build directory');
    }
  } else {
    throw new Error('Frontend build directory was not created');
  }
  
  console.log('🎉 Build process completed successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  console.error('\nTroubleshooting tips:');
  console.error('1. Make sure you have Node.js installed');
  console.error('2. Check that all dependencies can be installed');
  console.error('3. Verify that the frontend directory exists');
  console.error('4. Ensure you have write permissions in the project directory');
  
  // For robocopy, exit codes 0-7 are success (including warnings)
  if (process.platform === 'win32' && error.status <= 7) {
    console.log('✅ Robocopy completed with warnings (this is normal)');
    console.log('🎉 Build process completed successfully!');
    process.exit(0);
  }
  
  process.exit(1);
}
