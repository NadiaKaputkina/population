module.exports = (sequelize, DataTypes) => {
    const Sexes = sequelize.define('Sex', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Title: {
            type: DataTypes.STRING,
        },
        ShortTitle: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: 'sexes'
    });

    Sexes.associate = function(models) {
    }

    return Sexes;
}