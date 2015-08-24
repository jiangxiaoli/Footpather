/**
 * Created by lan on 8/23/15.
 * for test
 */
angular.module('app.controller.testonly', [])
  .controller('TestCtrl', function($scope, tile){

    console.log('TestCtrl loaded');

    $scope.lat = 37.337417;
    $scope.lng = -121.976855;

    $scope.users = null;
    $scope.reports = null;
    $scope.crimereports = null;

    $scope.getNearByUsers = function(lat, lng) {
      tile.getNearByUsers(lat, lng)
        .success(function(res){
          $scope.users = res;
        }).error(function(err){
          alert("Get Nearby User Error: " + err);
        });
    };

    $scope.getNearByReports = function(lat, lng) {
      tile.getNearByReports(lat, lng)
        .success(function(res){
          $scope.reports = res;
        }).error(function(err){
          alert("Get Nearby Report Error: " + err);
        });
    };

    $scope.getNearByCrimeReports = function(lat, lng) {
      tile.getNearByCrimeReports(lat, lng)
        .success(function(res){
          $scope.crimereports = res;
        }).error(function(err){
          alert("Get Nearby Crime Error: " + err);
        });
    }
  }
);
