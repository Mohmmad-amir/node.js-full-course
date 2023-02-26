// chapter 4

const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
//core modules
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');


const logEvent = async (message, logName) => {
    const dateTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem)
    } catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
    console.log(`${req.method} ${req.path}`);
    next()
}


module.exports = { logger, logEvent };

