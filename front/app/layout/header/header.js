'use strict';
/**
 * @ngdoc function
 * @name inexorableKingslayerApp.controller:headerController
 * @description
 * # Header
 *
 * Controller of the Header
 */

angular
    .module('inexorableKingslayerApp')
    .controller('headerController', ['$scope', '$state', function($scope, $state) {
        let _this = this;

        _this.currentState = '';

        $scope.$watch(function() {
            return $state.current.name;
        }, function(newValue) {
            _this.currentState = newValue;
            angular.extend(_this, _setActive());
        });

        function _setActive() {
            return {
                landing : _this.currentState === 'landing',
                about   : _this.currentState === 'about'
            };
        }
    }]);