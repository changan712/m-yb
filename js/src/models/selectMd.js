define(function (require) {

    var Backbone = require('backbone');
    var _ = require('_');

    var SelectModel = Backbone.Model.extend({
        defaults: {
            tt: false,
            selected:false
        }
    });

    return SelectModel;

});