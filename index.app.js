(function () {
    // declare an angular module for the site
    var app = angular.module('cumminsFinalProject', ['ui.router', 'ngCookies']);
    
    app.controller('indexCtrl', function($cookies, $scope, $location, $q) {;
        $scope.hasServiceEvent = false;
        // keep user logged in after page refresh
        $scope.getClass = function (path) {
            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
        }
        
        $scope.isLoggedIn = function () {
            var path = '/login';
            return !($location.path().substr(0, path.length) === path);
        }
        
        var hasServiceEventPromise = function() {
            return new Promise((resolve, reject) => {
                    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
                    var request, db; 
                    var hasServiceEvent = false;
                    if(!window.indexedDB)
                    {
                        console.log("Your Browser does not support IndexedDB");
                    }
                    else {
                        request = window.indexedDB.open("cumminsDB", 1);

                        request.onsuccess = function(event){
                            db = event.target.result;
                            var objectStore = db.transaction("serviceEvent").objectStore("serviceEvent");
                            objectStore.openCursor().onsuccess = function (e) {
                                var cursor = e.target.result;
                                hasServiceEvent = true;
                                resolve(hasServiceEvent);
                                if (cursor) {
                                    cursor.continue();
                                }
                            };
                        };
                    }
                })
            };
        
        hasServiceEventPromise().then(val => {
            console.log('hello');
            $scope.hasServiceEvent = val;
            $scope.$apply();
        });
    
        function read() {
            var transaction = db.transaction(["employee"]);
            var objectStore = transaction.objectStore("employee");
            var request = objectStore.get("00-03");
            
            request.onerror = function(event) {
               alert("Unable to retrieve daa from database!");
            };
            
            request.onsuccess = function(event) {
               // Do something with the request.result!
               if(request.result) {
                  alert("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
               }
               
               else {
                  alert("Kenny couldn't be found in your database!");
               }
            };
         }
         
         function readAll() {
            var objectStore = db.transaction("employee").objectStore("employee");
            
            objectStore.openCursor().onsuccess = function(event) {
               var cursor = event.target.result;
               
               if (cursor) {
                  alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Age: " + cursor.value.age + ", Email: " + cursor.value.email);
                  cursor.continue();
               }
               
               else {
                  alert("No more entries!");
               }
            };
         }
         
         function add() {
            var request = db.transaction(["employee"], "readwrite")
            .objectStore("employee")
            .add({ id: "00-03", name: "Kenny", age: 19, email: "kenny@planet.org" });
            
            request.onsuccess = function(event) {
               alert("Kenny has been added to your database.");
            };
            
            request.onerror = function(event) {
               alert("Unable to add data\r\nKenny is aready exist in your database! ");
            }
         }
         
         function remove() {
            var request = db.transaction(["employee"], "readwrite")
            .objectStore("employee")
            .delete("00-03");
            
            request.onsuccess = function(event) {
               alert("Kenny's entry has been removed from your database.");
            };
         }
    });
    // create URL routes using angulars routeProvider service
    // angular routes and template instructions derived from: https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating
    // additional help from: https://www.undefinednull.com/2014/02/17/resolve-in-angularjs-routes-explained-as-story/
    app.config(function($stateProvider, $locationProvider) {
                
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
                            var objectStore = db.transaction("serviceEvent").objectStore("serviceEvent");
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
        
        $stateProvider
        .state('home', {
            url:'/',
            templateUrl: 'views/home.html',
            controller: 'homeCtrl',
            resolve: {
                hasServiceEvent: function() {return hasServiceEventPromise().then(function(val) {return val})}
            }
        })
        .state('intake', {
            url:'/intake',
            templateUrl: 'views/intake.html',
            controller: 'intakeCtrl'
        })
        .state('diagnose', {
            url:'/diagnose',
            templateUrl: 'views/register.html',
            controller: 'registerCtrl',
            controllerAs: 'vm'
        })
        .state('job-plan', {
            url:'/job-plan',
            templateUrl: 'views/register.html',
            controller: 'registerCtrl',
            controllerAs: 'vm'
        })
        .state('repair', {
            url:'/repair',
            templateUrl: 'views/register.html',
            controller: 'registerCtrl',
            controllerAs: 'vm'
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
                alert("Upgrading");
                db = event.target.result;
                db.createObjectStore("serviceEvent");
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