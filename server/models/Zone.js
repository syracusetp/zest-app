module.exports = function(sequelize, DataTypes) {
  var Zone = sequelize.define("Zone", {
    category: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    rate: DataTypes.DECIMAL(10,2),
    notes: DataTypes.TEXT
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        Zone.hasMany(models.Customer, {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        });
        Zone.hasMany(models.HomeCleaningService, {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        });
        Zone.hasMany(models.AirConditionerService, {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        });
        Zone.hasMany(models.OfficeCleaningService, {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        });
        Zone.hasMany(models.PostConstructionCleaningService, {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        });
        Zone.hasMany(models.FumigationService, {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        });
      }
    }
  });

  return Zone;
};
