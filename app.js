var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index', { title: 'Nodemon View Test', message: 'Hello Jade!' });
});

var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});