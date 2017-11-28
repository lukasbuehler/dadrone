

$(document).ready(function () 
{
    getCameraImage();
});

function call(pathname) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.response); //Outputs a DOMString by default
            }
            else {
                // Got error
                console.log(xhr.statusText);
            }

        }
    }
    xhr.open('GET', "drone/"+pathname, true);
    xhr.send();
}

function getCameraImage()
{
    // Get PNG stream and stuff
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 2) {
            if (xhr.status === 200) {
                console.log("recieved");
                
                var buffer = xhr.response;
                console.log(buffer);
                var bytes = new Uint8Array(buffer);

                $("#front-camera-image").attr("src", encode(bytes));
            }
            else {
                // Got error
                console.log(xhr.statusText);
            }

        }
        console.log("readystate changed to "+xhr.readyState);
    }
    xhr.open('GET', "/cameras/front/png", true);
    xhr.responseType = "arraybuffer";
    xhr.send();
    console.log("requested image stream");
}


// public method for encoding an Uint8Array to base64
function encode (input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}