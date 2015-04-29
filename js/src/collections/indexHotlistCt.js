define(function (require) {

    var Backbone = require('backbone');
    var HotListModel = require('models/indexHotlistMd');

    var HotListCollection = Backbone.Collection.extend({
        model: HotListModel,
        url: 'js/data/hotlist.json',
        limit:function(num){
            var limited =  this.first(num);
            this.reset(limited);
            return this;
        }
    });
    return HotListCollection;
});