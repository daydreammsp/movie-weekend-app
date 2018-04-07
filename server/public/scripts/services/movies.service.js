myApp.service('MoviesService',  ['$http',
function($http) {
    // console.log('Movies Service is Loaded');
    let self = this;
    self.newMovies = { list : []};
    self.movies = { list : [] };
    self.genres = { list : [] };
    self.genreNames = [];
    self.genreAdd;
    

    self.getMovies = function() {
        $http.get('/movies')
        .then(function(response){
          self.newMovies.list = response.data;
          // console.log(self.newMovies.list);
        })
      }

      self.getMoviesApi = function(search) {
        console.log('search query', search)
        $http.get('https://api.themoviedb.org/3/search/movie?api_key=82a12a54b5388a78460f43520ffc035e&query='+ search +'&language=en-US&page=1&include_adult=false')
        .then(function(response){
          // console.log(response.data)
          self.movies.list = response.data.results;

          // console.log(self.movies.list);
         
        })
      }
      self.getGenres = function() {
        $http.get('/genre')
        .then(function(response){
          self.genres.list = response.data;
          console.log(self.genres.list);
          // self.convertGenres();
        })
      }
      // self.getMoviesApi();
      // self.getListings();
    //   AIzaSyBIvNVDWZzW9WoaOK78MmaOhC-R0X2doTM
    // https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=YOUR_API_KEY
    // https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=AIzaSyBIvNVDWZzW9WoaOK78MmaOhC-R0X2doTM

  self.addMovie = function(movie){
    
    let movieAdd = {
        picture: movie.title,
        url: movie.poster_path,
        rating: true
    }
    let genreAdd = {
      url: movie.poster_path,
      genre: movie.genre_ids
    }
    // self.convertGenres();
    // console.log(movieAdd)
    // console.log(genreAdd.genre)
    let x = genreAdd.genre
    self.convertGenres(x);
    genreAdd = {
      url: movie.poster_path,
      genre:  self.genreNames
    }
    $http.post('/genre', genreAdd)
      .then(function(response){
        self.getGenres(response);
        // console.log('added')
       
      })
      .catch(function(error){
        console.log(error);
      });
      $http.post('/movies', movieAdd)
      .then(function(response){
        self.getMovies(response);
        // console.log('added')
       
      })
      .catch(function(error){
        console.log(error);
      });
  }

  // self.addGenre = function(genre){
  //   console.log('added', genre)
  //   let genre = {
  //       url: url,
  //       genre: genre
  //   }
  //   console.log(genre)
  //     $http.post('/genre', genre)
  //     .then(function(response){
  //       // self.getMovies(response);
  //       console.log('added', response)
       
  //     })
  //     .catch(function(error){
  //       console.log(error);
  //     });
  //   }

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
  

    self.convertGenres = function(types){
      // console.log(types);
      let genreNames = self.genreNames
      for(let type of types){
        console.log(type);
        switch(type) {
          case 28:
              type = "Action";
              break;
          case 12:
              type = "Adventure";
              break;
          case 16:
              type = "Animation";
              break;
          case 35:
              type = "Comedy";
              break;
          case 80:
              type = "Crime";
              break;
          case 99:
              type = "Documentary";
              break;
          case 18:
              type = "Drama";
              break;
          case 10751:
              type = "Family";
              break;
          case 14:
              type = "Fantasy";
              break;
          case 36:
              type = "History";
              break;
          case 27:
              type = "Horror";
              break;
          case 10402:
              type = "Music";
              break;
          case 9648:
              type = "Mystery";
              break;
          case 10749:
              type = "Romance";
              break;
          case 878:
              type = "Science Fiction";
              break;
          case 10770:
              type = "TV Movie";
              break;
          case 53:
              type = "Thriller";
              break;
          case 10752:
              type = "War";
              break;
          case 37:
              type = "Western";
              break;
          default:
          type = "movie genre";
      }
      genreNames.push(type);
      console.log(genreNames);
      }
    }
    self.getMovies();
    self.getGenres();
    
    // self.addGenre = function(genre){
      //   console.log('added', genre)
      //   let genre = {
      //       url: genre.url,
      //       genre: genre.genre
      //   }
      //   console.log(genre)
      //     $http.post('/genre', genre)
      //     .then(function(response){
      //       // self.getMovies(response);
      //       console.log('added', response)
           
      //     })
      //     .catch(function(error){
      //       console.log(error);
      //     });
      //   }
    
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