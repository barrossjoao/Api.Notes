const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql'
  });

  sequelize.authenticate()
  .then(function(){
      console.log('Sucesso com Database')
  }).catch(function(){
      console.error('Error connecting')
  })

  module.exports = sequelize;
