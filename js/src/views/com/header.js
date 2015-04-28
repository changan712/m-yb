define(function (require) {
    var _ = require('_');
   // var $ = require('$');
    var Backbone = require('backbone');
    var tpl = $('#tpl-header').html();

    var Header = Backbone.View.extend({
        template: _.template(tpl),
        id: 'com_header',
        tagName: 'header',
        className: 'com_header',
        initialize: function () {
            if (typeof Header.instance === "object") {
                return Header.instance;
            }
            this.render();
            this.toggleBtn = this.$('#toggle_btn');
            this.backBtn = this.$(' #btn-back');
            this.title = this.$('#header-title');
            this.backUrl = '';
            Header.instance = this;
        },
        events: {
            'tap #btn-back': 'back'
        },
        render: function () {
            this.$el.attr('cid', this.cid);
            this.$el.html(this.template(null));
            return this;
        },
        back: function () {
            var url = $.trim(this.backUrl);
            if (url) {
                app.router.navigate(url, {trigger: true});
            }
        },
        setBack: function (backUrl, txt) {
            var url = $.trim(backUrl);
            var text = txt ? txt : '返回';
            if (url) {
                this.backBtn.text(text);
                this.backBtn.show();
                this.backUrl = url;
            } else {
                this.backBtn.hide();
                this.backUrl = '';
            }

        },
        setTitle: function (title) {
            this.title.html(title)
        },
        historyBack: function () {
            history.back();
        },
        hide: function () {
            this.$el.hide();
            this.trigger('onhide');
        },
        show: function () {
            this.$el.show();
            this.trigger('onshow');
        }
    });

    return Header;
});
