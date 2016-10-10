var mongoose = require('mongoose');
var connectDb = function(){
	mongoose.connect('mongodb://localhost/login',function(err){
		if(err){
			console.log("error in db connect");
		}else{
			console.log("connection Successful init");
		}
	});
}

module.exports = connectDb;