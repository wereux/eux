Zepto(function($) {
    $('.m-nav').height(window.innerHeight);
    //点击菜单
    $('.m-menu-btn').tap(function() {
        //$('.m-nav').animate({right: 0}, 500);
        $('.m-nav').css({
            right: 0,
            transition: '1s'
        });
    });
    //点击关闭按钮
    $('.m-nav .close-btn').tap(function() {
       // $('.m-nav').animate({right: '-200px'}, 500);
        $('.m-nav').css({
            right: '-200px',
            transition: '1s'
        });
    });

    //轮播图
    var mySwiper = new Swiper('.m-main .swiper-container',{
        pagination : '.swiper-pagination',
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
    });

    var $page = $('.m-page');

    //滑屏滚动

    //这个兼容性问题很头疼啊，写了半天还不如用插件一句话搞定。。。。

    ////去除默认的拖动事件
    //$(document).on('touchmove',function(e){
    //    e.preventDefault();
    //});
    //
    //$page.on('touchstart', function(e) {
    //   var touch = e.changedTouches[0];
    //    var originx = touch.clientX;
    //    var originy = touch.clientY;
    //    var nowIndex = $(this).index() - 2;
    //    var nextIndex = 0;
    //
    //    $(this).on('touchmove', function(e) {
    //        var touch = e.changedTouches[0];
    //
    //        $(this).siblings('.m-page').hide();
    //        $(this).removeClass('zoom-index');
    //
    //
    //        if (touch.clientY < originy) {
    //            nextIndex = nowIndex + 1;
    //            if (nextIndex >= $page.length) {
    //                return false;
    //            }
    //            //console.log($(this).next());
    //            //下一页面放到底部
    //
    //            $page.eq(nextIndex).css('transform','translate(0,'+(window.innerHeight + touch.clientY - originy)+'px)')
    //                .addClass('zoom-index').show();
    //
    //        } else if (touch.clientY > originy) {
    //            nextIndex = nowIndex - 1;
    //            console.log(nowIndex);
    //            if (nextIndex < 0) {
    //                return false;
    //            }
    //
    //            //上一页面放到顶部
    //            $page.eq(nextIndex).css('transform','translate(0,'+(-window.innerHeight + touch.clientY - originy)+'px)')
    //                .addClass('zoom-index').show();
    //        }
    //
    //        //用来定义当前页面应该如何缩放
    //        $(this).css('transform','translate(0,'+(touch.clientY - originy)/4+'px) scale('+(1-Math.abs(touch.clientY - originy)/window.innerHeight/4)+')');
    //    });
    //
    //    $(this).on('touchend', function(e) {
    //        var touch = e.changedTouches[0];
    //
    //        if (touch.clientY < originy) {
    //            $(this).css('transform','translate(0,'+(-window.innerHeight / 4)+'px) scale(0.75)');
    //        } else if (touch.clientY > originy) {
    //            $(this).css('transform','translate(0,'+(window.innerHeight / 4)+'px) scale(0.75)');
    //        }
    //        $(this).css({
    //            display: 'none',
    //            transition: '.3s'
    //        });
    //        console.log(nextIndex);
    //        $page.eq(nextIndex).css({
    //            transform: 'translate(0, 0)',
    //            transition: '.3s'
    //        });
    //    });
    //
    //});

    //用插件还是如此简单。。。
    $('.page-slider').height(window.innerHeight);
    var mySwiper = new Swiper('.page-slider', {
        direction : 'vertical',
        autoHeight: true
    });




});