var express = require('express');
var router = express.Router();
var xss = require('xss');
var validate = require('../common/validate.js');
var mongoose = require('mongoose');
var permission = require('../common/permission.js');

router.get('/', permission.checkLogin, apply_page);
router.post('/', apply);

function apply_page(req, res, next) {

    var Apply = mongoose.model('Apply');

    Apply.find({}, function(err, results) {
        if (err) throw err;

        console.log(results)
        res.render('user/apply', {
            title: '报名信息',
            user: req.session.user,
            apply: results
        });
    });


}

function apply(req, res, next) {

    var obj = validateMsg(req.body.username, req.body.grade, req.body.tel, req.body.primary, req.body.message);

    if (obj.status == 200) {
        //存入数据库

        var Apply = mongoose.model('Apply');
        var apply = new Apply({
            username: xss(req.body.username),
            grade: xss(req.body.grade),
            tel: xss(req.body.tel),
            primary: xss(req.body.primary),
            mesg: xss(req.body.message)
        });

        apply.save(function(err, results) {
            if (err) throw err;
            console.log(results);
            Apply.find({}, function(err, results) {
                if (err) throw err;
                console.log(results.length);
                obj.number = results.length;
                return res.send(JSON.stringify(obj));
            });
        });
    } else {
        return res.send(JSON.stringify(obj));
    }




}

function validateMsg(username, grade, tel, primary, mesg) {
    var obj = {
        status: 400,
        msg: '发送成功，我们会尽快回复您的...'
    }
    if (validate.emptystring(username) || validate.emptystring(grade) || validate.emptystring(grade) ||  validate.emptystring(mesg)) {
        obj.msg = '输入为空！';
        return obj;
    }
    if (username.length > 20 || grade.length > 20 || primary.length > 100 || mesg.length > 200) {
        obj.msg = '字数超限！';
        return obj;
    }
    if (!validate.isTel(tel)) {
        obj.msg = '输入电话号码格式不正确！';
        return obj;
    }
    if (!validate.normalstring(username) || !validate.normalstring(grade) || !validate.normalstring(primary) || !validate.normalstring(mesg)) {
        obj.msg = '输入中包含非法字符！';
        console.log(username, grade, primary, mesg);
        console.log(validate.normalstring(username))
        console.log(validate.normalstring(grade))
        console.log(validate.normalstring(primary))
        console.log(validate.normalstring(mesg))
        return obj;
    }

    obj.status = 200;

    return obj;
}


module.exports = router;