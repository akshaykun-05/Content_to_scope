const fs = require('fs');
const path = require('path');

// Copy node_modules to dist
const sourceDir = path.join(__dirname, 'node_modules');
const targetDir = path.join(__dirname, 'dist', 'node_modules');

if (fs.existsSync(sourceDir)) {
  console.log('Copying node_modules to dist...');
  fs.cpSync(sourceDir, targetDir, { recursive: true });
  console.log('node_modules copied successfully');
} else {
  console.log('node_modules not found');
}