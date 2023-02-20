// *this is first topic code
// console.log("hello World");
// console.log(global);
// es6 modules
//import
const path = require('path')
const os = require('os');
const { add, subtract, multiply, divide } = require('./math')
// * os property
// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());
// * path property

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

// console.log(path.parse(__filename));
// get directory name
// console.log("Directory :" + __dirname);
// get file name
// console.log("File :" + __filename);
// *from math file
console.log(add(2, 3));
console.log(subtract(6, 3));
console.log(multiply(2, 3));
console.log(divide(45, 3));