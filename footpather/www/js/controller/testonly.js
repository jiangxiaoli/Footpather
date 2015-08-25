/**
 * Created by lan on 8/23/15.
 * for test
 */
angular.module('app.controller.testonly', [])
  .controller('TestCtrl', function($scope, user, tile){

    console.log('TestCtrl loaded');

    $scope.lat = 37.337417;
    $scope.lng = -121.976855;
    $scope.ids = null;

    $scope.report = {
      type: 'robbery',
      description: 'more details',
      latitude: 37.337417,
      longitude: -121.976855
    };

    $scope.user = {
      icon: 'icon path',
      user_name: 'user1'
    };

    $scope.currentloc = {
      latitude: 37.337417,
      longitude: -121.976855
    };

    $scope.users = null;
    $scope.reports = null;
    $scope.crimereports = null;

    $scope.addReport = function(report) {
      tile.submitReport(report)
        .success(function(res){
          alert("Report submitted");
        }).error(function(err){
          alert("Add Report Error: " + err);
        });
    };

    $scope.addUser = function(usr, loc) {
      user.add(usr)
        .success(function(res){
          user.updateLoc(res._id, loc)
            .success(function(res){
              alert("User and Location added");
            }).error(function(err){
              alert("Update Location Error: " + err);
            });
        }).error(function(err){
          alert("Add User Error: " + err);
        });
    };

    $scope.like = function(tileId, reportId) {
      tile.likeReport(tileId, reportId)
        .success(function(res){
          alert("Change submitted");
        }).error(function(err){
          alert("Like Report Error: " + err);
        });
    }

    $scope.getNearByReports = function(lat, lng) {
      tile.getNearByReports(lat, lng)
        .success(function(res){
          $scope.reports = res;
        }).error(function(err){
          alert("Get Nearby Report Error: " + err);
        });
    };

    $scope.getNearByUsers = function(lat, lng) {
      tile.getNearByUsers(lat, lng)
        .success(function(res){
          $scope.users = res;
        }).error(function(err){
          alert("Get Nearby User Error: " + err);
        });
    };

    $scope.getNearByCrimeReports = function(lat, lng, ids) {
      tile.getNearByCrimeReports(lat, lng, ids)
        .success(function(res){
          $scope.crimereports = res;
        }).error(function(err){
          alert("Get Nearby Crime Error: " + err);
        });
    }
  }
);
