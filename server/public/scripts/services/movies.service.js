myApp.service('MoviesService',  ['$http','$mdDialog',
function($http,$mdDialog) {
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
    self.genreNames = [];
    
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

  self.boomPopUp = function (ev) {
    console.log('deleting')
    // Appending dialog to document.body to cover sidenav in docs app
    // var confirm = $mdDialog.confirm()
    //         .title('Are You Sure')
    //         .textContent('this is a delete')
    //         .ariaLabel('shoes')
    //         .targetEvent(ev)
    //         .ok('Please do it!')
    //         .cancel('Sounds like a scam');

            $mdDialog.show({
              controller: DialogController,
              templateUrl: './views/popUp.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
              self.status = 'You said the information was "' + answer + '".';
            }, function() {
              self.status = 'You cancelled the dialog.';
            });

    
}
function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

  self.deleteMovie = function(movie) {
    console.log('click');
    console.log(movie);
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
    
    
    
  
}])