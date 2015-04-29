define(function (require) {

    var Backbone = require('backbone');
    var _ = require('_');

    var NavModel = Backbone.Model.extend({
        defaults: {
            active: false,
            md:''
        },
        setActive: function () {
            this.set('active', true);
        },
        setNormal: function () {
            this.set('active', false);
        }

    });

    return NavModel;

});