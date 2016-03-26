'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UtilSchema = new Schema({
	tipo:String,
	valores:[String]
});

mongoose.model('Util', UtilSchema);