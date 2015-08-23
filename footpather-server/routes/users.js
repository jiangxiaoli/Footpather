/**
 * Created by lan on 8/22/15.
 * User related API
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('users api');
});


module.exports = router;
