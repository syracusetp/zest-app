 module.exports = function(sequelize, DataTypes) {
     var AirConditioningService = sequelize.define("AirConditioningService", {
         units: DataTypes.DECIMAL(10, 2),
         instructions: DataTypes.STRING,
         notes: DataTypes.TEXT
     }, {
         paranoid: true,
         classMethods: {
             associate: function(models) {
               AirConditioningService.belongsTo(models.Frequency, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
               AirConditioningService.belongsTo(models.Booking, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
               AirConditioningService.hasMany(models.Extra, {
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                });
               AirConditioningService.hasMany(models.Pet, {
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                });
               AirConditioningService.hasOne(models.Zone, {
                 onDelete: 'CASCADE',
                 onUpdate: 'CASCADE'
               });
             }
         }
     });

     return AirConditioningService;
 };
