/**
 * Created by lan on 8/22/15.
 * Provide services to call backend API to get/post user data from/to db
 * e.g. get user info, update user location...
 */
angular.module('app.service.user', [])
  .factory('user', function($http) {

    return {
      stub: function() {
        console.log("user service called");
      }
    }

  }
);
