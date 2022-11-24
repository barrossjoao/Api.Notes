const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    retry: {
        max: 3,
        match: [/DeadLock/i],
        backoffBase: 100,
        backoffExponent: 1.5,
    },
  });

  sequelize.authenticate()
  .then(function(){
      console.log('Sucesso com Database')
  }).catch(function(){
      console.error('Error connecting')
  })

  module.exports = sequelize;
