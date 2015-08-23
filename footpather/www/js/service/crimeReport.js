/**
 * Created by lan on 8/22/15.
 * Provide services to call backend API get crime reports data
 */
angular.module('app.service.crimereport', [])
  .factory('crimereport', function($http) {
    return {
      stub: function() {
        console.log("crime report service called");
      }
    }
  }
);
