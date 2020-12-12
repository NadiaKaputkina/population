const { sequelize, DataTypes } = require('./index')

const Children = sequelize.define('Children', {
    Id: {
        type: DataTypes.NUMBER,
        unique: true,
        primaryKey: true
    },
    ParentId: {
        type: DataTypes.NUMBER,
    },
    ChildId: {
        type: DataTypes.NUMBER,
    },
    ParentFromDate: {
        type: DataTypes.DATEONLY,
    },
    ParentToDate: {
        type: DataTypes.DATEONLY,
    }
}, {
    tableName: 'children'
})

module.exports = Children;