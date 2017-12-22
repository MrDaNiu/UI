//调用该组件，图片需要放在一个div里面
//该组件展示还没添加拓展，以后有需求可以添加
$.fn.extend({
    zoomfiy: function (options) {
        var self = this,
            $self = $(this),
            opt = {
                modalContainer: '',
                imgContainer: ''
            };
        opt = $.extend(opt, options);
        var init = function () {
            return $self.each(function (index) {
                create($($self[index]));
                bind($($self[index]));
            })
        };
        var create = function ($self) {
            var modal =
                '<div class=ui-modal-img>' +
                '   <span class="span-icon-outer">' +
                '       <span class="span-icon-circle">' +
                '           <span class="span-icon-horizontal-line"></span>' +
                '           <span class="span-icon-vertical-line"></span>' +
                '       </span>' +
                '       <span class="span-icon-oblique-line"></span>' +
                '   </span>' +
                '</div>';
            var popup =
                '<div class="ui-modal-popup">' +
                '   <img src="" alt="">' +
                '</div>';
            $self.after(modal).after(popup);
            $self.parent().css({
                'position': 'relative',
                'cursor': 'pointer'
            });
            $('.ui-modal-img').css({
                'display': 'none',
                'background-color': '#333333',
                'opacity': 0.5,
                'position': 'absolute',
                'top': 0,
                'right': 0,
                'left': 0,
                'bottom': 0,
                'background-repeat': 'no-repeat',
                'background-position': 'center',
                'z-index': 1
            });
            $('.span-icon-outer').css({
                'position': 'relative',
                'left': '50%',
                'top': '50%',
                'transform': 'translate(-50%,-50%)',
                'width': '24px',
                'height': '24px',
                'display': 'inline-block'
            });
            $('.span-icon-circle').css({
                'height': '16px',
                'width': '16px',
                'display': 'block',
                'border': '2px #FFF solid',
                'border-radius': '100%',
                '-webkit-border-radius': '100%',
                '-moz-border-radius': '100%',
                'position': 'absolute',
                'top': 0,
                'left': 0
            });
            $('.span-icon-oblique-line').css({
                'height': '10px',
                'width': '4px',
                'display': 'block',
                'background': '#FFF',
                'transform': 'rotate(-45deg)',
                '-webkit-transform': 'rotate(-45deg)',
                '-moz-transform': 'rotate(-45deg)',
                '-o-transform': 'rotate(-45deg)',
                '-ms-transform': 'rotate(-45deg)',
                'position': 'absolute',
                'top': '15px',
                'left': '18px'
            });
            $('.span-icon-horizontal-line').css({
                'height': '2px',
                'width': '10px',
                'display': 'block',
                'background': '#FFF',
                'position': 'absolute',
                'top': '7px',
                'left': '3px'
            });
            $('.span-icon-vertical-line').css({
                'height': '2px',
                'width': '10px',
                'display': 'block',
                'background': '#FFF',
                'position': 'absolute',
                'top': '7px',
                'left': '3px',
                'transform': 'rotate(-90deg)',
                '-webkit-transform': 'rotate(-90deg)',
                '-moz-transform': 'rotate(-90deg)',
                '-o-transform': 'rotate(-90deg)',
                '-ms-transform': 'rotate(-90deg)'
            });
            $('.ui-modal-popup').css({
                'background-color': 'rgba(0,0,0,0.5)',
                'width': '100%',
                'height': '100%',
                'position': 'fixed',
                'left': 0,
                'top': 0,
                'text-align': 'center',
                'z-index': 999,
                'display': 'none'
            });
            $('.ui-modal-popup img').css({
                'max-width': '80%',
                'max-height': '80%',
                'position': 'absolute',
                'left': '50%',
                'top': '50%',
                'transform': 'translate(-50%,-50%)',
                'z-index': 999,
            })
        };
        var bind = function ($self) {
            $self.parent().unbind().hover(function () {
                event.stopPropagation();
                $self.siblings('.ui-modal-img').slideDown();
            }, function () {
                event.stopPropagation();
                $self.siblings('.ui-modal-img').slideUp();
            });


            $self.parent().on('click', function () {
                $self.siblings('.ui-modal-popup').find('img').attr('src', $self.attr('src'));
                $self.siblings('.ui-modal-popup').fadeIn();
            });

            $('.ui-modal-popup').on('click', function () {
                event.stopPropagation();
                $(this).fadeOut();
            });
        };
        init();
    }
});
