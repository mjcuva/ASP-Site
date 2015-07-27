angular
    .module('ASPControllers', []);

angular
    .module('asp', ['ngRoute', 'ASPControllers'])
    .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider){
        $routeProvider.
        when('/', {
            templateUrl: 'partials/home.html',
            controller: 'homeCtrl',
            controllerAs: 'home'
        }).
        when('/about', {
            templateUrl: 'partials/about.html',
            controller: 'aboutCtrl',
            controllerAs: 'about'
        }).
        when('/officers', {
            templateUrl: 'partials/officers.html',
            controller: 'officersCtrl',
            controllerAs: 'officers'
        }).
        when('/recruitment', {
            templateUrl: 'partials/recruitment.html',
            controller: 'recruitmentCtrl',
            controllerAs: 'recruitment'
        }).
        otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
    }
    ]);