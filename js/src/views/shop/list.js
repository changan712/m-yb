define(function (require) {
   // var $ = require('$');
    var Backbone = require('backbone');
    var _ = require('_');
    var ShopListModel = require('models/shopListMd');
    var ShopListCollection = require('collections/shopListCt');
    var JsUri = require('gallery/jsuri/1.2.2/jsuri');

    var shopListCt = new ShopListCollection();

    var ShopListView = Backbone.View.extend({
        template: _.template($('#tpl-shop-shoplist').html()),
        itemTemplate: _.template($('#tpl-shop-shoplist-item').html()),
        id: 'shop-shoplist ',
        tagName: 'ul',

        className: 'shop-shoplist shoplist in-list',
        initialize: function (cj) {
            var _this = this;
            var url = this.urladdParam(cj);
            this.length =0;
            shopListCt.url = url;
            shopListCt.fetch({
                url: url,
                success: function () {

                    _this.render();

                }, error: function (e) {
                    console.log(e);
                }
            });
        },
        render: function () {
            this.$el.attr('cid', this.cid);
            this.$el.html(this.template({list: shopListCt.toJSON()}));
            this.length = shopListCt.length;
            this.trigger('render');
            return this;
        },
        rerender: function (cj) {
            var _this = this;
            var url = this.urladdParam(cj);
            shopListCt.page = 1;
            shopListCt.url = url;
            shopListCt.fetch({
                url: url,
                success: function () {
                    _this.render();

                }
            });
        },
        urladdParam: function (cj) {
            //url:,
            var uri = new JsUri(app.api.shop_list);
            _.each(cj, function (v, k) {
                uri.addQueryParam(k, v);
            });
            return uri.toString();
        },
        addMore: function (callback) {
            var _this = this;
            var moreHtml = '';

            shopListCt.addMore(
                function (collection, dataArray) {
                    _.each(dataArray, function (data) {
                        moreHtml += _this.itemTemplate({li: data})
                    });
                    _this.$el.append(moreHtml);
                    callback && callback();
                    if (shopListCt.totalPage <= shopListCt.page * 12) {
                        _this.trigger('nomore');
                        return false;
                    }
                }
            )
        }

    });
    return ShopListView;
});