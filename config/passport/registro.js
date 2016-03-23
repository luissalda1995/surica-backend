var LocalStrategy   = require('passport-local').Strategy;
var Usuario = require('../../model/usuario');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('registro', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, done) {

            var findOrCreateUser = function(){
                // find a usuario in Mongo with provided username
                Usuario.findOne({ 'username' :  req.body.username }, function(err, usuario) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (usuario) {
                        console.log('Usuario already exists with username: '+ req.body.username);
                        return done(null, false);
                    } else {
                        // if there is no usuario with that email
                        // create the usuario
                        var nuevoUsuario = new Usuario();

                        // set the usuario's local credentials
                        nuevoUsuario.username = req.body.username;
                        nuevoUsuario.password = createHash(req.body.password);
                        nuevoUsuario.nombre = req.body.usuario.nombre;
                        nuevoUsuario.apellido = req.body.usuario.apellido;
                        nuevoUsuario.servicio = req.body.usuario.servicio;
                        nuevoUsuario.disponibilidad = req.body.usuario.disponibilidad;

                        // save the usuario
                        nuevoUsuario.save(function(err) {
                            if (err){
                                console.log('Error in Saving usuario: '+err);  
                                throw err;  
                            }
                            console.log('Usuario Registration succesful');    
                            return done(null, nuevoUsuario);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};