'use strict';

var Servicio = require('mongoose').model('Servicio');

exports.crearServicio = function(req,res){
	var servicio = new Servicio();
	servicio.usuario = req.body.servicio.usuario;
	servicio.cliente = [];
	servicio.proveedor = [];    
};

exports.getServiciosCliente = function(req, res){
	Servicio.findOne({usuario: req.params.usuario}, function(err, servicio){
          if (err) {
              return next(err);
          } else {
              res.json(servicio.cliente);
          }  			
	});
};

exports.getServiciosProveedor = function(req, res){
	Servicio.findOne({usuario: req.params.usuario}, function(err, usuarios){
	          if (err) {
	              return next(err);
	          } else {
	              res.json(usuarios);
	          }       
	});
};