/**
 * web_frontend.js
 *
 * webFrontend module for the dadrone project
 * Lukas Bühler
 */

// ExpressJS web server
const express = require("express");
const app = express();

// drone commands to serve the API for
const droneController = require("./drone_controller");
const droneCommands = droneController.droneCommands;

// Other imports
const path = require("path");

/**
 * Serves the UI for the webserver
 */
exports.serveUI = () => {
  // Create the web server
  app.use(express.static(__dirname + "/view"));
  // Uses the the view directory to serve the frontend

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "view", "index.html"));
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

/**
 * Start the web server on a given port
 */
exports.start = (port) => {
  const _port = port || 3000;
  app.listen(_port, () => console.log(`dadrone is online at http://localhost:${_port}`));
};
