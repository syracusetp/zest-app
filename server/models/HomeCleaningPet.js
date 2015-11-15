module.exports = function(sequelize, DataTypes) {
    var HomeCleaningPet = sequelize.define("HomeCleaningPet", {
        dogs: DataTypes.BOOLEAN,
        cats: DataTypes.BOOLEAN,
        other: DataTypes.BOOLEAN,
        rate: DataTypes.DECIMAL(10, 2),
        description: DataTypes.STRING,
        notes: DataTypes.TEXT
    }, {
        paranoid: true,
        classMethods: {
            associate: function(models) {
              HomeCleaningPet.belongsTo(models.HomeCleaningService, {
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                });
            }
        }
    });

    return HomeCleaningPet;
};
