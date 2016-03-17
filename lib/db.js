var mongoose = require('mongoose');
var dbconfig = require('../config/db.js');

module.exports = function() {
    var db = mongoose.connect(dbconfig.uri, function(err) {
        if (err) {
            console.error('无法连接到数据库!');
            console.log(err);
            return
        }
        console.log('连接数据库成功！');
        //自动连接模型
        require('./model.js')();
    });
    mongoose.connection.on('error', function(err) {
            console.error('MongoDB connection error: ' + err);
            process.exit(-1);
        }
    );
    return db;
}
