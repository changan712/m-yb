define(function (require) {

    var Backbone = require('backbone');
    var _ = require('_');
    var HotListModel = require('models/indexHotlistMd');
    var HotListCollection = require('collections/indexHotlistCt');

    var hotListCt = new HotListCollection();

    var HotListView = Backbone.View.extend({
        template: _.template($('#tpl-index-hotlist').html()),
        id:'hotlist',
        tagName:'dl',
        className:'hotlist',
        initialize: function (callback) {
            var _this = this;
            hotListCt.fetch({success: function () {
                _this.render();
                callback(_this);
            }, error: function () {

            }});

        },
        render: function () {
            this.$el.attr('cid', this.cid);
            this.$el.html(this.template({list: hotListCt.limit(5).toJSON()}));
            this.trigger('render');
            return this;
        }

    });
    return HotListView;
});