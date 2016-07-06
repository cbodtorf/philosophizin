(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*******************************
* CONTROLLER
* Category
*
********************************/


module.exports = function (app) {


    app.controller('CategoryController', ['$scope', 'jService', function($scope, jService) {
        $scope.categories = [];


        /*******************************
        * Grabs category title and id.
        * Saving in jService and this Controller.
        ********************************/
        $scope.show = function() {
            $scope.innerHTML = '';

            jService.getCats(function(response) {

                response.data.forEach(function(e){
                  $scope.categories.push({title: e.category.title, id: e.category.id});
                  jService.cats.push({title: e.category.title, id: e.category.id});

                });
                  // hides button
                  document.getElementById("showC").style.display = 'none';
            });
          };



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
/*******************************
* CONTROLLER
* Question
*
********************************/

module.exports = function (app) {

    app.controller('QuestionController', function($scope, $http) {



    });


};

},{}],4:[function(require,module,exports){
'use strict';

/*******************************
* QUESTION APP
* Created by: Caleb Bodtorf
* Date: 7-5-2016
********************************/
(function () {

  var app = angular.module('QuestionApp', []);
  // Services
  require('./services/jService')(app);

  // Controllers
  require('./controllers/players')(app);
  require('./controllers/categories')(app);
  require('./controllers/questions')(app);

  // Filters

  // Directives
})();
},{"./controllers/categories":1,"./controllers/players":2,"./controllers/questions":3,"./services/jService":5}],5:[function(require,module,exports){
/*******************************
* Service
* jService.io
*
********************************/

module.exports = function (app) {

  app.service('jService', function($http) {
      this.cats = [];


      /*******************************
      * grabs list of 5 random questions
      ********************************/
      this.getCats = function (callback) {
          $http({
            method: "GET",
            url: "http://jservice.io/api/random?count=5",
          }).then(callback)

      };

  });


};

},{}]},{},[4])