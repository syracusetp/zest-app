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
          constraints: false
        });
        ServiceRating.belongsTo(models.Customer, {
          constraints: false
        });
        ServiceRating.belongsTo(models.Employee, {
          constraints: false
        });
      }
    }
  });

  return ServiceRating;
};
