module.exports = (sequelize, DataTypes) => {
    const Children = sequelize.define('Children', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ParentId: {
            type: DataTypes.INTEGER,
        },
        ChildId: {
            type: DataTypes.INTEGER,
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