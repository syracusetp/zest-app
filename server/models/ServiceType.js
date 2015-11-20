module.exports = function(sequelize, DataTypes) {
    var ServiceType = sequelize.define("ServiceType", {
        rank: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
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
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
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
