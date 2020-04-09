// Node AR-Drone for drone control
var arDrone = require("ar-drone");
const execSync = require("child_process").execSync;

const defaultIP = "192.168.1.1";

var droneClient = null;

var _droneMovement = {
  forward: 0,
  backward: 0,
  left: 0,
  right: 0,
  up: 0,
  down: 0,
  rotL: 0,
  rotR: 0,
};

const _movementCommands = {
  forward: "front",
  backward: "back",
  left: "left",
  right: "right",
  up: "up",
  down: "down",
  rotL: "counterClockwise",
  rotR: "clockwise",
};

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
      droneClient.stop();
      return "Holding still!";
    },
  },
  kill: {
    description: "Kills the motors. If it is in the air, the drone will fall out of the sky!",
    call: function () {
      _rebootDrone();
      return "DEAD!";
    },
  },
  battery: {
    description: "Returns the battery percentage of the drone.",
    call: function () {
      return droneClient.battery();
    },
  },
};

exports.getBattery = () => {
  return droneClient.battery();
};

exports.moveDrone = (moveObj) => {
  if (JSON.stringify(_droneMovement) === JSON.stringify(moveObj)) {
    return;
  }

  // tidy up the movement object, exp: no moving left and right at the same time

  const oppositeMovement = {
    forward: "backward",
    backward: "forward",
    left: "right",
    right: "left",
    up: "down",
    down: "up",
    rotL: "rotR",
    rotR: "rotL",
  };

  let newMovement = {};
  Object.keys(_droneMovement).forEach((key) => {
    if (moveObj[key] || moveObj[key] === 0) {
      if (moveObj[key] !== _droneMovement[key]) {
        //if (!(moveObj[key] === 0 && moveObj[oppositeMovement[key]] !== 0)) {
        newMovement[key] = moveObj[key];
        // }
      }
    }
  });

  const badCombos = [
    ["forward", "backward"],
    ["left", "right"],
    ["up", "down"],
    ["rotL", "rotR"],
  ];
  badCombos.forEach((combo) => {
    if (typeof newMovement[combo[0]] === "number" && typeof newMovement[combo[1]] === "number") {
      //console.log("ayy no");
      newMovement[combo[0]] = 0;
      delete newMovement[combo[1]];
    }
  });

  // apply the movements
  if (droneClient) {
    Object.keys(newMovement).forEach((movementKey) => {
      // execute the movement
      console.log(`Moving: ${_movementCommands[movementKey]} with ${newMovement[movementKey]} speed`);
      droneClient[_movementCommands[movementKey]](newMovement[movementKey]);
      _droneMovement[movementKey] = newMovement[movementKey];
    });

    //console.log(_droneMovement);
  }
};

/**
 * Dangerous! Let's the drone reboot and fall out of the sky!
 * @param _ip
 */
const _rebootDrone = (_ip) => {
  execSync('{ echo "reboot"; sleep 1 } | telnet ' + (_ip || defaultIP));
};
