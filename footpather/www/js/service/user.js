/**
 * Created by lan on 8/22/15.
 * Provide services to call backend API to get/post user data from/to db
 * e.g. get user info, update user location...
 */
angular.module('app.service.user', [])
  .factory('user', function($http, host) {

    return {
      stub: function() {
        console.log("user service called");
      },

      /**
       * add new user to db
       * @param user object:
       * {
       *  "icon": "icon1",
       *  "user_name": "user1"
       * }
       * @returns {HttpPromise}
       */
      add: function(user) {
        return $http.post(host + 'user', user)
      },

      /**
       * update user location in db
       * @param userId
       * @param loc object:
       * {
       *  "latitude": 37.308836,
       *  "longitude": -121.9939066
       * }
       * @returns {HttpPromise}
       */
      updateLoc: function(userId, loc) {
        return $http.post(host + 'user/' + userId, loc)
      }
    }

  }
);
