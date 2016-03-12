var express = require('express');
var router = express.Router();
var useragent = require('../common/useragent.js');

router.get('/', index);
router.get('/about', about)

function index(req, res, next) {
    if (useragent.isMobile(req.headers['user-agent'].toLowerCase())) {
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

function about(req, res) {
    return res.render('about', {
        title: '关于我们',
        user: req.session.user
    })
}

module.exports = router;
