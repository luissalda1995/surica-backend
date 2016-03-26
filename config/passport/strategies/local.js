var passport = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    Usuario = require('mongoose').model('Usuario');

module.exports = function(){

	passport.use('login', new LocalStrategy(function(username, password, done) { 
            // check in mongo if a usuario with username exists or not
            Usuario.findOne({ 'username' :  username }, 
                function(err, usuario) {
                    console.log('usuario' + usuario);
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!usuario){
                        console.log('Usuario Not Found with username '+username);
                        return done(null, false,{
                            mensaje: 'Usuario no registrado'
                        });                 
                    }
                    // Usuario exists but wrong password, log the error 
                    if (!usuario.validarPassword(password)){
                        console.log('Invalid Password');
                        return done(null, false, {
                            mensaje: 'Contraseña invalida'
                        }); // redirect back to login page
                    }
                    console.log('Logeado');
                    // Usuario and password both match, return usuario from done method
                    // which will be treated like successs
                    return done(null, usuario);
                }
            );

        })
    );

};