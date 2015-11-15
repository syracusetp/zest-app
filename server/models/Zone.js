module.exports = function(sequelize, DataTypes) {
  var Zone = sequelize.define("Zone", {
    category: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
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
      }
    }
  });

  return Zone;
};
