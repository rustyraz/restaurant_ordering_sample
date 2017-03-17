var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userService = require('../services/user-service');

var userSchema = new Schema({
	first_name: {type:String, required: 'Please enter your first name'},
	last_name: {type:String, required: 'Please enter your last name'},
	email: {type:String, required: 'Please enter your email address'},
	password: {type:String, required: 'Please enter a password'},
	created_at: {type: Date, default: Date.now}
});

userSchema.path('email').validate(function(value, next){
	userService.findUser(value, function(err, user){
		if(err){
			console.log(err);
			return next(false);
		}
		next(!user);
	});
}, 'That email is already in use');

var User = mongoose.model('User', userSchema);

module.exports = {
	User: User
};