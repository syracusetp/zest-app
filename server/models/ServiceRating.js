module.exports = function(sequelize, DataTypes) {
  var ServiceRating = sequelize.define("ServiceRating", {
    date: DataTypes.DATE,
    rating: DataTypes.BIGINT,
    arrival: DataTypes.BOOLEAN,
    professionalism: DataTypes.BOOLEAN,
    quality: DataTypes.BOOLEAN,
    other: DataTypes.BOOLEAN,
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
