define(function (require) {

    var Backbone = require('backbone');
    var HelpModel = require('models/helpMd.js');

    return Backbone.Collection.extend({
        model: HelpModel,
        setActive: function (id) {
            this.removeActive();
            if (this.get(id)) {
                this.get(id).setActive();
            }
        },
        removeActive: function () {
            this.each(function (model) {
                model.setNormal();
            });
        }
    });
});