$(function() {
    $('.eux-nav li').removeClass('active');
    $('.navbar-fixed-top').removeClass('opacity-navbar');
    //判断导航条的高亮规则
    switch (window.location.pathname) {
        case '/':
            $('.eux-nav li').eq(0).addClass('active');
            $('.navbar-fixed-top').addClass('opacity-navbar');
            break;
        case '/blog':
            $('.eux-nav li').eq(1).addClass('active');
            break;
        default:
            break;
    }

    $('#eux-collapse-btn').click(function(e) {
        e.stopPropagation();
        $('#navbar').height(window.innerHeight);
        slideLeft();

        $('body').click(function(e) {
            slideRight();
        });
    });

    //阻止导航栏的事件传递
    $('#navbar').click(function(e) {
        e.stopPropagation();
    });

    $('.eux-nav .eux-close-side').click(function() {
        slideRight();
    });

    //登录框
    $('#login-btn').click(function() {
        $('.login-form').slideDown('slow').show();
        return false;
    });
    $('.login-form .eux-close-side').click(function() {
        $('.login-form').hide();
    });

    function slideLeft() {
        $('#navbar').animate({'right': 0}, 'slow');
    }
    function slideRight() {
        $('#navbar').animate({'right': '-200px'}, 'slow');
    }

    //登录功能
    $('.login-form form').submit(function() {
        var pdata = $(this).serialize();
        $.post('/user/login', pdata, function(data) {
            data = JSON.parse(data);
            if (data.status == 200) {
                //刷新页面
                window.location.reload();
            }else {
                //显示错误提示
                $('#login-error-text').text(data.msg).show();
            }
        });

        return false;
    });
});