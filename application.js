var express = require('express');
var app = express.createServer()

app.configure(function() {
	app.set('view engine', 'jade');
	app.use('/assets', express.static(__dirname + '/assets'));
});

app.get('/', function(req, res) {
	res.render('index');
});

app.listen(8080);
