(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*******************************
* CONTROLLER
* Category
*
********************************/


module.exports = function (app) {


    app.controller('CategoryController', ['$scope', 'jService', function($scope, jService) {

        //[0] is single [1] is double
        $scope.categories = jService.getCatIds()[0];

        // current question
        $scope.question = jService.getQ();


        //q equal question (but really this is the master list)
        // this displays the question
        $scope.qClick = function(q) {
          jService.setQ(q);
          $scope.question = jService.getQ();
        }



    }]);


};

},{}],2:[function(require,module,exports){
/*******************************
* CONTROLLER
* PLayer
*
********************************/

module.exports = function (app) {

    app.controller('PlayerController', function($scope, $http) {
        $scope.players = [];
        $scope.playerOne = {};




        /*******************************
        * grabs player specific choice
        ********************************/
        $scope.playerChoose = function() {
            let pick = this.philosophers;
            let idx = this.$index;

            //assigns player's choice object to scope
            $scope.playerOne = pick;

            //removes all other choices
            let len = $scope.players.length -1;

            for(let i = 0; i <= len; i++) {
            let el = document.querySelector(`[data-id="${i}"]`);
              if (i !== idx) {
                el.remove();
              }
            };
            //disables click event on img
            $scope.isClickEnabled = true;
        };



        /*******************************
        * grabs list of player choices
        ********************************/
        $scope.show = function() {
            $http({
              method: "GET",
              url: "./mock/players.json",
            }).then(function(response) {
                response.data.forEach(function(e){
                  $scope.players.push({name: e.name, img: e.img})
                });
                // hides button
                document.getElementById("showP").style.display = 'none';
            });
        };



    });


};

},{}],3:[function(require,module,exports){
'use strict';

/*******************************
* QUESTION APP
* Created by: Caleb Bodtorf
* Date: 7-5-2016
********************************/
(function () {

   var app = angular.module('QuestionApp', ['ngRoute']);

   //router
   app.config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/player', {
         templateUrl: 'player.html', controller: 'PlayerController'
      }).when('/game', {
         templateUrl: 'game.html', controller: 'CategoryController'
      }).otherwise({
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
},{"./controllers/categories":1,"./controllers/players":2,"./services/jService":4}],4:[function(require,module,exports){
/*******************************
* Service
* jService.io
*
********************************/

module.exports = function (app) {

  app.factory('jService', function($http) {
    /*******************************
    * cat id between 1 and 5967 = 100 -> 500 scores
    * cat id between 5968 and 18418 = 200 -> 1000 scores
    ********************************/

    // variable storage
    let randSingIds = [];
    let singCats = [];

    let randDoubIds = [];
    let doubCats = [];

    let question = '';

    /*******************************
    * grabs 5 random sing/doub J
    ********************************/

   (function rIds() {
      randSingIds = [];
      randDoubIds = [];
      for (let i = 0; i < 5; i++) {
        randSingIds.push(Math.floor(Math.random() * 5967) + 1);
        randDoubIds.push(Math.floor(Math.random() * 18418) + 1);
      }
      return [randSingIds, randDoubIds];
    })();






      /*******************************
      * grabs 5 random singJ cats
      ********************************/

        randSingIds.forEach(function(e){
          $http({
            method:'GET',
            url: `http://jservice.io/api/clues?category=${e}`
          }).then(function(response) {
              let arr = [];
              response.data.forEach(function(e, i){
                arr.push(e);
              })
              singCats.push(arr);
          })
        })

        /*******************************
        * grabs 5 random doubJ cats
        ********************************/

        randDoubIds.forEach(function(e){
          $http({
            method:'GET',
            url: `http://jservice.io/api/clues?category=${e}`
          }).then(function(response) {
              let arr = [];
              response.data.forEach(function(e, i){
                arr.push(e);
              })
              doubCats.push(arr);
          })
        })





        /*******************************
        * return object w/ getters and setters
        ********************************/

      return {
        setQ(q) {
          question = q.question;
        },

        getQ() {
          return question;
        },

        getCatIds() {
          return [singCats, doubCats];
        }

      };
  });


};

},{}]},{},[3])