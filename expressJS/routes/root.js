const express = require('express');
const router = express.Router()
const Path = require('path');
//* routes
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(Path.join(__dirname, '..', 'views', 'index.html'));
    console.log(req.cookies);
});

module.exports = router