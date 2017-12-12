(function() {

    var app = angular.module('cumminsFinalProject');
    app.controller('jobPlanCtrl', function($scope, jobPlans) {
        $scope.jobPlans = jobPlans;
        $scope.recommended = $scope.jobPlans.reduce(function(prev, cur) {
                return (prev.confidenceScore > cur.confidenceScore) ? prev : cur;
            }
        );
        
        $scope.other = $scope.jobPlans.filter(
            function(p) {
                return p.jobPlanID != $scope.recommended.jobPlanID;
            }
        );
        
        $scope.stepArray = [{stepID: 1, description: "Check battery"}, {stepID: 2, description: "Check fuel gauge"}];
        $scope.jobPlans = [
            {jobPlanID: 1, steps: $scope.stepArray},
            {jobPlanID: 2, steps: $scope.stepArray}
        ];
        
        $scope.jpIndex = -1;
        
        $scope.toggleIndex = function(i) {
            if (i === $scope.jpIndex) {
                $scope.jpIndex = -1;
            }
            else {
                $scope.jpIndex = i;   
            }
        }
    });
})();