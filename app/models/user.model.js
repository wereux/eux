var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: '用户名不能为空',
        trim: true
    },
    password: {
        type: String,
        required: '密码不能为空'
    },
    grade: {
        type: String,
        default: '',
        trim: true
    },
    tel: {
        type: String,
        default: '',
        trim: true
    },
    mail: {
        type: String,
        default: '',
        trim: true
    },
    address: {
        type: String,
        default: '',
        trim: true
    },
    department: {
        type: String,
        required: '部门不能为空',
        trim: true
    },
    position: {
        type: Number,
        required: '职位不能为空'
    },
    note: {
        type: String,
        default: '',
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('User', UserSchema);

console.log('模型已经建立...');
