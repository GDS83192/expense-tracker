const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) =>
  res.json({ msg: "Welcome to the Expense Tracker API..." })
);

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/expenses", require("./routes/expenses"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
