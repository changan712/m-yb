define(function (require) {

    var _ = require('_');
   // var $ = require('$');
    var tpl = $('#tpl-nav').html();
    var Backbone = require('backbone');

    var Search = require('views/com/search');
    var navData = [
        {md: 'index',ic:'glyphicon-home', txt: '首页', href: '#index'},
        {md: 'shop',ic:'glyphicon-shopping-cart', txt: '找商家', href: '#at/shop/index'},
        {md: 'goods',ic:'glyphicon-gift', txt: '找优惠', href: '#at/goods/index'},
        {md: 'help',ic:'glyphicon-question-sign', txt: '帮助中心', href: '#at/help/index'}
    ];
    var NavCollection = require('collections/navCt');

    var Nav = Backbone.View.extend({
        template: _.template(tpl),
        tagName: 'nav',
        id: 'com_nav',
        className: 'com_nav',
        initialize: function () {
            if (typeof Nav.instance === "object") {
                return Nav.instance;
            }
            this.navCt = new NavCollection(navData);
            this.status = 0;
            _.bindAll(this, 'render');
            this.render();
            this.navCt.on('change', this.render);
            Nav.instance = this;
        },
        render: function () {

            this.$el.attr('cid', this.cid);
            this.$el.html(this.template({list: this.navCt.toJSON()}));
            this.addSearch();
            return this;
        },
        setActive: function (md) {
            this.navCt.setActive(md);
        },
        addSearch: function () {
            var search = new Search();
            //todo app 也许不应爱在这里出现；
            app.addViewList(search);
            this.$el.prepend(search.el);
        },

        show: function () {
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return Nav
});
