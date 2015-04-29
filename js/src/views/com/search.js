define(function (require) {

    //var $ = require('$');
    var Backbone = require('backbone');
    var _ = require('_');
    var tpl = $('#tpl-search').html();

    var Search = Backbone.View.extend({
        id: 'com_search',
        className: 'com_search',
        template: _.template(tpl),
        initialize: function () {
            this.render();
            this.input = this.$('#search_input');
            this.btngrp = this.$('.search_btn_grp');

            this.type = ''
        },
        render: function () {
            this.$el.attr('cid', this.cid);
            this.$el.html(this.template(null));
            return this;
        },
        events: {
            'submit #search_form': 'submitHdl',
            'tap .search_btn_shop ': 'tapShopbtn',
            'tap .search_btn_goods': 'tapGoodsbtn',
            'tap .back_show': 'backShow'
        },
        tapShopbtn: function () {
            this.input.show().focus().attr('placeholder', '搜商家');
            this.btngrp.hide();
            this.type = 'shop';
        },
        tapGoodsbtn: function () {

            this.input.show().focus().attr('placeholder', '搜商品');
            this.btngrp.hide();
            this.type = 'goods';
        },
        backShow: function () {
            this.input.hide().attr('placeholder', '');
            this.btngrp.show();

        },
        submitHdl: function (e) {
            var value = $.trim(this.input.val());
            switch (this.type){
                case 'shop':
                  app.router.navigate('#at/shop/index/keyword='+value , {trigger: true});
                    break;
                case 'goods':
                    app.router.navigate('#at/goods/index/keyword='+value , {trigger: true});
                    break;
                default :
                    app.router.navigate('#at/shop/index/keyword='+value , {trigger: true});
            }

            return false
        }
    });

    return Search;
});