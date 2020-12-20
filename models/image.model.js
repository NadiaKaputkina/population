module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        Id: {
            type: DataTypes.INTEGER,
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
        },
        UserId: {
            type: DataTypes.INTEGER,
        }
    }, {
        tableName: 'images'
    });

    Image.associate = function(models) {
        Image.belongsTo(models.Users, { foreignKey: 'UserId' });
    };
    
    Image.getPhotoByUserId = async function (id) {
        return await Image.findOne({
            where: { 
                UserId: id
            }
        }).then(data => data)
    }
    return Image;
}