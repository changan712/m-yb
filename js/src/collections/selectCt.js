define(function (require) {

    var Backbone = require('backbone');
    var _ = require('_');
    var SelectModel = require('models/selectMd.js');

    var catCollection = Backbone.Collection.extend({
        model: SelectModel,

        initialize: function (arr,obj) {
            this.url = obj.url;
            var _this = this;
            this.listName = obj.listName;
            this.subListName = obj.subListName;
            this.callback = obj.callback;
            this.type = obj.type;
            this.fetch({success: function () {

                _this.unshiftDefault(obj.type);
                _this.callback && _this.callback(_this);

            }, error: function () {
            }});
        },
        parse: function (res) {
            var arr = [];
            var _this = this;
            _.each(res[_this.listName], function (val) {
                arr.push(val);
                if (val[_this.subListName]) {
                    _.each(val[_this.subListName], function (v) {
                        arr.push(v);

                    });
                    val.tt = true;
                    delete  val[_this.subListName];
                }
            });
            return arr;
        },
        setActive: function (id) {
            this.normalData();
            if (this.type == 1) {

                this.findWhere({'category_id': id}).set('selected', true);
            } else if (this.type == 2) {

                this.findWhere({'id': id}).set('selected', true)
            }
        },
        normalData: function () {
            this.each(function (model) {
                model.set('selected', false);
            })
        },
        unshiftDefault: function (type) {
            if (type == 1) {
                this.unshift(
                    {
                        category_id: "0",
                        category_name: "全部分类",
                        selected: true,
                        tt: true
                    }
                    , {merge: true})
            } else if (type == 2) {
                this.unshift(
                    {
                        id: "0",
                        name: "全部地标",
                        selected: true,
                        tt: true
                    }
                    , {merge: true})
            }
        }
    });
    return catCollection;
});