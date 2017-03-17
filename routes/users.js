var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../config');
var userService = require('../services/user-service');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('This is the user index route');
});

//get the login form
router.get('/login', function(req, res, next) {
  var inputs_and_values = {
  	title : 'Login Page',
    currently_on_login_page: 'login_page'
  };
  res.render('user/login', inputs_and_values);
});


//post the login form
/*router.post('/login', passport.authenticate('local'), function(req, res, next){
  res.redirect('/orders');
});*/

//redirect users after unsuccessful login and show a flash message
router.post('/login',
  function(req, res, next){
    req.session.orderId = 1222;//manual setting an ordr id for testing
    //check if the remember me input is set
    if(req.body.remember_me){
      req.session.cookie.maxAge = config.cookieMaxAge;
    }
    next();
  }
, 
passport.authenticate('local',{
  failureRedirect: '/', 
  successRedirect: '/orders',
  failureFlash: 'Invalid credentials'
}));


router.get('/register', function(req, res, next) {
  var inputs_and_values = {
  	title : 'Registration Page',
    currently_on_registration_page: 'registration_page'
  };
  res.render('user/register', inputs_and_values);
});

router.post('/register', function(req, res, next) {

  userService.addUser(req.body, function(err){
    if(err){
        //an error was sent back
        var inputs_and_values = {
            title: 'Registration Page',
            input: req.body,
            error: err.errors
        };
        delete inputs_and_values.input.password;
        return res.render('user/register', inputs_and_values);
    }

    //login user after successfully registering
    req.login(req.body, function(err){
      res.redirect('/orders');
    });

  });  	
	  
});

router.get('/logout', function(req, res, next){
  req.logout();
  req.session.destroy(); //destroy a session
  res.redirect('/');//redirect to the index page
});


module.exports = router;
