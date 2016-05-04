'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ServicioSchema = new Schema({
	usuario:String,
	cliente:[{proveedor: String, tipoServicio: String, estado: String}],
	proveedor:[{cliente: String, tipoServicio: String, estado: String}],
});

mongoose.model('Servicio', ServicioSchema);
