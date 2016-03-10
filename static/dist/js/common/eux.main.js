(function($) {

	$.fn.decoration = function(options) {
		//创建一些默认值，拓展任何被提供的选项
		var settings = $.extend({
			'r': 6,
			'color': '#205780',
			'lineWidth': 2,
			'speed': 0.5
		}, options);

		return this.each(function() {
			new Decoration(this, settings.r, settings.color, settings.lineWidth, settings.speed);
		});
	}




	/**
	 * 首页的装饰物
	 * @param {object} obj       画布对象
	 * @param {number} r         点的半径
	 * @param {string} color     点和线的颜色
	 * @param {number} lineWidth 线宽
	 * @param {number} speed	 动画速率，最好在0-1之间，越小越慢
	 */
	function Decoration(obj, r, color, lineWidth, speed) {
		this.r = r;
		this.color = color;
		this.canvas = obj;
		this.context = this.canvas.getContext('2d');
		this.cWidth = this.canvas.offsetWidth;
		this.cHeight = this.canvas.offsetHeight;
		this.lineWidth = lineWidth;
		this.speed = speed;

		//这不是假数据，而是默认形状构造数据
		this.data = [{
			x: 36,
			y: 136
		}, {
			x: 90,
			y: 54
		}, {
			x: 118,
			y: 222
		}, {
			x: 196,
			y: 110
		}, {
			x: 246,
			y: 36
		}];
		this.points = [];	//用来存放5个点对象
		this.init();	//初始化
	}

	Decoration.prototype.init = function() {
		var self = this;
		this.initPoint();	//初始化点对象

		//这个this指向我也是醉了。。。
		requestAnimationFrame(function() {
			self.pointAnimate();
		});
	}

	Decoration.prototype.initPoint = function() {
		for (var i = 0; i < this.data.length; i++) {
			var point = new Point(this.data[i].x, this.data[i].y, this.r, this.color, this.speed);
			this.points.push(point);
		}
	}

	Decoration.prototype.pointAnimate = function() {
		//以下代码将会无限循环执行，从而构成了动画
		var self = this;
		this.context.clearRect(0, 0, this.cWidth, this.cHeight);
		var x = [];
		var y = [];
		for (var i = 0; i < this.points.length; i++) {
			//绘制每个点
			this.points[i].create(this.context);
			x[i] = this.points[i].getPoint().x;
			y[i] = this.points[i].getPoint().y;
		}
		//绘制连线
		this.drawLine(x[0], y[0], x[1], y[1]); //连接1和2
		this.drawLine(x[1], y[1], x[2], y[2]); //连接2和3
		this.drawLine(x[1], y[1], x[3], y[3]); //连接2和4
		this.drawLine(x[2], y[2], x[3], y[3]); //连接3和4
		this.drawLine(x[3], y[3], x[4], y[4]); //连接4和5

		//console.log('绘制完毕...');

		//蛋疼的this指向问题。。。
		requestAnimationFrame(function() {
			self.pointAnimate();
		});
	}

	Decoration.prototype.drawLine = function(x1, y1, x2, y2) {
		this.context.strokeStyle = this.color;
		this.context.lineWidth = this.lineWidth;
		this.context.beginPath();
		this.context.moveTo(x1, y1);
		this.context.lineTo(x2, y2);
		this.context.closePath();
		this.context.stroke();
	}



//点的构造函数
	function Point(x, y, r, color, speed) {
		this.x = x;
		this.originX = x;
		this.y = y;
		this.originY = y;
		this.r = r;
		this.color = color;

		this.dx = (Math.random() * 2 - 1) * speed;
		this.dy = (Math.random() * 2 - 1) * speed;
	}

	Point.prototype.create = function(context) {

		context.fillStyle = this.color;

		//每次绘制时点可以做移动
		this.x += this.dx;
		this.y += this.dy;


		if (this.x > this.originX + 30 || this.x < this.originX - 30) {
			//如果直线运动到边界，则朝相反方向运动
			this.dx = -this.dx;
		}
		if (this.y > this.originY + 30 || this.y < this.originY - 30) {
			//如果直线运动到边界，则朝相反方向运动
			this.dy = -this.dy;
		}

		context.beginPath();
		context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		context.closePath();
		context.fill();
	}

	Point.prototype.getPoint = function() {
		return {
			x: this.x,
			y: this.y
		}
	}
})(jQuery);




$(function() {
    $('.decoration').decoration();
});


$(function () {
    $('.eux-message-btn').click(function() {
        $('.eux-message').fadeIn('slow');
        return false;
    });
    $('.eux-message .eux-close-side').click(function() {
        $('.eux-message').fadeOut('slow');
    });

    $('#eux-message-form').submit(function() {
        var pdata = $(this).serialize();
        alert(pdata);
        $.post('/message', pdata, function(data) {
            data = JSON.parse(data);
            if (data.status == 200) {
                alert('留言成功！');
            } else {
                alert(data.msg);
            }
        });
        return false;
    });
});
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
        $('.login-form').slideDown('fast').show();
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
