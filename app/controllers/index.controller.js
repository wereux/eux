var express = require('express');
var router = express.Router();

router.get('/', index);

function index(req, res, next) {
    res.render('index', {
        title: 'eux'
    });
}

module.exports = router;