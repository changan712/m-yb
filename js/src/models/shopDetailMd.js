define(function (require) {

    var Backbone = require('backbone');
    var _ = require('_');

    var ShopDetailModel = Backbone.Model.extend({

        parse: function (res) {
            if (res.errcode=='0') {
                if (!res.data.photo_url) {
                    res.data.photo_url = 'img/default.jpg';
                }
                return res.data;
            } else {
                app.view.trigger('dataError');
                return null;
            }
        }
    });

    return ShopDetailModel;

});