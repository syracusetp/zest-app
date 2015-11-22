module.exports = function(sequelize, DataTypes) {
  var PostConstructionCleaningService = sequelize.define("PostConstructionCleaningService", {
    bedrooms: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        min: 0
      }
    },
    bathrooms: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        min: 0
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
    notes: DataTypes.TEXT
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        PostConstructionCleaningService.belongsTo(models.Booking, {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        });
      }
    }
  });

  return PostConstructionCleaningService;
};
