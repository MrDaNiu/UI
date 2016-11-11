$.fn.extend({
	rollMsgBar: function(showMsgCounts) {
		if(!showMsgCounts){
			showMsgCounts = 5;
		}
		var self = $(this);
		var ul = $(self.find('ul').first());
		var infoCount = ul.find("li").length;
		if(infoCount > showMsgCounts) {
			var clone = $(ul.find("li")).clone();
			ul.append(clone);
		}
		var lineheight = $(ul.find("li")).height() + 1;
		var i = 0
		var init = function() {
			if(infoCount > showMsgCounts) {
				var t = setInterval(function() {
					if(infoCount > i) {
						i++;
					} else {
						ul.css('top', 0);
						i = 1;
					}
					move()
				}, 2000)
				self.hover(function() {
					clearInterval(t);
				}, function() {
					t = setInterval(function() {
						if(infoCount > i) {
							i++;
						} else {
							ul.css('top', 0);
							i = 1;
						}
						move()
					}, 2000)
				})
			}
		}
		var move = function() {
			ul.stop().animate({
				top: -i * lineheight
			}, 1000)
		}
		init();
	}
})
//$(".scrollbar").rollMsgBar(7);
