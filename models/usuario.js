'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bCrypt = require('bcrypt-nodejs');

var UsuarioSchema = new Schema({
	username: {
	    type: String,
	    //Configurar un único index 'username'
	    unique: true,
	    //Validar existencia valor 'username'
	    required: 'Nombre de usuario es obligatorio',
	    //Trim el campo 'username'
	    trim: true
  	},
	email: {
		type: String,
		// Validar el formato email 
		match: [/.+\@.+\..+/, "Por favor escribe una dirección de email correcta"]
	},
	password: {
		type: String,
		//Validar el valor length de 'password'
		validate: [
		function(password) {
		    return password && password.length > 6;
		  }, 'La contraseña debe ser más larga'
		]
	},
	nombre:String,
	apellido:String,
	servicio:String,
	disponibilidad:Boolean,
});

//Usar un middleware pre-save para hash la contraseña
/*UsuarioSchema.pre('save', function(next) {
  if (this.password) {
    this.password = this.hashPassword(this.password);
  }

  next();
});*/

//Crear un método instancia para hashing una contraseña
UsuarioSchema.methods.hashPassword = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

//Crear un método instancia para autentificar usuario
UsuarioSchema.methods.validarPassword = function(password) {
  return password === this.password;
};

UsuarioSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

mongoose.model('Usuario', UsuarioSchema);
