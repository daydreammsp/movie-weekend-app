myApp.service('MoviesService',  ['$http',
function($http) {
    console.log('Movies Service is Loaded');
    let self = this;
    self.newMovies = { list : []};
    self.movies = { list : [] };
  
    
    
    self.getMovies = function() {
        $http.get('/movies')
        .then(function(response){
          self.newMovies.list = response.data;
          console.log(self.newMovies.list);
        })
      }

      self.getMoviesApi = function(search) {
        console.log('search query', search)
        $http.get('https://api.themoviedb.org/3/search/movie?api_key=82a12a54b5388a78460f43520ffc035e&query='+ search +'&language=en-US&page=1&include_adult=false')
        .then(function(response){
          self.movies.list = response.data.results;

          console.log(self.movies.list);
         
        })
      }
      // self.getMoviesApi();
      // self.getListings();
    //   AIzaSyBIvNVDWZzW9WoaOK78MmaOhC-R0X2doTM
    // https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=YOUR_API_KEY


  self.addMovie = function(movie){
    console.log('added',movie)
    let movieAdd = {
        picture: movie.title,
        url: movie.poster_path,
        rating: true
    }
    console.log(movieAdd)
      $http.post('/movies', movieAdd)
      .then(function(response){
        self.getMovies(response);
        // console.log('added')
       
      })
      .catch(function(error){
        console.log(error);
      });
  }
  

  self.deleteMovie = function(movie) {
    console.log(movie);
      let movieId = movie.id;
      $http.delete('/movies/' + movieId)
       .then(function(response){
            self.getMovies(response);
        })
        .catch(function(err){
            console.log('error')
        })
    }
    
    self.getMovies();
      
    

}])