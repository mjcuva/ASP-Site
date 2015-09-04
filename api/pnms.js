var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var PNM = mongoose.model('PNM');

router.get('/', function(req, res, next){
    PNM.find(function(err, pnms){
        if(err){
            res.send(err);
        }else{
            var response = [];
            for(var i in pnms){
                response.push({name: pnms[i].name, email: pnms[i].email});
            }
            res.json(response);
        }
    });
});

router.post('/', function(req, res, next){
    var pnm = req.body;
    if(pnm.email == ""){
        res.send("Must supply email address");
    }else if(pnm.name == ""){
        res.send("Must supply name");
    }else{
        var newPNM = new PNM();
        newPNM.name = pnm.name;
        newPNM.email = pnm.email;
        newPNM.yearInSchool = pnm.yearInSchool;
        newPNM.save(function(err){
            if(err){
                res.send(err);
            }else{
                res.send(pnm);
            }
        });
    }
});

router.delete('/', function(req, res, next){
    var email = req.query.email;
    PNM.findOne({email:email}, function(err, pnm){
        if(err){
            res.send(err);
        }else if(pnm == null){
            res.status(404).send("Pnm not found");
        }else{
            pnm.remove(function(){
                res.send("Deleted");
            });
        }
    });
});

module.exports = router;