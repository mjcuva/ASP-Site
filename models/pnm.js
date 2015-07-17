var mongoose = require('mongoose');

var PNMSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    yearInSchool: {type: String, required: true}
});

mongoose.model('Module', PNMSchema);