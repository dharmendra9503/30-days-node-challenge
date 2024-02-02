/*

### Problem 2: File Writer

Problem Statement:
Create a function `writeToFile(filePath, content)` that takes the path to a file and user input content as input. The function should write the content to the specified file using the `fs` module.

Function Signature:
function writeToFile(filePath, content) {
    // Implementation
}


Expected Output:
Data written to output.txt


Test Cases:
javascript
writeToFile('test-files/output1.txt', 'Sample content.');
// Expected Output: Data written to output1.txt

writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');
// Expected Output: Error writing to file: ENOENT: no such file or directory...


*/


// Solution:

const fs = require('fs/promises');  // Use fs.promises for promise-based API
async function writeToFile(filePath, content) {
    try {
        await fs.writeFile(filePath, content);
        return filePath;
    } catch (err) {
        return err.message;
    }
}

async function run() {
    const result1 = await writeToFile('test-files/output1.txt', 'Sample content.');
    console.log(`Output: Data written to ${result1}\n`);

    const result2 = await writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');
    console.log(`Error writing to file: ${result2} \n`);
}

run();