const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING, 
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
            isInt: true
        }
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    email: {
        type: Sequelize.STRING, 
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [6, 20]
        }
    },
});

//Criar a tabela
//User.sync()
//Verifica se a tabela ja existe, e se sim, so a altera.
User.sync({ alter: true })

module.exports = User;