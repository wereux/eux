var fs = require('fs');
var path = require('path');

module.exports = function() {

    fs.readdirSync(path.join(__dirname, '../app/models' )).forEach(function(name) {
        require('../app/models/' + name);
    });

    console.log('读取配置完成...')

}