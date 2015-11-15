 module.exports = function(sequelize, DataTypes) {
     var HomeCleaningService = sequelize.define("HomeCleaningService", {
         bedrooms: {
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
               HomeCleaningService.belongsTo(models.Booking, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
               HomeCleaningService.hasMany(models.HomeCleaningExtra, {
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                });
               HomeCleaningService.hasMany(models.HomeCleaningPet, {
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                });
             }
         }
     });

     return HomeCleaningService;
 };
