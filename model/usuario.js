var mongoose = require('mongoose');
var usuarioSchema = new mongoose.Schema({
	nombre:String,
	servicio:String,
	disponibilidad:Boolean
});

mongoose.model('Usuario', usuarioSchema);
