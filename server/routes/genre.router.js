let express = require('express');
let router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    console.log('connected to db users table')
        let queryText = 'SELECT DISTINCT genre FROM movies;'  
        pool.query(queryText).then( (result) => {
          console.log(result.rows);
          res.send(result.rows);
        }).catch( (error) => {
          console.log('error on insert', error)
        });
          
      });

      router.post('/', (req, res) => {
        let genre = req.body;
        const queryText = 'INSERT INTO genres (url, genre) VALUES ($1, $2);'
        pool.query(queryText, [genre.url, genre.genre])
        .then( (response) => {
          // console.log(response);
          res.sendStatus(201 );
        }).catch( (error) => {
          console.log('error on insert', error)
        });
      });
    
    

module.exports = router