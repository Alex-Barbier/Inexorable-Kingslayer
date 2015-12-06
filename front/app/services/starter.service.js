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

        return {
            getUser : getUser
        };

        function getUser(userName) {
            return Restangular.one('login', userName).get();
        }

    }]);
