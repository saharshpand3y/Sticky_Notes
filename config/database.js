const { Sequelize } = require("sequelize");

// Create a new Sequelize instance with correct credentials
const sequelize = new Sequelize("sticky_notes_dev", "saharsh", "Makeitsimple1", {
  host: "127.0.0.1", // Use localhost or 127.0.0.1 for local development
  dialect: "postgres", // Ensure this matches your database type
  logging: console.log, // Logs SQL queries for debugging (optional)
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
