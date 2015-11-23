module.exports = function(sequelize, DataTypes) {
    var HomeCleaningExtra = sequelize.define("HomeCleaningExtra", {
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        displayRate: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        iconSrc: DataTypes.STRING,
        rate: DataTypes.DECIMAL(10, 2),
        notes: DataTypes.TEXT
    }, {
        paranoid: true,
        classMethods: {
            associate: function(models) {
              HomeCleaningExtra.belongsToMany(models.HomeCleaningService, {
                through: {
                  model: models.HomeCleaningServiceExtra
                },
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT'
              });
            }
        }
    });

    return HomeCleaningExtra;
};
