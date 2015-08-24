/**
 * Created by lan on 8/22/15.
 * Provide map services, e.g. convert coordinates, calculate routes, get street view,...
 */
angular.module('app.service.map', [])
  .factory('map', function() {

    return {
      stub: function() {
        console.log("map service called");
      },

      /**
       * Get street view image by latitude, longitude
       * @param lat
       * @param lng
       * @returns {{url: string }}
       */
      getStreetView: function (lat, lng) {
        var width = 600;
        var height = 400;
        var url = "https://maps.googleapis.com/maps/api/streetview?size="+width+"x"+height+"&location="+lat+","+lng;
        return url;
      }

    };
  }
);
