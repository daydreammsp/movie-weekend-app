myApp.controller('UsersController', ['MoviesService', 
function(MoviesService) {
  console.log('User Controller Loaded')
  let self = this;

let moviesService = MoviesService;
self.addUser = moviesService.addUser;
self.users = moviesService.users;
self.newMovies = moviesService.newMovies;
self.movies = moviesService.movies;
self.getMoviesApi = moviesService.getMoviesApi;
 self.addMovie = moviesService.addMovie;
self.getMovies = moviesService.getMovies;
 self.deleteMovie = moviesService.deleteMovie;
//  self.updateMovie = moviesService.updateMovie;
 
 

}]);