(function(){
    'use strict';

    angular.module('ASPControllers')
        .controller('logoutCtrl', ['$http', '$cookies', '$location', '$route', function($http, $cookies, $location, $route){
            var vm = this;

            $cookies.remove('u');
            window.location.pathname = '/';

        }]);
})();