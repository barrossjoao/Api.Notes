const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('celke', 'root', 'Ftec@037', {
    host: 'localhost',
    dialect: 'mysql'
  });

  sequelize.authenticate()
  .then(function(){
      console.log('Sucesso com Database')
  }).catch(function(){
      console.error('Error connecting')
  })

  module.exports = sequelize;
