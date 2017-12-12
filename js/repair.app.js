(function() {
    var app = angular.module('cumminsFinalProject');
    
    app.controller('repairCtrl', function($scope, $modal, $log, $state) {
        $scope.currentIndex = 0;
        
        $scope.previousStep = function() {
            $scope.currentIndex -= 1;
        }
        
        $scope.nextStep = function() {
            if ($scope.currentIndex >= $scope.jobPlan.steps.length - 1) {
                $state.go('invoice');
            }
            else {
                $scope.currentIndex += 1;    
            }
        }
        
        $scope.jobPlan = {
            "jobPlanID": 3,
            "summary": "Adjust engine power followed by stabalize oil pressure",
            "steps": [
                {
                    "stepID": 6,
                    "title": "Mixture too Rich or too Lean",
                    "description": "Check the fuel mixture and ensure a normal consistency."
                },
                {
                    "stepID": 7,
                    "title": "Leaks in Induction System",
                    "description": "Check for leaks in the induction system and patch as necessary."
                },
                {
                    "stepID": 8,
                    "title": "Defective Spark Plugs",
                    "description": "Oil temperature should remain around 160 degrees F."
                }
            ],
            "confidenceScore": ".958"
        }

        $scope.showForm = function(formType) {
            var message;
            
            switch(formType) {
                case 'skip':        
                    message = "Are you sure you want to skip this step?";
                    break;
                case 'continue':
                    message = "Are you sure you want to complete this step?";
                    break;
                case 'complete':
                    message = "Are you sure you want to complete this plan?";
                    break;
            }

            var modalInstance = $modal.open({
                templateUrl: 'views/confirm-step-modal.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                resolve: {
                    message: function () {
                        return message;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.nextStep();
            }, 
            function () {
                
            });
        };

        var ModalInstanceCtrl = function ($scope, $modalInstance, message) {
            $scope.message = message;
            $scope.continue = function () {
                $modalInstance.close('close');
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
    });
    
})();