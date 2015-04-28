define(function (require) {

    var Backbone = require('backbone');
    var AppModel = require('models/appMd');

    var appCollection = Backbone.Collection.extend({
        model: AppModel
    });
    return appCollection;
});