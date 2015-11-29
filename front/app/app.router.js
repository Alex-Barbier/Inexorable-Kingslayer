'use strict';
/**
 * @ngdoc router
 * @name inexorableKingslayerApp
 * @description
 * # app router
 *
 * Router of the application.
 */

angular
    .module('inexorableKingslayerApp')
    .config(function($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/landing");
        // Now set up the states
        $stateProvider
            .state('landing', {
                url          : '/landing',
                templateUrl  : 'layout/landing/landing.html',
                controller   : 'landingController',
                controllerAs : 'landingCtrl'
            })
            .state('about', {
                url          : '/about',
                templateUrl  : 'layout/about/about.html',
                controller   : 'aboutController',
                controllerAs : 'aboutCtrl'
            });
    });