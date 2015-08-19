(function(){
    'use strict';

    angular.module('ASPControllers')
        .controller('adminCtrl', ['$http', function($http){
            var vm = this;

            vm.modules = [];
            vm.pnms = [];
            vm.galleries = [];

            vm.addGallery = function(){
                var name = window.prompt("Enter Gallery Name: ", "Name");
                if(name !== null){
                    $http.post('/api/galleries', {name: name}).then(function(response){
                        var _id = response.data._id;
                        window.location.href = '/admin/gallery?_id=' + _id;
                    });
                }
            };

            vm.deleteGallery = function(id){
                console.log(id);
                $http.delete('/api/galleries', {params: {'galleryID': id}}).then(function(response){
                    if(response.data === 'Deleted'){
                        vm.galleries = vm.galleries.filter(function(gallery){
                            return gallery._id != id;
                        });
                    }
                });
            };

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

            $http.get('/api/galleries').then(function(response){
                vm.galleries = response.data;
            });

            fixNav();
            

        }]);

        angular.module('ASPControllers')
            .controller('galleryAdminCtrl', ['$routeParams', '$http', function($routeParams, $http){
                var vm = this;

                vm.gallery = undefined;

                vm.save = function(){

                };

                vm.addImages = function(){

                };

                var _id = $routeParams._id;

                $http.get('/api/galleries/gallery?_id=' + _id).then(function(response){
                    vm.gallery = response.data;
                });

                fixNav();


            }]);
})();

function fixNav(){
    $('#nav').removeClass('clear');
    $('#nav').addClass('red');
}