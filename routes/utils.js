var express = require('express'),
	router = express.Router(),
	utils = require('../controllers/utils.controller.js');

router.route('/categorias')
	.get(utils.getCategorias);

module.exports = router;
