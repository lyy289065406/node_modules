"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
Object.defineProperty(exports, "__esModule", { value: true });
/* jslint esnext: true */
// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License
var hop = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;
var realDefineProp = (function () {
    try {
        return !!Object.defineProperty({}, 'a', {});
    }
    catch (e) {
        return false;
    }
})();
var es3 = !realDefineProp && !Object.prototype.__defineGetter__;
var defineProperty = realDefineProp ? Object.defineProperty :
    function (obj, name, desc) {
        if ('get' in desc && obj.__defineGetter__) {
            obj.__defineGetter__(name, desc.get);
        }
        else if (!hop.call(obj, name) || 'value' in desc) {
            obj[name] = desc.value;
        }
    };
exports.defineProperty = defineProperty;
var objCreate = Object.create || function (proto, props) {
    var obj, k;
    function F() { }
    F.prototype = proto;
    obj = new F();
    for (k in props) {
        if (hop.call(props, k)) {
            defineProperty(obj, k, props[k]);
        }
    }
    return obj;
};
exports.objCreate = objCreate;
var arrIndexOf = Array.prototype.indexOf || function (search, fromIndex) {
    /*jshint validthis:true */
    var arr = this;
    if (!arr.length) {
        return -1;
    }
    for (var i = fromIndex || 0, max = arr.length; i < max; i++) {
        if (arr[i] === search) {
            return i;
        }
    }
    return -1;
};
exports.arrIndexOf = arrIndexOf;
var isArray = Array.isArray || function (obj) {
    return toString.call(obj) === '[object Array]';
};
exports.isArray = isArray;
var dateNow = Date.now || function () {
    return new Date().getTime();
};
exports.dateNow = dateNow;
//# sourceMappingURL=es5.js.map