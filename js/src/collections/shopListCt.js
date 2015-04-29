define(function (require) {

    var Backbone = require('backbone');
    var ShopListModel = require('models/shopListMd');
    var _ = require('_');
    var JsUri = require('gallery/jsuri/1.2.2/jsuri');

    var ShopListCollection = Backbone.Collection.extend({
        model: ShopListModel,

        initialize: function () {
            this.defaultUrl = this.url;
            this.page = 1;
            this.totalPage = 0;
        },
        limit: function (num) {
            var limited = this.first(num);
            this.reset(limited);
            return this;
        },
        parse: function (res) {
            if (res.errcode == '0') {
                this.totalPage = res.data.total_count;
                _.each(res.data.shop_list, function (li) {
                    if (!li.photo_url) {
                        li.photo_url = 'img/default.jpg';
                    }
                });

                return res.data.shop_list;
            } else {
                app.view.trigger('dataError');
                return null;
            }
        },

        addMore: function (callback) {
            var _this = this;
            var uri = new JsUri(this.url);
            uri.addQueryParam('page', (++this.page));
            var addUrl = uri.toString();
            // var addUrl = 'js/data/shoplist2.json';
            this.fetch({
                remove: false,
                url: addUrl,
                success: function (collection, dataArray) {
                    callback && callback(collection, _this.parse(dataArray));
                }, error: function () {
                    console.log(arguments)
                }

            })
        }
    });
    return ShopListCollection;
});