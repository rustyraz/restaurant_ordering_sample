var config = {};

//db connection
config.mongoUri = 'mongodb://localhost:27017/restaurant_v1';

//cookie expiration time
config.cookieMaxAge = 30 * 24 * 3600 * 1000;

//ordrx api key
config.ordrxKey = '5AIMNF7nJjkSx6V1peY0nQWV_avQ-BFjHKF4t5xZVYY';
//the address to which food should be delievered to
config.address = {
	addr: '288 Coleridge St',
	city: 'San Francisco',
	zip: '94110',
	state: 'CA'
};
config.phone = '411-555-1234';


//export module
module.exports = config;