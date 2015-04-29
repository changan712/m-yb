define(function (require) {

    var Backbone = require('backbone');
    var _ = require('_');

    return Backbone.Collection.extend({

        parse: function (result) {
            var data = [];

            _.each(result, function (obj) {
                var newObj = obj.data;
                if (!newObj.pic) {
                    // newObj.pic // += '__640x640x1.png'

                    newObj.pic = 'img/default.jpg';
                }
                if (!newObj.url) {
                    newObj.url = '#';
                }
                data.push(newObj);
            });

            return data;
        }

    });
});