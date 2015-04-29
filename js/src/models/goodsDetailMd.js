define(function (require) {

    var Backbone = require('backbone');
    var _ = require('_');

    var ShopDetailModel = Backbone.Model.extend({

        parse: function (res) {
            if (!res.data.photo_url) {
                res.data.photo_url = 'img/default.jpg';
            }else{
                res.data.photo_url+='_640x640x1.png';
            }
            return res.data;
        }
    });

    return ShopDetailModel;

});