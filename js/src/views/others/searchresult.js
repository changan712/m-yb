//搜索结果页视图
define(function (require) {
    var _ = require('_');

    var PageView = require('views/com/pageview');
    var AppModel = require('models/appMd');
    var appMd = new AppModel({id: 'p_searchresult', title: '搜索结果'});

    var SearchResultView = PageView.extend({
        id: appMd.get('id'),
        tagName: appMd.get('tagName'),
        className: appMd.get('className'),
        title: appMd.get('title'),
        initialize: function (ac, param) {
            document.title = this.title;
            if (typeof SearchResultView.instance === "object") {
                return SearchResultView.instance;
            }
            SearchResultView.instance = this;
           // _.bindAll(this, 'modifyClass');

            ac.add(appMd);
            this.on('render', function () {
                app.loadding.hide();
            });
            this.render();
        },
        render: function () {
            var _this = this;
            this.$el.append(this.title);
            this.$el.attr('cid', this.cid);
            this.trigger('render');
            return this;
        },
        rerender: function () {

        }
    });

    return SearchResultView
});