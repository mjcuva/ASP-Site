(function(){
	'use strict';

	angular.module('ASPControllers')
		.controller('homeCtrl', ['$http', function($http){
			var vm = this;

            vm.modules = undefined;

            vm.addPNM = function(){
                var name = vm.PNMName;
                var email = vm.PNMEmail;

                $http.post('/api/pnms', {name: name, email: email})
                    .then(function(response){
                        console.log(response);
                    }, function(err){
                        console.log(err);
                    });
            };

            $http.get('/api/modules').then(function(response){
                vm.modules = response.data;
                console.log(vm.modules);
            });


            $('#nav').removeClass('red');
            $('#nav').addClass('clear');

		}]);
})();