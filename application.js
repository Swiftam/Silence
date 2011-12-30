var express = require('express');
var app = express.createServer()
var store = new express.session.MemoryStore;

app.configure(function() {
	// Set up forms
	app.use(express.limit('50kb'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());

	// Set up sessions
	app.use(express.cookieParser());
	app.use(express.session({
		secret: 'correct horse watermelon staple',
		key: 'silence.sid',
		store: store
	}));
	app.set('view engine', 'jade');
	app.use('/assets', express.static(__dirname + '/assets'));
});

app.get('/(index)?', function(req, res) {
	res.render('index', {
		loggedIn: req.session.loggedIn
	});
});

app.post('/login', function(req, res) {
	req.session.loggedIn = true;
	res.redirect('/index');
});

app.get('/signup', function(req, res) {
	res.render('signup');
});

app.listen(8080);
