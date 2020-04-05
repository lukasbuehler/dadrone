const webServer = require("./server/web_server");
const droneController = require("./server/drone_controller");

// Web server
webServer.serveUI();
webServer.serveDroneAPI();
webServer.start(); // can have a custom port specified as parameter

// hand an IP string to this function if it is connected to your network
droneController.connect();
