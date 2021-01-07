module.exports = (sequelize, DataTypes) => {
    const ObjectsActions = sequelize.define('ObjectsActions', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Title: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: 'objects_actions'
    });

    ObjectsActions.ACTIONS = new Map([
        [ 1, 'view' ],
        [ 2, 'create' ],
        [ 3, 'update' ],
        [ 4, 'delete' ]
    ]);
    
    ObjectsActions.associate = function(models) {
        ObjectsActions.belongsToMany(models.Roles, {
            through: 'RolesActions'
        })
    }

    ObjectsActions.addActionsByNewObject = async function(objectName) {
        const listPromises = [];

        for (var [key, value] of this.ACTIONS) {
            listPromises.push(
                this.create({
                    Title: `@${objectName}_${value}`
                })
            )
        }

        const result = await Promise.all(listPromises);
        return result;
    }

    return ObjectsActions;
}