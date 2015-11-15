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

exports.register = function(req, res) {
    if (!req.body.customer.id) {
        return res.json(400, {
            message: "CustomerID required"
        });
    }
    // Find customer
    db.Customer.find(req.body.customer.id).then(function(customer) {
        // Update customer
        delete req.body.customer.email;
        customer.updateAttributes(req.body.customer).then(function(customer) {
            // Create booking
            req.body.booking.CustomerId = customer.id;
            var bookingQ = db.Booking.create(req.body.booking).then(function(booking) {
                req.body.cleaning.BookingId = booking.id;
                // Create cleaning
                var cleaningQ = db.Cleaning.create(req.body.cleaning).then(function(cleaning) {
                    var traillingQs = [];
                    // Set pets
                    if (req.body.cleaning.pets) {
                        req.body.cleaning.pets.CleaningId = cleaning.id;
                        var petQ = db.Pet.create(req.body.cleaning.pets);
                        traillingQs.push(petQ);
                    }
                    // Set extras
                    if (req.body.cleaning.extras) {
                        var extras = [];
                        _.each(req.body.cleaning.extras, function(extra) {
                            var x = db.Extra.build(extra);
                            x.CleaningId = cleaning.id;
                            extras.push(x);
                        })
                        var extraQ = cleaning.setExtras(extras);
                        traillingQs.push(extraQ);
                    }
                    // Trainling promisses
                    Q.all(traillingQs).then(function(qs) {
                        return res.json(200, booking);
                    });

                });
            }).catch(function(err) {
                return res.json(500, err);
            });
        }).error(function(error) {
            return res.json(500, error);
        })
    });

};

exports.show = function(req, res) {
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
    db.Booking.find(req.body.id).then(function(booking) {
        booking.updateAttributes(req.body).then(function(booking) {
            if (booking.confirmed) {

                var bookingj = booking.toJSON();

                var keys = _.keys(bookingj);
                var out = [];
                _.each(keys, function(key) {
                    out.push('<b>' + key + '</b>: ' + bookingj[key]);
                });
                out.push('Booking: http://zest-services.herokuapp.com/viewer/' + bookingj.id);

              if(process.env.NODE_ENV === 'production'){
                sendgrid.send({
                  to: ['technology@generationenterprise.org'],
                  from: 'booking.controler.update@zest-services.herokuapp.com',
                  subject: 'Zest - Booking Confirmed (' + bookingj.id + ')',
                  html: out.join('<br>')
                }, function(err, json) {
                  if (err) {
                    return res.json(500, err);
                  }
                  return res.json(200, json);
                });
              } else{
                return res.json(200,booking)
              }

            } else {
                return res.json(200, booking);
            }

        }).error(function(error) {
            return res.json(500, error);
        })
    });
};

exports.destroy = function(req, res) {
    db.Booking.find(req.body.id).then(function(booking) {
        booking.destroy(req.body).then(function(booking) {
            return res.json(200, booking);
        }).error(function(error) {
            return res.json(500, error);
        })
    });
};
