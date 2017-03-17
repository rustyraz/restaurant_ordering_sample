var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//if we have an already signed in user redirect to orders pade
	if(req.user){
		return res.redirect('/orders');
	}

	var inputs_and_values = {
		title : 'Login Page',
		currently_on_login_page: 'login_page',
		error: req.flash('error')
	};
	res.render('user/login', inputs_and_values);
});


module.exports = router;
