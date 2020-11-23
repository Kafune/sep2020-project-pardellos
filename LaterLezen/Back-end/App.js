// Import node_moduels
const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require('cors');
app.use(cookieParser());
app.use(express.json());

// Initialize CORS
app.use(cors({ origin: true, credentials: true}));
app.options("*", cors({origin: true, credentials: true}))

// Load config
dotenv.config({ path: "./config/config.env" });

// Load DB connection
connectDB();

// Logging function
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Init bodyParser
app.use(bodyParser.json());

// Routes
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/user"));
app.use("/articles", require("./routes/articles"));
app.use('/users', require('./routes/Users'))

const PORT = process.env.PORT || 4000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
