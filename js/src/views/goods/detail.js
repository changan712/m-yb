//找商家详情页视图
define(function (require) {

    var _ = require('_');


    var PageView = require('views/com/pageview');
    var GoodspDetailMd = require('models/goodsDetailMd');
    var AppModel = require('models/appMd');


    var appMd = new AppModel({id: 'p_goods_detail', title: '找优惠详情页_延边站_生活通'});
    var goodsDetailModel = new GoodspDetailMd();


    var ShopDetailView = PageView.extend({
        id: appMd.get('id'),
        tagName: appMd.get('tagName'),
        className: appMd.get('className'),
        title: appMd.get('title'),
        template: _.template($('#tpl-goods-detail').html()),
        initialize: function (ac, cj) {
            //var _this = this;
            document.title = this.title;
            _.bindAll(this, 'render', 'imgLoad', 'imgError');
            if (typeof ShopDetailView.instance === "object") {
                return ShopDetailView.instance;
            }
            this.$el.addClass('goods-detail');
            this.sdmd = goodsDetailModel;
            this.sdmd.fetch({
                url: (app.api.goods_detail + '?id=' + cj.id)
            });
            ShopDetailView.instance = this;
            ac.add(appMd);

            this.md = appMd;



            this.sdmd.on('change', this.render);
            //this.sdmd.on('reset', this.render);
        },

        imgLoad: function () {
            this.createIscroll();
        },
        rerender: function (cj) {
            app.loadding.show();
            if (cj && cj.id) {
                this.sdmd.fetch({
                    url: (app.api.goods_detail + '?id=' + cj.id)
                });
            }
            this.setEvn();
        },
        imgError: function (e) {
            $(e.currentTarget).attr('src', app.images.default);
            this.createIscroll();

        },
        render: function () {
            this.$el.html(this.template(this.sdmd.toJSON()));

            this.$('.detail-img img').on('load', this.imgLoad);
            this.$('.detail-img img').on('error', this.imgError);
            this.trigger('render');
            this.setEvn();
            return this;
        },
        setEvn: function () {
            app.header.setTitle(appMd.get('title'));
            app.header.setBack('#at/goods/index', '找优惠');
        },
        createIscroll: function () {
            if (this.iscroll) {
                delete  this.iscroll;
            }

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