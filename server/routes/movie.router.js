let express = require('express');
let router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
   
        let queryText = 'SELECT * FROM movies ORDER BY id ASC;'  
        pool.query(queryText).then( (result) => {
          
          res.send(result.rows);
        }).catch( (error) => {
          console.log('error on insert', error)
        });
          
      });

      router.post('/', (req, res) => {
        let movie = req.body;
        const queryText = 'INSERT INTO movies (title, genre, date, rating, url, overview) VALUES ($1, $2, $3, $4, $5, $6);'
        pool.query(queryText, [movie.title, movie.genre, movie.date, movie.rating, movie.url, movie.overview])
        .then( (response) => {
          
          res.sendStatus(201 );
        }).catch( (error) => {
          console.log('error on insert', error)
        });
      });
    
      router.delete('/:id', (req, res) => {
        let movieId = req.params.id;
        console.log('delete', movieId)
        const queryText = 'DELETE FROM movies WHERE id = $1;'
        pool.query(queryText, [movieId])
        .then( (response) => {
          console.log(response);
          res.sendStatus(201);
        }).catch( (error) => {
          console.log('error on insert', error)
        });
      });

module.exports = router