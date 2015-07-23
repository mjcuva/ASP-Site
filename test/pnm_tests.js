var should = require('should');
var request = require('supertest');
var mongoose = require('mongoose');

var config = require('../config/config');
var app = require('../app.js');

var PNM = mongoose.model('PNM');

describe('PNMS', function(){

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
        PNM.remove({}, function(){
            done();
        });
    });

    it("Should be empty", function(done){
        request(app)
        .get('/api/PNMS')
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.length.should.equal(0);
            done();
        });
    });

    it("Should add one PNM", function(done){
        var pnm = {name: "marc", email: "mjcuva@gmail.com", yearInSchool: "Freshman"};

        request(app)
        .post('/api/pnms')
        .send(pnm)
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.name.should.equal("marc");
            res.body.email.should.equal("mjcuva@gmail.com");
            res.body.yearInSchool.should.equal("Freshman");
            done();
        });
    });

    it("Should have one pnm", function(done){
        request(app)
        .get('/api/pnms')
        .expect(200)
        .end(function(err,res){
            res.body.length.should.equal(1);
            done();
        });
    });

    it("Should add one PNM without year in school", function(done){
        var pnm = {name: "marc", email: "mjcuva@gmail.com"};

        request(app)
        .post('/api/pnms')
        .send(pnm)
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.name.should.equal("marc");
            res.body.email.should.equal("mjcuva@gmail.com");
            should.not.exist(res.body.yearInSchool);
            done();
        });
    });

    it("Should have two pnms", function(done){
        request(app)
        .get('/api/pnms')
        .expect(200)
        .end(function(err,res){
            res.body.length.should.equal(2);
            done();
        });
    });

    it("Should delete one pnm", function(done){
        request(app)
        .get('/api/pnms')
        .expect(200)
        .end(function(err, res){
            request(app)
            .delete('/api/pnms')
            .send({'id':res.body[0]._id})
            .expect(200)
            .end(function(err, res){
                res.text.should.equal('Deleted');
                request(app)
                .get('/api/pnms')
                .expect(200)
                .end(function(err, res){
                    res.body.length.should.equal(1);
                    done();
                });
            });
        });
    });
});