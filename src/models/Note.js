const Sequelize = require('sequelize');
const db = require('./db');

const Note = db.define('note',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING, 
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [0, 20]
        }
    },
    content: {
        type: Sequelize.STRING, 
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
});

//Criar a tabela e não faz nada se ela ja existir.
Note.sync()
//Verifica se a tabela ja existe, e se sim, so a altera.
Note.sync({ alter: true })

module.exports = Note;