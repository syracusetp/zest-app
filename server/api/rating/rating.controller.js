'use strict';

var db = require('../../models');

exports.index = function(req, res) {
    db.ServiceRating.findAll({}).then(function(rating) {
        return res.json(200, rating);
    });
};

exports.show = function(req, res) {
  db.ServiceRating.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: db.Booking,
      include:[db.ServiceType]
    },{
      model: db.Employee
    }]
  }).then(function(rating) {
    return res.json(200, rating);
  });
};

exports.deep = function(req, res) {
    db.ServiceRating.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        all: true,
        nested: true
      }]
    }).then(function(rating) {
        return res.json(200, rating);
    });
};

exports.create = function(req, res) {
    db.ServiceRating.create(req.body).then(function(rating) {
      return res.json(200, rating)
    }).error(function(error) {
        return res.json(500, error);
    });
};

exports.update = function(req, res) {
    db.ServiceRating.findById(req.body.id).then(function(rating) {
      rating.updateAttributes(req.body).then(function(rating) {
            return res.json(200, rating);
        }).error(function(error) {
            return res.json(500, error);
        })
    });
};

exports.destroy = function(req, res) {
    db.ServiceRating.findById(req.body.id).then(function(rating) {
      rating.destroy(req.body).then(function(rating) {
            return res.json(200, rating);
        }).error(function(error) {
            return res.json(500, error);
        })
    });
};
