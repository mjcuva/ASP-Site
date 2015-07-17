var mongoose = require('mongoose');

var ModuleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    image: {type: Schema.Types.ObjectId, ref: 'Image', required: true}
});

mongoose.model('Module', ModuleSchema);