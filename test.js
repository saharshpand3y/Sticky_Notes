const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sticky_notes_dev", "saharsh", "Makeitsimple1", {
  host: "127.0.0.1",
  dialect: "postgres",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  } finally {
    await sequelize.close();
  }
})();
