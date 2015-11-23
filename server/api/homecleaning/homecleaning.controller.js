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
    }).then(function(service) {
        return res.json(200, service);
    });
};

exports.create = function(req, res) {
  // First, create the booking
  db.Booking.create({
    ServiceTypeId: req.body.ServiceTypeId,
    FrequencyId: req.body.FrequencyId,
    CustomerId: req.body.CustomerId
  }).then(function(booking){
    // Second, link booking to cleaning, then create cleaning
    req.body.BookingId = booking.id;
    db.HomeCleaningService.create(req.body).then(function(service) {
      var qs = [];
      // Finally, create cleaning service extras
      if(req.body.HomeCleaningServiceExtras){
        _.each(req.body.HomeCleaningServiceExtras, function(extra){
          extra.HomeCleaningServiceId = service.id;
          extra.HomeCleaningExtraId = extra.id;
          var x = db.HomeCleaningServiceExtra.create(extra);
          qs.push(x);
        });
      }

      Q.all(qs).finally(function(){
        return res.json(200, service)
      });

    });

  }).error(function(){
    return res.json(500, error);
  });
};

exports.update = function(req, res) {
  var frequencyId = req.body.FrequencyId;
  var extras = req.body.HomeCleaningServiceExtras;

  db.HomeCleaningService.findById(req.body.id).then(function(service) {
    // Update service
    service.updateAttributes(req.body).then(function(service) {
      var qs = [];
      // Clear extras then update extras (brute method)
      var dest = db.HomeCleaningServiceExtra.destroy({
        where: {
          HomeCleaningServiceId: service.id
        },
        force: true
      }).then(function() {
        if(extras){
          var xs = [];
          _.each(extras, function(extra){
            extra.HomeCleaningServiceId = service.id;
            extra.HomeCleaningExtraId = extra.id;
            delete extra.id;
            var x = db.HomeCleaningServiceExtra.create(extra);
            xs.push(x);
            qs.push(x);
          });
        }
      });
      qs.push(dest);
      // Update booking frequency
      var book = db.Booking.findById(service.BookingId).then(function(booking){
        booking.FrequencyId = frequencyId;
        booking.save(booking);
      });
      qs.push(book);

      Q.all(qs).then(function(){
        return res.json(200, service);
      });

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

exports.extras = function(req, res) {
  db.HomeCleaningServiceExtra.findAll({
    where: {
      HomeCleaningServiceId: req.params.id
    }
  }).then(function(extras) {
    return res.json(200, extras);
  });
};
