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
               FumigationService.belongsTo(models.Frequency, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
               FumigationService.belongsTo(models.Booking, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
               FumigationService.hasMany(models.Extra, {
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                });
               FumigationService.hasMany(models.Pet, {
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                });
               FumigationService.hasOne(models.Zone, {
                 onDelete: 'CASCADE',
                 onUpdate: 'CASCADE'
               });
             }
         }
     });

     return FumigationService;
 };
