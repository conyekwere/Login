(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', Controller);

    function Controller($location, AuthenticationService,$state) {
        var vm = this;

        vm.login = login;
      
        initController();

        function initController() {
            // reset login status
            AuthenticationService.Logout();
        };

        function login() {
            vm.loading = true;
            AuthenticationService.Login(vm.email, vm.password, function (result) {
                if (result === true) {
                    $state.go('dashboard');
                } else {
                    vm.error = 'Username or password is incorrect';
                    vm.loading = false;
                }
            });
        };
    }

})();