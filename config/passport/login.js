var LocalStrategy   = require('passport-local').Strategy;
var Usuario = require('../../model/usuario');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            // check in mongo if a usuario with username exists or not
            Usuario.findOne({ 'username' :  username }, 
                function(err, usuario) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!usuario){
                        console.log('Usuario Not Found with username '+username);
                        return done(null, false, req.flash('message', 'Usuario Not found.'));                 
                    }
                    // Usuario exists but wrong password, log the error 
                    if (!isValidPassword(usuario, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    // Usuario and password both match, return usuario from done method
                    // which will be treated like success
                    return done(null, usuario);
                }
            );

        })
    );


    var isValidPassword = function(usuario, password){
        return bCrypt.compareSync(password, usuario.password);
    };
    
};