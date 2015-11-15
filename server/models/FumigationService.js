 module.exports = function(sequelize, DataTypes) {
     var FumigationService = sequelize.define("FumigationService", {
         size: DataTypes.DECIMAL(10, 2),
         others: DataTypes.DECIMAL(10, 2),
         instructions: DataTypes.STRING,
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