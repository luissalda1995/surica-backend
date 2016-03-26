var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function(){
    var Usuario = mongoose.model('Usuario');

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(usuario, done) {
        done(null, usuario.id);
    });

    passport.deserializeUser(function(id, done) {
        Usuario.findOne({
            _id: id
        }, '-password', function(err, usuario){
            done(err, usuario);
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    require('./passport/strategies/local.js')();

};