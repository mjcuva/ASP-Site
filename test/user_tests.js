var should = require('should');
var request = require('supertest');
var mongoose = require('mongoose');

var config = require('../config/config');
var app = require('../app.js');

var User = mongoose.model('User');

describe('Users', function(){
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
        User.remove({}, function(){
            done();
        });
    });

    it("Should be empty", function(done){
        request(app)
        .get('/api/users')
        .expect(200)
        .end(function(err, res){
            res.body.length.should.equal(0);
            done();
        });
    });

    it("Should create one user without password", function(done){
        var user = {"email": "test@test.com", "admin": false, "name": "Test"};
        request(app)
        .post('/api/users')
        .send(user)
        .expect(307)
        .end(function(err, res){
            request(app)
            .get('/api/users')
            .expect(200)
            .end(function(err, res){
                res.body.length.should.equal(1);
                res.body[0].pwset.should.equal(false);
                done();
            });
        });
    });

    it("Should set password", function(done){
        request(app)
        .get('/api/users')
        .expect(200)
        .end(function(err, res){
            var user = res.body[0];
            user.pw_hash = "test";
            request(app)
            .post('/api/users/setpwd')
            .send(user)
            .expect(302)
            .end(function(err, res){
                request(app)
                .get('/api/users')
                .expect(200)
                .end(function(err, res){
                    user = res.body[0];
                    user.pwset.should.equal(true);
                    done();
                });
            });
        });
    });
});