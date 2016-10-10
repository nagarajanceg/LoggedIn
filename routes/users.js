var express = require('express');
var router = express.Router();
var morgan = require('morgan');
var logger = morgan('combined');
var User = require('../app/models/login');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/add',function(req, res, next){
	var addUser = new User({
		name: req.query.name,
		password: req.query.password
	});
	addUser.save(function(err){
		if(err){
			console.log("error at saving");
			throw err;
		}
		console.log("user added successfully");
		res.send(" success");
	})
});
router.get('/get',function(req, res, next){
	logger(req, res, function(err){
		if(err)
			return done(err);
		User.find({},function(err, users){
		if(err){
			console.log("error at get all users");
			throw err;
		}
			console.log(users);
			res.send(users);
		})
	})	
});
router.get('/delete', function(req, res, next){
	User.remove({name: req.query.name},function(err){
		if(err) throw err;
		res.send(req.query.name + " removed successfully");
	})
	
});
router.get('/update', function(req, res, next){
	User.where({name : req.query.name}).update({$set: {name: req.query.updatedName}}, function(err){
		if(err) throw err;
		res.send(req.query.name + " updated successfully");
	})
})
module.exports = router;
