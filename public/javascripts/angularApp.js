(function(){
    'use strict';

angular.module('asp', ['ngRoute', 'ASPControllers'])
    .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider){
        $routeProvider.
        when('/', {
            templateUrl: 'partials/home.html',
            controller: 'homeCtrl',
            controllerAs: 'home'
        }).
        when('/', {
            templateUrl: 'partials/about.html',
            controller: 'aboutCtrl',
            controllerAs: 'about'
        }).
        when('/', {
            templateUrl: 'partials/officers.html',
            controller: 'officersCtrl',
            controllerAs: 'officers'
        }).
        when('/', {
            templateUrl: 'partials/recruitment.html',
            controller: 'recruitmentCtrl',
            controllerAs: 'recruitment'
        }).
        otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
    }
    ])
    .module('ASPControllers', []);

}());