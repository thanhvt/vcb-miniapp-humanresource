/**
 * checkRemainingImports.js
 * 
 * This script checks for any remaining imports of react-native-gifted-charts
 * in the compiled JavaScript files
 */

const fs = require('fs');
const path = require('path');

// Function to search for a string in a file
function searchInFile(filePath, searchString) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(searchString)) {
      console.log(`Found in ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return false;
  }
}

// Function to recursively search in a directory
function searchInDirectory(directory, searchString) {
  let found = false;
  try {
    const files = fs.readdirSync(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        if (searchInDirectory(filePath, searchString)) {
          found = true;
        }
      } else if (stats.isFile() && (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx'))) {
        if (searchInFile(filePath, searchString)) {
          found = true;
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
  }
  return found;
}

// Main function
function main() {
  const searchString = 'react-native-gifted-charts';
  const rootDir = path.resolve(__dirname, '../..');
  
  console.log(`Searching for '${searchString}' in ${rootDir}...`);
  const found = searchInDirectory(rootDir, searchString);
  
  if (!found) {
    console.log(`No occurrences of '${searchString}' found.`);
  }
}

// Run the main function
main();
