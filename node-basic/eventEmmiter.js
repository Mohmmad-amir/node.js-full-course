// chapter 4 event emitter


const logEvent = require('./logEvent');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter { };

//initialize object
const myEmitter = new MyEmitter();

// add listener for the log event

myEmitter.on('log', (msg) => logEvent(msg));


setTimeout(() => {
    // emit event
    myEmitter.emit('log', 'Log event emitted')
}, 2000);