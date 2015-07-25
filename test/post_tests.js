var should = require('should');
var request = require('supertest');
var mongoose = require('mongoose');

var config = require('../config/config');
var app = require('../app.js');

var Post = mongoose.model('Post');
var Image = mongoose.model('Image');

describe('Posts', function(){

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
        Post.remove({}, function(){
            Image.remove({}, function(){
                done();
            });
        });
    });

    it('Should be empty', function(done){
        request(app)
        .get('/api/posts')
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.length.should.equal(0);
            done();
        });
    });

    it('Should add one post with image', function(done){
        var post = {'title':'test', 'content': 'test', 'imageUrl': 'test.com/test.jpg'};
        var image = {'name': 'test.jpg', 'url': 'test.com/test.jpg'};

        request(app)
        .post('/api/images')
        .send(image)
        .end(function(err, res){
            res.status.should.equal(200);
            request(app)
            .post('/api/posts')
            .send(post)
            .end(function(err, res){
                res.status.should.equal(200);
                res.body.title.should.equal(post.title);
                res.body.content.should.equal(post.content);
                res.body.image.name.should.equal(image.name);
                done();
            });
        });
    });

    it('Should have one post', function(done){
        request(app)
        .get('/api/posts')
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.length.should.equal(1);
            done();
        });
    });

    it('Should add one post without an image', function(done){
        var post = {'title': 'test', 'content':'test content'};

        request(app)
        .post('/api/posts')
        .send(post)
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.title.should.equal(post.title);
            res.body.content.should.equal(post.content);
            should.not.exist(res.body.image);
            done();
        });
    });

    it('Should have two posts', function(done){
        request(app)
        .get('/api/posts')
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.length.should.equal(2);
            done();
        });
    });

    it('Should delete post', function(done){
        request(app)
        .get('/api/posts')
        .end(function(err, res){
            res.status.should.equal(200);
            var id = res.body[0]._id;
            request(app)
            .delete('/api/posts')
            .send({'_id':id})
            .end(function(err, res){
                res.status.should.equal(200);
                res.text.should.equal('Deleted');
                done();
            });
        });
    });


});