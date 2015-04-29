//帮助中心
define(function (require) {
   // require('bustling/iscroll/5.1.1/js/iscroll-probe.js');

    var _ = require('_');


    var PageView = require('views/com/pageview');
    var AppModel = require('models/appMd');

    var HelpCollection = require('collections/helpCt.js');
    var appMd = new AppModel({id: 'p_help', title: '帮助中心_延边站_生活通'});

    var helpNavData = [
        {name: "关于我们", id: '0', link: "#at/help/index/art=0", active: true},
        {name: "联系我们", id: '1', link: "#at/help/index/art=1"},
        {name: "加入我们", id: '2', link: "#at/help/index/art=2"}
    ];

    var HelpView = PageView.extend({
        id: appMd.get('id'),
        template: _.template($('#tpl-help').html()),
        tagName: appMd.get('tagName'),
        className: appMd.get('className'),
        title: appMd.get('title'),
        initialize: function (ac, cj) {
            var _this = this;

            _.bindAll(this, 'render');
            document.title = this.title;

            if (typeof HelpView.instance === "object") {
                return HelpView.instance;
            }
            HelpView.instance = this;
            ac.add(appMd);
            this.md = appMd;

            this.helpCollection = new HelpCollection();

            if (cj && cj.art) {
                this.helpCollection.setActive('art');
                this.activeIndex = cj.art;
            }
            this.helpCollection.add(helpNavData);

            this.on('render', function () {
                _this.createIscroll();
                app.loadding.hide();
            });

            this.render();
            this.setEvn();
            this.helpCollection.on('change', this.render);
            // this.helpCollection.on('reset', this.render);
        },
        render: function () {
            this.$el.html(this.template({nav: this.helpCollection.toJSON(), activeIndex: this.activeIndex || 0}));
            this.trigger('render');
            return this;
        },
        setEvn:function(){
            app.header.setTitle(appMd.get('title'));
            app.header.setBack('#index','首页');
        },
        rerender: function (cj) {
            app.loadding.show();
            if (cj && cj.art) {
                this.activeIndex = parseInt(cj.art);
                this.helpCollection.setActive(cj.art);

            } else {
                this.activeIndex = 0;
                this.helpCollection.setActive(0);
            }
        },
        createIscroll: function () {
            if (this.iscroll) delete  this.iscroll;
            this.iscroll = new IScroll(this.el, {
                click: true,
                scrollbars: true,
                tap: true,
                fadeScrollbars: true
            });
        }
    });

    return HelpView
});