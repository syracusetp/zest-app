'use strict';

var db = require('../../models'),
    _ = require('lodash'),
    Q = require('q');

exports.index = function(req, res) {
    db.HomeCleaningService.findAll({}).then(function(service) {
        return res.json(200, service);
    });
};

exports.show = function(req, res) {
    db.HomeCleaningService.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            all: true,
            nested: true
        }]
    }).then(function(booking) {
        return res.json(200, service);
    });
};

exports.create = function(req, res) {
    db.HomeCleaningService.create(req.body).then(function(service) {
        return res.json(200, service)
    }).error(function(error) {
        return res.json(500, error);
    });
};

exports.update = function(req, res) {
  db.HomeCleaningService.findById(req.body.id).then(function(service) {
    service.updateAttributes(req.body).then(function(service) {
      return res.json(200, service);
    }).error(function(error) {
      return res.json(500, error);
    })
  });
};

exports.destroy = function(req, res) {
    db.HomeCleaningService.findById(req.body.id).then(function(service) {
      service.destroy(req.body).then(function(service) {
            return res.json(200, service);
        }).error(function(error) {
            return res.json(500, error);
        })
    });
};
