const express = require('express'); /* express */
const app = express();/* define app */
const PATH = require('path');/*  path */
const cors = require('cors');/*  cors */
const { logger } = require('./middleware/logEvent');/*  logger middleware */
const errorHandler = require('./middleware/errorHandler');/*  errorHandler middleware */
const { verifyJWT } = require('./middleware/verifyJWT')/*  verifyJWT middleware */
const credentials = require('./middleware/credentials')
const cookieParser = require('cookie-parser');/*cookie parser*/
const PORT = process.env.PORT || 3500/* port* */
const corsOption = require('./config/corsOptions')/*cors options*/
//* custom middleware logger()
app.use(logger);
//* credential middleware
app.use(credentials)
// * core option
app.use(cors(corsOption))

// * build-in middleware to handle urlencoded data
// *  in other words, from data,
//* 'content-type':application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: false }))

//* build-in middleware for json
app.use(express.json());

// * middleware for cookies
app.use(cookieParser());

//* serve static files
app.use('/', express.static(PATH.join(__dirname, '/public')))

// * routes
app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))


// verify jwt auth
app.use(verifyJWT);
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