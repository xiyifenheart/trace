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
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
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