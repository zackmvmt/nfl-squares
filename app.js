var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;

// SETTINGS
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

// BASIC VIEWS
app.get('/', function(req, res) {
  res.render('index', { title: 'Nodemon View Test', message: 'Hello Jade!' });
});

// ROUTES / API
require('./routes/api')(app);

// START SERVER
var server = app.listen(port, function() {
  var serverHost = server.address().address;
  var serverPort = server.address().port;
  console.log('Example app listening at http://%s:%s', serverHost, serverPort);
});