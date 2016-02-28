var fs = require('fs');
var path = require('path');

module.exports = function(app) {
    fs.readdirSync(path.join(__dirname, '../config/routers' )).forEach(function(name) {
        var routeArr = require('../config/routers/' + name);
        routeArr.forEach(function(obj) {
           var url = obj.url;
            var cpath = obj.cpath;
            var handle = require('../app/controllers/' + cpath);
            app.use(url, handle);
        });
    });
}