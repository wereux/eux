(function() {
	var canvas = document.getElementById('star');
	var context = canvas.getContext('2d');

	var cWidth = canvas.offsetWidth;
	var cHeight = canvas.offsetHeight;

	//这里是所有参数的配置项
	var data = {
		num: 500, //星星的数目
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
