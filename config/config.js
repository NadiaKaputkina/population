const path = require('path');
require('dotenv').config();

module.exports = {
    "env": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_DIALECT,
        "operatorsAliases": process.env.DB_OPERATORS_ALIASES,
        "app_url_front": process.env.APP_URL_FRONT
    }
}