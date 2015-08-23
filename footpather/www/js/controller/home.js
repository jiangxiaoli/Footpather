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

    //preload all images, pay attention to the performance
    $scope.streetViewUrl = map.getStreetView(37.777052, -122.403783);

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

      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $ionicLoading.hide();
      }, function(error) {
        alert('Unable to get location: ' + error.message);
      });
    };

  }
);
