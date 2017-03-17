module.exports = function(req, res, next){
	//this will be used as a middleware for checking the user authentication for certain routes
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
};