/**
 * Created by lan on 8/23/15.
 */

var userdb = require('../dao/user');
var tile = require('./tile');

module.exports = {
    add: function(user, callback) {
        userdb.addUser(user, callback);
    },

    updateLoc: function(userId, newLoc, callback) {
        var loc = {
            latitude: newLoc.latitude,
            longitude: newLoc.longitude,
            row: null,
            col: null
        };

        // default zoom to be 14 to get crime data from crime reports
        var tileCoords = tile.getTileCoords(loc.latitude, loc.longitude, 14);
        loc.row = tileCoords.row;
        loc.col = tileCoords.col;

        userdb.updateLoc(userId, loc, callback);
    }
}