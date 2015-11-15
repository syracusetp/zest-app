module.exports = function(sequelize, DataTypes) {
    var Booking = sequelize.define("Booking", {
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        confirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        total: DataTypes.DECIMAL(10,2),
        paid: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        hours: {
            type: DataTypes.DECIMAL(10,2),
            validate: {
                min: 1,
                max: 10
            }
        },
        notes: DataTypes.TEXT
    }, {
        paranoid: true,
        classMethods: {
            associate: function(models) {
              Booking.belongsTo(models.Customer, {
                  onDelete: 'RESTRICT',
                  onUpdate: 'RESTRICT'
              });
              Booking.belongsTo(models.ServiceType, {
                  onDelete: 'RESTRICT',
                  onUpdate: 'RESTRICT'
              });
              Booking.belongsTo(models.Frequency, {
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT'
              });
              Booking.belongsTo(models.Checkout, {
                  onDelete: 'RESTRICT',
                  onUpdate: 'RESTRICT'
              });
              Booking.belongsTo(models.Employee, {
                  onDelete: 'RESTRICT',
                  onUpdate: 'RESTRICT'
              });
              Booking.hasOne(models.HomeCleaningService, {
                  onDelete: 'RESTRICT',
                  onUpdate: 'RESTRICT'
              });
              Booking.hasOne(models.OfficeCleaningService, {
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT'
              });
              Booking.hasOne(models.AirConditionerService, {
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT'
              });
              Booking.hasOne(models.FumigationService, {
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT'
              });
              Booking.hasOne(models.ScheduledOnceBooking, {
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT'
              });
              Booking.hasOne(models.ScheduledDailyBooking, {
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT'
              });
              Booking.hasOne(models.ScheduledBiWeeklyBooking, {
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT'
              });
              Booking.hasOne(models.ScheduledWeeklyBooking, {
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT'
              });
              Booking.hasOne(models.ScheduledMonthlyBooking, {
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT'
              });
            }
        }
    });

    return Booking;
};
