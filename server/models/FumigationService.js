 module.exports = function(sequelize, DataTypes) {
     var FumigationService = sequelize.define("FumigationService", {
         scheduled: {
           type: DataTypes.BOOLEAN,
           defaultValue: false
         },
         size: DataTypes.DECIMAL(10, 2),
         others: DataTypes.DECIMAL(10, 2),
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
               FumigationService.belongsTo(models.Booking, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
             }
         }
     });

     return FumigationService;
 };
