var queryHelper = require('../helpers/queryHelper')();
var morgan = require('morgan');
var logger = morgan('combined');
var auth = require('../auth/auth');
var secure = require('../helpers/cryptHash');

module.exports = function(){
	var add = function(req, res, next){
		var name = req.body.name;
		var password = req.body.password;
		var email = req.body.email;
		
		if(!name || !password || !email){
			res.send("No data provided in request");
		}

		var userDetails = 	{ 	name: name, 
								password: secure.hash(password), 
								email: email
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
		logger(req, res, function(err){
			if(err)
			return done(err);
			queryHelper.getAll(function(err, users){
				res.status(200).send(users);
			});
		});	
	};

	var remove = function(req, res, next){
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
		var email = req.body.email;
		var updatedName = req.body.updatedName;
		var token = req.body.token;
		var updatedDetails = {email :email, updatedName: updatedName};
		// auth.verifyToken(token, function(validToken){
		// 	if(!validToken){
		// 		res.send("token auth error");
		// 	}else{
				queryHelper.updateUser(updatedDetails, function(err, status){
					if(status){
						res.send(updatedName + " updated successfully");
					}else{
						res.send(updatedName + " update failed");
					}
				});
		// 	}
		// });
		
	};

	var validate = function(req, res, next){
		var password = req.body.password;
		var email = req.body.email;
		if (!email || !password) {
			res.status(401).send("email or password can't be empty");
		};
		queryHelper.findUser(email, function(err, user){
			if(user){
				if(secure.compare(password, user.password)){
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