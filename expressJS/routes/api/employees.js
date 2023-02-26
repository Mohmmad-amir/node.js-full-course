const express = require('express');
const router = express.Router()
const { v4: uuid } = require('uuid')
const data = {};
data.employees = require('../../data/employees.json');

router.route('/')
    .get((req, res) => {
        res.json(data.employees)
    })
    .post((req, res) => {
        res.json({
            "id": uuid,
            "userName": req.body.userName,
            "email": req.body.email,
            "title": req.body.title,
        });
    })
    .put((req, res) => {
        res.json({
            "userName": req.body.userName,
            "email": req.body.email,
            "title": req.body.title,
        });
    })
    .delete((req, res) => {
        res.json({ "id": req.body.id })
    });

router.route('/:id')
    .get((req, res) => {
        res.json({
            "id": req.params.id
        });
    });

module.exports = router