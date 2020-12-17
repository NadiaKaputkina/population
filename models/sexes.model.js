module.exports = (sequelize, DataTypes) => {
    const Sexes = sequelize.define('Sex', {
        Id: {
            type: DataTypes.NUMBER,
            unique: true,
            primaryKey: true
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