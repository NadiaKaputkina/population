module.exports = (sequelize, DataTypes) => {
    const SysObjects = sequelize.define('SysObjects', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Title: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: 'sys_objects'
    });
    
    SysObjects.associate = function(models) {
    }

    return SysObjects;
}