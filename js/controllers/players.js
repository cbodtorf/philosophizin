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
