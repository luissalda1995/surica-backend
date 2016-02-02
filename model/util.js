var mongoose = require('mongoose');
var UtilSchema = new mongoose.Schema({
	tipo:String,
	valores:[String]
});

module.exports = mongoose.model('Util', UtilSchema);