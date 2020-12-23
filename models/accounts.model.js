module.exports = (sequelize, DataTypes) => {
    const Accounts = sequelize.define('Accounts', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        RoleId: {
            type: DataTypes.INTEGER
        },
        Login: {
            type: DataTypes.STRING,
        },
        Email: {
            type: DataTypes.STRING,
        },
        Password: {
            type: DataTypes.STRING,
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
        Phone: {
            type: DataTypes.STRING,
        },
    }, {
        tableName: 'accounts'
    });

    Accounts.associate = function(models) {
    };

    Accounts.roles = new Map([
        [0, '@SuperAdmin'],
        [1, '@Admin'],
        [2, '@Viewer']
    ]);

    Accounts.getAccountRole = (roleId) => {
        return Accounts.roles.get(roleId);
    };

    Accounts.comparePassword = function (password, hash, cb) {
        if (password !== hash) return false;
        return true;
    }
    
    return Accounts;
}