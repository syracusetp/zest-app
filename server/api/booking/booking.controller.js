'use strict';

var db = require('../../models'),
    _ = require('lodash'),
    Q = require('q');

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

exports.customer = function(req, res) {
  db.Booking.findAll({
    where: {
      CustomerId: req.params.id
    },
    include: [{
      model: db.ServiceType
    },{
      model: db.Frequency
    },{
      model: db.ScheduledOnceBooking
    },{
      model: db.ScheduledDailyBooking
    },{
      model: db.ScheduledBiWeeklyBooking
    },{
      model: db.ScheduledWeeklyBooking
    },{
      model: db.ScheduledMonthlyBooking
    },{
      model: db.AirConditionerService
    },{
      model: db.FumigationService
    },{
      model: db.HomeCleaningService
    },{
      model: db.OfficeCleaningService
    },{
      model: db.PostConstructionCleaningService
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
  db.Booking.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: db.ScheduledOnceBooking
    },{
      model: db.ScheduledDailyBooking
    },{
      model: db.ScheduledBiWeeklyBooking
    },{
      model: db.ScheduledWeeklyBooking
    },{
      model: db.ScheduledMonthlyBooking
    },{
      model: db.AirConditionerService
    },{
      model: db.FumigationService
    },{
      model: db.HomeCleaningService,
      include: [db.HomeCleaningExtra]
    },{
      model: db.OfficeCleaningService
    },{
      model: db.PostConstructionCleaningService
    }]
  }).then(function(booking) {

    if(booking.ScheduledOnceBooking) booking.ScheduledOnceBooking.destroy();
    if(booking.ScheduledDailyBooking) booking.ScheduledDailyBooking.destroy();
    if(booking.ScheduledBiWeeklyBooking) booking.ScheduledBiWeeklyBooking.destroy();
    if(booking.ScheduledWeeklyBooking) booking.ScheduledWeeklyBooking.destroy();
    if(booking.ScheduledMonthlyBooking) booking.ScheduledMonthlyBooking.destroy();
    if(booking.AirConditionerService) booking.AirConditionerService.destroy();
    if(booking.FumigationService) booking.FumigationService.destroy();
    if(booking.HomeCleaningService){
      // TODO: make sure extras deleted
      booking.HomeCleaningService.destroy();
    }
    if(booking.OfficeCleaningService) booking.OfficeCleaningService.destroy();
    if(booking.PostConstructionCleaningService) booking.PostConstructionCleaningService.destroy();

    booking.destroy().then(function() {
      return res.json(200, booking);
    });

  }).error(function(error) {
    return res.json(500, error);
  });
};

exports.destroyAll = function(req, res) {
  db.Booking.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: db.ScheduledOnceBooking
    },{
      model: db.ScheduledDailyBooking
    },{
      model: db.ScheduledBiWeeklyBooking
    },{
      model: db.ScheduledWeeklyBooking
    },{
      model: db.ScheduledMonthlyBooking
    },{
      model: db.AirConditionerService
    },{
      model: db.FumigationService
    },{
      model: db.HomeCleaningService,
      include: [db.HomeCleaningExtra]
    },{
      model: db.OfficeCleaningService
    },{
      model: db.PostConstructionCleaningService
    }]
  }).then(function(booking) {

    var deletes = [];

    if(booking.ScheduledOnceBooking) deletes.push(booking.ScheduledOnceBooking.destroy());
    if(booking.ScheduledDailyBooking) deletes.push(booking.ScheduledDailyBooking.destroy());
    if(booking.ScheduledBiWeeklyBooking) deletes.push(booking.ScheduledBiWeeklyBooking.destroy());
    if(booking.ScheduledWeeklyBooking) deletes.push(booking.ScheduledWeeklyBooking.destroy());
    if(booking.ScheduledMonthlyBooking) deletes.push(booking.ScheduledMonthlyBooking.destroy());
    if(booking.AirConditionerService) deletes.push(booking.AirConditionerService.destroy());
    if(booking.FumigationService) deletes.push(booking.FumigationService.destroy());
    if(booking.HomeCleaningService){
      // TODO: make sure extras deleted
      booking.HomeCleaningService.setHomeCleaningExtras([]);
      deletes.push(booking.HomeCleaningService.destroy());
    }
    if(booking.OfficeCleaningService) deletes.push(booking.OfficeCleaningService.destroy());
    if(booking.PostConstructionCleaningService) deletes.push(booking.PostConstructionCleaningService.destroy());

    Q.all(deletes).then(function(){
      booking.destroy(req.body).then(function() {
        return res.json(200, booking);
      });
    });

  }).error(function(error) {
    return res.json(500, error);
  });
};
