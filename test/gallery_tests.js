var should = require('should');
var request = require('supertest');
var mongoose = require('mongoose');

var config = require('../config/config');
var app = require('../app.js');

var Gallery = mongoose.model('Gallery');
var Image = mongoose.model('Image');

describe('Galleries', function(){

    before(function(done){
        mongoose.disconnect(function(err){
            mongoose.connect(config.MONGO_TEST, function(err){
                if(err){
                    console.log(err);
                    done();
                }else{
                    console.log("Connected to TESTDB");
                    done();
                }
            });
        });
    });

    after(function(done){
        Gallery.remove({}, function(){
            Image.remove({}, function(){
                done();
            });
        });
    });

    it("Should be empty", function(done){
        request(app)
        .get('/api/galleries')
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.length.should.equal(0);
            done();
        });
    });

    it("Should add one empty gallery", function(done){
        var gallery = {"name": "test"};

        request(app)
        .post('/api/galleries')
        .send(gallery)
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.name.should.equal(gallery.name);
            res.body.images.length.should.equal(0);
            done();
        });
    });

    it("Should add one image", function(done){
        var gallery = {"galleryName": "test", 'imageUrl':'test.com/test.jpg'};
        var image = {'name': 'test.jpg', 'url': 'test.com/test.jpg'};
        request(app)
        .post('/api/images')
        .send(image)
        .end(function(err, res){
            res.status.should.equal(200);
            request(app)
            .post('/api/galleries/addimage')
            .send(gallery)
            .end(function(err, res){
                res.status.should.equal(200);
                res.body.images.length.should.equal(1);
                done();
            });
        });
    });

    it('Should delete one image', function(done){
        var imageName = 'test.jpg';
        request(app)
        .get('/api/images/?image_name='+imageName)
        .end(function(err, res){
            var image = res.body;
            var data = {'imageID': image._id, 'galleryName': 'test'};
            request(app)
            .delete('/api/galleries/image')
            .send(data)
            .end(function(err, res){
                res.status.should.equal(200);
                res.text.should.equal('Deleted');
                done();
            });
        });
    });

});