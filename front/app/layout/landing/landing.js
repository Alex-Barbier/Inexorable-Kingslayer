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
    .controller('landingController', ['starterFactory', '$scope', function(starterFactory, $scope) {

        let _this = this;

        _this.search = search;
        _this.trackedUser = null;

        _setData('Elwanna');

        function search(queriedUser) {
            _setData(queriedUser);
        }

        function _setData(queriedUser) {
            console.log(_this.trackedUser);
            console.log(starterFactory);
            starterFactory.getUser(queriedUser).then(function(data){
                console.log(data);
            });
        }

        /*$scope.$watch(function() {
            return _this.trackedUser;
        }, function(newValue) {
            console.log(newValue);
        });*/

    }]);
