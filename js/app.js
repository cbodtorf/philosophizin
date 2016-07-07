/*******************************
* QUESTION APP
* Created by: Caleb Bodtorf
* Date: 7-5-2016
********************************/
(function() {

  let app = angular.module('QuestionApp', ['ngRoute']);

  //router
  app.config(['$routeProvider', function($routeProvider) {
     $routeProvider

     .when('/player', {
        templateUrl: 'player.html', controller: 'PlayerController'
     })

     .when('/game', {
        templateUrl: 'game.html', controller: 'CategoryController'
     })

     .otherwise({
        redirectTo: '/player'
     });

  }]);

  // Services
  require('./services/jService')(app);

  // Controllers
  require('./controllers/players')(app);
  require('./controllers/categories')(app);


  // Filters

  // Directives



})();
