/**
 * Created by lan on 8/22/15.
 * Footpather other API
 */
var express = require('express');
var router = express.Router();
var crimeReportService = require('../service/crime_report');


router.get('/', function(req, res, next) {
    res.send('footpather api');
});

router.get('/crimereports', function(req, res, next) {

    var row = req.query.row;
    var col = req.query.col;
    var start = req.query.start; //2015/08/02
    var end = req.query.end;    //2015/08/18
    var ids = req.query.ids;    //104,100,98,103,99,101,170,8,97,148,9,149,150

    crimeReportService.getCrimeReports(row, col, start, end, ids, function(err, response) {
        if(err) res.send(err);
        else res.json(response);
    });
});

module.exports = router;