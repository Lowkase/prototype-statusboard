var express = require('express');
var app = express();

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});