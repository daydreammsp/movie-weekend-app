const express = require('express');
const bodyParser = require('body-parser');
const movieRouter = require('./routes/movie.router');
// const shipRouter = require('./routes/ships.router');



const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static('server/public'));

app.use(bodyParser.json());

app.use('/movies', movieRouter);
// app.use('/ships', shipRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});