angular.module('app.routes', ['ui.router'])



.config(function($stateProvider,$urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


.state('signup',{
	name: 'Sign Up',
	url: '/signupPage',
    templateUrl: 'templates/signup.html',
    controller: 'signupPageCtrl'
})

.state('construction',{
	name: 'Construction',
	url: '/constructionPage',
    templateUrl: 'templates/construction.html',
    controller: 'constructionCtrl'
})

 .state('home',{
 	name: 'Home',
 	url: '/homePage',
    templateUrl: 'templates/homepage.html',
    controller: 'homePageCtrl'
  })


$urlRouterProvider.otherwise('/homePage')



});
