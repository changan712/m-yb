define(function (require) {

    // require('bustling/iscroll/5.1.1/js/iscroll.js');
    //var $ = require('$');
    var _ = require('_');
    var LayerView = require('views/com/layerview');
    var selectCollection = require('collections/selectCt');

    var SelectView = LayerView.extend({

        className: 'layer select-layer',
        events: {
            'tap .close': 'close',
            'tap li': 'tapcheck'
        },
        initialize: function (obj) {  //url,Collection,callback
            var _this = this;
            _.bindAll(this, 'render', 'addScroll');
            this.title = obj.title;

            this.prefix = this.getPrefix(obj)
            this.callback = obj.callback || null;
            this.type = obj.type;
            this.template = _.template($('#' + obj.tpl).html());
            this.collection = new selectCollection([],{url:obj.url,listName: obj.listName, subListName: obj.subListName, type: obj.type, callback: function () {
                _this.setCollection(obj.cj);
            }});

            this.collection.on('all', this.render);
           // this.collection.on('reset', this.render);
            this.on('render', this.addScroll);

        },
        render: function () {
            this.$el.html(this.template({title: this.title, list: this.collection.toJSON()}));
            this.callback && this.callback();
            this.trigger('render', this);
            return this;
        },
        rerender: function (cj) {
            this.setCollection(cj);
        },
        setCollection: function (cj) {
            if (this.type == 1 && cj.category_id) {
                this.collection.setActive(cj.category_id)
            } else if (this.type == 2 && cj.landmark_id) {
                this.collection.setActive(cj.landmark_id)
            } else {
                this.collection.normalData();
                this.collection.at(0)&&this.collection.at(0).set('selected', true);
            }
        },
        getPrefix: function (obj) {
            if (obj.type == 1) {
                return 'category_'
            } else if (obj.type == 2) {
                return 'landmark_'
            }
        },
        addScroll: function () {
            this.iscroll = new IScroll(this.el, {
                click: true,
                scrollbars: true,
                tap: true,
                fadeScrollbars: true,
                topOffset: 50,
                useTransition: true,
                probeType: 3
            });
        },
        tapcheck: function (e) {
            if (this.collection.findWhere({selected: true})) {
                this.collection.findWhere({selected: true}).set('selected', false);
            }
            var activeSlector = this.collection.findWhere({category_id: $(e.currentTarget).attr('category_id')}) || this.collection.findWhere({id: $(e.currentTarget).attr('landmark_id')});
            activeSlector.set('selected', true);

            this.trigger('selected', activeSlector);
            this.close();

        },
        close: function () {
            this.pullDown();
        },

        clear: function () {
            this.$el.empty();
        }

    });

    return SelectView
});