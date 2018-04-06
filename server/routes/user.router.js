let express = require('express');
let router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    console.log('connected to db users table')
        let queryText = 'SELECT * FROM users ORDER BY id ASC;'  
        pool.query(queryText).then( (result) => {
          console.log(result.rows);
          res.send(result.rows);
        }).catch( (error) => {
          console.log('error on insert', error)
        });
          
      });

      router.post('/', (req, res) => {
        let user = req.body;
        const queryText = 'INSERT INTO users (username) VALUES ($1);'
        pool.query(queryText, [user.username])
        .then( (response) => {
          // console.log(response);
          res.sendStatus(201 );
        }).catch( (error) => {
          console.log('error on insert', error)
        });
      });
    
      // router.delete('/:id', (req, res) => {
      //   let movieId = req.params.id;
      //   console.log('delete', movieId)
      //   const queryText = 'DELETE FROM movies WHERE id = $1;'
      //   pool.query(queryText, [movieId])
      //   .then( (response) => {
      //     console.log(response);
      //     res.sendStatus(201);
      //   }).catch( (error) => {
      //     console.log('error on insert', error)
      //   });
      // });

module.exports = router