var express = require('express');
var app = express();

app.get('/', function (req, res) {
 res.sendFile(__dirname + '/page/index.html');
});

app.get('/land', function(req, res) {
 client.land();
});

app.get('/takeoff', function(req, res) {
 client.takeoff();
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))