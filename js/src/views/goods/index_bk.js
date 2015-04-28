//找优惠首页视图
define(function (require) {


    var _ = require('_');
    var $ = require('$');

    var PageView = require('views/com/pageview');
    var Select = require('views/com/selectview.js');
    //var Filter = require('views/com/filter');

    var AppModel = require('models/appMd');
    var ShopList = require('./list');


    var appMd = new AppModel({id: 'p_goods', title: '找优惠'});

    var GoodsView = PageView.extend({
        id: appMd.get('id'),
        tagName: appMd.get('tagName'),
        className: appMd.get('className'),
        title: appMd.get('title'),
        initialize: function (ac) {
            var _this = this;
            document.title = this.title;
            if (typeof GoodsView.instance === "object") {
                return GoodsView.instance;
            }
            GoodsView.instance = this;
            ac.add(appMd);
            this.md = appMd;
            this.downing = false;
            this.render();

            this.catSelect.on('selected', function (model) {
                _this.$('.category-sect .text').text(model.get('category_name'));
            });
            this.landSelect.on('selected', function (model) {
                _this.$('.landmark-sect .text').text(model.get('landmark_name'));
            })
        },
        events: {
            'click .category-sect': 'tapCategory',
            'click .landmark-sect': 'tapLandmark',
            'click .sorter1': 'tapSortDefault',
            'click .sorter2': 'tapSortPrice'
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
        addCategorySelect: function () {
            this.catSelect = new Select({url: app.api.categroy_list, tpl: 'tpl-category-select', listName: 'category_list', subListName: 'subcategory_list', title: '请选择分类'});
            $('body').append(this.catSelect.el)
        },
        addLandmarkSelect: function () {
            this.landSelect = new Select({url: app.api.landmark_list, tpl: 'tpl-landmark-select', listName: 'landmark_list', subListName: 'landmark_list', title: '请选择地标'});//app.api.landmark_list, selectLandCollection
            $('body').append(this.landSelect.el)
        },
        tapCategory: function () {
            this.catSelect.pullUp();
        },
        tapLandmark: function () {
            this.landSelect.pullUp()
        },
        tapSortPrice: function (e) {
            //todo 改变list collection
            var btn = $(e.currentTarget);
           // var icon = btn.find('.glyphicon');

                btn.addClass('active').siblings().removeClass('active');


        },

        tapSortDefault: function (e) {
            //todo 改变list collection
            var btn = $(e.currentTarget);
            btn.addClass('active').siblings().removeClass('active');

        },
        addContent: function (callback) {
            var _this = this;
            this.addList(function () {
                _this.addMoreDom();
                callback && callback();
            })
            this.addFilterDom();
            this.addSorterDom();
            this.addCategorySelect();
            this.addLandmarkSelect();
        },
        renderIscroll: function () {
            var _this = this;
            this.iscroll = new IScroll(this.el, {
                click: true,
                scrollbars: true,
                tap: true,
                fadeScrollbars: true,
                topOffset: 50,
                useTransition: true,
                probeType: 3

            });
            this.iscroll.on('scroll', function () {
                if (Math.abs(this.y) > (this.scrollerHeight - this.wrapperHeight + 40)) {

                    if (!_this.downing) {
                        _this.downing = true;
                        _this.more.html('全力加载中');
                        _this.shopList.addMore(
                            function () {
                                _this.iscroll.refresh();
                                _this.more.html('下拉显示更多');
                                _this.downing = false;
                            }
                        );
                    }
                }
            });
        },
        addSorterDom: function () {
            this.sorter = $('<div class="list-sorter"> <a class="sect sorter1 float-r active">默认</a><a class="sect sorter2 float-r">最新</a></div>');
            this.scrollerDom.append(this.sorter);
        },
        addScrollDom: function () {
            this.scrollerDom = $('<div id="' + this.id + '_scroller" class="scroller"></div>');
            this.$el.append(this.scrollerDom);
        },
        addMoreDom: function () {
            this.more = $('<div class="more">下拉显示更多</div>');
            this.scrollerDom.append(this.more);
        },
        addFilterDom: function () {

            this.filter = $('<div class="list-fileter"><a  class="sect category-sect"><span class="text">全部分类</span> <span class="glyphicon glyphicon-chevron-down"></span></a> <a class="sect landmark-sect"><span class="text">全部地标</span> <span class="glyphicon glyphicon-chevron-down"></span></a></div>');
            this.scrollerDom.append(this.filter);
        },
        addList: function (callback) {
            var _this = this;
            this.shopList = new ShopList(function (shopListView) {
                _this.scrollerDom.append(shopListView.el);
                callback && callback();
            });
        }


    });

    return GoodsView
});