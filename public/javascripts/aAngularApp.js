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
        when('/brothers', {
            templateUrl: 'partials/brothers.html',
            controller: 'brothersCtrl',
            controllerAs: 'brothers'
        }).
        when('/photos', {
            templateUrl: 'partials/photos.html',
            controller: 'photosCtrl',
            controllerAs: 'photos'
        }).
        when('/news', {
            templateUrl: 'partials/news.html',
            controller: 'newsCtrl',
            controllerAs: 'news'
        }).
        otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
    }
    ]);