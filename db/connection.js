const Sequelize = require('sequelize');

const db = new Sequelize('postgres://postgres:Big4Pass6ForNow!@localhost:5432/quote_store');

module.exports = db;
