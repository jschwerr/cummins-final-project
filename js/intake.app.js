(function(){
    'use strict';
    
    var app = angular.module('cumminsFinalProject'); //array has dependency; this create a module called app
                                        //angular.module('app'); will look up a module called app

    app.controller('intakeCtrl', function($scope, $location, $state, $http, indexedDB, hasServiceEvent){
        $scope.hasServiceEvent = hasServiceEvent;
        console.log($scope.hasServiceEvent, 'service')
        $scope.intakeSubmit = function() {
            $http.get('../after/data/engineServiceHistory.json')
                .then(
                    function(res) {
                        indexedDB.add('serviceHistory', res.data)
                            .then(function(){
                                $state.go($state.current, {}, {reload: true});
                            });
                    }
                )
        }
    });
})();