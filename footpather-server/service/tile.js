/**
 * Created by lan on 8/22/15.
 */
var tiledb = require('../dao/tile');
var userdb = require('../dao/user');
var crimereport = require('./crime_report');
var async = require('async');
var request = require('request');

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

    addReportToTile: function(report, callback) {
        var tileCoords = this.getTileCoords(report.latitude, report.longitude, 14);
        report.date = new Date();
        report.likes = 0;

        tiledb.addReport(tileCoords, report, function(err, tile){
            if(err) callback(err);
            else if(tile == null) {
                tiledb.addTile({
                    row: tileCoords.row,
                    col: tileCoords.col,
                    reports: [report]
                }, callback)
            }
            else callback(null, tile);
        });
    },

    likeReport: function(tile_id, report_id, callback) {
        tiledb.likeReport(tile_id, report_id, callback);
    },

    getNearByTiles: function(row, col) {
        // return 9 tiles with the current tile in middle
        var tiles = [];
        var r = row - 1;
        var c = col - 1;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                tiles.push({
                    row: r + i,
                    col: c + j
                });
            }
        }
        //console.log("current: " + row + ", " + col);
        //console.log("nearby: " + JSON.stringify(tiles, null, 4));
        return tiles;
    },

    getReportsByTiles: function(coordsList, callback) {
        async.map(coordsList, function(coords, cb) {
            tiledb.getTile(coords, function(err, tile){
                if(err) cb(err);
                else if(tile != null) {
                    async.map(tile.reports, function(report, cb){
                        var report = report.toObject();
                        report.tile_id = tile._id;
                        cb(null, report);
                    }, cb);
                }
                else cb(null, []);
            });
        }, function(err, results) {
            callback(err, [].concat.apply([], results));
        });
    },

    getCrimesByTiles: function(coordsList, ids, callback) {
        var crimes = [];
        var offenders = [];

        var date = new Date();
        var today = [date.getFullYear(), date.getMonth()+1, date.getDate()].join("/");
        // start date is one month ago
        date.setDate(date.getDate() -30);
        var start = [date.getFullYear(), date.getMonth()+1, date.getDate()].join("/");

        if(!ids) ids = "104,100,98,103,99,101,8,97,148,9,149,150";
        async.each(coordsList, function(coords, cb) {
            crimereport.get(coords.row, coords.col, 14,
                start, today, ids,
                function(err, reports){
                    if(err) cb(err);
                    else {
                        crimes.push(reports.crimes);
                        offenders.push(reports.offenders);
                        cb();
                    }
                }
            );

        }, function(err) {
            if(err) callback(err);
            else {
                callback(null, {
                    crimes: [].concat.apply([], crimes),
                    offenders: [].concat.apply([], offenders)
                });
            }
        })
    },

    getUsersByTiles: function(coordsList, callback) {
        async.map(coordsList, function(coords, cb) {
            userdb.getUsers(coords, function(err, users){
                if(err) cb(err);
                else if(users != null) cb(null, users);
                else cb(null, []);
            });
        }, function(err, results) {
            callback(err, [].concat.apply([], results));
        });
    },

    getNearByPlaces: function(lat, lng, radius, types, callback) {
        if(!radius) radius = 1000;
        if(!types) types = 'store';
        var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
            lat + ',' + lng +
            '&radius=' + radius +
            //'&rankby=distance' +
            '&opennow&types=' + types +
            '&key=AIzaSyDLqY17UJMuyDS2x5CEfOwfFahpJ2KoV4o';
        console.log(url);
        request.get(url,
            function (error, response, body) {
                if (error)
                    callback("err get: " + url);
                else
                    callback(null, JSON.parse(body).results);
            }
        );
    },

    getAllDataByTiles: function(coordsList, callback) {

    }
};