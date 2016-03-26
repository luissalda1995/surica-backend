var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function(){
	var db = mongoose.connect(config.db);

	require('../models/usuario.js');
	require('../models/servicio.js');
	require('../models/util.js');

	return db;
};