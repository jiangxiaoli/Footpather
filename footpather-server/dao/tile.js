/**
 * Created by lan on 8/22/15.
 * DB operations for tile.
 */
var Tile = require('./models/tile');

module.exports = {
    getTile: function(coords, callback) {
        Tile.findOne(coords, callback);
    },

    addTile: function(tile, callback) {
        new Tile(tile).save(callback);
    },

    addReport: function(coords, report, callback) {
        Tile.findOneAndUpdate(coords,
            {
                $push: {
                    reports: report
                }
            },
            {new: true},
            callback);
    },

    updateReport: function(tileId, report, newValue, callback) {

    }
};