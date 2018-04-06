myApp.service('MoviesService',  ['$http',
function($http) {
    console.log('Movies Service is Loaded');
    let self = this;
    self.newMovies = { list : []};
    self.movies = { list : [] };
    self.users = { list : [] };
    
    
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
          console.log(response.data)
          self.movies.list = response.data.results;

          console.log(self.movies.list);
         
        })
      }
      self.getUsers = function() {
        $http.get('/user')
        .then(function(response){
          self.users.list = response.data;
          console.log(self.users.list);
        })
      }
      // self.getMoviesApi();
      // self.getListings();
    //   AIzaSyBIvNVDWZzW9WoaOK78MmaOhC-R0X2doTM
    // https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=YOUR_API_KEY
    // https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=AIzaSyBIvNVDWZzW9WoaOK78MmaOhC-R0X2doTM

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

  self.addUser = function(user){
    console.log('added', user)
    let username = {
        username: user
    }
    console.log(username)
      $http.post('/user', username)
      .then(function(response){
        // self.getMovies(response);
        // console.log('added')
       
      })
      .catch(function(error){
        console.log(error);
      });
    }

  self.deleteMovie = function(movie) {
    console.log('click');
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
    self.getUsers();
      
    
  //   "genres": [
  //     {
  //         "id": 28,
  //         "name": "Action"
  //     },
  //     {
  //         "id": 12,
  //         "name": "Adventure"
  //     },
  //     {
  //         "id": 16,
  //         "name": "Animation"
  //     },
  //     {
  //         "id": 35,
  //         "name": "Comedy"
  //     },
  //     {
  //         "id": 80,
  //         "name": "Crime"
  //     },
  //     {
  //         "id": 99,
  //         "name": "Documentary"
  //     },
  //     {
  //         "id": 18,
  //         "name": "Drama"
  //     },
  //     {
  //         "id": 10751,
  //         "name": "Family"
  //     },
  //     {
  //         "id": 14,
  //         "name": "Fantasy"
  //     },
  //     {
  //         "id": 36,
  //         "name": "History"
  //     },
  //     {
  //         "id": 27,
  //         "name": "Horror"
  //     },
  //     {
  //         "id": 10402,
  //         "name": "Music"
  //     },
  //     {
  //         "id": 9648,
  //         "name": "Mystery"
  //     },
  //     {
  //         "id": 10749,
  //         "name": "Romance"
  //     },
  //     {
  //         "id": 878,
  //         "name": "Science Fiction"
  //     },
  //     {
  //         "id": 10770,
  //         "name": "TV Movie"
  //     },
  //     {
  //         "id": 53,
  //         "name": "Thriller"
  //     },
  //     {
  //         "id": 10752,
  //         "name": "War"
  //     },
  //     {
  //         "id": 37,
  //         "name": "Western"
  //     }
  // ]
}])