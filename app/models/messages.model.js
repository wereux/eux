var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    username: {
        type: String,
        required: '用户名不能为空',
        trim: true
    },
    grade: {
        type: String,
        required: '班级不能为空',
        trim: true
    },
    tel: {
        type: String,
        required: '电话不能为空',
        trim: true
    },
    mesg: {
        type: String,
        required: '消息不能为空',
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Message', MessageSchema);

console.log('模型已经建立...');
