/**
 * Lukas Buehler
 *
 */

var app = new Vue({
    el: "#app",
    data: {
        drone_img: "images/720p_black.png",
    },
    methods: {
        takeoff: function () {
            console.log("Takeoff!");
        },
        land: function () {
            console.log("Landing");
        },
        stop: function () {
            console.log("Stop all motor functions");
        },
        kill: function () {
            console.log("KILL");
        },
    },
});

function call(pathname) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.response); //Outputs a DOMString by default
            } else {
                // Got error
                console.log(xhr.statusText);
            }
        }
    };
    xhr.open("GET", "drone/" + pathname, true);
    xhr.send();
}

function getCameraImage() {
    // Get PNG stream and stuff
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var blob = xhr.response;
                var image = "data:image/jpeg;base64," + btoa(String.fromCharCode.apply(null, new Uint8Array(blob)));

                $("#drone-disp-img").attr("src", image);
                getCameraImage();
            } else {
                // Got error
                console.error(xhr);
                console.log(xhr.statusText);
            }
        }
    };
    xhr.open("GET", "/cameras/front/png", true);
    xhr.responseType = "arraybuffer";
    xhr.send();
}
