module.exports = function(sequelize, DataTypes) {
    var ServiceType = sequelize.define("ServiceType", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        iconSrc: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        active: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        notes: DataTypes.TEXT
    }, {
        paranoid: true,
        classMethods: {
            associate: function(models) {
                //BookingServiceType.belongsTo(models.Customer);
            }
        }
    });

    return ServiceType;
};
