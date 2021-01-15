// Import node_moduels
const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
app.use(cookieParser());
app.use(express.json());
const ws = require("ws");
const session = require("express-session");

// Initialize CORS
app.use(cors({ origin: true, credentials: true }));
app.options("*", cors({ origin: true, credentials: true }));

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
app.use("/testing", require("./routes/testing"));
app.use("/user", require("./routes/user"));
app.use("/articles", require("./routes/articles"));

// Websocket initialization

const sessionParser = session({
  saveUninitialized: false,
  secret: "$eCuRiTy",
  resave: false,
});

app.use(sessionParser);

const httpServer = http.createServer(app);
const websocketServer = new ws.Server({ noServer: true });
httpServer.on("upgrade", (req, networkSocket, head) => {
  sessionParser(req, {}, () => {
    websocketServer.handleUpgrade(req, networkSocket, head, (newWebSocket) => {
      websocketServer.emit("connection", newWebSocket, req);
    });
  });
});

//Websocket messages
websocketServer.on("connection", (socket, req) => {
  console.log("Client has connected");
  socket.send("connected");
  socket.on("message", (message) => {
    let data = JSON.parse(message);
    switch (data.request) {
      case "webappUserAdd":
         console.log(data.email)
            socket.email = data.email;
            console.log("user with " + data.email + " has been added");
      break;
      case "refresh article data":
        console.log('er is een refresh bericht binnengekomen')
        websocketServer.clients.forEach((client) => {
          if (client.email === data.email) {
            console.log("Er is een client gevonden! er wordt een refresh bericht verstuurd.")
            client.send("refresh article data");
          }
        });
    }
  });
});

const PORT = process.env.PORT || 4000;

httpServer.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
