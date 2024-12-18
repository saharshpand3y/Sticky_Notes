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
const { Sequelize, DataTypes } = require('sequelize'); // Import Sequelize and DataTypes
const sequelize = require('../config/database'); // Adjust the path to your database configuration

// Define the "Note" model
const Note = sequelize.define('Note', {
  title: {
    type: Sequelize.STRING(1000), // String with a max length of 1000 characters
    allowNull: false, // "title" cannot be null
  },
  content: {
    type: Sequelize.TEXT, // Text column for large content
    allowNull: false, // "content" cannot be null
  },
  color: {
    type: Sequelize.STRING(255), // String with a max length of 255 characters
    allowNull: true, // "color" can be null
  },
});

module.exports = { Note }; // Export the Note model
