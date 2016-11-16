(function ($) {
    $.extend({
        open_QQ: function (qqLinks,autoOpenQQ) {
            var self = $(this);
			var qqLinks = 'http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODAzNTQwM180MzQ1NjVfNDAwNzA2MDcwMF8yXw'
			var qqQun = 'luoyu';
			var firstTime = true;
			
			var openQQChat = function() {
			    BaiduClient.onEvent('open', 'qqqun', qqQun);
			    setTimeout(function () {
			        var date = new Date().getTime();
			        if ($('iframe[scrolling=no]').contents().find('#launchBtn')[0] != undefined) {		//判断页面上是否存在 qq 生成的代码
			            $('iframe[scrolling=no]').contents().find('#launchBtn')[0].click();
			        } else {
			            if (firstTime) {
			                if (!$("#contectqq")[0]) {
			                    var qq_iframe = '<iframe id="contectqq" style="display:none;" src='+ qqLinks +'></iframe>';
			                }
			                $("body").append(qq_iframe);
			                changeSrc();
			                firstTime = false;
			            }
			            window.open($('#contectqq').attr('src') + "&_tmp=" + date);
			        }
			        //$('#contectqq').attr('src', $('#contectqq').attr('src') + "&_tmp="+ date);
			    }, 200);
			}
			
            //初始化页面元素
            

			var changeSrc = function() {
			    var pageParams = window.location.params();
			    if (pageParams && pageParams['key'] != undefined) {
			        BaiduClient.onEvent('load', 'param', pageParams.key);
			    }
			    //根据参数QQ的不同来决定打开不同的QQ群
			    //$('#contectqq').attr('src', 'http://sighttp.qq.com/authd?IDKEY=0c9f0f962b0c32d16966439a47cffac9650f777af4cb2dc5');
				//  $('#contectqq').attr('src', 'http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODAzNTQwM180MzQ1NjVfNDAwNzA2MDcwMF8yXw');
			    if (pageParams && pageParams['qq'] != undefined) {
			        BaiduClient.onEvent('load', 'param', pageParams.qq);
			        qqQun = pageParams.qq;
			        if (pageParams.qq == 'dingding') {
			            $('#contectqq').attr('src', 'http://sighttp.qq.com/authd?IDKEY=3db14a84e4322328f15f65fb089083a44ec9947978d31fc6');
			        } else if (pageParams.qq == '08qun') {
			            $('#contectqq').attr('src', 'http://jq.qq.com/?_wv=1027&k=2IBj5eJ');
			        } else if (pageParams.qq == '15qun') {
			            $('#contectqq').attr('src', 'http://jq.qq.com/?_wv=1027&k=28ekNsE');
			        } else if (pageParams.qq == 'jinlaoshi') {
			            $('#contectqq').attr('src', 'http://sighttp.qq.com/authd?IDKEY=f5b01d491fdc648e6be5707909fc0322181362e608a419f4');
			        } else if (pageParams.qq == 'luoyu') {
			            $('#contectqq').attr('src', 'http://sighttp.qq.com/authd?IDKEY=0c9f0f962b0c32d16966439a47cffac9650f777af4cb2dc5');
			        } else if (pageParams.qq == 'liusu') {
			            $('#contectqq').attr('src', 'http://sighttp.qq.com/authd?IDKEY=34b63775cd5594d16c5385a8c5af87a61d29f8d189272551');
			        }
			    }
			}
			
			var firstClickQQ = function () {
			    setTimeout(function () {
			        if ($('iframe[scrolling=no]').contents().find('#launchBtn')[0] != undefined) {
			            openQQChat();
			        } else {
			            firstClickQQ();
			        }
			    }, 100)
			}
            //页面元素绑定事件
            var bindEvent = function () {
                
            };
            firstClickQQ();
        }
    });
})
(jQuery);

