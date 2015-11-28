'use strict';

/**
 * @ngdoc function
 * @name inexorableKingslayerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inexorableKingslayerApp
 */
angular.module('inexorableKingslayerApp')
  .controller('LandingCtrl', function ($http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $http.get('http://localhost:3000/login/Elwanna')
    	.then(function(data) {
    		console.log(data);
    	});
  });
