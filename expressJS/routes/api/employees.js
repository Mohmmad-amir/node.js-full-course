const express = require('express');
const router = express.Router()
const { index, show, store, update, destroy } = require('../../controllers/employeesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles')


router.route('/')
    .get(index)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), store)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), update)
    .delete(verifyRoles(ROLES_LIST.Admin), destroy);

router.route('/:id')
    .get(show);

module.exports = router