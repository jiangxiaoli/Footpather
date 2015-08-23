/**
 * Created by lan on 8/22/15.
 * DB operations for user.
 */
var User = require('./models/user');

module.exports = {
    addUser: function(user, callback) {
        new User(user).save(function(err, user){
            if(err) callback(err);
            else {
                console.log("User added: \n" + JSON.stringify(user, null, 4));
                callback(null, user);
            }
        });
    },

    updateLoc: function(userId, newValue, callback) {
        User.findByIdAndUpdate(userId, {$set: newValue}, function(err, user) {
            if(err) callback(err);
            else {
                console.log("User updated: \n" + JSON.stringify(user, null, 4));
                callback(null, user);
            }
        });
    }
};