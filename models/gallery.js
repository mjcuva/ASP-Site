var mongoose = require('mongoose');

var GallerySchema = new mongoose.Schema({
    title: {type: String, required: true},
    images: [{type: Schema.Types.ObjectId, ref: 'Image'}]
});

mongoose.model('Module', GallerySchema);