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
