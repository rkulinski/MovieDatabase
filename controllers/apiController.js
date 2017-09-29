var Movies = require('../models/movieModel'),
    Comments = require('../models/commentModel'),
    bodyParser = require('body-parser'),
    fetch = require('node-fetch');

module.exports = app => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/api/movies', (req, res)=> {
        let movie_title = req.body.title;

        fetch(`http://www.omdbapi.com/?apikey=PlsBanMe&t=${movie_title}`)
        .then(res => res.json())
        .then(movie_obj => {
            if(!!movie_obj.Title) {
                let newMovie = Movies(movie_obj);
                
                newMovie.save(err => {
                    if (err) throw err;
                    res.send(newMovie);
                });   
            }
            else {
                res.send('Error. No such movie');      
            }
        });
    });

    app.get('/api/movies', (req, res) => {
        Movies.find({}, 'Title', (err, movies) => {
            if(err) throw err;
            res.send(movies);
        });
    });

    app.post('/api/comments', (req, res) => {
        Movies.findById(req.body.movie_id, (err, found) => {
            if(!!found) {
                if(req.body.movie_id) {
                    let newComment = Comments({
                        MovieID: req.body.movie_id,
                        Comment: req.body.comment     
                    });
                    
                    newComment.save(err => {
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

    app.get('/api/comments', (req, res) => {
        if(!!req.query.movie_id) {
            Comments.find({ MovieID: req.query.movie_id }, (err, comments) => {
                if(err) throw err;
                res.send(comments);
            });
        }
        else {
            Comments.find((err, comments) => {
                if(err) throw err;
                res.send(comments);
            });
        }
    });
}