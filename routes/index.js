var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Init = require('../app/init/initialize')();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login',function(req, res, next){
	console.log("reached router");
	res.send('logging in');
});
module.exports = router;
