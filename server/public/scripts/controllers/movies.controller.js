myApp.controller('MovieController', ['MoviesService', 
function(MoviesService) {
  console.log('Movies Controller Loaded')
  let self = this;

let moviesService = MoviesService;

self.movies = moviesService.movies;
self.getMoviesApi = moviesService.getMoviesApi;
self.addMovie = moviesService.addMovie;
//  self.deleteListing = listService.deleteListing;
//  self.updateListing = listService.updateListing;
 
 

}]);