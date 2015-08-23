/**
 * Created by lan on 8/22/15.
 */

module.exports = {

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

    getNearByTiles: function(row, col) {

    },

    getReportsByTile: function(row, col, callback) {

    },

    getCrimesByTile: function(row, col, callback) {

    },

    getUsersByTile: function(row, col, callback) {

    }
};