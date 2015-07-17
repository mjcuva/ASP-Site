var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

router.post('/', function(req, res, next){
    var user = req.body;
    User.findOne({email:user.email}, function(err, u){
        if(u === null){
            res.redirect(307, "/api/sendemail");
        }else{
            u.name = user.name;
            u.admin = user.admin;
            u.save(function(err){
                if(err){
                    res.send(err);
                }else{
                    res.send("Updated.");
                }
            });
        }
    })
});

router.get('/', function(req, res, next){
    User.find({}, 'email name admin', function(err, users){
        if(err){
            res.send(err);
        }else{
            res.json(users);
        }
    });

});

module.exports = router;