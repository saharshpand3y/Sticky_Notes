// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Note extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Note.init({
//     title: DataTypes.STRING,
//     content: DataTypes.STRING,
//     color: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Note',
//   });
//   return Note;
// };
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database configuration

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = { Note };
