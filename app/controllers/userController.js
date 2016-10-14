var queryHelper = require('../helpers/queryHelper')();
var morgan = require('morgan');
var logger = morgan('combined');
var auth = require('../auth/auth');
module.exports = function(){
	var add = function(req, res, next){
		res.header('Access-Control-Allow-Origin', '*');
		var userDetails = 	{ 	name: req.query.name, 
								password: req.query.password, 
								email: req.query.email
							};
		queryHelper.registerUser(userDetails, function(err, status){
			if(status){
				res.send("Success in Register");
			}else{
				res.send("Failure in Register");
			}
		});
	};

	var get = function(req, res, next){
		res.header('Access-Control-Allow-Origin', '*');
		logger(req, res, function(err){
			if(err)
			return done(err);
			queryHelper.getAll(function(err, users){
				res.status(200).send(users);
			});
		});	
	};

	var remove = function(req, res, next){
		res.header('Access-Control-Allow-Origin', '*');
		var name = req.query.name;
		queryHelper.remove(name, function(err, status){
			if(status){
				res.send(name + " removed successfully");  
			}else{
				res.send(name + "unsuccessfull");
			}
		});
	};

	var update = function(req, res, next){
		res.header('Access-Control-Allow-Origin', '*');
		var updatedDetails = {name : req.query.name, updatedName: req.query.updatedName};
		auth.verifyToken(req.query.token, function(validToken){
			if(!validToken){
				res.send("token auth error");
			}else{
				queryHelper.updateUser(updatedDetails, function(err, status){
					if(status){
						res.send(updatedDetails.name + " updated successfully");
					}else{
						res.send(updatedDetails.name + " update failed");
					}
				});
			}
		});
		
	};

	var validate = function(req, res, next){
		 res.header('Access-Control-Allow-Origin', '*');
		var email = req.query.email;
		var password = req.query.password
		if (!email || !password) {
			res.status(401).send("email or password can't be empty");
		};
		queryHelper.findUser(email, function(err, user){
			if(user){
				if(user.password == password){
					var token = auth.signToken(user._id);
					res.status(200).json({
						status : "Success",
						token : token
					});
				}else{
					res.send('email or password is wrong');
				}
			}else{
				res.send('No users available');		
			}
		});
	};

	return {
		addUser : add,
		getUsers : get,
		deleteUser: remove,
		updateUser : update,
		validateLogin: validate
	};
}