var mongoose = require('mongoose');

var ModuleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    image: {type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: false}
});

mongoose.model('Module', ModuleSchema);