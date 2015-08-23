/**
 * Created by lan on 8/22/15.
 * User related API
 */
var express = require('express');
var router = express.Router();
var user = require('../service/user');

router.get('/', function(req, res, next) {
  res.send('users api');
});

// update user location
router.post('/:id', function(req, res, next) {
    user.updateLoc(req.params.id, req.body, function(err, user){
        if(err) res.status(400).send("error" + err);
        else res.status(200).json(user);
    });
});


// add new user
router.post('/', function(req, res, next) {
    user.add(req.body, function(err, user){
        if(err) res.status(400).send("error" + err);
        else res.status(201).json(user);
    })
});
module.exports = router;
