/**
 * Created by lan on 8/22/15.
 * Provide services to call backend API to get/post tile data from/to db
 */
angular.module('app.service.tile', [])
  .factory('tile', function($http) {
    var host = 'http://localhost:3000/';

    return {
      stub: function() {
        console.log("tile service called");
      },

      /**
       * Submit a report
       * @param report object:
       * {
       *    "latitude": 38.308856,
       *    "longitude": -123.9939046,
       *    "type": "theft",
       *    "description": "more details"
       *  }
       * @returns {HttpPromise}
       */
      submitReport: function(report) {
        return $http.post(host + 'report', report);
      },

      /**
       * Get nearby user by location
       * @param lat
       * @param lng
       * @returns {HttpPromise}
       */
      getNearByUsers: function(lat, lng){
        return $http.get(host + 'tile/nearby/users?lat=' + lat + '&lng=' + lng);
      },

      /**
       * Get nearby reports by location
       * @param lat
       * @param lng
       * @returns {HttpPromise}
       */
      getNearByReports: function(lat, lng){
        return $http.get(host + 'tile/nearby/reports?lat=' + lat + '&lng=' + lng);
      },

      /**
       * Get nearby crime reports by location
       * @param lat
       * @param lng
       * @returns {HttpPromise}
       */
      getNearByCrimeReports: function(lat, lng){
        return $http.get(host + 'tile/nearby/crimereports?lat=' + lat + '&lng=' + lng);
      }
    }
  }
);
