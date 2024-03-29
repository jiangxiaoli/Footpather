/**
 * Created by lan on 8/22/15.
 * DB operations for user.
 */
var User = require('./models/user');

module.exports = {
    getUsers: function(coords, callback) {
        User.find(coords, callback);
    },

    addUser: function(user, callback) {
        new User(user).save(callback);
    },

    updateLoc: function(userId, newValue, callback) {
        User.findByIdAndUpdate(userId,
            {$set: newValue},
            {new: true},
            callback);
    }
};