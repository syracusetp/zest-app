 module.exports = function(sequelize, DataTypes) {
     var HomeCleaningService = sequelize.define("HomeCleaningService", {
         scheduled: {
           type: DataTypes.BOOLEAN,
           defaultValue: false
         },
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
         address: DataTypes.TEXT,
         city: DataTypes.STRING,
         state: DataTypes.STRING,
         postcode: DataTypes.STRING,
         dogs: DataTypes.BOOLEAN,
         cats: DataTypes.BOOLEAN,
         otherPets: DataTypes.BOOLEAN,
         petsDescription: DataTypes.TEXT,
         notes: DataTypes.TEXT
     }, {
         paranoid: true,
         classMethods: {
             associate: function(models) {
               HomeCleaningService.belongsTo(models.Booking, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
               HomeCleaningService.belongsToMany(models.HomeCleaningExtra, {
                 through: {
                   model: models.HomeCleaningServiceExtra
                 },
                 onDelete: 'CASCADE',
                 onUpdate: 'CASCADE'
               });
             }
         }
     });

     return HomeCleaningService;
 };
