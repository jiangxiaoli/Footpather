/**
 * Created by lan on 8/22/15.
 * Home screen controller to display map info, report/navigate buttons
 */
angular.module('app.controller.home', [])
  .controller('HomeCtrl', function($scope, user, tile, map, crimereport, $ionicLoading, $compile){

    console.log('HomeCtrl loaded');

    user.stub();
    tile.stub();
    map.stub();
    crimereport.stub();
    getCurrLoc();

    //preload all images, pay attention to the performance
    //$scope.streetViewUrl = map.getStreetView(37.777052, -122.403783);

    //styling of maps
    var styleArray = [ //any style array defined in the google documentation you linked
      {
        featureType: "all",
        stylers: [
          { saturation: -80 }
        ]
      },{
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          { hue: "#00ffee" },
          { saturation: 50 }
        ]
      },{
        featureType: "poi.business",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];
    $scope.styles = styleArray;

    $scope.centerOnMe = function() {
      if(!$scope.map) {
        return;
      }
      getCurrLoc();
    };

    /**
     * Get user current location
     */
     //TODO update when map drags, change to smaller range...
    function getCurrLoc(){
      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.currlat = pos.coords.latitude;
        $scope.currlng = pos.coords.longitude;
        getData($scope.currlat, $scope.currlng);
      }, function(error) {
        alert('Unable to get location: ' + error.message);
      });
    }

    /**
     * Get all data
     * @param lat
     * @param lng
     */
    function getData(lat, lng){
      //get map center
      getNearByUsers(lat, lng);
      getNearByCrimeReports(lat, lng);
      getNearByReports(lat, lng);
    }

    /**
     * Get nearby users
     * @param lat
     * @param lng
     */
    function getNearByUsers(lat, lng) {
      tile.getNearByUsers(lat, lng)
        .success(function(res){
          $scope.users = res;
          console.log($scope.users);
        }).error(function(err){
          alert("Get Nearby User Error: " + err);
        });
    }

    /**
     * Get nearby reports
     * @param lat
     * @param lng
     */
    function getNearByReports(lat, lng) {
      tile.getNearByReports(lat, lng)
        .success(function(res){
          $scope.reports = res;
        }).error(function(err){
          alert("Get Nearby Report Error: " + err);
        });
    }

    /**
     * Get nearby crimereports
     * @param lat
     * @param lng
     */
    function getNearByCrimeReports (lat, lng) {
      tile.getNearByCrimeReports(lat, lng)
        .success(function(res){
          $scope.crimereports = res;
          console.log($scope.crimereports);
          $ionicLoading.hide(); //takes longest time, hide loading after get crimereport complete
        }).error(function(err){
          alert("Get Nearby Crime Error: " + err);
        });
    }

  }
);
