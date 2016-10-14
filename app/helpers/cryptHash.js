var base64 = require('base-64');
module.exports = {
	hash : function (value) {
		return base64.encode(value);
	},
	compare : function(value, hash){
		return ((base64.decode(hash) == value)? true : false);
	}
}