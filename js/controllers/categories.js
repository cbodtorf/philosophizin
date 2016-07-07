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
