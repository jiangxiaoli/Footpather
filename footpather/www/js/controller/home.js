/**
 * Created by lan on 8/22/15.
 * Home screen controller to display map info, report/navigate buttons
 */
angular.module('app.controller.home', [])
  .controller('HomeCtrl', function($scope, user, tile, map, crimereport, $ionicLoading, $compile, $ionicModal, $ionicPopup, $http, $interval, $timeout){

    console.log('HomeCtrl loaded');

    user.stub();
    tile.stub();
    map.stub();
    crimereport.stub();
    getCurrLoc();

    $scope.map;
    $scope.$on('mapInitialized', function(event, map) {
      $scope.map = map;
    });

    //styling of maps
    var styleArray = [ //any style array defined in the google documentation you linked
      {
        featureType: "all",
        stylers: [
          { hue: "#00ff91" },
          { saturation: -65 },
          { lightness: 41 },
          { Gamma: 0.86 }
        ]
      },{
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          { hue: "#009900" },
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

    $scope.refreshMap = function () {
      if(!$scope.map) {
        return;
      }
      var lat = $scope.map.center.G;
      var lng = $scope.map.center.K;
      $scope.loading = $ionicLoading.show();
      getData(lat, lng);
    };

    /**
     * Get user current location
     */
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
      console.log('get data');
      //get map center
      getNearByUsers(lat, lng);
      getNearByCrimeReports(lat, lng);
      getNearByReports(lat, lng);
      getNearByPlaces(lat, lng);
      //$ionicLoading.hide();
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
      var types = "8,97,148,9,149,150"; //only show sex related crimes
      tile.getNearByCrimeReports(lat, lng, types)
        .success(function(res){
          $scope.crimereports = res;
          $ionicLoading.hide(); //takes longest time, hide loading after get crimereport complete
        }).error(function(err){
          alert("Get Nearby Crime Error: " + err);
        });
    }

    /**
     * Get nearby places
     * @param lat
     * @param lng
     * @param radius
     * @param types
     */
    function getNearByPlaces (lat, lng, radius, types) {
      tile.getNearByPlaces(lat, lng, radius, types)
        .success(function(res){
          $scope.places = res;
        }).error(function(err){
          alert("Get Nearby Places Error: " + err);
        });
    }

    //prepare ion-complete for navigate inout, with auto complete address
    //the selected data is stored in ng-model for each selection
    $scope.getTestItems = function (query) {
      var params = {address: query, sensor: false};
      //need 2 return to pass query to selector
      return $http.get(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {params: params}
      ).then(function(response) {
          var results = response.data.results;
          var items = [];

          if(results) {
            for(var i = 0; i < results.length; i++) {
              var result = results[i];
              var item = {};
              item.location = result.geometry.location;
              item.view = result.formatted_address;
              items.push(item);
            }
          }
          return items;
        });
    };

    //show navigate modal
    $ionicModal.fromTemplateUrl('templates/navigateModal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.navModal = modal;
    });

    $scope.origin = "";
    $scope.destination = "";
    $scope.inNavigate = false;
    //modal form submit handling- get navigation object, calculate route
    $scope.calculateNavigation = function(navigate) {
      console.log(navigate);
      if(navigate && navigate.from && navigate.to) {
        //calculate the route
        $scope.origin = navigate.from;
        $scope.destination = navigate.to;
        $scope.navModal.hide();
        $scope.inNavigate = true;
      }
    };

    $scope.clearRoute = function () {
      //TODO how to clear direction
      $scope.inNavigate = false;
    };

    /**
     * Show sex offender popup
     * @param event - marker click event
     * @param offender - the offender for the marker
     */
    $scope.showOffenderPopup = function(event, offender) {
      console.log(offender);
      $scope.currOffender = offender;
      $ionicPopup.show({
        templateUrl: "templates/offenderPopup.html",
        title: "Registered Sex Offender",
        scope: $scope,
        buttons: [
          { text: 'Got it!' }
        ]
      });

      //recenter map
      $scope.map.setCenter({
        lat: offender.lat,
        lng: offender.lng
      });
    };

    /**
     * Show sex offender popup
     * @param event - marker click event
     * @param crime - the crime for the marker
     */
    $scope.showCrimePopup = function (event, crime) {

      $scope.currCrime = crime;

      //get google map street view url
      $scope.streetViewUrl = map.getStreetView(crime.lat, crime.lng);

      //show pop
      $ionicPopup.show({
        templateUrl: "templates/crimePopup.html",
        title: crime.incident_type_name,
        scope: $scope,
        buttons: [
          { text: 'Got it!' }
        ]
      });

      //recenter map
      $scope.map.setCenter({
        lat: crime.lat,
        lng: crime.lng
      });
    };

    $scope.showReportMenuPopup = function () {
      $scope.reportMenuPop = $ionicPopup.show({
        templateUrl: "templates/reportMenuPopup.html",
        cssClass:"report-menu-popup",
        title: "Report An Incident",
        scope: $scope,
        buttons: [
          { text: 'Done' }
        ]
      });
    };

    $scope.newReport ={};
    $scope.showEditReportPopup = function (type) {
      $scope.reportMenuPop.close();
      console.log(type);

      $scope.newReport.type = type;

      //http://stackoverflow.com/questions/25310234/ionic-framework-two-popups-in-tandem
      $timeout( function () {
        $scope.reportConfirmPop = $ionicPopup.confirm({
          title: "Report An Incident",
          templateUrl: "templates/reportEditPopup.html",
          cssClass:"report-edit-popup"
        });
        $scope.reportConfirmPop.then(function(res) {
          if(res) {
            console.log('You are sure');
            console.log($scope.newReport.desc);
            //create new
          } else {
            console.log('You are not sure');
          }
        });
      }, 500);

    }

  }
);
