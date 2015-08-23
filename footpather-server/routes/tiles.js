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


// add report to tile
router.post('/report', function(req, res, next) {
    tile.addReportToTile(req.body, function(err, tile){
        if(err) res.status(400).send("error" + err);
        else res.status(201).json(tile);
    });
});

module.exports = router;