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
  .controller('headerController', ['$rootScope', '$scope', '$state', 'starterFactory', function($rootScope, $scope, $state, starterFactory) {

    let _this = this;

    _this.currentState = '';
    _this.trackedUser  = [];
    _this.matchCount   = 0;

    _this.search = search;


    $rootScope.$on('search', function(event, query) {
      _setData(query);
    });

    $scope.$watch(function() {
      return $state.current.name;
    }, function(newValue) {
      _this.currentState = newValue;
      angular.extend(_this, _setActive());
    });

    $scope.$watch(function() {
      return _this.trackedUser;
    }, function(newValue) {
      _this.matchCount = newValue.length;
      $rootScope.$emit('statUpdate', newValue);
    });

    function search(queriedUser) {
      _setData(queriedUser);
    }

    function _setActive() {
      return {
        landing : _this.currentState === 'landing',
        about   : _this.currentState === 'about'
      };
    }

    function _setData(queriedUser) {
      starterFactory.getUser(queriedUser).then(function(data) {
        _this.trackedUser = data;
        _this.trackedUser.name = queriedUser;
        console.log(_this.trackedUser.name);
      });
    }
  }]);
