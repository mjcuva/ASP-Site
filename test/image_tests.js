var should = require('should');
var request = require('supertest');
var mongoose = require('mongoose');

var config = require('../config/config');
var app = require('../app.js');

var Image = mongoose.model('Image');

describe('Images', function(){

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
        Image.remove({}, function(){
            done();
        });
    });

    it("Should add one Image", function(done){
        var image = {name: "test.jpg", url: "http://test.com/image.jpg"};

        request(app)
        .post('/api/images')
        .send(image)
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.name.should.equal("test.jpg");
            res.body.url.should.equal("http://test.com/image.jpg");
            done();
        });
    });

    it("Should have image", function(done){
        var image_name = "test.jpg";
        request(app)
        .get('/api/images?image_name='+image_name)
        .end(function(err,res){
            res.statusCode.should.equal(200);
            res.body.name.should.equal('test.jpg');
            res.body.url.should.equal('http://test.com/image.jpg');
            done();
        });
    });

    it("Should rename image of same name", function(done){
        var image = {name: "test.jpg", url: "http://test.com/image2.jpg"};
        request(app)
        .post('/api/images')
        .send(image)
        .end(function(err, res){
            res.statusCode.should.equal(200);
            res.body.name.should.equal('test1.jpg');
            res.body.url.should.equal('http://test.com/image2.jpg');
            done();
        });
    });

    it("Should allow names with spaces", function(done){
        var image = {name: "this is a test.jpg", url:"http://test.com/image3.jpg"};
        request(app)
        .post('/api/images')
        .send(image)
        .end(function(err, res){
            res.statusCode.should.equal(200);
            res.body.name.should.equal('this is a test.jpg');
            done();
        });
    });

    it("Should create url for image to be posted", function(done){
        var image = {name: "test.jpg", type:'jpg'};
        request(app)
        .get('/api/images/sign_s3?file_name=' + image.name + '&file_type=' + image.type)
        .end(function(err, res){
            var jsonResult = JSON.parse(res.text);
            res.statusCode.should.equal(200);
            jsonResult['url'].should.equal('https://umnasp-site.s3.amazonaws.com/test.jpg');
            should.exist(jsonResult['signed_request']);
            done();
        });
    });
});