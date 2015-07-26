var mongoose = require('mongoose');

var GallerySchema = new mongoose.Schema({
    name: {type: String, required: true},
    images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: false}]
});

mongoose.model('Gallery', GallerySchema);