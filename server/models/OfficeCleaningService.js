 module.exports = function(sequelize, DataTypes) {
     var OfficeCleaningService = sequelize.define("OfficeCleaningService", {
         rooms: {
             type: DataTypes.DECIMAL(10, 2),
             validate: {
                 min: 1
             }
         },
         bathrooms: {
             type: DataTypes.DECIMAL(10, 2),
             validate: {
                 min: 1
             }
         },
         transportation: DataTypes.DECIMAL(10, 2),
         kitchens: DataTypes.DECIMAL(10, 2),
         others: DataTypes.DECIMAL(10, 2),
         instructions: DataTypes.STRING,
         notes: DataTypes.TEXT
     }, {
         paranoid: true,
         classMethods: {
             associate: function(models) {
               OfficeCleaningService.belongsTo(models.Booking, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
             }
         }
     });

     return OfficeCleaningService;
 };
