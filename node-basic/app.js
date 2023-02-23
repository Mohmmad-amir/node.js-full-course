
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


myEmitter.on('log', (msg, filename) => logEvent(msg, filename));



const serverFile = async (filePath, contentType, response) => {

    try {
        const rowData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : ''
        );
        const data = contentType === 'application/json'
            ? JSON.parse(rowData) : rowData;
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200,
            { 'Content-Type': contentType }
        )
        response.end(
            contentType === 'application/json' ?
                JSON.stringify(data) : data
        )
    } catch (err) {
        console.log(err);
        myEmitter.emit('log', `${err.name}:${err.message}`, 'errLog.txt')
        response.statusCode = 500;
        response.end()
    }
}

const app = http.createServer((req, res) => {
    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt')

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
        serverFile(filePath, contentType, res);
    } else {
        //404
        //301 redirect
        // console.log(Path.parse(filePath));
        switch (Path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { location: '/new-page.html ' })
                res.end;
                break;
            case 'www-page.html':
                res.writeHead(301, { location: '/' })
                res.end;
                break;
            default:
                // serve 404 response
                serverFile(Path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }
})
app.listen(PORT, () => console.log(`app is running on ${PORT}`))
