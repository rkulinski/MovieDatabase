var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema({
	MovieID: String,
	Comment: String
});

var Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;