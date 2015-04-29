define(function (require) {

    var Backbone = require('backbone');
    var _ = require('_');

    var AppModel = Backbone.Model.extend({
        defaults: {
            className: 'wrap',
            tagName: 'div',
            id: '',
            title: ''
        },
        addClass: function (className) {
            var classNameArray = this.get('className').split(' ');
            classNameArray.push(className);
            newClassNameArray = _.uniq(classNameArray);
            this.set('className', newClassNameArray.join(' '));
        },
        removeClass: function (className) {
            if (!className) throw  '参数错误';
            this.set('className', this.get('className').replace(new RegExp(className, 'g'), ''));
        }
    });

    return AppModel;

});