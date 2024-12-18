const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("./models/User"); // Import the User model
const { Note } = require('./models/note');
const sequelize = require('./config/database');
const cookieParser = require("cookie-parser");


const app = express();
app.use(cors({
  origin: "*", // Replace with your frontend's URL
  credentials: true, // Allow cookies to be sent
}));
app.use(bodyParser.json());
sequelize.sync({ force: false }) // Set `force: true` to drop and recreate tables (only for development)
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

app.use(cookieParser());
const JWT_SECRET = "03a48138431fe84aba7c51e0bf20afc988da5dc450248db8ac701193a6c6deac"; // Store this securely in environment variables

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } }); // Fetch user from DB
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate token
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: "7d", // Token expires in 1 hour
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ token }); // Return token to the client
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token

  if (!token) {
    console.error("No token provided");
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = user; // Attach user info to the request object
    next();
  });
};




// Protect notes routes
app.get("/notes", authenticateToken, async (req, res) => {
  const notes = await Note.findAll();
  res.json(notes);
});

app.post("/notes", authenticateToken, async (req, res) => {
  const { title, content, color } = req.body;
  const note = await Note.create({ title, content, color });
  res.json(note);
});

app.delete("/notes/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  await Note.destroy({ where: { id } });
  res.json({ message: "Note deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
