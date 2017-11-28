// ExpressJS web server
var express = require('express');
var app = express();

// Node AR-Drone for drone control
var arDrone = require("ar-drone");
var drone = arDrone.createClient();

// Create the web server
app.use(express.static(__dirname + '/page')); // Uses the HTML files from the page directory

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'page', 'index.html')); // displays the main page
});


// Drone control
app.get(/\/drone\/\w+$/, function (req, res) {
    var func = req.originalUrl.substr(7);
    if (typeof dadroneFunctions[func] !== "undefined") {
        // We know this function
        var funcText = dadroneFunctions[func](); // Calls the requested function
        res.send(funcText);
    }
    else {
        // Unknown function requested
        res.send("Unknown function " + func);
    }

});

// images
var pngStream = drone.getPngStream();
var pngBuffer = null;

pngStream
    .on('error', console.log)
    .on('data', function (buffer) {
        pngBuffer = buffer;
    });

app.get('/cameras/front/png', function (req, res) {
    while(pngBuffer === null)
    {
        // waiting
    }
    res.send(pngBuffer); // displays the main page
});


// The funcitons
var dadroneFunctions =
    {
        // Modes
        "normal": function () {
            // 

            return "Switching to normal mode.";
        },
        "acro": function () {
            // 

            return "Switching to acro mode.";
        },
        "watchdog": function () {
            // 

            return "Switching to watchdog mode.";
        },
        "scout": function () {
            // 

            return "Switching to scout mode.";
        },
        "fighter": function () {
            // 

            return "Switching to fighter mode.";
        },

        // All time
        "stop": function () {
            // 

            return "Holding still!";
        },

        // Normal
        "takeoff": function () {
            // Lets the drone take off and keeps it suspended 1m above the ground.

            drone.takeoff();
            return "Taking off!";
        },
        "land": function () {
            // Slowly lets the drone go down and land on the floor. Also turns the rotors off when landed.

            drone.land();
            return "Landing without checking";
        },
        "safeland": function () {
            // Check if it is safe to land on the floor and only land when it is. If it isn’t safe to land go to a safe landing location.


            return "Landing safely";
        },
        "shutdown": function () {
            // 

            return "Stopping all motor functions.";
        },

        // Acro
        "flip": function () {
            // 

            console.log("Perfroming flip!");
        }
    };

app.listen(3000, () => console.log('App is online on http://localhost:3000'));