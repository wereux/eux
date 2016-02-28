var mongoose = require('mongoose');
var dbconfig = require('../config/db.js');

module.exports = function() {
    var db = mongoose.connect(dbconfig.uri, function(err) {
        if (err) {
            console.error('Could not connect to MongoDB!');
            console.log(err);
        }
    });
    mongoose.connection.on('error', function(err) {
            console.error('MongoDB connection error: ' + err);
            process.exit(-1);
        }
    );
    return db;
}