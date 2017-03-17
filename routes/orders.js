var express = require('express');
var router = express.Router();
var restrict = require('../auth/restrict');
var orderService = require('../services/order-service');

router.get('/',restrict, function(req, res, next){
	
	var i_n_v = {
		title: 'Orders page',
		currently_on_orders_page: 'orders_page',
		order_id: req.session.orderId,
		first_name: req.user? req.user.first_name : null
	};
	res.render('orders/index', i_n_v);
});

router.get('/api/restaurants', restrict, function(req, res, next){
	orderService.getRestaurants(function(err, restaurants){
		//if there is an error
		if(err){
			return res.status(500).json({error: 'Failed to retrieve restaurants'});
		}
		res.json(restaurants);
	});
});

//get individual restaurant details
//for optional param we add ?
router.get('/api/restaurant-details/:restId', restrict, function(req, res, next){
	orderService.getRestaurantDetails(req.params.restId, function(err, details){
		if(err){
			return res.status(500).json({error: 'Failed to retrieve details'});
		}
		res.json(details);
	});
});

module.exports = router;