 module.exports = function(sequelize, DataTypes) {
     var AirConditionerService = sequelize.define("AirConditionerService", {
         scheduled: {
           type: DataTypes.BOOLEAN,
           defaultValue: false
         },
         units: DataTypes.DECIMAL(10, 2),
         type: DataTypes.STRING,
         instructions: DataTypes.STRING,
         address: DataTypes.TEXT,
         city: DataTypes.STRING,
         state: DataTypes.STRING,
         postcode: DataTypes.STRING,
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
