'use strict';

var express = require('express');
var controller = require('./booking.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:id', controller.show);
router.get('/deep/:id', controller.deep);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/customer/:id', controller.customer);

module.exports = router;
