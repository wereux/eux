var express = require('express');
var router = express.Router();

router.get('/', index);

function index(req, res, next) {
    res.render('index_m', {
        title: 'EUX前端视觉体验中心'
    });
}

module.exports = router;