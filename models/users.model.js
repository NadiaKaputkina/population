module.exports = (sequelize, DataTypes) => {  
    const Users = sequelize.define('User', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
            type: DataTypes.INTEGER
        },
        MaritalStatusId: {
            type: DataTypes.INTEGER
        },
        DateOfDeath: {
            type: DataTypes.DATEONLY,
        }
    }, {
        tableName: 'persons'
    });

    Users.associate = function(models) {
        Users.belongsTo(models.Sexes, { foreignKey: 'SexId' });
        Users.belongsTo(models.MaritalStatuses, { foreignKey: 'MaritalStatusId'})
    }
    
    Users.getUserById = async function (id) {
        return await Users.findByPk(id).then(user => user)
    };

    return Users;
};