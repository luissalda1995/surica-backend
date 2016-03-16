var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST
    Servicio = require('../model/servicio');

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
}));

router.route('/')
  .post(function(req,res){
    var servicio = new Servicio();
    servicio.usuario = req.body.servicio.usuario;
    servicio.cliente = [];
    servicio.proveedor = [];    
  });

router.route('/cliente/:usuario')
	.get(function(req, res){
		Servicio.findOne({usuario: req.params.usuario}, function(err, servicio){
              if (err) {
                  return console.error(err);
              } else {
                  res.json(servicio.cliente);
              }  			
		});
	});

router.route('/proveedor/:usuario')
  .get(function(req, res){
    Servicio.findOne({usuario: req.params.usuario}, function(err, usuarios){
              if (err) {
                  return console.error(err);
              } else {
                  res.json(usuarios);
              }       
    });
  });  



module.exports = router;