const bcrypt = require("bcrypt");
const User = require("./models/User");
const sequelize = require("./config/database");

const seedUser = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("Database connection successful!");

    // Sync the database
    await sequelize.sync({ force: true }); // Drops and recreates tables

    // Hash the password
    const hashedPassword = await bcrypt.hash("Makeitsimple1", 10);
    console.log("Hashed password:", hashedPassword);

    // Create a user
    await User.create({ username: "saharsh", password: hashedPassword });

    console.log("User seeded successfully!");
    process.exit(0); // Exit the process after seeding
  } catch (error) {
    console.error("Error seeding user:", error);
    process.exit(1); // Exit with error
  }
};

seedUser();
