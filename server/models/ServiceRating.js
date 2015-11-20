module.exports = function(sequelize, DataTypes) {
  var ServiceRating = sequelize.define("ServiceRating", {
    rating: DataTypes.BIGINT,
    comments: DataTypes.TEXT,
    notes: DataTypes.TEXT
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        ServiceRating.belongsTo(models.Booking, {
        });
        ServiceRating.belongsTo(models.Customer, {
        });
        ServiceRating.belongsTo(models.Employee, {
        });
      }
    }
  });

  return ServiceRating;
};
