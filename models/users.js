const { sequelize, DataTypes } = require('./index');
const Sexes = require('./sexes');
const MaritalStatuses = require('./marital_statuses');

const Users = sequelize.define('User', {
    Id: {
        type: DataTypes.NUMBER,
        unique: true,
        primaryKey: true
    },
    FirstName: {
        type: DataTypes.STRING,
    },
    LastName: {
        type: DataTypes.STRING,
    },
    DateOfBirth: {
        type: DataTypes.DATEONLY
    },
    IdentificationNumber: {
        type: DataTypes.STRING,
        unique: true
    },
    SexId: { 
        type: DataTypes.NUMBER
    },
    MaritalStatusId: {
        type: DataTypes.NUMBER
    },
    DateOfDeath: {
        type: DataTypes.DATEONLY,
    }
}, {
    tableName: 'persons'
});

Users.belongsTo(Sexes, {
    foreignKey: 'SexId'
});

Users.belongsTo(MaritalStatuses, {
    foreignKey: 'MaritalStatusId'
})

module.exports = Users;