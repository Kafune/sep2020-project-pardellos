const express = require("express");
const ws = require("ws");
const cors = require("cors");
const http = require("http");
const path = require("path");
const fs = require("fs");
const Lezer = require("./api/models/userSchema");
const logger = require("./api/middleware/logger");
const database = require("./api/modules/dbConnector");

// Init servers
const expressApp = express();
const httpServer = http.createServer();
const webSocketServer = new ws.Server({
  server: httpServer,
});

// Init CORS
expressApp.use(cors());

// Init middleware
expressApp.use(logger);

// Set static folder
expressApp.use(express.static(path.join(__dirname, "client-side")));

// Init all express routing files
function recursiveRoutes(folderName) {
  fs.readdirSync(folderName).forEach(function (file) {
    let fullName = path.join(folderName, file);
    let stat = fs.lstatSync(fullName);

    if (stat.isDirectory()) {
      recursiveRoutes(fullName);
    } else if (file.toLowerCase().indexOf(".js")) {
      require("./" + fullName)(expressApp);
      console.log("require('" + fullName + "')");
    }
  });
}
recursiveRoutes("api/routes");

// Development Routes
expressApp.put("/dev/add/:name", async (req, res) => {
  
  const user = new Lezer({
      name: req.params.name
  });
  user.save()
  res.sendStatus(201)
});

expressApp.get("/dev/viewall/", async (req, res) => {
    res.JSON(await Lezer.find({}))
})
// End of Development routes

// Code to setup the websockets
webSocketServer.on("connection", (websocket) => {
  console.log("WEBSOCKET CONNECTION CREATED");
  websocket.on("message", (message) => {
    message = JSON.parse(message);
    console.log(message);
  });

  websocket.on("close", () => {
    console.log("CONNECTION FOR " + websocket.userName + " CLOSED.");
    if (websocket.timeoutObject) {
      clearTimeout(websocket.timeoutObject);
    }
  });
});

// Connect the Express App to all incoming requests on the HTTP server
httpServer.on("request", expressApp);
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () =>
  console.log(`The Server is listening on port ${PORT}.`)
);
