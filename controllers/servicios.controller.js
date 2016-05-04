'use strict';

var Servicio = require('mongoose').model('Servicio');

exports.crearServicio = function(req,res){
	var servicio = new Servicio();
	servicio.usuario = req.params.usuario;
	servicio.cliente = [];
	servicio.proveedor = [];  
	servicio.save(function(err) {
      if (err) {
      	console.log(err);
        return next(err);
      }
      return res.json(servicio);

    });	  
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
	Servicio.findOne({usuario: req.params.usuario}, function(err, servicio){
	          if (err) {
	              return next(err);
	          } else {
	              res.json(servicio.proveedor);
	          }       
	});
};

exports.adicionarProveedor = function(req, res){
	var proveedor = req.body.proveedor;	
	Servicio.findOne({usuario: req.params.usuario}, function(err, servicio){
	          if (err) {
	              return next(err);
	          } else {
	              servicio.cliente.push({proveedor: proveedor.username, tipoServicio: proveedor.servicio});
	              servicio.save(function(err){
				      if (err) {
				      	console.log(err);
				        return next(err);
				      }
				      return res.json(proveedor);
	              });
	          }       
	});
};

exports.adicionarCliente = function(req, res){
	var cliente = req.body.cliente;
	Servicio.findOne({usuario: req.params.usuario}, function(err, servicio){
	          if (err) {
	              return next(err);
	          } else {
	              servicio.proveedor.push({cliente: cliente.username, tipoServicio: cliente.servicio});
	              servicio.save(function(err){
				      if (err) {
				      	console.log(err);
				        return next(err);
				      }
				      return res.json(cliente);
	              });
	          }       
	});
};

exports.cambiarEstadoCliente = function(req, res){
	var informacionServicio = req.body.informacionServicio;
	Servicio.findOne({usuario: req.params.usuario}, function(err, servicio){
	          if (err) {
	              return next(err);
	          } else {
	          		var cliente;
	          		for(var x in servicio.proveedor){
	          			if(servicio.proveedor[x].cliente == req.body.cliente){
	          				cliente = servicio.proveedor[x];
	          			}
	          		}
	          	  	cliente.estado = informacionServicio.estado;
	          	  	cliente.estado = informacionServicio.precio;
					servicio.save(function(err){
					  if (err) {
					  	console.log(err);
					    return next(err);
					  }
					  return res.json(servicio);
					});
	          }       
	});
};

exports.cambiarEstadoProveedor = function(req, res){
	var informacionServicio = req.body.informacionServicio;
	Servicio.findOne({usuario: req.params.usuario}, function(err, servicio){
	          if (err) {
	              return next(err);
	          } else {
	          		var proveedor;
	          		for(var x in servicio.cliente){
	          			if(servicio.cliente[x].proveedor == req.body.proveedor){
	          				proveedor = servicio.cliente[x];
	          			}
	          		}
	          	  	proveedor.estado = informacionServicio.estado;
	          	  	proveedor.precio = informacionServicio.precio;
					servicio.save(function(err){
					  if (err) {
					  	console.log(err);
					    return next(err);
					  }
					  return res.json(servicio);
					});
	          }       
	});
};