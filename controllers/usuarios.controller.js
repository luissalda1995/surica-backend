'use strict';

var Usuario = require('mongoose').model('Usuario'),
    passport = require('passport');

exports.getUsuarios = function(req, res, next) {
    Usuario.find(function (err, usuarios) {
          if (err) {
              return next(err);
          } else {
              res.json(usuarios);
          }     
    });
};

exports.registrarUsuario = function(req, res, next) {
  var usuario = new Usuario(req.body.usuario);

	usuario.save(function(err) {
      // Si ocurre un error, usa el mensaje flash para reportar el error
      if (err) {
      	console.log(err);
        return next(err);
      }
      // Si el usuario fue creado de modo correcto usa el método 'login' de Passport para hacer login
      req.login(usuario, function(err) {
        // Si ocurre un error de login moverse al siguiente middleware
        if (err) {
        	return next(err);
		}
        // Redireccionar al usuario de vuelta a la página de la aplicación principal
        return res.json(usuario);
      });
    });
};

exports.logIn = function(req, res, next){
  passport.authenticate('login', function(err, usuario, info){
    if (err) {
      return next(err);
    }
    if (!usuario) {
        return res.json(403, {
            message: "no user found"
        });
    }
    req.logIn(usuario, function (err) {
      if (err) {
        return next(err);
      }
      return res.json(usuario);
    });
  })(req, res, next);
};

exports.logOut = function(req, res){
	req.logOut(); 
	res.send(200);
};

exports.getUsuariosPorServicio = function(req, res){
	Usuario.find({servicio: req.params.servicio}, function(err, usuarios){
          if (err) {
              return next(err);
          } else {
              res.json(usuarios);
          }  			
	});
};

exports.verificarLogin = function(req, res){
	res.send(req.isAuthenticated() ? req.user : '0');
};

exports.getUsuarioPorId = function(req, res, next, id) {
	Usuario.findById(req.id, function (err, usuario) {
	  if (err) {
	    console.log('GET Error: There was a problem retrieving: ' + err);
	    return next(err);
	  } else {
	    res.json(usuario);
	  }
	});
};
