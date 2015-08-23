/**
 * Created by lan on 8/22/15.
 * Provide services to call backend API to get/post tile data from/to db
 */
angular.module('app.service.tile', [])
  .factory('tile', function($http) {
    return {
      stub: function() {
        console.log("tile service called");
      }
    }
  }
);
