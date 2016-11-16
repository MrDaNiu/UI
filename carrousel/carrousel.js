(function($) {
	$.fn.extend({
		carrousel: function() {
			var self = $(this);
			var i = 0;
			var size = 0;
			var img = $(self.find('ul').first());
			var num = $("<ul class='num'></ul>");
			var defaltWidth = 980;
			var init = function() {
				self.css({'position':'relative','overflow':'hidden','height':'400'});
				self.append(num);
				img.addClass('img');
				var clone = img.find('li').first().clone();
				img.append(clone);
				size = $(img.find('li')).size();
				//添加小圆点
				for (j = 0; j < size - 1; j++) {
					num.append('<li></li>');
				}
				num.find('li').first().addClass('on');
				//小圆点hover事件
				num.find('li').hover(function() {
						var index = $(this).index();
						i = index;
						move()
					})
					//自动轮播
				var t = setInterval(function() {
					i++;
					move()
				}, 4000)
				$('.banner').hover(function() {
						clearInterval(t);
					}, function() {
						t = setInterval(function() {
							i++;
							move()
						}, 4000)
					})
					/*想左的按钮*/
				$(".banner .btn-left").click(function() {
						i++;
						move()
					})
					/*想右的按钮*/
				$(".banner .btn-right").click(function() {
					i--;
					move()
				})
				$(window).resize(function() {
					onResize();
				})
			}
			var move = function() {
				if ($(window).innerWidth() < 980) {
					defaltWidth = $(window).innerWidth();
				} else {
					defaltWidth = 980;
				}
				if (i == size) {
					img.css('left', 0);
					i = 1;
				}
				if (i < 0) {
					i = size - 2;
					img.css('left', -(i + 1) * defaltWidth);
				}
				img.stop().animate({
					left: -i * defaltWidth
				}, defaltWidth)
				if (i == size - 1) {
					num.find('li').eq(0).addClass('on').siblings().removeClass("on");
				} else {
					num.find('li').eq(i).addClass('on').siblings().removeClass("on");
				}
			}
			var onResize = function() {
				if ($(window).innerWidth() < 980) {
					img.find('li').css('width', $(window).innerWidth());
					img.find('li').find('img').css('width', $(window).innerWidth());
				} else {
					img.find('li').css('width', 980);
					img.find('li').find('img').css('width', 980);
				}
			}
			init();
		}
	})
	$.fn.extend({
		carrouselplus: function(width) {
			var self = $(this);
			var i = 0;
			var size = 0;
			var img = $(self.find('ul').first());
			var num = $("<ul class='num'></ul>");
			var defaltWidth = 315;
			var init = function() {
				self.css({'position':'relative','overflow':'hidden','height':'270','background-color':'#087eca','width':defaltWidth});
				self.append(num);
				img.addClass('img');
				var clone = img.find('li').first().clone();
				img.append(clone);
				size = $(img.find('li')).size();
				//添加小圆点
				for (j = 0; j < size - 1; j++) {
					num.append('<li></li>');
				}
				num.find('li').first().addClass('on');
				//小圆点hover事件
				num.find('li').hover(function() {
						var index = $(this).index();
						i = index;
						move()
					})
					//自动轮播
				var t = setInterval(function() {
					i++;
					move()
				}, 4000)
				$('.banner').hover(function() {
						clearInterval(t);
					}, function() {
						t = setInterval(function() {
							i++;
							move()
						}, 4000)
					})
			}
			var move = function() {
				if (i == size) {
					img.css('left', 0);
					i = 1;
				}
				if (i < 0) {
					i = size - 2;
					img.css('left', -(i + 1) * defaltWidth);
				}
				img.stop().animate({
					left: -i * defaltWidth
				}, defaltWidth)
				if (i == size - 1) {
					num.find('li').eq(0).addClass('on').siblings().removeClass("on");
				} else {
					num.find('li').eq(i).addClass('on').siblings().removeClass("on");
				}
			}
			init();
		}
	})

//	$(".banner").carrousel();
//	$(".left").carrouselplus();
})(jQuery)