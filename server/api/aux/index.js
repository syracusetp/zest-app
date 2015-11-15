'use strict';

var express = require('express');
var controller = require('./aux.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/constants', controller.constants);
router.get('/services', controller.services);
router.get('/frequencies', controller.frequencies);
router.get('/zones', controller.zones);

module.exports = router;
