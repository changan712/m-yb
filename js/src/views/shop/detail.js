//找商家详情页视图
define(function (require) {

    var _ = require('_');
   // var $ = require('$');

    var PageView = require('views/com/pageview');
    var ShopDetailMd = require('models/shopDetailMd');
    var AppModel = require('models/appMd');


    var appMd = new AppModel({id: 'p_shop_detail', title: '找商家详情页_延边站_生活通'});
    var shopDetailModel = new ShopDetailMd();


    var ShopDetailView = PageView.extend({
        id: appMd.get('id'),
        tagName: appMd.get('tagName'),
        className: appMd.get('className'),
        title: appMd.get('title'),
        template: _.template($('#tpl-shop-detail').html()),
        initialize: function (ac, cj) {
            //var _this = this;
            document.title = this.title;
            _.bindAll(this, 'render', 'imgLoad');
            if (typeof ShopDetailView.instance === "object") {
                return ShopDetailView.instance;
            }
            this.$el.addClass('shop-detail');
            this.sdmd = shopDetailModel;
            this.sdmd.off();
            this.sdmd.fetch({
                url: (app.api.shop_detail + '?id=' + cj.id)
            },{error:function(){
                throw  new Error();
            }});
            ShopDetailView.instance = this;
            ac.add(appMd);

            this.md = appMd;
            this.sdmd.on('sync', this.render);

        },

        imgLoad: function () {
            this.createIscroll();
        },
        imgError: function (e) {
            $(e.currentTarget).attr('src', app.images.default);
            this.createIscroll();

        },
        render: function () {
            this.$el.html(this.template(this.sdmd.toJSON()));

            this.$('.detail-img img').one('load', this.imgLoad);
            this.$('.detail-img img').one('error', this.imgError);
            this.trigger('render');
            this.setEvn();

            return this;
        },
        rerender: function (cj) {

            app.loadding.show();
            if (cj && cj.id) {
                this.sdmd.fetch({
                    url: (app.api.shop_detail + '?id=' + cj.id)
                });
            }
            this.setEvn();
        },
        setEvn:function(){
            app.header.setTitle(appMd.get('title'));
            app.header.setBack('#at/shop/index','找商家');
        },
        createIscroll: function () {
            this.iscroll = new IScroll(this.el, {
                click: true,
                scrollbars: true,
                tap: true,
                fadeScrollbars: true,
                topOffset: 50,
                useTransition: true,
                probeType: 3
            });
        }
    });

    return ShopDetailView
})
;