var mongoose = require('mongoose');
var config = require('../config/config');
var connectDb = function(){
	mongoose.connect(config.db.url, function(err){
		if(err){
			console.log("error in db connect",err);
		}else{
			console.log("connection Successful init");
		}
	});
}

module.exports = connectDb;