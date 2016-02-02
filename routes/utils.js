var express = require('express');
var router = express.Router();
var Util = require('../model/util');

router.route('/configuracion')
	.get(function(req, res, next){
		Util.findOne({ tipo : 'categorias' }, function(err, categorias){
			if(err) {
				return console.error(err);
			} else{
				res.json(categorias);
			}
		})
	});

module.exports = router;
