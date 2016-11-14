(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngMessages', 'ngStorage', 'ngMockE2E,ui.bootstrap'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
           $urlRouterProvider.otherwise('/account-enter/login');
    
    $stateProvider
    
        
        .state('account-enter', {
                url: '/account-enter',
                templateUrl: 'account-enter.view.html',
         abstract: true
                
              
            })
            
            .state('dashboard', {
                url: '/',
                 controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })
            
             .state('account-enter.login', {
                url: '/login',
                  controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })
            
             .state('account-enter.signup', {
                url: '/register',
                 controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            });

    }

    function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/account-enter/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/account-enter/login');
            }
        });
    }
})();
