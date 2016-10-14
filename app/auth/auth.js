var jwt = require('jsonwebtoken');
var config = require('../config/config.js');
module.exports ={
	signToken: function(id){
		console.log("id value", id);
		return jwt.sign(
			{_id: id},
			config.secret,
			{expiresIn : config.tokenExpireTime}
			);
	},
	verifyToken : function(token, callback){
		jwt.verify(token, config.secret, function(err, decoded){
			//error occurs at token mismatch and expired time;
			if(err){
				callback(false);
				return;
			}
			callback(true);
		});
	}
}