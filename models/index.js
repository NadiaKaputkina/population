'use strict';

const path = require('path');
const config = require(__dirname + '/../config/config.js')['env'];
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    config.database, 
    config.username, 
    config.password, 
    config
)

module.exports = {
    sequelize,
    DataTypes
}