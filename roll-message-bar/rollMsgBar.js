$.fn.extend({
	rollMsgBar: function() {
		var self = $(this);
		var ul = $(self.find('ul').first());
		var init = function() {
			var t = setInterval(function() {
				move()
			}, 2000)
			self.hover(function() {
				clearInterval(t);
			}, function() {
				t = setInterval(function() {
					move()
				}, 2000)
			})
		}
		var move = function() {
			ul.stop().animate({
				top: -1 * $(ul.find("li")).height()
			}, 1000,function(){
				$(ul.find("li").first()).appendTo(ul);
				ul.css("top",0);
			})
		}
		
		if(self.height() < ul.height()){
			init();
		}
	}
})
//$(".scrollbar").rollMsgBar(7);
