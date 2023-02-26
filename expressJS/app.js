const express = require('express');
const app = express();
const PATH = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvent');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 9000

//* custom middleware logger()
app.use(logger);

//* Cross origin resource sharing
const whitelist =
    [
        'https://www.youtsite.com',
        'http://127.0.0.1:5500',
        'http://localhost:3500',
        // 'https://www.google.com',

    ]
const corsOption = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionSuccessStatus: 200
}
app.use(cors(corsOption))

// * build-in middleware to handle urlencoded data
// *  in other words, from data,
//* 'content-type':application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: false }))

//* build-in middleware for json
app.use(express.json());

//* serve static files
app.use(express.static(PATH.join(__dirname, '/public')))

//* routes
app.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(PATH.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(PATH.join(__dirname, 'views', 'new-page.html'));
});
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html'); //302 by default
});
// route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next()
}, (req, res) => {
    res.send("hello world")
})

//chaining route handlers
const one = (req, res, next) => {
    console.log('one');
    next()
}
const two = (req, res, next) => {
    console.log('Two');
    next()
}
const three = (req, res, next) => {
    console.log('Three');
    res.send('Finished')
}

app.get('/chain(.html)?', [one, two, three],)

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






app.listen(PORT, () => console.log(`Application running on port : ${PORT}`))