var express = require('express');
var router = express.Router();

router.get('/', test);

function test(req, res, next) {
  res.render('test/index', {
    title: 'EUX测试',
    user: req.session.user
  });
}

module.exports = router;