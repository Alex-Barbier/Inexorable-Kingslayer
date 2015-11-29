'use strict';
/**
 * @ngdoc function
 * @name inexorableKingslayerApp.controller:landingController
 * @description
 * # Landing
 *
 * Controller of the Landing
 */

angular
    .module('inexorableKingslayerApp')
    .controller('landingController', ['$http', '$scope', function($http, $scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];

    $http.get('http://localhost:3000/login/Elwanna')
        .then(function(data) {
            console.log(data);
        });
}]);
