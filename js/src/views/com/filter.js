define(function (require) {

    //var $ = require('$');
    var Backbone = require('backbone');
    var _ = require('_');


    var FilterView = Backbone.View.extend({
       // template: _.template($('#tpl-filter').html()),
        className: 'list-fileter',
        initialize: function (id) {
            id && this.$el.attr(id, id);
            this.render();
        },
        render: function () {
            this.$el.html(this.template({categroy_list: {},landermark_list: {}}));
            this.trigger('render');
            return this;
        }
    });

    return FilterView
});