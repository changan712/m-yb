define(function (require, exports, module) {
    var $ = require('$');
    var Backbone = require('backbone');
    Backbone.$ = $;


    var AutoRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'index': 'home',
            'at/:module/:action(/*condition)': 'loadmodule'
        },

        home: function () {
            this.loadmodule('index', 'index');
        },
        //按照at/module/action(/conditions)格式的請求自動加載模塊
        loadmodule: function (md, ac, con) {
            //将参数字符串'a:123/b:456'转换为json对象{a:123, b:456}
            var cj = {};
            if (con && con.indexOf(':') > -1) {
                con.replace(/(\w+)\s*:\s*([\w-]+)/g, function (a, b, c) {
                    b && (cj[b] = c);
                });
            } /*else {
                cj = con;
            }*/
            //加载module目录下对应的模块
            require.async(['../../dist/views', md, ac].join('/'), function (cb) {
                if (cb) {
                    cb(cj,true);
                } else {
                    alert('模塊加載失敗！');
                }
            })
        }
    });

    return AutoRouter;
});