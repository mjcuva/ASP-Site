(function(){
    'use strict';

    angular.module('ASPControllers')
        .controller('adminCtrl', ['$http', function($http){
            var vm = this;

            vm.modules = [];
            vm.pnms = [];

            $http.get('/api/modules').then(function(response){
                vm.modules = response.data;
            }, function(err){
                console.log(err);
            });

            $http.get('/api/pnms').then(function(response){
                vm.pnms = response.data;
            }, function(err){
                console.log(err);
            });


            $('#nav').removeClass('clear');
            $('#nav').addClass('red');

        }]);
})();