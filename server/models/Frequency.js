module.exports = function(sequelize, DataTypes) {
  var Frequency = sequelize.define("Frequency", {
    rank: DataTypes.BIGINT,
    name: DataTypes.STRING,
  	description: DataTypes.STRING,
    rate: DataTypes.DECIMAL(10,2),
    default: DataTypes.BOOLEAN,
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    notes: DataTypes.TEXT
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        //Frequency.belongsTo(models.Customer);
      }
    }
  });

  return Frequency;
};
