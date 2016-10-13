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
		User.find({email:query.email})
		.then(function(user){
			callback(null, user[0]);
		}, function(err){
			console.log("error in findUserByEmail");
			callback(err, null);
		});
	};
	var findOne = function(query, callback){
		User.findOne({email: query})
		.then(function(user){
			callback(null, user);
		},function(err){
			console.log("error in find User");
			callback(err, null);
		});
	};

	return {
		getAll : getAllUsers,
		remove : removeUser,
		registerUser : insertUser,
		updateUser : updateUser,
		getUser : findUserByEmail,
		findUser: findOne
	}
}





