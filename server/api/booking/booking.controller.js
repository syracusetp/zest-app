'use strict';

var db = require('../../models'),
    _ = require('lodash'),
    Q = require('q'),
    sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

exports.index = function(req, res) {
    db.Booking.findAll({}).then(function(bookings) {
        return res.json(200, bookings);
    });
};

exports.show = function(req, res) {
    db.Booking.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: db.ServiceType
        },{
          model: db.Frequency
        }]
    }).then(function(booking) {
        return res.json(200, booking);
    });
};

exports.deep = function(req, res) {
  db.Booking.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      all: true,
      nested: true
    }]
  }).then(function(booking) {
    return res.json(200, booking);
  });
};

exports.create = function(req, res) {
    db.Booking.create(req.body).then(function(booking) {
        return res.json(200, booking)
    }).error(function(error) {
        return res.json(500, error);
    });
};

exports.update = function(req, res) {
    db.Booking.findById(req.body.id).then(function(booking) {
        booking.updateAttributes(req.body).then(function(booking) {
          return res.json(200, booking);
        }).error(function(error) {
            return res.json(500, error);
        })
    });
};

exports.destroy = function(req, res) {
    db.Booking.findById(req.body.id).then(function(booking) {
        booking.destroy(req.body).then(function(booking) {
            return res.json(200, booking);
        }).error(function(error) {
            return res.json(500, error);
        })
    });
};
