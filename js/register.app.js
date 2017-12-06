(function(){
    'use strict';
    
    var app = angular.module('cumminsFinalProject'); //array has dependency; this create a module called app
                                        //angular.module('app'); will look up a module called app

    app.controller('registerCtrl', function(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    });
})();

