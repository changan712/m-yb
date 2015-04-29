define(function (require) {

   // var $ = require('$');
    var Backbone = require('backbone');
    var _ = require('_');


    var layerView = Backbone.View.extend({

        pullUp: function () {
            this.$el.addClass('pullup');
            this.trigger('pullup');
        },
        pullDown: function () {
            this.$el.removeClass('pullup');
            this.trigger('pulldown')
        },
        fadeIn:function(){
            this.$el.addClass('fadein');
            this.trigger('fadein');
        },
        fadeout:function(){
            this.$el.addClass('fadeout');
            this.trigger('fadeout');
        }
    });

    return layerView;
});