/*

### Problem 1: File Reader

Problem Statement:
Create a function `readFileContent(filePath)` that takes the path to a file as input and reads its content asynchronously using the `fs` module. The function should print the content to the console.

Function Signature:
function readFileContent(filePath) {
    // Implementation
}

Expected Output:
File Content:
This is the content of the file.
Hello, Node.js!

Test Cases:
readFileContent('test-files/file1.txt');
// Expected Output: Content of file1.txt

readFileContent('test-files/empty-file.txt');
// Expected Output: (empty string)

readFileContent('test-files/nonexistent-file.txt');
// Expected Output: Error reading file: ENOENT: no such file or directory...

*/



/*

Your function is already designed to work asynchronously using async/await, but there's a small issue in how you're using await with fs.readFile. The fs.readFile function doesn't directly return a Promise, so you need to wrap it in a Promise to use await effectively.

*/


// async function readFileContent(filePath) {
//     const fs = require('fs');
//     const ans = await fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             console.log(err);
//             return err;
//         }
//         console.log(data);
//         return data;
//     });
//     console.log(ans);
// }

// readFileContent('./test-files/file1.txt');
// // Expected Output: Content of file1.txt

// readFileContent('./test-files/empty-file.txt');
// // Expected Output: (empty string)

// readFileContent('./test-files/nonexistent-file.txt');
// // Expected Output: Error reading file: ENOENT: no such file or directory...




const fs = require('fs/promises');  // Use fs.promises for promise-based API
async function readFileContent(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return data;
    } catch (err) {
        return err.message;
    }
}

async function run() {
    const result1 = await readFileContent('./test-files/file1.txt');
    console.log(`Output: ${result1} \n`);

    const result2 = await readFileContent('./test-files/empty-file.txt');
    console.log(result2 === '' ? 'Output: (empty string) \n' : `Output: ${result2} \n`);

    const result3 = await readFileContent('./test-files/nonexistent-file.txt');
    console.log(`${result3} \n`);
}

run();