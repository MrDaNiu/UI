/**
 * Created by Sen Fu on 2016/10/28.
 *
 * 调用:$.select_address(requireUrl,$self);
 *
 * 参数：
 * requireUrl：请求路径，作为 ajax 请求的 url 参数来使用。例如："/home/index"
 * $self: 元素的 jQuery 对象，例如 $("#id");
 *
 * CSS 样式由于各个需求不同，并没有在 js 中定义，需要自己根据需求自定义；
 */
(function ($) {
    $.extend({
        select_address: function (requireUrl,$self) {
            var requiredTimes = 3;  //如果请求数据失败将继续请求，准许继续请求次数限制
            var address;    //输入库放回 data
            var cities;     //城市数据
            var districts;  //地区数据
            var provincesSelect = "select-provinces", citiesSelect = "select-cities", districtsSelect = "select-districts";
            var provincesOption = "<option value=''>选择省份</option>";     //未选择省份时默认 option
            var citiesOption = "<option value=''>选择城市</option>";        //未选择城市时默认 option
            var districtsOption = "<option value=''>选择地区</option>";     //未选择地区时默认 option

            //根据提供的地址来请求数据库中的地址数据，数据存到address，如果请求成功初始化页面元素
            var requireAddress = function(){
                var localStoryData = localStorage.getItem("localStory_select_address_data");
                if(localStoryData){
                    address = JSON.parse(localStoryData);
                    init();
                }
                $.ajax({
                    type: "GET",
                    url: requireUrl,
                    success: function (data) {
                        if(!localStoryData){
                            address = data;
                            init();
                        }
                        localStorage.setItem("localStory_select_address_data",JSON.stringify(data));
                        console.log(data)
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown){
                        console.log("请求对象XMLHttpRequest: "+XMLHttpRequest);
                        console.log("错误类型textStatus: "+textStatus);
                        console.log("异常对象errorThrown: "+errorThrown);
                        for(requiredTimes; requiredTimes > 0; requiredTimes--){
                            requireAddress();
                        }
                    }
                })
            };

            //初始化页面元素，每个 select     — — — —    该处的 name 属性的定义根据最初的数据存储需求而定，如后期有指定需求可以将其扩展
            var init = function () {
                var elements = '<span><select name="address[provinces]" id="' + provincesSelect + '">' + provincesOption + '</select></span><span><select name="address[cities]" id="' + citiesSelect + '">' + citiesOption + '</select></span><span><select name="address[districts]" id="' + districtsSelect + '">' + districtsOption + '</select></span>';
                $self.append(elements);
                bindEvent();
            };

            //页面元素绑定事件
            var bindEvent = function () {
                var $provincesSelect = $("#" + provincesSelect);    //省份选择 jQuery 对象
                var $citiesSelect = $("#" + citiesSelect);          //城市选择 jQuery 对象
                var $districtsSelect = $("#" + districtsSelect);    //地区选择 jQuery 对象
                //循环生成省份下拉菜单
                for (var i = 0; i < address.length; i++) {
                    var ID = address[i].id;
                    var Name = address[i].name;
                    var options = "<option id='" + ID + "' value = '" + Name + "'>" + Name + "</option>";
                    $provincesSelect.append(options);
                }
                //省份下拉菜单绑定change事件，当其修改之后，其对应的城市和地区数据更新，更新对应的下拉菜单
                $provincesSelect.change(function () {
                    for (var i = 0; i < address.length; i++) {
                        if ($provincesSelect.val() == address[i].name) {
                            cities = address[i].cities;
                            $citiesSelect.children().remove();
                            $districtsSelect.children().remove();
                            $citiesSelect.append(citiesOption);
                            $districtsSelect.append(districtsOption);
                            break;
                        } else if ($provincesSelect.val() == "") {
                            cities = null;
                            $citiesSelect.children().remove();
                            $districtsSelect.children().remove();
                            $citiesSelect.append(citiesOption);
                            $districtsSelect.append(districtsOption);
                        }
                    }
                    //循环生成城市下拉菜单
                    if (cities) {
                        for (var i = 0; i < cities.length; i++) {
                            var ID = cities[i].id;
                            var Name = cities[i].name;
                            var options = "<option id='" + ID + "' value = '" + Name + "'>" + Name + "</option>";
                            $citiesSelect.append(options);
                        }
                    }
                });
                //城市下拉菜单绑定change事件，当其修改之后，其对应的地区数据更新，更新对应的下拉菜单
                $citiesSelect.change(function () {
                    for (var i = 0; i < cities.length; i++) {
                        if ($citiesSelect.val() == cities[i].name) {
                            districts = cities[i].districts
                            $districtsSelect.children().remove();
                            $districtsSelect.append(districtsOption);
                            break;
                        } else if ($citiesSelect.val() == "") {
                            districts = null;
                            $districtsSelect.children().remove();
                            $districtsSelect.append(districtsOption);
                        }
                    }
                    //循环生成地区下拉菜单
                    if (districts) {
                        for (var i = 0; i < districts.length; i++) {
                            var ID = districts[i].id;
                            var Name = districts[i].name;
                            var options = "<option id='" + ID + "' value = '" + Name + "'>" + Name + "</option>";
                            $districtsSelect.append(options);
                        }
                    }
                })
            };
            requireAddress();
        }
    });
})
(jQuery);