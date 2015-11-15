module.exports = function(sequelize, DataTypes) {
  var Constant = sequelize.define("Constant", {
    key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notes: DataTypes.TEXT
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
      }
    }
  });

  return Constant;
};
