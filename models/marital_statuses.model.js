module.exports = (sequelize, DataTypes) => {
    const MaritalStatuses = sequelize.define('MaritalStatuses', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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