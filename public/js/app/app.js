'use strict'; //to catch some errors that might go unnoticed

angular
	.module('app', ['ngRoute'])
	.config(function($routeProvider){
		$routeProvider.otherwise({
			redirectTo: '/restaurants'
		});
	});