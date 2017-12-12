(function () {
    // declare an angular module for the site
    var app = angular.module('cumminsFinalProject', ['ui.router', 'ngCookies', 'anguFixedHeaderTable', 'ui.bootstrap']);
    var hasServiceEventPromise = function() {
        return new Promise((resolve, reject) => {
            window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            var request, db; 
            if(!window.indexedDB)
            {
                console.log("Your Browser does not support IndexedDB");
            }
            else {
                request = window.indexedDB.open("cumminsDB", 1);

                request.onsuccess = function(event){
                    db = event.target.result;
                    var objectStore = db.transaction("serviceHistory").objectStore("serviceHistory");
                    objectStore.openCursor().onsuccess = function (e) {
                        var cursor = e.target.result;
                        if (cursor) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    };
                };
            }
        })
    };
    
    var hasFaultCodesPromise = function() {
        return new Promise((resolve, reject) => {
            window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            var request, db; 
            if(!window.indexedDB)
            {
                console.log("Your Browser does not support IndexedDB");
            }
            else {
                request = window.indexedDB.open("cumminsDB", 1);

                request.onsuccess = function(event){
                    db = event.target.result;
                    var objectStore = db.transaction("engineFaultCode").objectStore("engineFaultCode");
                    objectStore.openCursor().onsuccess = function (e) {
                        var cursor = e.target.result;
                        if (cursor) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    };
                };
            }
        })
    };

    app.controller('indexCtrl', function($cookies, $scope, $location, $q) {;
        $scope.hasServiceEvent = false;
                                                                           
        $scope.getClass = function (path) {
            return ($location.path() === path) ? 'active' : '';
        }
        
        $scope.$on('$stateChangeStart', function() {
            hasServiceEventPromise().then(val => {
                $scope.hasServiceEvent = val;
                $scope.$apply();
            });
        });
                   
        $scope.isLoggedIn = function () {
            var login = '/login';
            var register = '/register'
            return !($location.path().substr(0, login.length) === login || $location.path().substr(0, register.length) === register);
        }
        
        hasServiceEventPromise().then(val => {
            $scope.hasServiceEvent = val;
            $scope.$apply();
        });
    });
    // create URL routes using angulars routeProvider service
    // angular routes and template instructions derived from: https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating
    // additional help from: https://www.undefinednull.com/2014/02/17/resolve-in-angularjs-routes-explained-as-story/
    app.config(function($stateProvider, $locationProvider) {
        
        $stateProvider
        .state('home', {
            url:'/',
            templateUrl: 'views/home.html',
            controller: 'homeCtrl',
            resolve: {
                hasServiceEvent: function() {return hasServiceEventPromise().then(function(val) {return val})},
                hasFaultCodes: function() {return hasFaultCodesPromise().then(function(val) {return val})},
                engineServiceHistory: function(indexedDB) {
                    return hasServiceEventPromise().then(function(val) {
                        if (val) {
                            return indexedDB
                                    .readAll('serviceHistory')
                                    .then(function(res) {
                                        return res;
                                    });
                                    
                        }
                        else {
                            return false;
                        }
                    });
                },
                engineData: function($http) {
                    return $http.get('data/engineSensorData.json')
                        .then(
                            function(res) {
                                return res.data;
                            },
                            function(err) {
                                alert(err);
                            }
                    );
                }
            }
        })
        .state('intake', {
            url:'/intake',
            templateUrl: 'views/intake.html',
            controller: 'intakeCtrl',
            resolve: {
                hasServiceEvent: function() {return hasServiceEventPromise().then(function(val) {return val})},
                hasFaultCodes: function() {return hasFaultCodesPromise().then(function(val) {return val})}                
            }
        })
        .state('diagnose', {
            url:'/diagnose',
            templateUrl: 'views/diagnose.html',
            controller: 'diagnoseCtrl',
            resolve: {
                hasFaultCodes: function() {return hasFaultCodesPromise().then(function(val) {return val})},
                engineData: function($http) {
                    return $http.get('data/engineSensorData.json')
                        .then(
                            function(res) {
                                return res.data;
                            },
                            function(err) {
                                alert(err);
                            }
                    );
                },
                engineFaultCodes: function($http) {
                    return $http.get('data/engineFaultCodes.json')
                        .then(
                            function(res) {
                                return res.data;
                            },
                            function(err) {
                                console.log(err);
                                return [];
                            }
                        )
                }
            }
        })
        .state('job-plan', {
            url:'/job-plan',
            templateUrl: 'views/job-plan.html',
            controller: 'jobPlanCtrl',
            resolve: {
                jobPlans: function($http) {
                    return $http.get('data/jobPlans.json')
                        .then(
                            function(res) {
                                return res.data;
                            },
                            function(err) {
                                console.log(err);
                                return [];
                            }
                        )
                }
            }
        })
        .state('repair', {
            url:'/repair',
            templateUrl: 'views/repair.html',
            controller: 'repairCtrl',
        })
        .state('invoice', {
            url:'/invoice',
            templateUrl: 'views/register.html',
            controller: 'registerCtrl',
            controllerAs: 'vm'
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
    });
    
    app.run(function($rootScope, $location, $state, $cookies, $http) {
                    
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        var request, db; 

        if(!window.indexedDB)
        {
            console.log("Your Browser does not support IndexedDB");
        }
        else
        {
            var error = false;
            request = window.indexedDB.open("cumminsDB", 1);
            request.onerror = function(event){
                error = true;
                alert("Error opening DB", event);
                console.log(event);
            };

            if (error) {
                console.log("error");   
                return;
            };

            request.onupgradeneeded   = function(event){
                db = event.target.result;
                db.createObjectStore("intakeInfo", {keyPath: 'engineSerialNumber'});
                db.createObjectStore("serviceHistory", {keyPath: ['engineSerialNumber', 'faultCode', 'date']});
                db.createObjectStore("engineFaultCode", {keyPath: ['engineSerialNumber', 'faultCode']});
            };

        }
        
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