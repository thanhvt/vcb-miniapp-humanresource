/**
 * patchAllSvg.js
 * 
 * This script patches all SVG imports in the react-native-gifted-charts library
 * to use our custom SVG wrapper instead of directly importing from react-native-svg
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Path to the node_modules directory
const nodeModulesPath = path.resolve(__dirname, '../../node_modules');

// Path to the react-native-gifted-charts directory
const giftedChartsPath = path.join(nodeModulesPath, 'react-native-gifted-charts');

// Find all JavaScript files in the react-native-gifted-charts directory that import from react-native-svg
const findCommand = `find ${giftedChartsPath} -type f -name "*.js" -exec grep -l "from 'react-native-svg'" {} \\;`;

try {
  // Execute the find command
  const files = execSync(findCommand, { encoding: 'utf8' }).split('\n').filter(Boolean);
  
  console.log(`Found ${files.length} files with SVG imports`);
  
  // Process each file
  files.forEach(file => {
    try {
      // Read the file content
      const content = fs.readFileSync(file, 'utf8');
      
      // Replace the SVG import with our custom wrapper
      const patchedContent = content.replace(
        /import\s+([^;]+)\s+from\s+'react-native-svg';/g,
        "// Patched by patchAllSvg.js\nimport $1 from '../../../src/utils/SVGWrapper';"
      );
      
      // Write the patched content back to the file
      fs.writeFileSync(file, patchedContent);
      
      console.log(`Patched ${file}`);
    } catch (error) {
      console.error(`Error patching ${file}:`, error);
    }
  });
  
  console.log('Patching complete!');
} catch (error) {
  console.error('Error finding files:', error);
}
