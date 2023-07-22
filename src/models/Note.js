const Sequelize = require('sequelize');
const db = require('./db');

const Note = db.define('note', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    allowNull: true,
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
});

module.exports = Note;