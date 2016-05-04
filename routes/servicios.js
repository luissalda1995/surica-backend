var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST
    servicios = require('../controllers/servicios.controller.js');

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

router.route('/:usuario')
  .post(servicios.crearServicio);

router.route('/cliente/:usuario')
	.get(servicios.getServiciosCliente)
  .post(servicios.adicionarProveedor);

router.route('/proveedor/:usuario')
  .get(servicios.getServiciosProveedor)
  .post(servicios.adicionarCliente);  

router.route('/cliente/estado/:usuario')
  .post(servicios.cambiarEstadoCliente);

router.route('/proveedor/estado/:usuario')
  .post(servicios.cambiarEstadoProveedor);  

module.exports = router;