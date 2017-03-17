//load out user class
var User = require('../models/user').User;
var bCrypt = require('bcrypt-nodejs');


//define a function for adding a user
exports.addUser = function(user, next){

	var newUser = new User({
		first_name: user.first_name,
		last_name: user.last_name,
		email: user.email.toLowerCase(),
		password: createHash(user.password)
	});

	//inserting it into our mongodb collection
	newUser.save(function(err){
		//if there is an error return with an err in next
		if(err){
			return next(err);
		}
		next(null);
	});
};

//check for existing user
exports.findUser = function(email, next){
	User.findOne({email:email.toLowerCase()}, function(err, user){
		next(err,user);
	});
};


// Generates hash using bCrypt
var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};