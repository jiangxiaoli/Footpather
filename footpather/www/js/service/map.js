/**
 * Created by lan on 8/22/15.
 * Provide map services, e.g. convert coordinates, calculate routes, get street view,...
 */
angular.module('app.service.map', [])
  .factory('map', function() {

    return {
      stub: function() {
        console.log("map service called");
      }
    };
  }
);
