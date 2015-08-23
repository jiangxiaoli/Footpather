/**
 * Created by lan on 8/22/15.
 * Tile related API
 */
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.send('tiles api');
});

module.exports = router;