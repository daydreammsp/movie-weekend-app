myApp.controller('FavoritesController', ['MoviesService', 
function(MoviesService) {
  console.log('favorites Controller Loaded')
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
 self.boomPopUp = moviesService.boomPopUp
}]);