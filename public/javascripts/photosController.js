(function(){
    'use strict';

    angular.module('ASPControllers')
        .controller('photosCtrl', ['$http', function($http){
            var vm = this;

            vm.galleries = undefined;

            $http.get('/api/galleries').then(function(response){
                vm.galleries = response.data;
            });

            $('#nav').removeClass('clear');
            $('#nav').addClass('red');

        }]);

})();