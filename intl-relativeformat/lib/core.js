"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
Object.defineProperty(exports, "__esModule", { value: true });
/* jslint esnext: true */
var intl_messageformat_1 = require("intl-messageformat");
var diff_1 = require("./diff");
var es5_1 = require("./es5");
exports.default = RelativeFormat;
// -----------------------------------------------------------------------------
var FIELDS = [
    'second', 'second-short',
    'minute', 'minute-short',
    'hour', 'hour-short',
    'day', 'day-short',
    'month', 'month-short',
    'year', 'year-short'
];
var STYLES = ['best fit', 'numeric'];
// -- RelativeFormat -----------------------------------------------------------
function RelativeFormat(locales, options) {
    options = options || {};
    // Make a copy of `locales` if it's an array, so that it doesn't change
    // since it's used lazily.
    if (es5_1.isArray(locales)) {
        locales = locales.concat();
    }
    es5_1.defineProperty(this, '_locale', { value: this._resolveLocale(locales) });
    es5_1.defineProperty(this, '_options', { value: {
            style: this._resolveStyle(options.style),
            units: this._isValidUnits(options.units) && options.units
        } });
    es5_1.defineProperty(this, '_locales', { value: locales });
    es5_1.defineProperty(this, '_fields', { value: this._findFields(this._locale) });
    es5_1.defineProperty(this, '_messages', { value: es5_1.objCreate(null) });
    // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.
    var relativeFormat = this;
    this.format = function format(date, options) {
        return relativeFormat._format(date, options);
    };
}
// Define internal private properties for dealing with locale data.
es5_1.defineProperty(RelativeFormat, '__localeData__', { value: es5_1.objCreate(null) });
es5_1.defineProperty(RelativeFormat, '__addLocaleData', { value: function () {
        for (var i = 0; i < arguments.length; i++) {
            var datum = arguments[i];
            if (!(datum && datum.locale)) {
                throw new Error('Locale data provided to IntlRelativeFormat is missing a ' +
                    '`locale` property value');
            }
            RelativeFormat.__localeData__[datum.locale.toLowerCase()] = datum;
            // Add data to IntlMessageFormat.
            intl_messageformat_1.default.__addLocaleData(datum);
        }
    } });
// Define public `defaultLocale` property which can be set by the developer, or
// it will be set when the first RelativeFormat instance is created by
// leveraging the resolved locale from `Intl`.
es5_1.defineProperty(RelativeFormat, 'defaultLocale', {
    enumerable: true,
    writable: true,
    value: undefined
});
// Define public `thresholds` property which can be set by the developer, and
// defaults to relative time thresholds from moment.js.
es5_1.defineProperty(RelativeFormat, 'thresholds', {
    enumerable: true,
    value: {
        second: 45, 'second-short': 45,
        minute: 45, 'minute-short': 45,
        hour: 22, 'hour-short': 22,
        day: 26, 'day-short': 26,
        month: 11, 'month-short': 11 // months to year
    }
});
RelativeFormat.prototype.resolvedOptions = function () {
    return {
        locale: this._locale,
        style: this._options.style,
        units: this._options.units
    };
};
RelativeFormat.prototype._compileMessage = function (units) {
    // `this._locales` is the original set of locales the user specified to the
    // constructor, while `this._locale` is the resolved root locale.
    var locales = this._locales;
    var resolvedLocale = this._locale;
    var field = this._fields[units];
    var relativeTime = field.relativeTime;
    var future = '';
    var past = '';
    var i;
    for (i in relativeTime.future) {
        if (relativeTime.future.hasOwnProperty(i)) {
            future += ' ' + i + ' {' +
                relativeTime.future[i].replace('{0}', '#') + '}';
        }
    }
    for (i in relativeTime.past) {
        if (relativeTime.past.hasOwnProperty(i)) {
            past += ' ' + i + ' {' +
                relativeTime.past[i].replace('{0}', '#') + '}';
        }
    }
    var message = '{when, select, future {{0, plural, ' + future + '}}' +
        'past {{0, plural, ' + past + '}}}';
    // Create the synthetic IntlMessageFormat instance using the original
    // locales value specified by the user when constructing the the parent
    // IntlRelativeFormat instance.
    return new intl_messageformat_1.default(message, locales);
};
RelativeFormat.prototype._getMessage = function (units) {
    var messages = this._messages;
    // Create a new synthetic message based on the locale data from CLDR.
    if (!messages[units]) {
        messages[units] = this._compileMessage(units);
    }
    return messages[units];
};
RelativeFormat.prototype._getRelativeUnits = function (diff, units) {
    var field = this._fields[units];
    if (field.relative) {
        return field.relative[diff];
    }
};
RelativeFormat.prototype._findFields = function (locale) {
    var localeData = RelativeFormat.__localeData__;
    var data = localeData[locale.toLowerCase()];
    // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find `fields` to return.
    while (data) {
        if (data.fields) {
            return data.fields;
        }
        data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }
    throw new Error('Locale data added to IntlRelativeFormat is missing `fields` for :' +
        locale);
};
RelativeFormat.prototype._format = function (date, options) {
    var now = options && options.now !== undefined ? options.now : es5_1.dateNow();
    if (date === undefined) {
        date = now;
    }
    // Determine if the `date` and optional `now` values are valid, and throw a
    // similar error to what `Intl.DateTimeFormat#format()` would throw.
    if (!isFinite(now)) {
        throw new RangeError('The `now` option provided to IntlRelativeFormat#format() is not ' +
            'in valid range.');
    }
    if (!isFinite(date)) {
        throw new RangeError('The date value provided to IntlRelativeFormat#format() is not ' +
            'in valid range.');
    }
    var diffReport = diff_1.default(now, date);
    var units = this._options.units || this._selectUnits(diffReport);
    var diffInUnits = diffReport[units];
    if (this._options.style !== 'numeric') {
        var relativeUnits = this._getRelativeUnits(diffInUnits, units);
        if (relativeUnits) {
            return relativeUnits;
        }
    }
    return this._getMessage(units).format({
        '0': Math.abs(diffInUnits),
        when: diffInUnits < 0 ? 'past' : 'future'
    });
};
RelativeFormat.prototype._isValidUnits = function (units) {
    if (!units || es5_1.arrIndexOf.call(FIELDS, units) >= 0) {
        return true;
    }
    if (typeof units === 'string') {
        var suggestion = /s$/.test(units) && units.substr(0, units.length - 1);
        if (suggestion && es5_1.arrIndexOf.call(FIELDS, suggestion) >= 0) {
            throw new Error('"' + units + '" is not a valid IntlRelativeFormat `units` ' +
                'value, did you mean: ' + suggestion);
        }
    }
    throw new Error('"' + units + '" is not a valid IntlRelativeFormat `units` value, it ' +
        'must be one of: "' + FIELDS.join('", "') + '"');
};
RelativeFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
        locales = [locales];
    }
    // Create a copy of the array so we can push on the default locale.
    locales = (locales || []).concat(RelativeFormat.defaultLocale);
    var localeData = RelativeFormat.__localeData__;
    var i, len, localeParts, data;
    // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.
    for (i = 0, len = locales.length; i < len; i += 1) {
        localeParts = locales[i].toLowerCase().split('-');
        while (localeParts.length) {
            data = localeData[localeParts.join('-')];
            if (data) {
                // Return the normalized locale string; e.g., we return "en-US",
                // instead of "en-us".
                return data.locale;
            }
            localeParts.pop();
        }
    }
    var defaultLocale = locales.pop();
    throw new Error('No locale data has been added to IntlRelativeFormat for: ' +
        locales.join(', ') + ', or the default locale: ' + defaultLocale);
};
RelativeFormat.prototype._resolveStyle = function (style) {
    // Default to "best fit" style.
    if (!style) {
        return STYLES[0];
    }
    if (es5_1.arrIndexOf.call(STYLES, style) >= 0) {
        return style;
    }
    throw new Error('"' + style + '" is not a valid IntlRelativeFormat `style` value, it ' +
        'must be one of: "' + STYLES.join('", "') + '"');
};
RelativeFormat.prototype._selectUnits = function (diffReport) {
    var i, l, units;
    var fields = FIELDS.filter(function (field) {
        return field.indexOf('-short') < 1;
    });
    for (i = 0, l = fields.length; i < l; i += 1) {
        units = fields[i];
        if (Math.abs(diffReport[units]) < RelativeFormat.thresholds[units]) {
            break;
        }
    }
    return units;
};
//# sourceMappingURL=core.js.map