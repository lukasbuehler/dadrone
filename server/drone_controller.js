// Node AR-Drone for drone control
var arDrone = require("ar-drone");

const defaultIP = "192.168.1.1";

var droneClient = null;

/**
 * Tries to connect to the drone at a given IP
 */
exports.connect = (_ip) => {
  droneClient = arDrone.createClient({ ip: _ip || defaultIP });
};

/**
 * Returns wether the drone is connected or not.
 */
exports.isConnected = () => {
  return !!droneClient; // is not perfect, stays true even if no drone is reachable but the client was setup
};

exports.droneCommands = {
  takeoff: {
    description: "Drone takes off and hovers at 1m above ground.",
    call: function () {
      droneClient.takeoff();
      return "Taking off!";
    },
  },
  land: {
    description: "Drone lands smoothly and stops the rotors on successful landing.",
    call: function () {
      droneClient.land();
      return "Landing initiated";
    },
  },
  stop: {
    description: "Let's the drone stop its movement and hover at its current location",
    call: function () {
      return "Holding still!";
    },
  },
  kill: {
    description: "Kills the motors. If it is in the air, the drone will fall out of the sky!",
    call: function () {
      return "DEAD!";
    },
  },
};

exports.getTcpVideoStream = () => {
  return droneClient.getVideoStream();
};
