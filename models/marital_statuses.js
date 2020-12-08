const { sequelize, DataTypes } = require('./index')

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
})

module.exports = MaritalStatuses;