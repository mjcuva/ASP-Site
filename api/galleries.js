var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Gallery = mongoose.model('Gallery');
var Image = mongoose.model('Image');

router.get('/', function(req, res){
    Gallery.find(function(err, galleries){
        if(err){
            res.status(500).send(err);
        }else{
            res.json(galleries);
        }
    });
});

// /gallery?id=_id
router.get('/gallery', function(req, res){
    var id = req.query._id;
    if(id == null){
        res.status(400).send('Missing gallery id');
    }else{
        Gallery.findOne({_id:id}, function(err, gallery){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(gallery);
            }
        });
    }
});

// Add empty gallery with name
router.post('/', function(req, res){
    var name = req.body.name;
    if(name == null){
        res.status(400).send("Missing gallery name");
    }else{
        var gallery = new Gallery();
        gallery.name = name;
        gallery.save(function(err){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(gallery);
            }
        });
    }
});

// TODO: Revisit once image upload is working
// Add single image to gallery
router.post('/addimage', function(req, res){
    var imageUrl = req.body.imageUrl;
    var galleryName = req.body.galleryName;
    if(imageUrl == null){
        res.status(400).send("Missing image");
    }else if(galleryName == null){
        res.status(400).send("Missing gallery");
    }else{
        Image.findOne({url: imageUrl}, function(err, image){
            if(err){
                res.status(500).send(err);
            }else if(image == null){
                res.status(404).send("Image not found");
            }else{
                Gallery.findOne({name:galleryName}, function(err, gallery){
                    if(err){
                        res.status(500).send(err);
                    }else if(gallery == null){
                        res.status(404).send("Gallery not found");
                    }else if(gallery.images == null){
                        gallery.images = [image];
                        gallery.save(function(err){
                            if(err){
                                res.status(500).send(err);
                            }else{
                                res.json(gallery);
                            }
                        })
                    }else{
                        gallery.images.push(image);
                        gallery.save(function(err){
                            if(err){
                                res.status(500).send(err);
                            }else{
                                res.json(gallery);
                            }
                        });
                    }
                });
            }
        });
    }
});

// Delete gallery
router.delete('/', function(req, res){
    var galleryID = req.body.galleryID;
    if(galleryID == null){
        res.status(400).send("Missing gallery id");
    }else{
        Gallery.findOne({_id:galleryID}, function(err, gallery){
            if(err){
                res.status(500).send(err);
            }else if(gallery == null){
                res.status(404).send("Gallery not found");
            }else{
                gallery.remove(function(err){
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.send("Deleted");
                    }
                });
            }
        });
    }
});

// Delete image from gallery
router.delete('/image', function(req, res){
    var galleryName = req.body.galleryName;
    var imageID = req.body.imageID;
    if(galleryName == null){
        res.status(400).send("Missing gallery id");
    }else{
        Gallery.findOne({name:galleryName}, function(err, gallery){
            if(err){
                res.status(500).send(err);
            }else if(gallery == null){
                res.status(404).send("Gallery not found");
            }else{
                var newImages = [];
                for(var i = 0; i < gallery.images.length; i++){
                    if(gallery.images[i] != imageID){
                        newImages.push(gallery.images[i]);
                    }
                }

                gallery.images = newImages;
                gallery.save(function(err){
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.send("Deleted");
                    }
                });
            }
        });
    }
});

module.exports = router;