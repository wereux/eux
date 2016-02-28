/**
 *
 * @type {*|exports|module.exports}
 */

var express = require('express');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var path = require('path');
var hbs = require('hbs');

var app = module.exports = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/app/views');

//设置partials
hbs.registerPartials(__dirname + '/app/views/partials');


if (!module.parent) app.use(logger('dev'));

//app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

app.use(express.static(__dirname + '/static'));

app.use(cookieParser());
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'eux'
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//配置路由
require('./lib/router.js')(app);

//连接数据库
var db = require('./lib/db.js')();


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}