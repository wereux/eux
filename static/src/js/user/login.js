$(function() {
    //登录页登录功能
    $('.login-page form').submit(function() {
        var pdata = $(this).serialize();
        $.post('/user/login', pdata, function(data) {
            data = JSON.parse(data);
            if (data.status == 200) {
                //刷新页面
                window.location.reload();
            }else {
                //显示错误提示
                alert(data.msg);
            }
        });

        return false;
    });
});