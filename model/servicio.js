var mongoose = require('mongoose');
var ServicioSchema = new mongoose.Schema({
	usuario:String,
	cliente:[{proveedor: String, tipoServicio: String}],
	proveedor:[{cliente: String, tipoServicio: String}],
});

module.exports = mongoose.model('Servicio', ServicioSchema);
