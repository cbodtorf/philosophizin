/*******************************
* QUESTION APP
* Created by: Caleb Bodtorf
* Date: 7-5-2016
********************************/
(function() {

  let app = angular.module('QuestionApp', []);
  // Services
  require('./services/jService')(app);

  // Controllers
  require('./controllers/players')(app);
  require('./controllers/categories')(app);
  require('./controllers/questions')(app);


  // Filters

  // Directives



})();
