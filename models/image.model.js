module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        Id: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true
        },
        Type: {
            type: DataTypes.STRING,
        },
        Name: {
            type: DataTypes.STRING,
        },
        Title: {
            type: DataTypes.STRING,
        },
        Data: {
            type: DataTypes.BLOB("long"),
        }
    }, {
        tableName: 'images'
    });

    Image.associate = function(models) {
    };
    
    return Image;
}