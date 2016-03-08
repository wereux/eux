(function() {
    var previous = {};
    var vx = 0.035,	//移动速率，越小越慢，注意x和y必须保持比例关系
        vy = 0.050;

    var oTop = document.getElementById('eux-top');
    var oMid = document.getElementById('eux-mid');
    var oBot = document.getElementById('eux-bot');

    var signData = {
        top: {
            x: parseInt(getComputedStyle(oTop).left),
            y: parseInt(getComputedStyle(oTop).top)
        },
        bot: {
            x: parseInt(getComputedStyle(oBot).left),
            y: parseInt(getComputedStyle(oBot).top)
        }
    }


    window.onmousemove = function(e) {
        if (previous.x) {
            var dx = e.clientX - previous.x,
                dy = e.clientY - previous.y;
            //console.log(dy)
            var vdx = dx * vx;
            var vdy = dy * vy;

            signData.top.x += vdx;
            signData.top.y += vdy;
            signData.bot.x -= vdx;
            signData.bot.y -= vdy;
            //console.log(signData.top.y)
            //边界判断，咋写的这么别扭呢。。。
            if (signData.top.x < -14) {
                signData.top.x = -14;
            }
            if (signData.top.x > 14) {
                signData.top.x = 14;
            }
            if (signData.top.y < -18) {
                signData.top.y = -18;
            }
            if (signData.top.y > 18) {
                signData.top.y = 18;
            }
            if (signData.bot.x < -6) {
                signData.bot.x = -6;
            }
            if (signData.bot.x > 6) {
                signData.bot.x = 6;
            }
            if (signData.bot.y < -10) {
                signData.bot.y = -10;
            }
            if (signData.bot.y > 10) {
                signData.bot.y = 10;
            }


            oTop.style.left = signData.top.x + 'px';
            oTop.style.top = signData.top.y + 'px';
            oBot.style.left = signData.bot.x + 'px';
            oBot.style.top = signData.bot.y + 'px';
        }
        previous.x = e.clientX;
        previous.y = e.clientY;
    }
})();
