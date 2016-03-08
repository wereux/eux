var express = require('express');
var router = express.Router();

router.get('/', blog);

function blog(req, res, next) {
    res.render('blog/index', {
        title: 'EUX博客'
    });
}

module.exports = router;