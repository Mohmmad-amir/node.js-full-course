const express = require('express');
const router = express.Router()
const Path = require('path');


router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(Path.join(__dirname, '..', 'views', 'subdir', 'index.html'));
});

router.get('/test(.html)?', (req, res) => {
    res.sendFile(Path.join(__dirname, '..', 'views', 'subdir', 'test.html'));
});

module.exports = router
