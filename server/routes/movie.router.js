let express = require('express');
let router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    console.log('connected to db')
        let queryText = 'SELECT * FROM movies ORDER BY id ASC;'  
        pool.query(queryText).then( (result) => {
          console.log(result.rows);
          res.send(result.rows);
        }).catch( (error) => {
          console.log('error on insert', error)
        });
          
      });

      router.post('/', (req, res) => {
        let movie = req.body;
        const queryText = 'INSERT INTO movies (picture, url, rating) VALUES ($1, $2, $3);'
        pool.query(queryText, [movie.picture, movie.url, movie.rating])
        .then( (response) => {
          console.log(response);
          res.sendStatus(201 );
        }).catch( (error) => {
          console.log('error on insert', error)
        });
      });
    

module.exports = router