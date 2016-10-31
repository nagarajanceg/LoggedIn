var _ = require('lodash');
 var config= {
	secret: 'sample',
	tokenExpireTime : 120 ,/* in seconds*/
	dev : 'development'
}

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;
var envConfig ;
try{
	envConfig = require('./'+config.env);
	console.log("eeee ",envConfig);
	envConfig = envConfig || {};
} catch(e){
	envConfig = {};
}

module.exports = _.merge(config, envConfig);