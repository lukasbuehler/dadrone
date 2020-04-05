/**
 * web_frontend.js
 *
 * webFrontend module for the dadrone project
 * Lukas Bühler
 */

// ExpressJS web server
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

// drone commands to serve the API for
const droneController = require("./drone_controller");
const droneCommands = droneController.droneCommands;

// Other imports
const path = require("path");
const WebSocketServer = require("websocket").server;

/**
 * Serves the UI for the webserver
 */
exports.serveUI = () => {
  // Create the web server
  app.use(express.static("view"));
  // Uses the the view directory to serve the frontend

  app.get("/", function (req, res) {
    res.sendFile(path.join("view", "index.html"));
    // displays the frontend at /
  });
};

/**
 * Serves the API for drone controls via the WEB
 */
exports.serveDroneAPI = () => {
  // Drone control
  app.get(/^\/drone\/(\w+)\/?/, function (req, res) {
    var command = req.params[0]; // the captured function in the URL
    if (droneCommands[command]) {
      // We know this function
      if (droneController.isConnected()) {
        // Calls the requested function
        var funcText = droneCommands[command].call();
        res.send(funcText);
      } else {
        res.status(400);
        res.send("The drone is not connected!");
      }
    } else {
      // Unknown function requested
      res.status(400);
      res.send("Unknown function " + command);
    }
  });

  // List commands
  app.get(/^\/drone\/?/, function (req, res) {
    //const descriptions = Object.keys(droneCommands).map((key) => droneCommands[key].description);

    res.send(droneCommands);
  });
};

var wsClients = [];
var firstPacket = [];

exports.serveTcpStream = () => {
  // get TcpVideoStream
  const tcpStream = droneController.getTcpVideoStream();

  // handle TcpStream data
  tcpStream.on("data", function (data) {
    // save the first 3 packets to kick start new connections
    if (firstPacket.length < 3) {
      firstPacket.push(data);
    }
    // send the data to all the subscribed clients
    wsClients.forEach(function (client) {
      client.sendBytes(data);
    });
  });

  var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
  });

  wsServer.on("request", function (request) {
    var connection = request.accept("echo-protocol", request.origin);
    console.log(new Date() + " Connection accepted");

    if (firstPacket.length > 0) {
      firstPacket.forEach(function (packet) {
        connection.sendBytes(packet);
      });
    }

    wsClients.push(connection);

    connection.on("close", function (reasonCode, description) {
      console.log(new Date() + " Peer " + connection.remoteAddress + "disconnected");
      wsClients.splice(wsClients.indexOf(connection), 1); // remove from array
    });
  });
};

/**
 * Start the web server on a given port
 */
exports.start = (port) => {
  const _port = port || 3000;
  server.listen(_port, () => console.log(`dadrone is online at http://localhost:${_port}`));
};
