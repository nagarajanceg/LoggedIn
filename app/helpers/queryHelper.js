module.exports = function(){

var User = require('../models/login');

	var getAllUsers = function(callback){
			User.find({},function(err, users){
			if(err){
				console.log("error at get all users");
				throw err;
			}
				callback(null, users);
			})
	};
	var removeUser = function(name, callback){
		User.remove({name: name},function(err){
			if(err){
				console.log("error at delete users");
				callback(err, false);
				throw err;	
			} 
			callback(null, true);
		})		
	};
	var insertUser = function(details, callback){
		var userData = new User(details);
		userData.save(function(err){
			if(err){
				console.log("error at saving");
				callback(err, false);
				throw err;
			}
			callback(null, true);
		})
	};
	var updateUser = function(details, callback){
		User.where({name : details.name})
		.update({$set: {name: details.updatedName}}, function(err){
			if(err) {
				callback(err, false);
				throw err;
			}
			callback(null ,true);
		})
	};
	var findUserByEmail = function(query, callback){
		User.find({email:query.email}, function(err, user){
			if(err){
				console.log("error ib findUserByEmail");
			}
			callback(null, user[0]);
		})
	};

	return {
		getAll : getAllUsers,
		remove : removeUser,
		registerUser : insertUser,
		updateUser : updateUser,
		getUser : findUserByEmail
	}
}





