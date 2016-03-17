var express = require('express');
var router = express.Router();
var xss = require('xss');
var validate = require('../common/validate.js');
var mongoose = require('mongoose');
var crypto = require('crypto');
var permission = require('../common/permission.js');

router.get('/login', permission.checkNotLogin, login_page);
router.post('/login', login);
router.get('/reg', permission.checkLogin, register);
router.post('/reg', regist);
router.get('/logout', permission.checkLogin, logout);

function logout(req, res, next) {
    req.session.user = null;
    res.redirect('back');
}

function login_page(req, res, next) {
    res.render('user/login', {
        title: '系统登录'
    });
}

function login(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    //检查是否存在该用户
    checkUser(username, password, req, function(obj) {
        res.send(JSON.stringify(obj));
    });

}

function checkUser(username, password, req, callback) {
    var psw = crypto.createHash('md5').update(password).digest('hex');
    console.log(psw);

    var obj = {
        status: 400,
        msg: '登录成功'
    }

    var User = mongoose.model('User');
    User.findOne({username: username, password: psw}, function(err, result) {
        if (err) throw err;

        if (!result) {
            obj.msg = '用户名或密码错误';
        } else {
            console.log(result);
            req.session.user = result;  //写入session
            obj.status = 200;
        }

        callback(obj);
    });
}

//返回录入页面
function register(req, res, next) {
    res.render('user/register', {
        title: '员工信息录入',
        user: req.session.user
    });
}

//录入信息到数据库
function regist(req, res, next) {

    console.log(req.body.position);
    //获取到表单数据：
    var data = {
        username: req.body.username,
        department: req.body.department,
        position: req.body.position,
        note: req.body.note
    }

    var obj = validateMsg(data);
    if (obj.status == 200) {
        var User = mongoose.model('User');

        //检查用户名是否存在
        User.find({username: data.username}, function(err, results) {
            if (err) throw err;

            if (results.length) {
                console.log(results);
                return res.send('<script>alert("用户名已存在！")</script>');
            } else {
                //密码md5后进行保存
                var md5 = crypto.createHash('md5');
                md5.update(xss(data.username));
                data.password = md5.digest('hex');


                var user = new User({
                    username: xss(data.username),
                    password: data.password,
                    department: xss(data.department),
                    position: parseInt(data.position),
                    note: xss(data.note)
                });

                user.save(function(err, results) {
                    if (err) throw err;
                    console.log(results);
                });


                return res.send('<script>alert("录入成功！")</script>');
                //return res.redirect('/user/reg');
            }
        });


    } else {
        console.log(obj.msg);
        return res.send('<script>alert("录入失败！")</script>');
        //return res.redirect('/user/reg');
    }


}

function validateMsg(data) {
    var obj = {
        status: 400,
        msg: '发送成功，我们会尽快回复您的...'
    }
    if (validate.emptystring(data.username) || validate.emptystring(data.department) || validate.emptystring(data.position)) {
        obj.msg = '输入为空！';
        return obj;
    }
    if (data.username.length > 20 || data.department.length > 20 || data.note.length > 200) {
        obj.msg = '字数超限！';
        return obj;
    }
    if (!validate.normalstring(data.username) || !validate.normalstring(data.department)) {
        obj.msg = '输入中包含非法字符！';
        return obj;
    }

    obj.status = 200;

    return obj;
}


module.exports = router;
