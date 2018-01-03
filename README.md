# MovieDatabase

Endpoints:

POST /api/movies - creates a movie in database
body
{
	title: String
}

GET /api/movies - get all movies from database

POST /api/comments - add comment
body
{
	movie_id: String,
	comment: String	
}

GET /api/comments - displays all comments
	/api/comments?movie_id=[movie id] - displays comments on selected movie
