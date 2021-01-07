const db = require('./index');

module.exports = (sequelize, DataTypes) => {
    const RolesActions = sequelize.define('RolesActions', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        RoleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'roles',
                key: 'Id'
            }
        },
        ObjectsActionId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'objects_actions',
                key: 'Id'
            }
        }
    }, {
        tableName: 'roles_actions'
    });
    
    RolesActions.associate = function(models) {
    }

    return RolesActions;
}