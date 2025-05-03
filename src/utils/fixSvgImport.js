/**
 * fixSvgImport.js
 * 
 * This script creates a symlink to our EmptySvg component in the node_modules directory
 * to fix the "Module not found" error for SVGWrapper.
 */

const fs = require('fs');
const path = require('path');

// Path to our EmptySvg component
const emptySvgPath = path.resolve(__dirname, '../components/EmptySvg.js');

// Path to create the SVGWrapper.js file in the node_modules directory
const targetDir = path.resolve(__dirname, '../../../node_modules/.pnpm/react-native-gifted-charts@1.4.60_react-native-linear-gradient@2.8.3_react-native@0.78.2_@bab_lxcdy2qrcgdydmfhr4s3crz67q/node_modules/react-native-gifted-charts/dist/src/utils');
const targetFile = path.join(targetDir, 'SVGWrapper.js');

// Create the directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`Created directory: ${targetDir}`);
}

// Read the EmptySvg component
const emptySvgContent = fs.readFileSync(emptySvgPath, 'utf8');

// Write the content to the target file
fs.writeFileSync(targetFile, emptySvgContent);
console.log(`Created SVGWrapper.js at ${targetFile}`);

console.log('SVG import fix completed successfully!');
