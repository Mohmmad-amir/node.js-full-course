// node file system
const fsPromises = require('fs').promises;
const path = require('path')
// this is readFile
// fs.readFile('./starter.txt', 'utf8', (err, data) => {
//     if (err) throw err
    // console.log(data);
    // console.log(data.toString());
// })

const fileOps = async ()=>{
    try {
        const data = await fsPromises.readFile(path.join(__dirname,'starter.txt'),'utf8');
        console.log(data);
        await fsPromises.unlink(path.join(__dirname,'starter.txt'))

        await fsPromises.writeFile(path.join(__dirname,'promisesWrite.txt'),data)
        await fsPromises.appendFile(path.join(__dirname,'promisesWrite.txt'),"\n\n\n\nNIce to meet you....!")
        await fsPromises.rename(path.join(__dirname,'promisesWrite.txt'),path.join(__dirname,'promiseComplete.txt'))
        const newData = await fsPromises.readFile(path.join(__dirname,'promiseComplete.txt'),'utf8');
        console.log(newData);
    } catch (err) {
        console.log(err);
    }
}
fileOps()

/*
fs.readFile(path.join(__dirname,'starter.txt'),'utf8',(err,data)=>{
    if(err) throw err;
    console.log(data);
})

console.log("hello");
// write file
const writeText = "Nice to meet you....!"
fs.writeFile(path.join(__dirname,'reply.txt'),writeText,(err)=>{
    if(err) throw err;
    console.log("write File Complete");
// append
    fs.appendFile(path.join(__dirname,'reply.txt'),"\n\nHello, Nice to meet you again...!",(err)=>{
        if(err) throw err;
        console.log("append Complete");
// rename the file
        fs.rename(path.join(__dirname,'reply.txt'),path.join(__dirname,'newReply.txt'),(err)=>{
            if(err) throw err;
            console.log("rename Complete");
        })
    })
})
*/


// ! error file
/*
fs.readFile('./hello.txt','utf8', (err,data)=>{
    if (err) throw err
    console.log(data);
    console.log(data.toString());
})
*/

// exit on uncaught errors
process.on('uncaughtException', err => {
    console.error(`There Was an Uncaught ${err}`);
    process.exit(1)
})