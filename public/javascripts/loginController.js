(function(){
    'use strict';

    angular.module('ASPControllers')
        .controller('loginCtrl', ['$http', '$cookies', '$location', function($http, $cookies, $location){
            var vm = this;

            vm.error = "";

            vm.login = function(){

                var email = vm.email;
                var pass = vm.pass;

                $http.post('/api/login', {email: email, pass: pass})
                    .then(function(hash){
                        $cookies.put('u', hash.data);
                        window.location.pathname = '/';
                    }, function(err){
                        vm.error = err.data;                        
                    });
            };

        }]);
})();