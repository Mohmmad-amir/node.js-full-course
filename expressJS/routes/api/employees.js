const express = require('express');
const router = express.Router()
const { index, show, store, update, destroy } = require('../../controllers/employeesController');


router.route('/')
    .get(index)
    .post(store)
    .put(update)
    .delete(destroy);

router.route('/:id')
    .get(show);

module.exports = router