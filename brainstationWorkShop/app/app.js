var app = angular.module('myApp',['ui.bootstrap','ngRoute']); // [] for depandencies.


app.config(function($routeProvider){

	
	

	$routeProvider.when('/',{
		templateUrl:'templates/home.html',
		controller:'MainCtrl as Ctrl',
	})
	.otherwise({
		redirectTo:'/'
	});


});