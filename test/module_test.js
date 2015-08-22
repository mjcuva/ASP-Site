var should = require('should');
var request = require('supertest');
var mongoose = require('mongoose');

var config = require('../config/config');
var app = require('../app.js');

var Module = mongoose.model('Module');
var Image = mongoose.model('Image');

describe('Modules', function(){

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
        Module.remove({}, function(){
            Image.remove({}, function(){
                done();
            });
        });
    });

    it('Should be empty', function(done){
        request(app)
        .get('/api/modules')
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.length.should.equal(0);
            done();
        });
    });

    it('Should add one module', function(done){
        var module = {'title':'test', 'content': 'test', 'imageUrl': 'test.com/test.jpg'};
        var image = {'name': 'test.jpg', 'url': 'test.com/test.jpg'};

        request(app)
        .post('/api/images')
        .send(image)
        .end(function(err, res){
            res.status.should.equal(200);
            request(app)
            .post('/api/modules')
            .send(module)
            .end(function(err, res){
                res.status.should.equal(200);
                res.body.title.should.equal(module.title);
                res.body.content.should.equal(module.content);
                res.body.image.name.should.equal(image.name);
                done();
            });
        });
    });

    it('Should have one module', function(done){
        request(app)
        .get('/api/modules')
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.length.should.equal(1);
            done();
        });
    });

    it('Should get one module', function(done){
        request(app)
        .get('/api/modules/module?title=test')
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.title.should.equal('test');
            done();
        });
    });

    it('Should delete module', function(done){
        request(app)
        .get('/api/modules')
        .end(function(err, res){
            res.status.should.equal(200);
            var id = res.body[0]._id;
            request(app)
            .delete('/api/modules')
            .send({'_id':id})
            .end(function(err, res){
                res.status.should.equal(200);
                res.text.should.equal('Deleted');
                done();
            });
        });
    });


});