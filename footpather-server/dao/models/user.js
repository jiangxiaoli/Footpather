/**
 * Created by lan on 8/22/15.
 * Define user data model
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    icon: String,
    user_name: String,
    latitude: Number,
    longitude: Number,
    row: {type: Number, index: true},
    col: {type: Number, index: true}
});

module.exports = mongoose.model('User', userSchema);