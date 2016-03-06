(function($) {

	$.fn.decoration = function(options) {
		//创建一些默认值，拓展任何被提供的选项
		var settings = $.extend({
			'r': 6,
			'color': '#205780',
			'lineWidth': 2,
			'speed': 0.25
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

$('.decoration').decoration();


$(function() {
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

    $('#eux-close-side').click(function() {
        slideRight();
    });

    function slideLeft() {
        $('#navbar').animate({'right': 0}, 'slow');
    }
    function slideRight() {
        $('#navbar').animate({'right': '-200px'}, 'slow');
    }
});
(function() {
	var canvas = document.getElementById('star');
	var context = canvas.getContext('2d');

	var cWidth = canvas.offsetWidth;
	var cHeight = canvas.offsetHeight;

	//这里是所有参数的配置项
	var data = {
		num: 5000, //星星的数目
		maxRadius: 1.3, //最大星星半径（范围内随机）
		color: '#4693f0', //星星的颜色（透明度随机）
		blinkNum: 0.5, //闪烁星星百分比
		blinkSpeed: 0.08 //闪烁速率，0-0.5，越小越柔和
	}

	rCanvas();
	window.onresize = rCanvas; //当浏览器窗口改变时重新设置canvas大小

	//这个函数让画布保持全屏显示
	function rCanvas() {
		canvas.setAttribute('width', window.innerWidth);
		canvas.setAttribute('height', window.innerHeight);
		//更新canvas宽度和高度
		cWidth = canvas.offsetWidth;
		cHeight = canvas.offsetHeight;
	}

	//初始化所有星星
	var stars = [];

	function initStars() {
		for (var i = 0; i < data.num; i++) {
			var x = cWidth * Math.random();
			var y = cHeight * Math.random();
			var r = 1 + (data.maxRadius - 1) * Math.random();
			var color = data.color;
			var alpha = Math.random();
			var isBlink = false;
			var blinkSpeed = data.blinkSpeed;
			//星星有20%的几率会闪烁
			if (Math.random() < data.blinkNum) {
				isBlink = true;
			}
			var star = new Star(x, y, r, color, alpha, isBlink, blinkSpeed);
			stars.push(star);
		}
	}

	initStars();

	//星星的动画
	function starAnimate() {
		context.clearRect(0, 0, cWidth, cHeight);
		for (var i = 0; i < stars.length; i++) {
			stars[i].create();
		}
		requestAnimationFrame(starAnimate);
	}
	requestAnimationFrame(starAnimate);

	//绘制一个渐变的色块
	function gradient() {
		var gradient = context.createRadialGradient(cWidth / 2, cHeight / 2, 0, cWidth / 2, cHeight / 2, cHeight / 2);
		gradient.addColorStop(0, '#1b2b3a');
		gradient.addColorStop(1, '#15222d');

		context.fillStyle = gradient;
		context.fillRect(cWidth / 4, 0, cWidth / 2, cHeight);
	}

	/**
	 * 星星的构造函数
	 * x       横向坐标
	 * y       纵向坐标
	 * r       半径
	 * color   颜色
	 * alpha   透明度
	 * isBlink 是否闪烁
	 */
	function Star(x, y, r, color, alpha, isBlink, blinkSpeed) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.color = color;
		this.alpha = alpha;
		this.isBlink = isBlink;
		this.blinkSpeed = blinkSpeed; //这里直接写死了，感觉闪烁速率应该是同步的
		this.blinkUp = true; //透明度朝哪个方向变化
	}

	Star.prototype.create = function() {
		context.fillStyle = this.color;
		context.globalAlpha = this.alpha;

		//如果需要闪烁
		if (this.isBlink) {
			if (this.blinkUp) {
				this.alpha += this.blinkSpeed;
				//如果到达或超过上限，则下一次会往下减
				if (this.alpha >= 1) {
					this.alpha = 1;
					this.blinkUp = false;
				}
			} else {
				this.alpha -= this.blinkSpeed;
				//如果到达或低于上限，则下一次会往上增
				if (this.alpha <= 0.5) {
					this.alpha = 0.5;
					this.blinkUp = true;
				}
			}
		}

		//绘制
		context.beginPath();
		context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		context.closePath();
		context.fill();
	}
})();