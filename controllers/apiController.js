var Movies = require('../models/movieModel');
var Comments = require('../models/commentModel');
var bodyParser = require('body-parser');
var fetch = require('node-fetch');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/api/movies', function(req, res) {

        let movie_title = req.body.title;

        fetch(`http://www.omdbapi.com/?apikey=PlsBanMe&t=${movie_title}`)
        .then(function(res) {
            return res.json();
        }).then(function(movie_obj) {
            console.log(movie_obj);
            if(movie_obj.Title) {
                let newMovie = Movies(movie_obj);
                
                newMovie.save(function(err) {
                    if (err) throw err;
                    res.send(newMovie);
                });   
            }
            else {
                res.send('Error. No such movie');      
            }
        });
    });

    app.get('/api/movies', function(req, res) {

        Movies.find({}, 'Title', function(err, movies) {
            if(err) throw err;
            res.send(movies);
        });

    });

    app.post('/api/comments', function(req, res) {

        Movies.findById(req.body.movie_id, function (err, found) {
            if(found) {
                if(req.body.movie_id) {
                    let newComment = Comments({
                        MovieID: req.body.movie_id,
                        Comment: req.body.comment     
                    });
                    
                    newComment.save(function(err) {
                        if(err) throw err;
                        res.send(newComment);
                    });   
                }
                else {
                    res.send("Error. No such Id in database ");
                }
            }
            else {
                res.send("Error. There's no movie with that id");
            }  
        });

    });

    app.get('/api/comments', function(req, res) {
        console.log(req.query.movie_id);
        if(req.query.movie_id) {
            
            Comments.find({ MovieID: req.query.movie_id }, function(err, comments) {
                if(err) throw err;
                res.send(comments);
            });

        }
        else {

            Comments.find(function(err, comments) {
                if(err) throw err;
                res.send(comments);
            });
    
        }
    });
}