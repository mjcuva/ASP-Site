var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Module = mongoose.model('Module');
var Image = mongoose.model('Image');

router.get('/', function(req, res){
    Module.find(function(err, modules){
        if(err){
            res.status(500).send(err);
        }else{
            res.json(modules);
        }
    });
});

router.get('/module', function(req, res){
    var title = req.query.title;
    Module.findOne({title: title}).populate('image').exec(function(err, module){
        if(err){
            res.status(500).send(err);
        }else if(module == undefined){
            res.json([]);
        }else{
            res.json(module);
        }
    });
});

router.post('/', function(req, res){
    var title = req.body.title;
    var content = req.body.content;
    var image_url = req.body.imageUrl;

    Image.findOne({url:image_url}, function(err, image){
        if(err){
            res.status(500).send(err);
        }else if(image == null){
            res.status(404).send("Image not found.");
        }else{
            var module = new Module();
            module.title = title;
            module.content = content;
            module.image = image;
            module.save();
            res.send(module);
        }
    }); 
});


router.delete('/', function(req, res){
    var id = req.body._id;
    Module.findOne({_id:id}, function(err, module){
        if(err){
            res.status(500).send(err);
        }else if(module == null){
            res.status(404).send('Module not found');
        }else{
            module.remove(function(){
                res.send("Deleted");
            });
        }
    });
});

module.exports = router;