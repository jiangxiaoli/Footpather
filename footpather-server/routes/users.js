/**
 * Created by lan on 8/22/15.
 * User related API
 */
var express = require('express');
var router = express.Router();
var userdb = require('../dao/user');
var tile = require('../service/tile');

router.get('/', function(req, res, next) {
  res.send('users api');
});

// update user location
router.post('/:id', function(req, res, next) {
    var loc = {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        row: null,
        col: null
    };

    // default zoom to be 14 to get crime data from crime reports
    var tileCoords = tile.getTileCoords(loc.latitude, loc.longitude, 14);
    loc.row = tileCoords.row;
    loc.col = tileCoords.col;

    userdb.updateLoc(req.params.id, loc, function(err, user){
        if(err) res.status(400).send("error" + err);
        else res.status(200).json(user);
    });
});


// add new user
router.post('/', function(req, res, next) {
    userdb.addUser(req.body, function(err, user){
        if(err) res.status(400).send("error" + err);
        else res.status(201).json(user);
    })
});
module.exports = router;
