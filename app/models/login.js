var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	name:{
		type: String,
		required: true	
	}, 
	password: {
		type:String,
		required: true
	},
	created_at: Date
});

userSchema.pre('save', function(next){
	this.created_at = new Date();
	next();
})

var user = mongoose.model('user', userSchema);
module.exports = user;
