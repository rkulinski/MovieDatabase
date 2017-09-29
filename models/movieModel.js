var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var movieSchema = new Schema({
	Title: String,
	Year: String,
	Rated: String,
	Released: String,
	Runtime: String,
	Genre: String,
	Director: String,
	Writer: String,
	Actors: String,
	Plot: String,
	Language: String,
    Country: String,
    Awards: String,
	Poster: String,
	Ratings:Array,
	Metascore: String, 
	imdbRating: String,
	imdbVotes: String,
	imdbID: String,
	Type: String,
	DVD: String,
	BoxOffice: String,
	Production: String,
	Website: String,
	Response: Boolean
});

var Movies = mongoose.model('Movies', movieSchema);

module.exports = Movies;