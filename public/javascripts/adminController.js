(function(){
    'use strict';

    angular.module('ASPControllers')
    .controller('adminCtrl', ['$http', function($http){
        var vm = this;

        vm.modules = [];
        vm.pnms = [];
        vm.galleries = [];

        vm.addModule = function(){
            var name = window.prompt("Enter Module Name: ");
            if(name !== null){
                window.location.href = '/admin/module?title=' + name;
            }
        };

        vm.addGallery = function(){
            var name = window.prompt("Enter Gallery Name: ", "Name");
            if(name !== null){
                $http.post('/api/galleries', {name: name}).then(function(response){
                    var _id = response.data._id;
                    window.location.href = '/admin/gallery?_id=' + _id;
                });
            }
        };

        vm.deleteModule = function(id){
            $http.delete('/api/modules', {params: {'_id': id}}).then(function(response){
                if(response.data == 'Deleted'){
                    vm.modules = vm.modules.filter(function(module){
                        return module._id != id;
                    });
                }
            });
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

        vm.addImages = function($files, $event, $flow){

            for(var i in $files){
                addImage($files[i]);
            }
        };

        var addImage = function(file){
            $http.get('/api/images/sign_s3?file_name=' + file.name + '&file_type=image/jpeg').then(function(response){
                var url = respones.data.url;
                upload_file(file.file, response.data.signed_request, function(response){
                    $http.post('/api/images/', {name: file.name, url: url}).then(function(response){
                        $http.post('/api/galleries/addimage', {imageUrl: url, galleryName: vm.gallery.name}).then(function(response){
                            console.log(response);
                        });
                    });
                });
            });
        }

        var _id = $routeParams._id;

        $http.get('/api/galleries/gallery?_id=' + _id).then(function(response){
            vm.gallery = response.data;
        });

        fixNav();

    }]);

    angular.module('ASPControllers')
    .controller('moduleAdminCtrl', ['$routeParams', '$http', '$scope', '$timeout', function($routeParams, $http, $scope, $timeout){
        var vm = this;

        vm.module = undefined;

        vm.error = "";

        vm.save = function(){
            if(vm.module.title === ""){
                vm.error = "Must have title";
            }else if(vm.module.content === ""){
                vm.error = "Must have content";
            }else if(vm.module.image === ""){
                vm.error = "Must have image";
            }else{
                $http.post('/api/modules', {title: vm.module.title, content: vm.module.content, imageUrl: vm.module.image}).then(function(response){
                    console.log(response.data);
                });
            }
        };

        vm.addImage = function($files, $event, $flow){
            if($files.length > 1){
                vm.error = "Only one image allowed";
            }else{
                var file = $files[0];   
                $http.get('/api/images/sign_s3?file_name=' + file.name + '&file_type=image/jpeg').then(function(response){
                    var url = response.data.url;
                    upload_file(file.file, response.data.signed_request, function(response){
                        $http.post('/api/images/', {name: file.name, url: url}).then(function(response){
                            console.log('here')
                            $timeout(function(){
                                vm.module.image = url;
                            });
                        });
                    });
                });
            }
        };

        var title = $routeParams.title;

        $http.get('/api/modules/module?title=' + title).then(function(response){
            if(response.data.length === 0){
                vm.module = {title: title, content: "", image: "//:0"};
            }else{
                vm.module = response.data;
                vm.module.image = response.data.image.url;
            }
        });

        fixNav();
    }]);


})();

function fixNav(){
    $('#nav').removeClass('clear');
    $('#nav').addClass('red');
}

function upload_file(file, signed_request, cb){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", signed_request);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.onload = function(response) {
        if (xhr.status === 200) {
            cb(response);
        }
    };
    xhr.onerror = function() {
        console.log("Could not upload file.");
    };
    xhr.send(file);
}