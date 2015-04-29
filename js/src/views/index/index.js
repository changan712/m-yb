//首页视图
define(function (require) {


    var _ = require('_');

    // var Backbone = require('backbone');
    var PageView = require('views/com/pageview');
    var AppModel = require('models/appMd');
    var appMd = new AppModel({id: 'p_index', title: '首页_延边站_生活通'});
    //var HotListView = require('./hotList');
    var ShopListView = require('./shopList');
    var GoodsListView = require('./goodsList');
    var CarouselView = require('views/com/carouselview');

    var IndexView = PageView.extend({
        id: appMd.get('id'),
        tagName: appMd.get('tagName'),
        className: appMd.get('className'),
        title: appMd.get('title'),
        initialize: function (ac) {
            document.title = this.title;
            // _.bind(this,'refreshIScroll');
            if (typeof IndexView.instance === "object") {
                return IndexView.instance;
            }
            IndexView.instance = this;
            _.bindAll(this, 'modifyClass');

            ac.add(appMd);
            this.render();
            this.setEvn();
        },
        render: function () {
            var _this = this;
            this.$el.attr('cid', this.cid);
            this.addScrollDom();
            this.addContent(function () {
                _this.renderIscroll();
                _this.trigger('render');
            });
            return this;
        },
        renderIscroll: function () {
            this.iscroll = new IScroll(this.el, {
                click: true,
                scrollbars: true,
                tap: true,
                fadeScrollbars: true
            });
        },
        addContent: function (callback) {
            var _this = this;
            this.addCarousel();
            /*   this.addHotList(
             function () {*/

            _this.addShopList(function () {

                _this.addGoodsList(function () {
                    callback && callback();
                });
            });
            /*      }
             );*/
        },
        setEvn:function(){
            app.header.setTitle(appMd.get('title'));
           app.header.setBack('');
        },
        addScrollDom: function () {
            this.scrollerDom = $('<div id="' + this.id + '_scroller" class="scroller"></div>');
            this.$el.append(this.scrollerDom);
        },
        addHotList: function (callback) {
            var _this = this;
            this.hotList = new HotListView(function (hotListView) {
                _this.scrollerDom.append(hotListView.el);
                callback && callback();
            });
        },

        addGoodsList: function (callback) {
            var _this = this;
            this.goodsList = new GoodsListView(function (goodsListView) {
                _this.scrollerDom.append(goodsListView.el);
                callback && callback();
            });
        },
        addCarousel: function () {
            var _this = this;
            this.carousel = new CarouselView({id: 'index-carousel', url: app.api.index_carousel});
            this.carousel.on('render', function () {
                _this.scrollerDom.prepend(this.el);
            });
        },

        addShopList: function (callback) {
            var _this = this;
            this.shopList = new ShopListView(function (shopListView) {
                _this.scrollerDom.append(shopListView.el);
                callback && callback();
            });
        },
        modifyClass: function (md, value) {
            this.$el.removeClass().addClass(value);
        }
    });
    //todo 把所有的view  做成异步加载？ 像这样用毁掉 在本身模块new?
    return IndexView
});