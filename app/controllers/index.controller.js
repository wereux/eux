var express = require('express');
var router = express.Router();
var useragent = require('../common/useragent.js');

router.get('/', index);

function index(req, res, next) {
  if (req.headers['user-agent'] && useragent.isMobile(req.headers['user-agent'].toLowerCase())) {
    return res.render('index_m', {
      title: 'EUX前端视觉体验中心'
    });
  } else {
    return res.render('index', {
      title: 'EUX前端视觉体验中心',
      user: req.session.user
    });
  }
}

module.exports = router;