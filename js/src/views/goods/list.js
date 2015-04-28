define(function (require) {

    var Backbone = require('backbone');
    var _ = require('_');

    var GoodsListCollection = require('collections/goodsListCt');
    var JsUri = require('gallery/jsuri/1.2.2/jsuri');
    var goodsListCt = new GoodsListCollection();

    var GoodsListView = Backbone.View.extend({
        template: _.template($('#tpl-goods-goodslist').html()),
        itemTemplate: _.template($('#tpl-goods-goodslist-item').html()),
        id: 'goods-goodslist',
        tagName: 'ul',
        className: 'goods-goodslist goodslist in-list',
        initialize: function (cj) {
            var _this = this;
            var url = this.urladdParam(cj);
            this.length = 0;
            goodsListCt.url = url;
            goodsListCt.fetch({
                url: url,
                success: function () {
                    _this.render();

                }, error: function () {
                    throw  new Error();
                }});
        },

        render: function () {
            this.$el.attr('cid', this.cid);
            this.$el.html(this.template({list: goodsListCt.toJSON()}));
            this.length = goodsListCt.length;
            this.trigger('render');
            return this;

        },
        rerender: function (cj) {
            var _this = this;
            var url = this.urladdParam(cj);
            goodsListCt.page = 1;
            goodsListCt.url = url;
            goodsListCt.fetch({
                url: url,
                success: function () {
                    _this.render();

                }
            });
        },
        urladdParam: function (cj) {
            //url:,
            var uri = new JsUri(app.api.goods_list);
            _.each(cj, function (v, k) {
                uri.addQueryParam(k, v);
            });
            return uri.toString();
        },
        addMore: function (callback) {
            var _this = this;
            var moreHtml = '';

            goodsListCt.addMore(
                function (collection, dataArray) {
                    _.each(dataArray, function (data) {
                        moreHtml += _this.itemTemplate({li: data})
                    });

                    _this.$el.append(moreHtml);
                    callback && callback();
                    if (goodsListCt.totalPage <= goodsListCt.page * 12) {
                        _this.trigger('nomore');
                        return false;
                    }
                }
            )
        }

    });
    return GoodsListView;
});