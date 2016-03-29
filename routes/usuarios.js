'use strict';

var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'), //used to manipulate POST
    usuarios = require('../controllers/usuarios.controller.js'),
    passport = require('passport');

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
    .get(usuarios.getUsuarios)

    .post(usuarios.registrarUsuario);

router.route('/login')
  .get(usuarios.verificarLogin)
  .post(usuarios.logIn);

router.route('/logout')
  .post(usuarios.logOut);

router.route('/:servicio')
	.get(usuarios.getUsuariosPorServicio);

router.route('/:id')
  .get(usuarios.getUsuarioPorId);

module.exports = router;