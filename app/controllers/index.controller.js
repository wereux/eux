var express = require('express');
var router = express.Router();

router.get('/', index);

function index(req, res, next) {
    res.render('index', {
        title: 'EUX前端视觉体验中心',
        page1: true
    });
}

module.exports = router;