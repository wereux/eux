var express = require('express');
var router = express.Router();

router.get('/', blog);

function blog(req, res, next) {
    res.render('blog/index', {
        title: 'EUX博客',
        user: req.session.user
    });
}

module.exports = router;