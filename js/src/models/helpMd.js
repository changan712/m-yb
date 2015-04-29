define(function (require) {

    var Backbone = require('backbone');
    var _ = require('_');

    return Backbone.Model.extend({
        defaults: {
            active: false
        },
        setActive: function () {
            this.set('active', true);
        },
        setNormal: function () {
            this.set('active', false);
        }

    });



});