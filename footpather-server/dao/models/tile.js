/**
 * Created by lan on 8/22/15.
 * Define tile data model
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var report = new Schema({
    date: Date,     // the report create time
    likes: Number,   // the number of likes
    latitude: Number,
    longitude: Number,
    type: String,   // report type
    description: String
});

var tileSchema = new Schema({
    row: {type: Number, index: true},
    col: {type: Number, index: true},
    reports: [report]
});

module.exports = mongoose.model('Tile', tileSchema);