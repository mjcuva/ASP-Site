var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    image: {type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: false}
});

mongoose.model('Post', PostSchema);