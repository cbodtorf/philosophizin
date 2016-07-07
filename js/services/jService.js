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
