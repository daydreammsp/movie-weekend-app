myApp.controller('ChartController', ['MoviesService', '$http',
function(MoviesService, $http) {
  console.log('all fav Controller Loaded')
  let self = this;
  
let moviesService = MoviesService;
self.newMovies = moviesService.newMovies;
self.movies = moviesService.movies;
self.getMoviesApi = moviesService.getMoviesApi;
 self.addMovie = moviesService.addMovie;
self.getMovies = moviesService.getMovies;
 self.deleteMovie = moviesService.deleteMovie;
 self.genres = moviesService.genres
 self.genreNames = moviesService.genreNames
 self.boomPopUp = moviesService.boomPopUp;
let charInfo = [];
 self.getChart = function() {
     chartInfo = [];
    $http.get('/chart')
    .then(function(response){
      chartReturn = response.data;
      for(let num of chartReturn){
          chartInfo.push(num.count);
        
      }
    })

  }
  self.getChart();
console.log(chartInfo);
 let ctx = document.getElementById("myChart");

let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Horror", "Fantasy", "Comedy", "Science Fiction", "Drama", "Action", "Crime", "Adventure"],
        datasets: [{
            label: 'Historical Favorites',
            data: chartInfo,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }

});

}]);