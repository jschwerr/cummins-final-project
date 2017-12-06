(function () {
    // declare an angular module for the site
    var app = angular.module('cumminsFinalProject', ['ui.router', 'ngCookies']);
    
    app.controller('indexCtrl', function($cookies, $scope, $location) {
        // keep user logged in after page refresh
        $scope.getClass = function (path) {
            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
        }
        $scope.isLoggedIn = function() {
            var globals = $cookies.getObject('globals') || {};
            console.log(globals.currentUser);
            return true;
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
        .state('login', {
             url:'/login',
             templateUrl: 'views/login.html',
             controller: 'loginCtrl',
             controllerAs: 'vm'
        })
        .state('register', {
            url:'/register',
            templateUrl: 'views/register.html',
            controller: 'registerCtrl',
            controllerAs: 'vm'
        })
        
//        // use the HTML5 History API
//        $locationProvider.html5Mode(true);
//        
    });
    
    app.run(function($rootScope, $location, $state, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $state.go('login');
            }
        });
    })
})();