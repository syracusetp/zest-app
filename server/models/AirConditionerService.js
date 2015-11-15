 module.exports = function(sequelize, DataTypes) {
     var AirConditionerService = sequelize.define("AirConditionerService", {
         units: DataTypes.DECIMAL(10, 2),
         type: DataTypes.STRING,
         instructions: DataTypes.STRING,
         notes: DataTypes.TEXT
     }, {
         paranoid: true,
         classMethods: {
             associate: function(models) {
               AirConditionerService.belongsTo(models.Booking, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
             }
         }
     });

     return AirConditionerService;
 };
