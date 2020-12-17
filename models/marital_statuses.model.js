module.exports = (sequelize, DataTypes) => {
    const MaritalStatuses = sequelize.define('MaritalStatuses', {
        Id: {
            type: DataTypes.NUMBER,
            unique: true,
            primaryKey: true
        },
        Status: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: 'marital_statuses'
    });

    MaritalStatuses.associate = function(models) {
    };

    return MaritalStatuses;
}