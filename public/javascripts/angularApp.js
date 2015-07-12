var siteApp = angular.module('asp', ['ngRoute', 'ASPControllers']);

siteApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider){
        $routeProvider.
        when('/', {
            templateUrl: 'partials/main.html',
            controller: 'mainCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
    }
]);