const express = require('express');
const app = express();
const PATH = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvent');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500
const corsOption = require('./config/corsOptions')
//* custom middleware logger()
app.use(logger);
// * core option
app.use(cors(corsOption))

// * build-in middleware to handle urlencoded data
// *  in other words, from data,
//* 'content-type':application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: false }))

//* build-in middleware for json
app.use(express.json());

//* serve static files
app.use('/', express.static(PATH.join(__dirname, '/public')))

// * routes
app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/employees', require('./routes/api/employees'))


// route handlers
// app.get('/hello(.html)?', (req, res, next) => {
//     console.log('attempted to load hello.html');
//     next()
// }, (req, res) => {
//     res.send("hello world")
// })

//chaining route handlers
// const one = (req, res, next) => {
//     console.log('one');
//     next()
// }
// const two = (req, res, next) => {
//     console.log('Two');
//     next()
// }
// const three = (req, res, next) => {
//     console.log('Three');
//     res.send('Finished')
// }

// app.get('/chain(.html)?', [one, two, three],)

//app.use('/)

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(PATH.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepts('json')) {
        res.json({
            error: "404 Page not Found"
        });
    } else {
        res.type("txt").send("404 Page not Found")
    }
})

// * custom error handlers
app.use(errorHandler)

// * listen function
app.listen(PORT, () => console.log(`Application running on port : ${PORT}`))