var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
    name: {type: String, required: true},
    url: {type: String, required: true}
});

mongoose.model('Image', ImageSchema);