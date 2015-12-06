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
  .controller('landingController', ['$rootScope', function($rootScope) {
    let _this = this;

    _this.trackedUser = {};

    _this.searchPlayer = searchPlayer;

    $rootScope.$on('statUpdate', function(event, payload) {
      _this.trackedUser = payload;
    });

    function searchPlayer() {
      $rootScope.$emit('search', _this.trackedUser.name);
    }

  }]);
