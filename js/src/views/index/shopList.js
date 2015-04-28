define(function (require) {

    var Backbone = require('backbone');
    var _ = require('_');

    var ShopListCollection = require('collections/shopListCt');

    var shopListCt = new ShopListCollection();

    var ShopListView = Backbone.View.extend({
        template: _.template($('#tpl-index-shoplist').html()),
        id: 'index-shoplist',
        tagName: 'dl',
        className: 'index-shoplist shoplist index-list',
        initialize: function (callback) {
            var _this = this;
            shopListCt.fetch({
                url: app.api.shop_list,
                success: function () {
                    _this.render();
                    callback(_this);
                }, error: function () {

                }});
        },
        render: function () {
            this.$el.attr('cid', this.cid);
            this.$el.html(this.template({list: shopListCt.limit(8).toJSON()}));
            this.trigger('render');
            return this;
        }

    });
    return ShopListView;
});
