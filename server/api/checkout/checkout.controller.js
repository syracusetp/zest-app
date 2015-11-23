'use strict';

var db = require('../../models');

exports.index = function(req, res) {
    db.Checkout.findAll({}).then(function(checkout) {
        return res.json(200, checkout);
    });
};

exports.show = function(req, res) {
    db.Checkout.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        all: true,
        nested: true
      }]
    }).then(function(checkout) {
        return res.json(200, checkout);
    });
};

exports.create = function(req, res) {
    db.Checkout.create(req.body).then(function(checkout) {
      return res.json(200, checkout)
    }).error(function(error) {
        return res.json(500, error);
    });
};

exports.update = function(req, res) {
    db.Checkout.findById(req.body.id).then(function(checkout) {
      checkout.updateAttributes(req.body).then(function(checkout) {
            return res.json(200, checkout);
        }).error(function(error) {
            return res.json(500, error);
        })
    });
};

exports.destroy = function(req, res) {
    db.Checkout.findById(req.body.id).then(function(checkout) {
      checkout.destroy(req.body).then(function(checkout) {
            return res.json(200, checkout);
        }).error(function(error) {
            return res.json(500, error);
        })
    });
};
