var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Module = mongoose.model('Module');

router.get('/', function(req, res, next){
    Module.find(function(err, modules){
        if(err){
            res.send(err);
        }else{
            res.json(modules);
        }
    });
});

// TODO: Post

module.exports = router;