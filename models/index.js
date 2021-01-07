'use strict';

const config = require(__dirname + '/../config/config.js')['env'];
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    config.database, 
    config.username, 
    config.password, 
    config
)

const db = {}

db.Users = require('./users.model')(sequelize, Sequelize);
db.Sexes = require('./sexes.model')(sequelize, Sequelize);
db.MaritalStatuses = require('./marital_statuses.model')(sequelize, Sequelize);
db.Children = require('./children.model')(sequelize, Sequelize);
db.Image = require('./image.model')(sequelize, Sequelize);
db.Accounts = require('./accounts.model')(sequelize, Sequelize);
db.SysObjects = require('./sys_objects.model')(sequelize, Sequelize);
db.ObjectsActions = require('./objects_actions.model')(sequelize, Sequelize);
db.Roles = require('./roles.model')(sequelize, Sequelize);
db.RolesActions = require('./roles_actions.model')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;