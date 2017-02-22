/** 全局ajax对象 */
var ajax = new Object();
var ajaxCore = null;
 
/**
 * @see 创建ajax核心对象,兼容浏览器有：IE6,7,8,9，谷歌，火狐，欧朋，360极速，360安全，苹果，搜狗，遨游，猎豹，腾讯
 * @return XMLHttpRequest
 */
ajax.getCore = function() {
    var xmlHttp = null;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
        if (xmlHttp.overrideMimeType) {
            xmlHttp.overrideMimeType("text/xml");
        }
    } else {
        if (window.ActiveXObject) {
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
    }
    if (!xmlHttp) {
        alert("\u8bf7\u4f7f\u7528IE\u6d4f\u89c8\u5668!");
    }
    return xmlHttp;
};
 
/**
 * @see 处理ajax参数
 * @param param 参数
 * @return String
 */
ajax.getParam = function(param) {
    var randomStr = "ajaxParamRandom=" + Math.random();
    if (param == null || param == "") {
        return randomStr;
    }
    var str = "";   
    if (typeof(param) == "object") {
        for (var key in param) {
            str += key + "=" + param[key] + "&";
        }
        str = (str.length > 0 ? str.substring(0, str.length - 1) : str);
    } else {
        str = param;
    }
    return str + "&" + randomStr;
};
 
/**
 * @see ajax的回调函数
 * @param callback 用户自定义回调函数
 * @param url 请求的url
 */
ajax.doCallback = function(callback, url) {
    if (ajaxCore.readyState == 4) {
        if (ajaxCore.status == 200) {
            if (callback == null) {
                return;
            }
            var result = new String(ajaxCore.responseText);
            if (null != result && result != "") {
                if (result == "null") {
                    callback(null);
                } else {
                    var backObject = null;
                    if (result == "true" || result == "false") {
                        backObject = eval(result);
                    } else if (!isNaN(result)) {
                        backObject = parseFloat(result);
                    } else if ((result.substring(0, 1) == "[" && result.substring(result.length - 1, result.length) == "]") || 
                            (result.substring(0, 1) == "{" && result.substring(result.length - 1, result.length) == "}")) {
                        backObject = eval("(" + result + ")");
                    } else {
                        backObject = result;
                    }
                    callback(backObject);
                }
            } else {
                callback(result);
            }           
        } else if (ajaxCore.status == 0 || ajaxCore.status == 12029) {
            alert("\u627e\u4e0d\u5230\u670d\u52a1\u5668\uff01");
        } else if (ajaxCore.status == 404) {
            alert("\u627e\u4e0d\u5230\u8d44\u6e90");
        }
    }
};
 
/**
 * @see ajax的post请求
 * @param url 请求的url
 * @param param 参数列表，可以是字符串或js对象或null
 * @param callback 用户自定义回调函数
 */
ajax.post = function(url, param, callback) {
    ajaxCore = ajax.getCore();
    if (ajaxCore != null) {
        ajaxCore.onreadystatechange = function() {
            ajax.doCallback(callback, url);
        };
        ajaxCore.open("POST", url, true);
        ajaxCore.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajaxCore.send(ajax.getParam(param));
    }
};
 
/**
 * @see ajax的get请求
 * @param url 请求的url
 * @param callback 用户自定义回调函数
 */
ajax.get = function(url, callback) {
    ajaxCore = ajax.getCore();
    if (ajaxCore != null) {
        if (url.indexOf("?") != -1) {
            url += "&ajaxParamRandom=" + Math.random();
        } else {
            url += "?ajaxParamRandom=" + Math.random();
        }alert(url);
        ajaxCore.onreadystatechange = function() {
            ajax.doCallback(callback, url);
        };
        ajaxCore.open("GET", url, true);
        ajaxCore.send(null);
    }
};

