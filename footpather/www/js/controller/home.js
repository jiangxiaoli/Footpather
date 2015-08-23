/**
 * Created by lan on 8/22/15.
 * Home screen controller to display map info, report/navigate buttons
 */
angular.module('app.controller.home', [])
  .controller('HomeCtrl', function($scope, user, tile, map, crimereport){

    console.log('HomeCtrl loaded');

    user.stub();
    tile.stub();
    map.stub();
    crimereport.stub();
  }
);
