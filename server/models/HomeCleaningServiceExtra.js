module.exports = function(sequelize, DataTypes) {
  var HomeCleaningServiceExtra = sequelize.define("HomeCleaningServiceExtra", {

  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return HomeCleaningServiceExtra;
};
