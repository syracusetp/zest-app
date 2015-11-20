'use strict';

var db = require('../../models'),
  _ = require('lodash'),
  Q = require('q');

exports.constants = function(req, res) {
  db.Constant.findAll().then(function(constants) {
    return res.json(200, constants);
  });
};

exports.services = function(req, res) {
  db.ServiceType.findAll().then(function(types) {
    return res.json(200, types);
  });
};

exports.frequencies = function(req, res) {
  db.Frequency.findAll().then(function(frequencies) {
    return res.json(200, frequencies);
  });
};

exports.zones = function(req, res) {
  db.Zone.findAll().then(function(zones) {
    return res.json(200, zones);
  });
};

exports.extras = function(req, res) {
  db.HomeCleaningExtra.findAll().then(function(extras) {
    return res.json(200, extras);
  });
};
