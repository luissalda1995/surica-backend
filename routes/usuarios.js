var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST
    passport = require('passport');
    Usuario = require('../model/usuario');

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
}));

router.route('/')
    .get(function(req, res, next) {
        Usuario.find(function (err, usuarios) {
              if (err) {
                  return console.error(err);
              } else {
                  res.json(usuarios);
              }     
        });
    })

    .post(function(req, res) {
      var usuario = new Usuario();
      usuario.username = req.body.usuario.username;
      usuario.password = req.body.usuario.password;
      usuario.nombre = req.body.usuario.nombre;
      usuario.apellido = req.body.usuario.apellido;
      usuario.servicio = req.body.usuario.servicio;
      usuario.disponibilidad = req.body.usuario.disponibilidad;

      Usuario.findOne({ 'username' :  usuario.username }, function(err, usuario) {
        if (usuario) {
            console.log('Usuario already exists with username: '+ usuario.username);
        } else {
          usuario.save(function (err, usuario) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                console.log('POST creating new user: ' + usuario);
                res.json(usuario);

            }
          });
        }
      });
    });

router.route('/login')
  .get(function(req, res){
    res.send(req.isAuthenticated() ? req.user : '0');
  })
  .post(passport.authenticate('login'));

router.route('logout')
  .post(function(req, res){
    req.logOut(); 
    res.send(200);
  });

router.route('/:servicio')
	.get(function(req, res){
		Usuario.find({servicio: req.params.servicio}, function(err, usuarios){
              if (err) {
                  return console.error(err);
              } else {
                  res.json(usuarios);
              }  			
		});
	});

router.route('/:id')
  .get(function(req, res) {
    Usuario.findById(req.id, function (err, blob) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        res.json(blob);
      }
    });
  });

module.exports = router;