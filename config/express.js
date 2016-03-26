var config = require('./config'),
	express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	expressSession = require('express-session');

module.exports = function(){
	var app = express();

	var routes = require('../routes/index');
	var usuarios = require('../routes/usuarios');
	var servicios = require('../routes/servicios');
	var utils = require('../routes/utils');

	// view engine setup
	app.set('views', path.join(__dirname, '../views'));
	app.set('view engine', 'jade');

	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, '../public')));
	app.use(expressSession({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));
	app.use(passport.initialize());
	app.use(passport.session());

	app.use('/', routes);
	app.use('/usuarios', usuarios);
	app.use('/servicios', servicios);
	app.use('/utils', utils);

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	// error handlers

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	  app.use(function(err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('error', {
	      message: err.message,
	      error: err
	    });
	  });
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
	  console.log(err);
	  res.status(err.status || 500);
	  res.render('error', {
	    message: err.message,
	    error: {}
	  });
	});

	return app;
};