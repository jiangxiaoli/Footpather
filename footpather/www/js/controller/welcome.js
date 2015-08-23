/**
 * Created by lan on 8/22/15.
 * Welcome screen controller to guide user get familiar with the app
 */
angular.module('app.controller.welcome', [])
  .controller('WelcomeCtrl', function($scope, $ionicSlideBoxDelegate) {
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };
    $scope.slideHasChanged = function(index) {
      $scope.slideIndex = index;
    };

    console.log('WelcomeCtrl loaded');
  }
);
