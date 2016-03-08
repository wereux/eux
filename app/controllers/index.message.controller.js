var express = require('express');
var router = express.Router();
var xss = require('xss');
var validate = require('../common/validate.js');
var mongoose = require('mongoose');

router.post('/', postMsg);

function postMsg(req, res, next) {

    console.log('走到这里了');
    var obj = validateMsg(req.body.username, req.body.grade, req.body.tel, req.body.mesg);


    if (obj.status == 200) {
        //存入数据库
        var Message = mongoose.model('Message');
        var message = new Message({
            username: xss(req.body.username),
            grade: xss(req.body.grade),
            tel: xss(req.body.tel),
            mesg: xss(req.body.mesg)
        });

        message.save(function(err, results) {
            if (err) throw err;
            console.log(results);
        });
    }


    res.send(JSON.stringify(obj));

}

function validateMsg(username, grade, tel, mesg) {
    var obj = {
        status: 400,
        msg: '发送成功，我们会尽快回复您的...'
    }
    if (validate.emptystring(username) || validate.emptystring(grade) || validate.emptystring(mesg)) {
        obj.msg = '输入为空！';
        return obj;
    }
    if (username.length > 20 || grade.length > 20 || mesg.length > 200) {
        obj.msg = '字数超限！';
        return obj;
    }
    if (!validate.isTel(tel)) {
        obj.msg = '输入电话号码格式不正确！';
        return obj;
    }
    if (!validate.normalstring(username) || !validate.normalstring(grade) || !validate.normalstring(mesg)) {
        obj.msg = '输入中包含非法字符！';
        return obj;
    }

    obj.status = 200;

    return obj;
}


module.exports = router;