'use strict';

var db = require('../../models');

exports.index = function(req, res) {
    db.Referral.findAll({}).then(function(referral) {
        return res.json(200, referral);
    });
};

exports.show = function(req, res) {
    db.Referral.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        all: true,
        nested: true
      }]
    }).then(function(referral) {
        return res.json(200, referral);
    });
};

exports.create = function(req, res) {
    db.Referral.create(req.body).then(function(referral) {
      // TODO: add sendgrid
      return res.json(200, referral)
    }).error(function(error) {
        return res.json(500, error);
    });
};

exports.update = function(req, res) {
    db.Referral.find(req.body.id).then(function(referral) {
      referral.updateAttributes(req.body).then(function(referral) {
            return res.json(200, referral);
        }).error(function(error) {
            return res.json(500, error);
        })
    });
};

exports.destroy = function(req, res) {
    db.Referral.find(req.body.id).then(function(referral) {
      referral.destroy(req.body).then(function(referral) {
            return res.json(200, referral);
        }).error(function(error) {
            return res.json(500, error);
        })
    });
};
