var mongoose = require('mongoose');
var UsuarioSchema = new mongoose.Schema({
	username:String,
	nombre:String,
	apellido:String,
	servicio:String,
	disponibilidad:Boolean,

});

module.exports = mongoose.model('Usuario', UsuarioSchema);
