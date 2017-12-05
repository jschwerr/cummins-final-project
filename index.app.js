(function () {
    // declare an angular module for the site
    var app = angular.module('cumminsFinalProject', ['ui.router']);
    
    app.controller('indexCtrl', function($scope, $location) {
        $scope.getClass = function (path) {
            console.log("thing1: " + $location.path().substr(0, path.length), "thing2: " + path);
            console.log($location.path().substr(0, path.length) === path);
            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
        }
    });
    // create URL routes using angulars routeProvider service
    // angular routes and template instructions derived from: https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating
    // additional help from: https://www.undefinednull.com/2014/02/17/resolve-in-angularjs-routes-explained-as-story/
    app.config(function($stateProvider, $locationProvider) {
         $stateProvider
        .state('home', {
            url:'/',
            templateUrl: 'views/home.html',
            controller: 'homeCtrl'
        })
        .state('intake', {
            url:'/intake',
            templateUrl: 'views/intake.html',
            controller: 'intakeCtrl'
        })
        
//        // use the HTML5 History API
//        $locationProvider.html5Mode(true);
//        
    })
})();