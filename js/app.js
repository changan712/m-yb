define(function (require, exports) {

    require('bustling/iscroll/5.1.1/js/iscroll-probe.js');
    // require('lib/zepto_touch');
    var _ = require('_');

    var Backbone = require('backbone');
    Backbone.$ = $;

    /*//重写Backbone.sync
    var proxiedSync = Backbone.sync;
   Backbone.sync = function (method, model, options) {
        options || (options = {});
        if (!options.crossDomain) {
            options.crossDomain = true;
        }
        if (!options.dataType) {
            options.dataType = 'jsonp';
        }
        if (!options.jsonp) {
            options.jsonp = 'callback';
        }
        if (!options.xhrFields) {
            options.xhrFields = {withCredentials: true};
        }
        if (!options.timeout) {
            options.timeout = 1500;
        }
        return proxiedSync(method, model, options);
    };*/
    document.addEventListener('touchstart', function () {
    }, true);


    var Header = require('views/com/header');
    var Nav = require('views/com/nav');
    var Loadding = require('views/com/loadding');
    var AppCollection = require('collections/appCt');



    var AppView = Backbone.View.extend({
        el: 'body',
        initialize: function () {
            var _this = this;
            this.childView = app.viewList = {};
            this.con = this.$('#main');

            _.bindAll(this, 'addPage', 'hideActivePage');
            this.ac = new AppCollection();
            this.time = null;
            this.render();

            app.header = this.header = this.childView.com_header;
            this.nav = this.childView.com_nav;
        },

        render: function () {
            this.header = new Header();
            this.nav = new Nav();
            app.loadding = this.loadding = new Loadding();
            app.addViewList(this.header, this.nav);
            $('body').prepend(this.nav.el);
            this.con.prepend(this.header.el).append(this.loadding.el);
            this.trigger('render');
            return this;
        },

        events: {
            'tap #toggle_btn': 'toggleNav',
            'swipeLeft': 'showNav',
            'swipeRight': 'hideNav'
            //'tap #com_nav ul li': 'toggleNav'
        },
        showNav: function () {
            this.con.addClass('pull_right');
        },
        hideNav: function () {
            this.con.removeClass('pull_right');
        },
        toggleNav: function () {
            var _this = this;
            if (tgtime) {
                clearTimeout(tgtime);
                tgtime = null;
            }
            var tgtime = setTimeout(function () {
                if (_this.con.hasClass('pull_right')) {
                    _this.con.removeClass('pull_right');
                } else {
                    _this.con.addClass('pull_right');
                }
            }, 0)

        },
        activeNav: function (md) {
            this.nav.setActive(md);
        },

        addPage: function (md) {
            var obj = md.toJSON();
            var ele = document.createElement(obj.tagName);
            $(ele).addClass(obj.className).attr('id', obj.id);
            md.set('ele', ele);
            this.$el.append(ele);
        },


        renderPageView: function (View, md, cj) {
            var _this = this;
            //app.header.setTitle('');
            app.loadding.show();

            this.activeNav(md);
            if (this.time) return false;
            setTimeout(function () {
                _this.hideActivePage();
                if (View.instance) {
                    app.viewList[View.instance.id].setEvn();
                    app.viewList[View.instance.id].show();

                    if (app.viewList[View.instance.id].rerender) {
                        app.viewList[View.instance.id].rerender(cj);

                    }
                    app.activePage = app.viewList[View.instance.id];
                    if (app.loadding.isShow) {
                        app.loadding.hide();
                    }

                } else {

                    app.activePage = new View(_this.ac, cj);
                    app.addViewList(app.activePage);
                    $('#main').append(app.activePage.el);
                    app.activePage.show();
                    if (app.activePage.iscroll) {
                        app.activePage.iscroll.refresh();
                    }
                    app.activePage.on('render', function () {
                        if (app.loadding.isShow) {
                            app.loadding.hide();
                        }
                    });
                }
                clearTimeout(_this.time);
                _this.time = null;

            }, 300);
            this.con.removeClass('pull_right');

            return this;
        },
        offEvent: function () {
            _.each(app.viewList, function (v) {

            })

        },

        hideActivePage: function () {
            if (app.activePage) {
                app.activePage.hide();
                // app.activePage.undelegateEvents();
            }
        }
    });


    var AutoRouter = Backbone.Router.extend({

        initialize: function () {
            app.view = this.appView = new AppView();
        },
        routes: {
            '': 'showIndex',
            'index': 'showIndex',
            '404': 'show404',
            'searchResult': 'showSearchResult',
            'at/:module/detail/:id': 'showDetail',
            'at/:module/:action(/*condition)': 'loadmodule',
            '*action': 'errorUrl'
        },
        errorUrl: function () {
            this.loadmodule('others', '404');
        },
        showIndex: function () {
            this.loadmodule('index', 'index');
        },

        showDetail: function (md, id) {
            this.loadmodule(md, 'detail', 'id=' + id);
        },

        show404: function () {
            this.loadmodule('others', '404');
        },
        showSearchResult: function () {
            this.loadmodule('others', 'searchresult');
        },
        loadmodule: function (md, ac, con) {

            var _this = this;
            var cj = {};
            if (con && con.indexOf('=') > -1) {
                var arr = con.split('&');
                _.each(arr, function (str) {
                    var re = /(\w+)=([\w\W]+)/g;
                    var r = re.exec(str);
                    if (r) {
                        cj[r[1]] = r[2];
                    }
                });
            }
            require.async(['views', md, ac].join('/'), function (View) {
                if (View) {
                    _this.appView.renderPageView(View, md, cj);
                } else {
                    _this.loadmodule('others', '404');
                }
            })
        }
    });

//定义全局变量App
    window.app = {
        viewList: {},
        loadding: null,
        activePage: null,
        header: null,
        view: null,
        images: {
            default: 'img/default.jpg',
            defaultSmall: 'img/default-small.jpg'
        },
        api: {
            categroy_list: '/js/data/category_list.json',//http://yb.shenghuo.com/api/category',
            landmark_list: '/js/data/landmark_list.json',//http://yb.shenghuo.com/api/landmark',
            shop_list: '/js/data/shoplist.json',//,http://yb.shenghuo.com/api/shopList',
            shop_detail: '/js/data/shopdetail.json',//http://yb.shenghuo.com/api/shopDetail',
            goods_list: '/js/data/goodslist.json',//http://yb.shenghuo.com/api/goodsList',
            goods_detail: '/js/data/goodsdetail.json',//http://yb.shenghuo.com/api/goodsDetail',
            index_carousel:'/js/data/carousel.json'// 'http://yb.shenghuo.com/api/getPageModel'
        },
        addViewList: function () {
            var _this = this;
            _.each(arguments, function (view) {
                _this.viewList[view.id] = view;
            });
        },
        router: null,
        initialize: function () {
            app.router = new AutoRouter();
            Backbone.history.start();
        }
    };

    exports.run = app.initialize;

});