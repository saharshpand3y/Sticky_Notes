const bcrypt = require("bcrypt");
const { Sequelize, DataTypes } = require("sequelize");

// Replace with your PostgreSQL database credentials
const sequelize = new Sequelize("sticky_notes_dev", "saharsh", "Makeitsimple1", {
  host: "localhost", // Or your PostgreSQL server's hostname
  dialect: "postgres", // Specify the database dialect
});

// Define the User model
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the database and create a test user
(async () => {
  try {
    await sequelize.authenticate(); // Test the connection
    console.log("Connection to PostgreSQL has been established successfully.");

    await sequelize.sync({ force: true }); // Recreate the database schema (for testing)
    const hashedPassword = await bcrypt.hash("Makeitsimple1", 10);
    await User.create({ username: "saharsh", password: hashedPassword });
    console.log("Test user created.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = { User, sequelize }; // Export the User model and sequelize instance
