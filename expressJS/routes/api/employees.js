const express = require('express');
const router = express.Router()
const { index, show, store, update, destroy } = require('../../controllers/employeesController');
const verifyJWT = require('../../middleware/verifyJWT')

router.route('/')
    .get(verifyJWT, index)
    .post(store)
    .put(update)
    .delete(destroy);

router.route('/:id')
    .get(show);

module.exports = router