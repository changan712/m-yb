define(function (require) {

    var Backbone = require('backbone');
    var NavModel = require('models/navMd.js');

    var NavCollection = Backbone.Collection.extend({
        model: NavModel,
        setActive: function (md) {
            this.removeActive();
            if (this.findWhere({md: md})) {
                this.findWhere({md: md}).setActive();
            }
        },
        removeActive: function () {
            this.each(function (model) {
                model.setNormal();
            });
        }
    });
    return NavCollection;
});