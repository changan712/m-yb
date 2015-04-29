define(function (require) {

    var _ = require('_');
   // var $ = require('$');
    var Csl = require('lib/carousel');
    var Backbone = require('backbone');
    var CslCollection = require('collections/carouselCt');

    var Carousel = Backbone.View.extend({
        template: _.template($('#tpl-carousel').html()),
        className: 'com-carousel',
        initialize: function (param) {
            _.bindAll(this, 'render');
            var _this = this;
            this.cslCollection = new CslCollection();
            this.cslCollection.url = param.url+'?tpl=shop';
            this.cslCollection.fetch({success: function () {
                _this.render();
            }, error: function () {
                throw  new Error('')
            }});

        },
        render: function () {
            this.$el.html(this.template({list: this.cslCollection.toJSON()}));
            this.$('.m-item img').one('error', this.imgError);
            this.trigger('render');
            this.create();
            return this;
        },
        events: {
            'swipeLeft':'onSwipe',
            'swipeRight':'onSwipe'

        },
        imgError: function (e) {
            $(e.currentTarget).attr('src', app.images.default);
        },
        onSwipe:function(){
            return false;
        },
        create:function(){

            var dom = $('#carousel'),
                cc = $('.m-carousel-controls'),
                ct = cc.find('a'),
                size = ct.size(),
                ci = 0;
            dom.carousel();
            var time = null;
            setLoop();
            function setLoop() {
                time = setInterval(function () {
                    if (ci < size - 1) {
                        dom.carousel('next');
                        ci++;
                    } else {
                        dom.carousel('move', 0);
                        ci = 0;
                    }
                }, 4000);
            }

            cc.delegate('a', 'tap', function () {
                ci = $(this).index();
            });

            dom.on('touchstart', function () {
                clearInterval(time);
                time = null;

            });

            dom.on('touchend', function () {
                if (!time) setLoop();
            });
        }


    });

    return Carousel;
});
