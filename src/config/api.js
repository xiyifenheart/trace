//配置api接口地址
var root = 'http://192.168.0.6:8081';
// var root = '../static/data/1.json';
//自定义判断元素类型js
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
//参数过滤函数
function filter_null(o) {
    for (var key in o) {
        if (o[key] == null) {
            delete o[key];
        };
        if (toType(o[key] == 'string')) {
            o[key] = o[key].trim();
            if (o[key].length == 0) {
                delete o[key];
            };
        };
    };
    return o;
};
/*
  接口处理函数
*/
function _api_base(method, url, params, success, failure) {
    var dataType = '';
    if (method == 'JSONP') {
        dataType = 'jsonp';
    };
    if (params) {
        params = filter_null(params);
    };
    $.ajax({
        method: method,
        url: url,
        async: true,
        data: params,
        dataType: dataType,
        jsonp: 'jsonpCallback',
        success: success,
        error: failure
    });
};

// 返回在vue模板中的调用接口
export default {
    get: function(url, params, success, failure) {
        return _api_base('GET', root + '/' + url, params, success, failure);
        // return _api_base('GET', root + url, params, success, failure);
    },
    post: function(url, params, success, failure) {
        return _api_base('POST', root + '/' + url, params, success, failure);
    },
    jsonp: function(url, params, success, failure) {
        return _api_base('JSONP', root + '/' + url, params, success, failure);
    }
};