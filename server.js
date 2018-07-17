var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendfile('./public/index.html');
});



var port = process.env.PORT || 8080;

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port on " + port);
    }
});
