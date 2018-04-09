let express = require('express');
let router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    console.log('connected to db users/charting table')
        let queryText = 'SELECT genre, count(*) FROM genres GROUP BY genre;'  
        pool.query(queryText).then( (result) => {
          console.log(result.rows);
          res.send(result.rows);
        }).catch( (error) => {
          console.log('error on insert', error)
        });
          
      });


module.exports = router