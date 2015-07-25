var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Image = mongoose.model('Image');

router.get('/', function(req, res){
    Post.find(function(err, posts){
        if(err){
            res.status(500).send(err);
        }else{
            res.json(posts);
        }
    });
});

router.post('/', function(req, res){
    var title = req.body.title;
    var content = req.body.content;
    var imageUrl = req.body.imageUrl;

    if(imageUrl != null){
        Image.findOne({url:imageUrl}, function(err, image){
            if(err){
                res.status(500).send(err);
            }else if(image == null){
                res.status(404).send("Image not found");
            }else{
                var post = new Post();
                post.title = title;
                post.content = content;
                post.image = image;
                post.save(function(err){
                    if(err){
                        res.satus(500).send(err);
                    }else{
                        res.json(post);
                    }
                });
            }
        });
    }else{
        var post = new Post();
        post.title = title;
        post.content = content;
        post.save(function(err){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(post);
            }
        })
    }
});

router.delete('/', function(req, res){
    var id = req.body._id;

    Post.findOne({_id:id}, function(err, post){
        if(err){
            res.status(500).send(err);
        }else if(post == null){
            res.status(404).send(err);
        }else{
            post.remove(function(err){
                if(err){
                    res.status(500).send(err);
                }else{
                    res.send("Deleted");
                }
            });
        }
    });
});

module.exports = router;