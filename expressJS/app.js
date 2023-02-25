const express = require('express');
const app = express();
const PATH = require('path');
const PORT = process.env.PORT || 9000

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

app.get('/*', (req, res) => {
    res.status(404).sendFile(PATH.join(__dirname, 'views', '404.html'));
})








app.listen(PORT, () => console.log(`Application running on port : ${PORT}`))