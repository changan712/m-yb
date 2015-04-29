seajs.config({
    alias: {
        '$': 'gallery/zepto/1.1.3/zepto-debug.js',
        '$-debug': 'gallery/zepto/1.1.3/zepto-debug.js',
        'backbone': 'gallery/backbone/1.1.2/backbone-debug.js',
        'backbone-debug': 'gallery/backbone/1.1.2/backbone-debug.js',
        '_': 'gallery/underscore/1.6.0/underscore-debug.js'
    },
    paths: {
        'src': '/js/src',
        'dist': '/js/dist',
        'tpl': '/tpl',
        'views': '/js/dist/views',
        'models': '/js/dist/models',
        'routers': '/js/dist/routers',
        'collections': '/js/dist/collections',
        'lib': '/js/dist/lib',
        'jsDir': '/js'
    },
    debug: true
});

//开发测试
seajs.on('fetch', function (data) {
    var reg = /dist/;
    var fileReg = /(\.js) /g;
    var match = data.uri.match(fileReg);
    if (reg.test(data.uri) && seajs.data.debug) {
        data.requestUri = data.uri.replace(reg, 'src');
       // console.log(data.requestUri);
    }
});
