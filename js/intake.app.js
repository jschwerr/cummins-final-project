(function(){
    'use strict';
    
    var app = angular.module('cumminsFinalProject'); //array has dependency; this create a module called app
                                        //angular.module('app'); will look up a module called app

    app.controller('intakeCtrl', function($scope, $location, $state, indexedDB, hasServiceEvent){
        $scope.hasServiceEvent = hasServiceEvent;
        $scope.intakeSubmit = function() {
            indexedDB.add('serviceEvent',{'engineCode': 1, 'faultCode': 2, 'date': "2017-10-08"})
                .then(function(){
                    $state.go($state.current, {}, {reload: true});
                });
        }
    });
})();