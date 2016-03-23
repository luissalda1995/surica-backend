var login = require('./login');
var registro = require('./registro');
var Usuario = require('../../model/usuario');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(usuario, done) {
        console.log('serializing user: ');
        console.log(usuario);
        done(null, usuario._id);
    });

    passport.deserializeUser(function(id, done) {
        Usuario.findById(id, function(err, usuario) {
            console.log('deserializing user:',usuario);
            done(err, usuario);
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);

};