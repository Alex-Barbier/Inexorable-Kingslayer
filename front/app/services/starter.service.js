'use strict';
/**
 * @ngdoc service
 * @name inexorableKingslayerApp.factory:starterFactory
 * @description
 * # Starter
 *
 * Main service
 */

angular
    .module('inexorableKingslayerApp')
    .factory('starterFactory', ['Restangular', function(Restangular) {

        function getUser(userName) {
            Restangular.one('login', userName).get().then(function(data) {
                console.log(data);
            });
        }

        return {
            getUser : getUser
        };


    }]);

