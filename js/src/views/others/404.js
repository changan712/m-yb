//首页视图
define(function (require) {
    var _ = require('_');

    var PageView = require('views/com/pageview');
    var AppModel = require('models/appMd');
    var appMd = new AppModel({id: 'p_404', title: '404'});

    var View404 = PageView.extend({
        id: appMd.get('id'),
        template: _.template($('#tpl-com-404').html()),
        tagName: appMd.get('tagName'),
        className: appMd.get('className'),
        title: appMd.get('title'),
        initialize: function (ac) {
            document.title = this.title;
            if (typeof View404.instance === "object") {
                return View404.instance;
            }
            View404.instance = this;

            ac.add(appMd);
            this.render();
            app.loadding.hide();
        },
        render: function () {
            var _this = this;
            this.$el.append(this.template());
            this.$el.attr('cid', this.cid);
            this.trigger('render');
            return this;
        },
        setEvn:function(){
            app.header.setTitle(appMd.get('title'));
            app.header.setBack('#index','首页');
        }

    });
    //todo 把所有的view  做成异步加载？ 像这样用毁掉 在本身模块new?
    return View404
});