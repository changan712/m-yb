//loadding
define(function (require) {

    var _ = require('_');
   // var $ = require('$');
    var Backbone = require('backbone');
    var LoaddingView = Backbone.View.extend({
        id: 'com-loadding',
        className: 'com-loadding',
        template: _.template($('#tpl-com-lodding').html()),
        initialize: function () {
            if (typeof LoaddingView.instance === "object") {
                return LoaddingView.instance;
            }
            LoaddingView.instance = this;
            this.time = null;
            this.isShow = false;
            this.render();
            this.anm = this.$('.loadding-anm');
        },
        render: function () {
            this.$el.attr('cid', this.cid);
            this.$el.html(this.template());
            this.trigger('render');
            return this;
        },
        show: function () {
            this.$el.removeClass('hide').addClass('show');
            this.isShow = true;
            this.anm.show();
        },
        hide: function () {
            var _this = this;
            if (this.time) {
                return;
            }
            this.time = setTimeout(function () {
                _this.$el.removeClass('show').addClass('hide');
                 setTimeout(function(){
                    _this.$el.hide();
                    _this.$el.removeClass('hide');
                     setTimeout(function(){
                       _this.$el.show();
                        _this.anm.hide();
                         _this.trigger('hidecomplete')
                     });
                 },300);

                _this.isShow = false;
                clearTimeout(_this.time);
                _this.time = null;
            }, 300)

        },
        pullLeft: function () {
            this.removeClass().addClass('pullleft');

        }
    });

    return LoaddingView
});