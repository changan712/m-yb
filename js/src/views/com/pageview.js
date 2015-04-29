
define(function (require) {


    var Backbone = require('backbone');

    var PageView = Backbone.View.extend({
        show: function () {
            document.title = this.title;
            this.$el.addClass('active');
            this.status = 1;
        },
        hide: function () {
            this.$el.removeClass('active');
            this.status = 0;
        },
        pull: function (direction) {

            var className = 'pull-' + direction;
            this.$el.removeClass().addClass(this.className);
            if (this == app.activePage) {
                this.$el.addClass('active');
            }
            this.$el.addClass(className);
            this.trigger('pull' + direction, this);
            if (direction == 'right') {
                this.status = 2
            } else {
                this.status = 1;
            }
            this.trigger('pull'+direction,this);
        }

    });

    return PageView;
});