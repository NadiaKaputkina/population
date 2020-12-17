module.exports = (sequelize, DataTypes) => {
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
    });

    Children.associate = function(models) {
    };
    
    return Children;
}