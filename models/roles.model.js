module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define('Roles', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Title: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: 'roles'
    });

    Roles.associate = function(models) {
        Roles.belongsToMany(models.ObjectsActions, {
            through: 'RolesActions'
        })
    }

    return Roles;
}