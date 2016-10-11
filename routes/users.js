var express = require('express');
var router = express.Router();
var morgan = require('morgan');
var logger = morgan('combined');
var queryHelper = require('../app/helpers/queryHelper')();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Add new Users */
router.get('/add',function(req, res, next){
	var userDetails = { name: req.query.name, 
						password: req.query.password, 
						email: req.query.email
					};
	queryHelper.registerUser(userDetails, function(err, status){
		if(status){
			res.send("Success in Register");
		}else{
			res.send("Failure in Register");
		}
	})
	
});

/* list all users */
router.get('/get',function(req, res, next){
	logger(req, res, function(err){
		if(err)
		return done(err);
		queryHelper.getAll(function(err, users){
			res.send(users);
		});
	})	
});

/* delete users */
router.get('/delete', function(req, res, next){
	var name = req.query.name;
	queryHelper.remove(name, function(err, status){
		if(status){
			res.send(name + " removed successfully");  
		}else{
			res.send(name + "unsuccessfull");
		}
	})
});

/* update the existing users */
router.get('/update', function(req, res, next){
	var updatedDetails = {name : req.query.name, updatedName: req.query.updatedName};
	queryHelper.updateUser(updatedDetails, function(err, status){
		if(status){
			res.send(updatedDetails.name + " updated successfully");
		}else{
			res.send(updatedDetails.name + " update failed");
		}
	})
});

/* login validation check */
router.get('/login',function(req, res, next){
	var findQuery = {email: req.query.email}
	queryHelper.getUser(findQuery, function(err, user){
		if(user){
			console.log(user);
			if(user.password == req.query.password){
				res.send('logging in');
			}else{
				res.send('email or password is wrong');
			}
		}else{
			res.send('No users available');		
		}
	})
	
});
module.exports = router;
