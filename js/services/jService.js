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
