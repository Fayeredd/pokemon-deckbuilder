/**
 * 
 */

//var pokeCard = {
//		type : null,
//		energy : null,
//		hitPoints : null,
//		ability : null,
//		attacks : [],
//		retreatCost : null,
//		weakness : [],
//		strength : []
//}
//
//var energyCard = {
//		type : null,
//		energyCount : null,
//		specialEffect : null
//}
//
//var trainerCard = {
//		type : null,
//		specialEffect : null
//}
//
//var attack = {
//		type : null,
//		energyType : null,
//		energyCost : null,
//		damage : null
//}
//
//var player = {
//		deck : [],
//		hand : [],
//		active : null,
//		bench : [],
//		prize : [],
//		discard : []
//}
//
//var field = {
//		players : [],
//		stadium : null
//}


var app = angular.module("PokeModule", ['ui.bootstrap', 'ui.router']);

//app.filter('startFrom', function () {
//	return function (input, start) {
//		if (input) {
//			start = +start;
//			return input.slice(start);
//		}
//		return [];
//	};
//});
//app.config(function($stateProvider, $urlRouterProvider){
//	
//	$stateProvider
//		.state('home',{
//			url: '/',
//			templateUrl: 'templates/home/home.html'
//		})
//		.state('builder',{
//			url: '/builder',
//			templateUrl: 'templates/builder/builder.html'
//		})
//		.state('lobby',{
//			url: '/lobby',
//			templateUrl: 'templates/game/lobby.html'
//		})
//		.state('battle',{
//			url: '/battle',
//			templateUrl: 'templates/game/battle.html'
//		})
//	
//	$urlRouterProvider.otherwise('/');
//});