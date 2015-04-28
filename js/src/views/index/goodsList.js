define(function (require) {

    var Backbone = require('backbone');
    var _ = require('_');
   // var HotListModel = require('models/indexHotlistMd');
    var GoodslisCollection = require('collections/goodsListCt');

    var goodsListCt = new GoodslisCollection();

    var GoodsListView = Backbone.View.extend({
        template: _.template($('#tpl-index-goodslist').html()),
        id:'index-goodslist',
        tagName:'dl',
        className:'index-goodslist goodslist index-list',
        initialize: function (callback) {
            var _this = this;
            goodsListCt.fetch({success: function () {
                _this.render();
                callback(_this);
            }, error: function () {
                throw new Error()
            }});

        },
        render: function () {
            this.$el.attr('cid', this.cid);
            this.$el.html(this.template({list: goodsListCt.limit(8).toJSON()}));
            this.trigger('render');
            return this;
        }

    });
    return GoodsListView;
});