// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic','ngMap', 'ion-autocomplete',
  'app.controller.home',
  'app.controller.welcome',
  'app.controller.login',
  'app.controller.signup',
  'app.controller.navigate',
  'app.controller.report',
  'app.controller.testonly',
  'app.service.user',
  'app.service.tile',
  'app.service.map',
  'app.service.crimereport'
])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "template/home.html",
      controller: 'HomeCtrl'
    })

    .state('welcome', {
      url: "/welcome",
      templateUrl: "template/welcome.html",
      controller: 'WelcomeCtrl'
    })

    .state('login', {
      url: "/login",
      templateUrl: "template/login.html",
      controller: 'LoginCtrl'
    })

    .state('signup', {
      url: "/signup",
      templateUrl: "template/signup.html",
      controller: 'SignupCtrl'
    })

    .state('navigate', {
      url: "/navigate",
      templateUrl: "template/navigate.html",
      controller: 'NavigateCtrl'
    })

    .state('report', {
      url: "/report",
      templateUrl: "template/report.html",
      controller: 'ReportCtrl'
    })

    .state('test', {
      url: "/test",
      templateUrl: "template/testonly.html",
      controller: 'TestCtrl'
    });


  $urlRouterProvider.otherwise("home");

})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

});
