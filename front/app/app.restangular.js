'use strict';
/**
 * @ngdoc restangular
 * @name inexorableKingslayerApp
 * @description
 * # app restangular config
 *
 * Configuration of restangular provider
 */

angular
    .module('inexorableKingslayerApp')
    .config(function(RestangularProvider) {
        RestangularProvider.setBaseUrl('/');
    });