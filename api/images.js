var express = require('express');
var router = express.Router();
var aws = require('aws-sdk');

var mongoose = require('mongoose');
var Image = mongoose.model('Image');

if(process.env.ENV != 'PROD'){
    require('../config/auth.js');
}

// Return image from name
router.get('/', function(req, res, next){
    var image_name = req.query.image_name;
    if(image_name == null){
        res.send("Missing image name.");
    }else{
        Image.findOne({name: image_name}, "name url", function(err, image){
            res.json({'name': image.name, 'url':image.url});
        });
    }
});

router.post('/', function(req, res, next){
    var image = req.body;
    if(image.url == null){
        res.send('Missing image url');
    }else if(image.name == null){
        res.send('Missing image name');
    }else{
        Image.find({name: image.name}, function(err, images){
            if(err){
                res.send(err);
            }else if(images.length > 0){
                var parts = image.name.split('.');
                parts[0] += images.length;
                image.name = parts[0] + '.' + parts[1];
            }

            var i = new Image();
            i.url = image.url;
            i.name = image.name;
            i.save(function(err){
                if(err){
                    res.send(err);
                }else{
                    res.send(i);
                }
            });
        });
    }
});

// Used to create url to save image to aws
// /sign_s3?file_name=name&file_type=type
router.get('/sign_s3', function(req, res, next){
    var file_name = req.query.file_name;
    var file_type = req.query.file_type;
    if(!file_name || !file_type){
        res.send('Missing image information')
    }else{
        aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
        var s3 = new aws.S3();
        var s3_params = {
            Bucket: S3_BUCKET,
            Key: file_name,
            Expires: 60,
            ContentType: file_type,
            ACL: 'public-read'
        };
        s3.getSignedUrl('putObject', s3_params, function(err, data){
            if(err){
                console.log(err);
            }
            else{
                var return_data = {
                    signed_request: data,
                    url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+file_name
                };
                res.write(JSON.stringify(return_data));
                res.end();
            }
        });
    }
});

module.exports = router;