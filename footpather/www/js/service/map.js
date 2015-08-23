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
       * Calculate tile coordinates by latitude, longitude and zoom level
       * @param lat
       * @param lng
       * @param zoom
       * @returns {{col: number, row: number}}
       */
      getTileCoords: function (lat, lng, zoom) {
        var TILE_SIZE = 256;
        var scale = 1 << zoom;

        var siny = Math.sin(lat * Math.PI / 180);

        // Truncating to 0.9999 effectively limits latitude to 89.189. This is
        // about a third of a tile past the edge of the world tile.
        siny = Math.min(Math.max(siny, -0.9999), 0.9999);


        var x = TILE_SIZE * (0.5 + lng / 360);
        var y = TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI));

        return {
          col: Math.floor(x * scale / TILE_SIZE),
          row: Math.floor(y * scale / TILE_SIZE)
        }
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
