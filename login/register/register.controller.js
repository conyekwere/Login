(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$state','$scope'];
    function RegisterController($state,$scope) {
        var vm = this;

        vm.register = register;

        function register() {
           
             $state.go('dashboard');
        }
    }

})();
