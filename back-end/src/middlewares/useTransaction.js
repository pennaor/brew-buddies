require('dotenv').config();
const Sequelize = require('sequelize');
const config = require('../database/config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const useTransaction = async (callback) => sequelize.transaction(callback);

module.exports = useTransaction;
