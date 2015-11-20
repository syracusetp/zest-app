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
      }
    }
  });

  return Zone;
};
