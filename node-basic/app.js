
//common code modules
const http = require('http');
const Path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;



const logEvent = require('./logEvent');
const EventEmitter = require('events');
const PORT = process.env.PORT || 3500;


class Emitter extends EventEmitter { };

const myEmitter = new Emitter();


const app = http.createServer((req, res) => {
    console.log(req.url, req.method);

    let path;
    // this is if statement version
    /*
        if (req.url === '/' || req.url === 'index.html') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            path = Path.join(__dirname, 'views', 'index.html');
            fs.readFile(path, { encoding: "utf8" }, (err, data) => {
                res.end(data)
            })
        }
    */

    //this is switch statement version
    /*
        switch (req.url) {
            case '/':
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                path = Path.join(__dirname, 'views', 'index.html');
                fs.readFile(path, { encoding: "utf8" }, (err, data) => {
                    res.end(data)
                })
                break;
        }
        */

    // path extension with switch statement
    const extension = Path.extname(req.url)

    let contentType;

    switch (extension) {

        case '.css':
            contentType = 'text/css'
            break;

        case '.js':
            contentType = 'text/javascript'
            break;

        case '.json':
            contentType = 'application/json'
            break;

        case '..jpg':
            contentType = 'image/jpeg'
            break;

        case '.png':
            contentType = 'image/png'
            break;

        case '.txt':
            contentType = 'text/plain'
            break;

        default:
            contentType = 'text/html'
            break;
    }

    // chain ternary operator
    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? Path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? Path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? Path.join(__dirname, 'views', req.url)
                    : Path.join(__dirname, req.url)

    if (!extension && req.url.slice(-1) !== '/') filePath += '.html'

    const fileExists = fs.existsSync(filePath)
    if (fileExists) {
        //serve
    } else {
        //404
        //301 redirect
        console.log(Path.parse(filePath));
    }
})




// myEmitter.on('log', (msg) => logEvent(msg));

//     myEmitter.emit('log', 'Log event emitted')


app.listen(PORT, () => console.log(`app is running on ${PORT}`))
