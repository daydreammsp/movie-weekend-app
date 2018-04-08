myApp.service('MoviesService',  ['$http','$mdDialog',
function($http,$mdDialog) {
    
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
          
        })
      }
//GET from API service
      self.getMoviesApi = function(search) {
        console.log('search query', search)
        $http.get('https://api.themoviedb.org/3/search/movie?api_key=82a12a54b5388a78460f43520ffc035e&query='+ search +'&language=en-US&page=1&include_adult=false')
        .then(function(response){
          self.movies.list = response.data.results;
        })
      }
      // get for genre drop down
      self.getGenres = function() {
        $http.get('/genre')
        .then(function(response){
          self.genres.list = response.data;
          console.log(self.genres.list);
          
        })
      }
      //adds new movie to favorites and convets genre object
  self.addMovie = function(movie){
    self.genreNames = [];
    
    let genreAdd = {
      url: movie.poster_path,
      genre: movie.genre_ids
    }
  
    let x = genreAdd.genre
    self.convertGenres(x);
    genreAdd = {
      url: movie.poster_path,
      genre:  self.genreNames[0]
    }
    let movieAdd = {
      title: movie.title,
      genre:  self.genreNames[0],
      date: movie.release_date,
      rating: movie.vote_average,
      url: movie.poster_path,
      overview: movie.overview
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
//delete popup
  self.boomPopUp = function (ev,fav) {
    console.log('deleting')
        
        var confirm = $mdDialog.confirm()
                .title('Deleting ', fav.title)
                .textContent('Are you sure you want to delete '+ fav.title +'?')
                .ariaLabel('movie')
                .targetEvent(ev)
                .ok('Delete Movie')
                .cancel('Cancel');
    
        $mdDialog.show(confirm).then(function() {
            self.deleteMovie(fav)
        }, function() {
            console.log('still a fav')
        });
}
//delete function fires in boompopup
  self.deleteMovie = function(movie) {
    
      let movieId = movie.id;
      $http.delete('/movies/' + movieId)
       .then(function(response){
            self.getMovies(response);
            self.getGenres();
        })
        .catch(function(err){
            console.log('error')
        })
    }
    
  
//converts genre id numbers to genre names
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
    
    
    
  
}]);