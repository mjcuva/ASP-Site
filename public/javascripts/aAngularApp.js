angular
    .module('ASPControllers', []);

angular
    .module('asp', ['ngRoute', 'ngCookies', 'ASPControllers'])
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
        when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl',
            controllerAs: 'login'
        }).
        when('/logout', {
            templateUrl: 'partials/home.html',
            controller: 'logoutCtrl',
            controllerAs: 'logout'
        }).
        when('/admin', {
            templateUrl: 'partials/admin.html',
            controller: 'adminCtrl',
            controllerAs: 'admin'
        }).
        when('/admin/gallery', {
            templateUrl: 'partials/galleryAdmin.html',
            controller: 'galleryAdminCtrl',
            controllerAs: 'galleryAdmin'
        }).
        otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
    }
    ]);