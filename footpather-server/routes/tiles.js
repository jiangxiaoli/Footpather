/**
 * Created by lan on 8/22/15.
 * Tile related API
 */
var express = require('express');
var router = express.Router();
var tile = require('../service/tile');


router.get('/', function(req, res, next) {
    res.send('tiles api');
});

router.get('/nearby/users', function(req, res, next) {
    var coords = tile.getTileCoords(req.query.lat, req.query.lng, 14);
    var coordsNearBy = tile.getNearByTiles(coords.row, coords.col);
    tile.getUsersByTiles(coordsNearBy, function(err, users){
        if(err) res.status(400).send("error" + err);
        else res.status(200).json(users);
    });
});

router.get('/nearby/reports', function(req, res, next) {
    var coords = tile.getTileCoords(req.query.lat, req.query.lng, 14);
    var coordsNearBy = tile.getNearByTiles(coords.row, coords.col);
    tile.getReportsByTiles(coordsNearBy, function(err, reports){
        if(err) res.status(400).send("error" + err);
        else res.status(200).json(reports);
    });
});

router.get('/nearby/crimereports', function(req, res, next) {
    var coords = tile.getTileCoords(req.query.lat, req.query.lng, 14);
    var coordsNearBy = tile.getNearByTiles(coords.row, coords.col);
    tile.getCrimesByTiles(coordsNearBy, req.query.ids, function(err, reports){
        if(err) res.status(400).send("error" + err);
        else res.status(200).json(reports);
    });
});

// add report to tile
router.post('/report', function(req, res, next) {
    tile.addReportToTile(req.body, function(err, tile){
        if(err) res.status(400).send("error" + err);
        else res.status(201).json(tile);
    });
});

// like report
router.post('/:tileId/report/:id', function(req, res, next) {
    tile.likeReport(req.params.tileId, req.params.id, function(err, tile){
        if(err) res.status(400).send("error" + err);
        else res.status(200).json(tile);
    });
});

module.exports = router;