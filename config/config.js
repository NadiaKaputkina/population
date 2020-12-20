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
        "app_url_front": process.env.APP_URL_FRONT,
        "pool": {
            "max": process.env.POOL_MAX,
            "min": process.env.POOL_MIN,
            "acquire": process.env.POOL_ACQUIRE,
            "idle": process.env.POOL_IDLE
        },
        "jwt_secret": process.env.JWT_SECRET,
    },
    publicPath: path.resolve(__dirname, '../public'),
}