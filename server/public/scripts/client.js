console.log('js connected');
let myApp = angular.module('myApp', ['ngRoute','ngMaterial']);

myApp.config(function($routeProvider) {
    console.log('config loaded');
    //Establish Routes
  
    $routeProvider
      .when('/movies', {
        templateUrl: '/views/movies.html',
        controller: 'MovieController as vm'
      })
      .when('/favorites', {
        templateUrl: '/views/favorites.html',
        controller: 'FavoritesController as vm'
      })
    //   .when('/rent', {
    //     templateUrl: '/views/rent.html',
    //     controller: 'RentController as vm'
    //   })
      .otherwise(
        { redirectTo: '/movies'}
      )
  });