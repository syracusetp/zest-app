module.exports = function(sequelize, DataTypes) {
  var Referral = sequelize.define("Referral", {
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    homePhone: DataTypes.BIGINT,
    mobilePhone: DataTypes.BIGINT,
    address: DataTypes.TEXT,
    city: DataTypes.STRING,
    postcode: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        //Employee.hasMany(models.Booking)
      }
    }
  });

  return Referral;
};
