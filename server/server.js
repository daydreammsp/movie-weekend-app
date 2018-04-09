const express = require('express');
const bodyParser = require('body-parser');
const movieRouter = require('./routes/movie.router');
const genreRouter = require('./routes/genre.router');
const chartRouter = require('./routes/chart.router');



const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static('server/public'));

app.use(bodyParser.json());

app.use('/movies', movieRouter);
app.use('/genre', genreRouter);
app.use('/chart', chartRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});