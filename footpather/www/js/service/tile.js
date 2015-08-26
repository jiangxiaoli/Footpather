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
        return $http.post(host + 'tile/report', report);
      },

      /**
       * like a report and update likes
       * @param tileId
       * @param reportId
       * @returns {HttpPromise}
       */
      likeReport: function(tileId, reportId) {
        return $http.post(host + 'tile/' + tileId + '/report/' + reportId);
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
       * @param ids (if null or empty, then default to "104,100,98,103,99,101,8,97,148,9,149,150")
       * 104:Homicide
       * 100:Breaking & Entering
       * 98:Robbery
       * 103:Theft
       * 99:Theft of Vehicle
       * 101:Theft from Vehicle
       * 170:Vehicle Recovery
       * 8:Sexual Offense
       * 97:Other Sexual Offense
       * 148:Sexual Assault
       * 9:Assault
       * 149:Assault
       * 150:Assault with Deadly Weapon
       * @returns {HttpPromise}
       */
      getNearByCrimeReports: function(lat, lng, ids){
        var url = host + 'tile/nearby/crimereports?lat=' + lat + '&lng=' + lng;
        if (ids && ids != "") url += '&ids=' + ids;
        return $http.get(url);
      },

      /**
       * get nearby place
       * @param lat
       * @param lng
       * @param radius (if null or empty, then default to 500)
       * @param types (if null or empty, then default to 'store')
       * supported types: https://developers.google.com/places/supported_types
       * when filter multiple types: type1|type2|...
       * @returns {HttpPromise}
       */
      getNearByPlaces: function(lat, lng, radius, types) {
        var url = host + 'tile/nearby/places?lat=' + lat + '&lng=' + lng;
        if (radius && radius != "") url += '&radius=' + radius;
        if (types && types != "") url += '&types=' + types;
        return $http.get(url);
      }
    }
  }
);
