'use strict';

var Util = require('mongoose').model('Util');

exports.getCategorias = function(req, res, next){
	Util.findOne({ tipo : 'categorias' }, function(err, categorias){
		if(err) {
			return console.error(err);
		} else{
			res.json(categorias);
		}
	})
}