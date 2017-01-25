/* /web/static/lib/es5-shim/es5-shim.min.js defined in bundle 'web.assets_common' */
(function(definition) {
    if (typeof define == "function") {
        define(definition)
    } else if (typeof YUI == "function") {
        YUI.add("es5", definition)
    } else {
        definition()
    }
})(function() {
    function Empty() {}
    if (!Function.prototype.bind) {
        Function.prototype.bind = function bind(that) {
            var target = this;
            if (typeof target != "function") {
                throw new TypeError("Function.prototype.bind called on incompatible " + target)
            }
            var args = _Array_slice_.call(arguments, 1);
            var bound = function() {
                if (this instanceof bound) {
                    var result = target.apply(this, args.concat(_Array_slice_.call(arguments)));
                    if (Object(result) === result) {
                        return result
                    }
                    return this
                } else {
                    return target.apply(that, args.concat(_Array_slice_.call(arguments)))
                }
            };
            if (target.prototype) {
                Empty.prototype = target.prototype;
                bound.prototype = new Empty;
                Empty.prototype = null
            }
            return bound
        }
    }
    var call = Function.prototype.call;
    var prototypeOfArray = Array.prototype;
    var prototypeOfObject = Object.prototype;
    var _Array_slice_ = prototypeOfArray.slice;
    var _toString = call.bind(prototypeOfObject.toString);
    var owns = call.bind(prototypeOfObject.hasOwnProperty);
    var defineGetter;
    var defineSetter;
    var lookupGetter;
    var lookupSetter;
    var supportsAccessors;
    if (supportsAccessors = owns(prototypeOfObject, "__defineGetter__")) {
        defineGetter = call.bind(prototypeOfObject.__defineGetter__);
        defineSetter = call.bind(prototypeOfObject.__defineSetter__);
        lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
        lookupSetter = call.bind(prototypeOfObject.__lookupSetter__)
    }
    if ([1, 2].splice(0).length != 2) {
        var array_splice = Array.prototype.splice;
        if (function() {
                function makeArray(l) {
                    var a = [];
                    while (l--) {
                        a.unshift(l)
                    }
                    return a
                }
                var array = [],
                    lengthBefore;
                array.splice.bind(array, 0, 0).apply(null, makeArray(20));
                array.splice.bind(array, 0, 0).apply(null, makeArray(26));
                lengthBefore = array.length;
                array.splice(5, 0, "XXX");
                if (lengthBefore + 1 == array.length) {
                    return true
                }
            }()) {
            Array.prototype.splice = function(start, deleteCount) {
                if (!arguments.length) {
                    return []
                } else {
                    return array_splice.apply(this, [start === void 0 ? 0 : start, deleteCount === void 0 ? this.length - start : deleteCount].concat(_Array_slice_.call(arguments, 2)))
                }
            }
        } else {
            Array.prototype.splice = function(start, deleteCount) {
                var result, args = _Array_slice_.call(arguments, 2),
                    addElementsCount = args.length;
                if (!arguments.length) {
                    return []
                }
                if (start === void 0) {
                    start = 0
                }
                if (deleteCount === void 0) {
                    deleteCount = this.length - start
                }
                if (addElementsCount > 0) {
                    if (deleteCount <= 0) {
                        if (start == this.length) {
                            this.push.apply(this, args);
                            return []
                        }
                        if (start == 0) {
                            this.unshift.apply(this, args);
                            return []
                        }
                    }
                    result = _Array_slice_.call(this, start, start + deleteCount);
                    args.push.apply(args, _Array_slice_.call(this, start + deleteCount, this.length));
                    args.unshift.apply(args, _Array_slice_.call(this, 0, start));
                    args.unshift(0, this.length);
                    array_splice.apply(this, args);
                    return result
                }
                return array_splice.call(this, start, deleteCount)
            }
        }
    }
    if ([].unshift(0) != 1) {
        var array_unshift = Array.prototype.unshift;
        Array.prototype.unshift = function() {
            array_unshift.apply(this, arguments);
            return this.length
        }
    }
    if (!Array.isArray) {
        Array.isArray = function isArray(obj) {
            return _toString(obj) == "[object Array]"
        }
    }
    var boxedString = Object("a"),
        splitString = boxedString[0] != "a" || !(0 in boxedString);
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function forEach(fun) {
            var object = toObject(this),
                self = splitString && _toString(this) == "[object String]" ? this.split("") : object,
                thisp = arguments[1],
                i = -1,
                length = self.length >>> 0;
            if (_toString(fun) != "[object Function]") {
                throw new TypeError
            }
            while (++i < length) {
                if (i in self) {
                    fun.call(thisp, self[i], i, object)
                }
            }
        }
    }
    if (!Array.prototype.map) {
        Array.prototype.map = function map(fun) {
            var object = toObject(this),
                self = splitString && _toString(this) == "[object String]" ? this.split("") : object,
                length = self.length >>> 0,
                result = Array(length),
                thisp = arguments[1];
            if (_toString(fun) != "[object Function]") {
                throw new TypeError(fun + " is not a function")
            }
            for (var i = 0; i < length; i++) {
                if (i in self) result[i] = fun.call(thisp, self[i], i, object)
            }
            return result
        }
    }
    if (!Array.prototype.filter) {
        Array.prototype.filter = function filter(fun) {
            var object = toObject(this),
                self = splitString && _toString(this) == "[object String]" ? this.split("") : object,
                length = self.length >>> 0,
                result = [],
                value, thisp = arguments[1];
            if (_toString(fun) != "[object Function]") {
                throw new TypeError(fun + " is not a function")
            }
            for (var i = 0; i < length; i++) {
                if (i in self) {
                    value = self[i];
                    if (fun.call(thisp, value, i, object)) {
                        result.push(value)
                    }
                }
            }
            return result
        }
    }
    if (!Array.prototype.every) {
        Array.prototype.every = function every(fun) {
            var object = toObject(this),
                self = splitString && _toString(this) == "[object String]" ? this.split("") : object,
                length = self.length >>> 0,
                thisp = arguments[1];
            if (_toString(fun) != "[object Function]") {
                throw new TypeError(fun + " is not a function")
            }
            for (var i = 0; i < length; i++) {
                if (i in self && !fun.call(thisp, self[i], i, object)) {
                    return false
                }
            }
            return true
        }
    }
    if (!Array.prototype.some) {
        Array.prototype.some = function some(fun) {
            var object = toObject(this),
                self = splitString && _toString(this) == "[object String]" ? this.split("") : object,
                length = self.length >>> 0,
                thisp = arguments[1];
            if (_toString(fun) != "[object Function]") {
                throw new TypeError(fun + " is not a function")
            }
            for (var i = 0; i < length; i++) {
                if (i in self && fun.call(thisp, self[i], i, object)) {
                    return true
                }
            }
            return false
        }
    }
    if (!Array.prototype.reduce) {
        Array.prototype.reduce = function reduce(fun) {
            var object = toObject(this),
                self = splitString && _toString(this) == "[object String]" ? this.split("") : object,
                length = self.length >>> 0;
            if (_toString(fun) != "[object Function]") {
                throw new TypeError(fun + " is not a function")
            }
            if (!length && arguments.length == 1) {
                throw new TypeError("reduce of empty array with no initial value")
            }
            var i = 0;
            var result;
            if (arguments.length >= 2) {
                result = arguments[1]
            } else {
                do {
                    if (i in self) {
                        result = self[i++];
                        break
                    }
                    if (++i >= length) {
                        throw new TypeError("reduce of empty array with no initial value")
                    }
                } while (true)
            }
            for (; i < length; i++) {
                if (i in self) {
                    result = fun.call(void 0, result, self[i], i, object)
                }
            }
            return result
        }
    }
    if (!Array.prototype.reduceRight) {
        Array.prototype.reduceRight = function reduceRight(fun) {
            var object = toObject(this),
                self = splitString && _toString(this) == "[object String]" ? this.split("") : object,
                length = self.length >>> 0;
            if (_toString(fun) != "[object Function]") {
                throw new TypeError(fun + " is not a function")
            }
            if (!length && arguments.length == 1) {
                throw new TypeError("reduceRight of empty array with no initial value")
            }
            var result, i = length - 1;
            if (arguments.length >= 2) {
                result = arguments[1]
            } else {
                do {
                    if (i in self) {
                        result = self[i--];
                        break
                    }
                    if (--i < 0) {
                        throw new TypeError("reduceRight of empty array with no initial value")
                    }
                } while (true)
            }
            if (i < 0) {
                return result
            }
            do {
                if (i in this) {
                    result = fun.call(void 0, result, self[i], i, object)
                }
            } while (i--);
            return result
        }
    }
    if (!Array.prototype.indexOf || [0, 1].indexOf(1, 2) != -1) {
        Array.prototype.indexOf = function indexOf(sought) {
            var self = splitString && _toString(this) == "[object String]" ? this.split("") : toObject(this),
                length = self.length >>> 0;
            if (!length) {
                return -1
            }
            var i = 0;
            if (arguments.length > 1) {
                i = toInteger(arguments[1])
            }
            i = i >= 0 ? i : Math.max(0, length + i);
            for (; i < length; i++) {
                if (i in self && self[i] === sought) {
                    return i
                }
            }
            return -1
        }
    }
    if (!Array.prototype.lastIndexOf || [0, 1].lastIndexOf(0, -3) != -1) {
        Array.prototype.lastIndexOf = function lastIndexOf(sought) {
            var self = splitString && _toString(this) == "[object String]" ? this.split("") : toObject(this),
                length = self.length >>> 0;
            if (!length) {
                return -1
            }
            var i = length - 1;
            if (arguments.length > 1) {
                i = Math.min(i, toInteger(arguments[1]))
            }
            i = i >= 0 ? i : length - Math.abs(i);
            for (; i >= 0; i--) {
                if (i in self && sought === self[i]) {
                    return i
                }
            }
            return -1
        }
    }
    if (!Object.keys) {
        var hasDontEnumBug = true,
            dontEnums = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            dontEnumsLength = dontEnums.length;
        for (var key in {
                toString: null
            }) {
            hasDontEnumBug = false
        }
        Object.keys = function keys(object) {
            if (typeof object != "object" && typeof object != "function" || object === null) {
                throw new TypeError("Object.keys called on a non-object")
            }
            var keys = [];
            for (var name in object) {
                if (owns(object, name)) {
                    keys.push(name)
                }
            }
            if (hasDontEnumBug) {
                for (var i = 0, ii = dontEnumsLength; i < ii; i++) {
                    var dontEnum = dontEnums[i];
                    if (owns(object, dontEnum)) {
                        keys.push(dontEnum)
                    }
                }
            }
            return keys
        }
    }
    var negativeDate = -621987552e5,
        negativeYearString = "-000001";
    if (!Date.prototype.toISOString || new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1) {
        Date.prototype.toISOString = function toISOString() {
            var result, length, value, year, month;
            if (!isFinite(this)) {
                throw new RangeError("Date.prototype.toISOString called on non-finite value.")
            }
            year = this.getUTCFullYear();
            month = this.getUTCMonth();
            year += Math.floor(month / 12);
            month = (month % 12 + 12) % 12;
            result = [month + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()];
            year = (year < 0 ? "-" : year > 9999 ? "+" : "") + ("00000" + Math.abs(year)).slice(0 <= year && year <= 9999 ? -4 : -6);
            length = result.length;
            while (length--) {
                value = result[length];
                if (value < 10) {
                    result[length] = "0" + value
                }
            }
            return year + "-" + result.slice(0, 2).join("-") + "T" + result.slice(2).join(":") + "." + ("000" + this.getUTCMilliseconds()).slice(-3) + "Z"
        }
    }
    var dateToJSONIsSupported = false;
    try {
        dateToJSONIsSupported = Date.prototype.toJSON && new Date(NaN).toJSON() === null && new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1 && Date.prototype.toJSON.call({
            toISOString: function() {
                return true
            }
        })
    } catch (e) {}
    if (!dateToJSONIsSupported) {
        Date.prototype.toJSON = function toJSON(key) {
            var o = Object(this),
                tv = toPrimitive(o),
                toISO;
            if (typeof tv === "number" && !isFinite(tv)) {
                return null
            }
            toISO = o.toISOString;
            if (typeof toISO != "function") {
                throw new TypeError("toISOString property is not callable")
            }
            return toISO.call(o)
        }
    }
    if (!Date.parse || "Date.parse is buggy") {
        Date = function(NativeDate) {
            function Date(Y, M, D, h, m, s, ms) {
                var length = arguments.length;
                if (this instanceof NativeDate) {
                    var date = length == 1 && String(Y) === Y ? new NativeDate(Date.parse(Y)) : length >= 7 ? new NativeDate(Y, M, D, h, m, s, ms) : length >= 6 ? new NativeDate(Y, M, D, h, m, s) : length >= 5 ? new NativeDate(Y, M, D, h, m) : length >= 4 ? new NativeDate(Y, M, D, h) : length >= 3 ? new NativeDate(Y, M, D) : length >= 2 ? new NativeDate(Y, M) : length >= 1 ? new NativeDate(Y) : new NativeDate;
                    date.constructor = Date;
                    return date
                }
                return NativeDate.apply(this, arguments)
            }
            var isoDateExpression = new RegExp("^" + "(\\d{4}|[+-]\\d{6})" + "(?:-(\\d{2})" + "(?:-(\\d{2})" + "(?:" + "T(\\d{2})" + ":(\\d{2})" + "(?:" + ":(\\d{2})" + "(?:(\\.\\d{1,}))?" + ")?" + "(" + "Z|" + "(?:" + "([-+])" + "(\\d{2})" + ":(\\d{2})" + ")" + ")?)?)?)?" + "$");
            var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

            function dayFromMonth(year, month) {
                var t = month > 1 ? 1 : 0;
                return months[month] + Math.floor((year - 1969 + t) / 4) - Math.floor((year - 1901 + t) / 100) + Math.floor((year - 1601 + t) / 400) + 365 * (year - 1970)
            }
            for (var key in NativeDate) {
                Date[key] = NativeDate[key]
            }
            Date.now = NativeDate.now;
            Date.UTC = NativeDate.UTC;
            Date.prototype = NativeDate.prototype;
            Date.prototype.constructor = Date;
            Date.parse = function parse(string) {
                var match = isoDateExpression.exec(string);
                if (match) {
                    var year = Number(match[1]),
                        month = Number(match[2] || 1) - 1,
                        day = Number(match[3] || 1) - 1,
                        hour = Number(match[4] || 0),
                        minute = Number(match[5] || 0),
                        second = Number(match[6] || 0),
                        millisecond = Math.floor(Number(match[7] || 0) * 1e3),
                        offset = !match[4] || match[8] ? 0 : Number(new NativeDate(1970, 0)),
                        signOffset = match[9] === "-" ? 1 : -1,
                        hourOffset = Number(match[10] || 0),
                        minuteOffset = Number(match[11] || 0),
                        result;
                    if (hour < (minute > 0 || second > 0 || millisecond > 0 ? 24 : 25) && minute < 60 && second < 60 && millisecond < 1e3 && month > -1 && month < 12 && hourOffset < 24 && minuteOffset < 60 && day > -1 && day < dayFromMonth(year, month + 1) - dayFromMonth(year, month)) {
                        result = ((dayFromMonth(year, month) + day) * 24 + hour + hourOffset * signOffset) * 60;
                        result = ((result + minute + minuteOffset * signOffset) * 60 + second) * 1e3 + millisecond + offset;
                        if (-864e13 <= result && result <= 864e13) {
                            return result
                        }
                    }
                    return NaN
                }
                return NativeDate.parse.apply(this, arguments)
            };
            return Date
        }(Date)
    }
    if (!Date.now) {
        Date.now = function now() {
            return (new Date).getTime()
        }
    }
    if (!Number.prototype.toFixed || 8e-5.toFixed(3) !== "0.000" || .9.toFixed(0) === "0" || 1.255.toFixed(2) !== "1.25" || 0xde0b6b3a7640080.toFixed(0) !== "1000000000000000128") {
        (function() {
            var base, size, data, i;
            base = 1e7;
            size = 6;
            data = [0, 0, 0, 0, 0, 0];

            function multiply(n, c) {
                var i = -1;
                while (++i < size) {
                    c += n * data[i];
                    data[i] = c % base;
                    c = Math.floor(c / base)
                }
            }

            function divide(n) {
                var i = size,
                    c = 0;
                while (--i >= 0) {
                    c += data[i];
                    data[i] = Math.floor(c / n);
                    c = c % n * base
                }
            }

            function toString() {
                var i = size;
                var s = "";
                while (--i >= 0) {
                    if (s !== "" || i === 0 || data[i] !== 0) {
                        var t = String(data[i]);
                        if (s === "") {
                            s = t
                        } else {
                            s += "0000000".slice(0, 7 - t.length) + t
                        }
                    }
                }
                return s
            }

            function pow(x, n, acc) {
                return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc)
            }

            function log(x) {
                var n = 0;
                while (x >= 4096) {
                    n += 12;
                    x /= 4096
                }
                while (x >= 2) {
                    n += 1;
                    x /= 2
                }
                return n
            }
            Number.prototype.toFixed = function(fractionDigits) {
                var f, x, s, m, e, z, j, k;
                f = Number(fractionDigits);
                f = f !== f ? 0 : Math.floor(f);
                if (f < 0 || f > 20) {
                    throw new RangeError("Number.toFixed called with invalid number of decimals")
                }
                x = Number(this);
                if (x !== x) {
                    return "NaN"
                }
                if (x <= -1e21 || x >= 1e21) {
                    return String(x)
                }
                s = "";
                if (x < 0) {
                    s = "-";
                    x = -x
                }
                m = "0";
                if (x > 1e-21) {
                    e = log(x * pow(2, 69, 1)) - 69;
                    z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
                    z *= 4503599627370496;
                    e = 52 - e;
                    if (e > 0) {
                        multiply(0, z);
                        j = f;
                        while (j >= 7) {
                            multiply(1e7, 0);
                            j -= 7
                        }
                        multiply(pow(10, j, 1), 0);
                        j = e - 1;
                        while (j >= 23) {
                            divide(1 << 23);
                            j -= 23
                        }
                        divide(1 << j);
                        multiply(1, 1);
                        divide(2);
                        m = toString()
                    } else {
                        multiply(0, z);
                        multiply(1 << -e, 0);
                        m = toString() + "0.00000000000000000000".slice(2, 2 + f)
                    }
                }
                if (f > 0) {
                    k = m.length;
                    if (k <= f) {
                        m = s + "0.0000000000000000000".slice(0, f - k + 2) + m
                    } else {
                        m = s + m.slice(0, k - f) + "." + m.slice(k - f)
                    }
                } else {
                    m = s + m
                }
                return m
            }
        })()
    }
    var string_split = String.prototype.split;
    if ("ab".split(/(?:ab)*/).length !== 2 || ".".split(/(.?)(.?)/).length !== 4 || "tesst".split(/(s)*/)[1] === "t" || "".split(/.?/).length === 0 || ".".split(/()()/).length > 1) {
        (function() {
            var compliantExecNpcg = /()??/.exec("")[1] === void 0;
            String.prototype.split = function(separator, limit) {
                var string = this;
                if (separator === void 0 && limit === 0) return [];
                if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
                    return string_split.apply(this, arguments)
                }
                var output = [],
                    flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + (separator.sticky ? "y" : ""),
                    lastLastIndex = 0,
                    separator = new RegExp(separator.source, flags + "g"),
                    separator2, match, lastIndex, lastLength;
                string += "";
                if (!compliantExecNpcg) {
                    separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags)
                }
                limit = limit === void 0 ? -1 >>> 0 : limit >>> 0;
                while (match = separator.exec(string)) {
                    lastIndex = match.index + match[0].length;
                    if (lastIndex > lastLastIndex) {
                        output.push(string.slice(lastLastIndex, match.index));
                        if (!compliantExecNpcg && match.length > 1) {
                            match[0].replace(separator2, function() {
                                for (var i = 1; i < arguments.length - 2; i++) {
                                    if (arguments[i] === void 0) {
                                        match[i] = void 0
                                    }
                                }
                            })
                        }
                        if (match.length > 1 && match.index < string.length) {
                            Array.prototype.push.apply(output, match.slice(1))
                        }
                        lastLength = match[0].length;
                        lastLastIndex = lastIndex;
                        if (output.length >= limit) {
                            break
                        }
                    }
                    if (separator.lastIndex === match.index) {
                        separator.lastIndex++
                    }
                }
                if (lastLastIndex === string.length) {
                    if (lastLength || !separator.test("")) {
                        output.push("")
                    }
                } else {
                    output.push(string.slice(lastLastIndex))
                }
                return output.length > limit ? output.slice(0, limit) : output
            }
        })()
    } else if ("0".split(void 0, 0).length) {
        String.prototype.split = function(separator, limit) {
            if (separator === void 0 && limit === 0) return [];
            return string_split.apply(this, arguments)
        }
    }
    if ("".substr && "0b".substr(-1) !== "b") {
        var string_substr = String.prototype.substr;
        String.prototype.substr = function(start, length) {
            return string_substr.call(this, start < 0 ? (start = this.length + start) < 0 ? 0 : start : start, length)
        }
    }
    var ws = "	\n\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003" + "\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028" + "\u2029\ufeff";
    if (!String.prototype.trim || ws.trim()) {
        ws = "[" + ws + "]";
        var trimBeginRegexp = new RegExp("^" + ws + ws + "*"),
            trimEndRegexp = new RegExp(ws + ws + "*$");
        String.prototype.trim = function trim() {
            if (this === void 0 || this === null) {
                throw new TypeError("can't convert " + this + " to object")
            }
            return String(this).replace(trimBeginRegexp, "").replace(trimEndRegexp, "")
        }
    }

    function toInteger(n) {
        n = +n;
        if (n !== n) {
            n = 0
        } else if (n !== 0 && n !== 1 / 0 && n !== -(1 / 0)) {
            n = (n > 0 || -1) * Math.floor(Math.abs(n))
        }
        return n
    }

    function isPrimitive(input) {
        var type = typeof input;
        return input === null || type === "undefined" || type === "boolean" || type === "number" || type === "string"
    }

    function toPrimitive(input) {
        var val, valueOf, toString;
        if (isPrimitive(input)) {
            return input
        }
        valueOf = input.valueOf;
        if (typeof valueOf === "function") {
            val = valueOf.call(input);
            if (isPrimitive(val)) {
                return val
            }
        }
        toString = input.toString;
        if (typeof toString === "function") {
            val = toString.call(input);
            if (isPrimitive(val)) {
                return val
            }
        }
        throw new TypeError
    }
    var toObject = function(o) {
        if (o == null) {
            throw new TypeError("can't convert " + o + " to object")
        }
        return Object(o)
    }
});;

/* /web/static/lib/underscore/underscore.js defined in bundle 'web.assets_common' */
(function() {
    var root = this;
    var previousUnderscore = root._;
    var breaker = {};
    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        FuncProto = Function.prototype;
    var
        push = ArrayProto.push,
        slice = ArrayProto.slice,
        concat = ArrayProto.concat,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;
    var
        nativeForEach = ArrayProto.forEach,
        nativeMap = ArrayProto.map,
        nativeReduce = ArrayProto.reduce,
        nativeReduceRight = ArrayProto.reduceRight,
        nativeFilter = ArrayProto.filter,
        nativeEvery = ArrayProto.every,
        nativeSome = ArrayProto.some,
        nativeIndexOf = ArrayProto.indexOf,
        nativeLastIndexOf = ArrayProto.lastIndexOf,
        nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeBind = FuncProto.bind;
    var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }
    _.VERSION = '1.6.0';
    var each = _.each = _.forEach = function(obj, iterator, context) {
        if (obj == null) return obj;
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, length = obj.length; i < length; i++) {
                if (iterator.call(context, obj[i], i, obj) === breaker) return;
            }
        } else {
            var keys = _.keys(obj);
            for (var i = 0, length = keys.length; i < length; i++) {
                if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
            }
        }
        return obj;
    };
    _.map = _.collect = function(obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
        each(obj, function(value, index, list) {
            results.push(iterator.call(context, value, index, list));
        });
        return results;
    };
    var reduceError = 'Reduce of empty array with no initial value';
    _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (obj == null) obj = [];
        if (nativeReduce && obj.reduce === nativeReduce) {
            if (context) iterator = _.bind(iterator, context);
            return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
        }
        each(obj, function(value, index, list) {
            if (!initial) {
                memo = value;
                initial = true;
            } else {
                memo = iterator.call(context, memo, value, index, list);
            }
        });
        if (!initial) throw new TypeError(reduceError);
        return memo;
    };
    _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (obj == null) obj = [];
        if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
            if (context) iterator = _.bind(iterator, context);
            return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
        }
        var length = obj.length;
        if (length !== +length) {
            var keys = _.keys(obj);
            length = keys.length;
        }
        each(obj, function(value, index, list) {
            index = keys ? keys[--length] : --length;
            if (!initial) {
                memo = obj[index];
                initial = true;
            } else {
                memo = iterator.call(context, memo, obj[index], index, list);
            }
        });
        if (!initial) throw new TypeError(reduceError);
        return memo;
    };
    _.find = _.detect = function(obj, predicate, context) {
        var result;
        any(obj, function(value, index, list) {
            if (predicate.call(context, value, index, list)) {
                result = value;
                return true;
            }
        });
        return result;
    };
    _.filter = _.select = function(obj, predicate, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
        each(obj, function(value, index, list) {
            if (predicate.call(context, value, index, list)) results.push(value);
        });
        return results;
    };
    _.reject = function(obj, predicate, context) {
        return _.filter(obj, function(value, index, list) {
            return !predicate.call(context, value, index, list);
        }, context);
    };
    _.every = _.all = function(obj, predicate, context) {
        predicate || (predicate = _.identity);
        var result = true;
        if (obj == null) return result;
        if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
        each(obj, function(value, index, list) {
            if (!(result = result && predicate.call(context, value, index, list))) return breaker;
        });
        return !!result;
    };
    var any = _.some = _.any = function(obj, predicate, context) {
        predicate || (predicate = _.identity);
        var result = false;
        if (obj == null) return result;
        if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
        each(obj, function(value, index, list) {
            if (result || (result = predicate.call(context, value, index, list))) return breaker;
        });
        return !!result;
    };
    _.contains = _.include = function(obj, target) {
        if (obj == null) return false;
        if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
        return any(obj, function(value) {
            return value === target;
        });
    };
    _.invoke = function(obj, method) {
        var args = slice.call(arguments, 2);
        var isFunc = _.isFunction(method);
        return _.map(obj, function(value) {
            return (isFunc ? method : value[method]).apply(value, args);
        });
    };
    _.pluck = function(obj, key) {
        return _.map(obj, _.property(key));
    };
    _.where = function(obj, attrs) {
        return _.filter(obj, _.matches(attrs));
    };
    _.findWhere = function(obj, attrs) {
        return _.find(obj, _.matches(attrs));
    };
    _.max = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
            return Math.max.apply(Math, obj);
        }
        var result = -Infinity,
            lastComputed = -Infinity;
        each(obj, function(value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            if (computed > lastComputed) {
                result = value;
                lastComputed = computed;
            }
        });
        return result;
    };
    _.min = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
            return Math.min.apply(Math, obj);
        }
        var result = Infinity,
            lastComputed = Infinity;
        each(obj, function(value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            if (computed < lastComputed) {
                result = value;
                lastComputed = computed;
            }
        });
        return result;
    };
    _.shuffle = function(obj) {
        var rand;
        var index = 0;
        var shuffled = [];
        each(obj, function(value) {
            rand = _.random(index++);
            shuffled[index - 1] = shuffled[rand];
            shuffled[rand] = value;
        });
        return shuffled;
    };
    _.sample = function(obj, n, guard) {
        if (n == null || guard) {
            if (obj.length !== +obj.length) obj = _.values(obj);
            return obj[_.random(obj.length - 1)];
        }
        return _.shuffle(obj).slice(0, Math.max(0, n));
    };
    var lookupIterator = function(value) {
        if (value == null) return _.identity;
        if (_.isFunction(value)) return value;
        return _.property(value);
    };
    _.sortBy = function(obj, iterator, context) {
        iterator = lookupIterator(iterator);
        return _.pluck(_.map(obj, function(value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iterator.call(context, value, index, list)
            };
        }).sort(function(left, right) {
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
                if (a > b || a === void 0) return 1;
                if (a < b || b === void 0) return -1;
            }
            return left.index - right.index;
        }), 'value');
    };
    var group = function(behavior) {
        return function(obj, iterator, context) {
            var result = {};
            iterator = lookupIterator(iterator);
            each(obj, function(value, index) {
                var key = iterator.call(context, value, index, obj);
                behavior(result, key, value);
            });
            return result;
        };
    };
    _.groupBy = group(function(result, key, value) {
        _.has(result, key) ? result[key].push(value) : result[key] = [value];
    });
    _.indexBy = group(function(result, key, value) {
        result[key] = value;
    });
    _.countBy = group(function(result, key) {
        _.has(result, key) ? result[key]++ : result[key] = 1;
    });
    _.sortedIndex = function(array, obj, iterator, context) {
        iterator = lookupIterator(iterator);
        var value = iterator.call(context, obj);
        var low = 0,
            high = array.length;
        while (low < high) {
            var mid = (low + high) >>> 1;
            iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
        }
        return low;
    };
    _.toArray = function(obj) {
        if (!obj) return [];
        if (_.isArray(obj)) return slice.call(obj);
        if (obj.length === +obj.length) return _.map(obj, _.identity);
        return _.values(obj);
    };
    _.size = function(obj) {
        if (obj == null) return 0;
        return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
    };
    _.first = _.head = _.take = function(array, n, guard) {
        if (array == null) return void 0;
        if ((n == null) || guard) return array[0];
        if (n < 0) return [];
        return slice.call(array, 0, n);
    };
    _.initial = function(array, n, guard) {
        return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
    };
    _.last = function(array, n, guard) {
        if (array == null) return void 0;
        if ((n == null) || guard) return array[array.length - 1];
        return slice.call(array, Math.max(array.length - n, 0));
    };
    _.rest = _.tail = _.drop = function(array, n, guard) {
        return slice.call(array, (n == null) || guard ? 1 : n);
    };
    _.compact = function(array) {
        return _.filter(array, _.identity);
    };
    var flatten = function(input, shallow, output) {
        if (shallow && _.every(input, _.isArray)) {
            return concat.apply(output, input);
        }
        each(input, function(value) {
            if (_.isArray(value) || _.isArguments(value)) {
                shallow ? push.apply(output, value) : flatten(value, shallow, output);
            } else {
                output.push(value);
            }
        });
        return output;
    };
    _.flatten = function(array, shallow) {
        return flatten(array, shallow, []);
    };
    _.without = function(array) {
        return _.difference(array, slice.call(arguments, 1));
    };
    _.partition = function(array, predicate, context) {
        predicate = lookupIterator(predicate);
        var pass = [],
            fail = [];
        each(array, function(elem) {
            (predicate.call(context, elem) ? pass : fail).push(elem);
        });
        return [pass, fail];
    };
    _.uniq = _.unique = function(array, isSorted, iterator, context) {
        if (_.isFunction(isSorted)) {
            context = iterator;
            iterator = isSorted;
            isSorted = false;
        }
        var initial = iterator ? _.map(array, iterator, context) : array;
        var results = [];
        var seen = [];
        each(initial, function(value, index) {
            if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
                seen.push(value);
                results.push(array[index]);
            }
        });
        return results;
    };
    _.union = function() {
        return _.uniq(_.flatten(arguments, true));
    };
    _.intersection = function(array) {
        var rest = slice.call(arguments, 1);
        return _.filter(_.uniq(array), function(item) {
            return _.every(rest, function(other) {
                return _.contains(other, item);
            });
        });
    };
    _.difference = function(array) {
        var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
        return _.filter(array, function(value) {
            return !_.contains(rest, value);
        });
    };
    _.zip = function() {
        var length = _.max(_.pluck(arguments, 'length').concat(0));
        var results = new Array(length);
        for (var i = 0; i < length; i++) {
            results[i] = _.pluck(arguments, '' + i);
        }
        return results;
    };
    _.object = function(list, values) {
        if (list == null) return {};
        var result = {};
        for (var i = 0, length = list.length; i < length; i++) {
            if (values) {
                result[list[i]] = values[i];
            } else {
                result[list[i][0]] = list[i][1];
            }
        }
        return result;
    };
    _.indexOf = function(array, item, isSorted) {
        if (array == null) return -1;
        var i = 0,
            length = array.length;
        if (isSorted) {
            if (typeof isSorted == 'number') {
                i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
            } else {
                i = _.sortedIndex(array, item);
                return array[i] === item ? i : -1;
            }
        }
        if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
        for (; i < length; i++)
            if (array[i] === item) return i;
        return -1;
    };
    _.lastIndexOf = function(array, item, from) {
        if (array == null) return -1;
        var hasIndex = from != null;
        if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
            return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
        }
        var i = (hasIndex ? from : array.length);
        while (i--)
            if (array[i] === item) return i;
        return -1;
    };
    _.range = function(start, stop, step) {
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
        }
        step = arguments[2] || 1;
        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var idx = 0;
        var range = new Array(length);
        while (idx < length) {
            range[idx++] = start;
            start += step;
        }
        return range;
    };
    var ctor = function() {};
    _.bind = function(func, context) {
        var args, bound;
        if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
        if (!_.isFunction(func)) throw new TypeError;
        args = slice.call(arguments, 2);
        return bound = function() {
            if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
            ctor.prototype = func.prototype;
            var self = new ctor;
            ctor.prototype = null;
            var result = func.apply(self, args.concat(slice.call(arguments)));
            if (Object(result) === result) return result;
            return self;
        };
    };
    _.partial = function(func) {
        var boundArgs = slice.call(arguments, 1);
        return function() {
            var position = 0;
            var args = boundArgs.slice();
            for (var i = 0, length = args.length; i < length; i++) {
                if (args[i] === _) args[i] = arguments[position++];
            }
            while (position < arguments.length) args.push(arguments[position++]);
            return func.apply(this, args);
        };
    };
    _.bindAll = function(obj) {
        var funcs = slice.call(arguments, 1);
        if (funcs.length === 0) throw new Error('bindAll must be passed function names');
        each(funcs, function(f) {
            obj[f] = _.bind(obj[f], obj);
        });
        return obj;
    };
    _.memoize = function(func, hasher) {
        var memo = {};
        hasher || (hasher = _.identity);
        return function() {
            var key = hasher.apply(this, arguments);
            return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
        };
    };
    _.delay = function(func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function() {
            return func.apply(null, args);
        }, wait);
    };
    _.defer = function(func) {
        return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
    };
    _.throttle = function(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        options || (options = {});
        var later = function() {
            previous = options.leading === false ? 0 : _.now();
            timeout = null;
            result = func.apply(context, args);
            context = args = null;
        };
        return function() {
            var now = _.now();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
                context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    };
    _.debounce = function(func, wait, immediate) {
        var timeout, args, context, timestamp, result;
        var later = function() {
            var last = _.now() - timestamp;
            if (last < wait) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    context = args = null;
                }
            }
        };
        return function() {
            context = this;
            args = arguments;
            timestamp = _.now();
            var callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        };
    };
    _.once = function(func) {
        var ran = false,
            memo;
        return function() {
            if (ran) return memo;
            ran = true;
            memo = func.apply(this, arguments);
            func = null;
            return memo;
        };
    };
    _.wrap = function(func, wrapper) {
        return _.partial(wrapper, func);
    };
    _.compose = function() {
        var funcs = arguments;
        return function() {
            var args = arguments;
            for (var i = funcs.length - 1; i >= 0; i--) {
                args = [funcs[i].apply(this, args)];
            }
            return args[0];
        };
    };
    _.after = function(times, func) {
        return function() {
            if (--times < 1) {
                return func.apply(this, arguments);
            }
        };
    };
    _.keys = function(obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj)
            if (_.has(obj, key)) keys.push(key);
        return keys;
    };
    _.values = function(obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = new Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    };
    _.pairs = function(obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var pairs = new Array(length);
        for (var i = 0; i < length; i++) {
            pairs[i] = [keys[i], obj[keys[i]]];
        }
        return pairs;
    };
    _.invert = function(obj) {
        var result = {};
        var keys = _.keys(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
            result[obj[keys[i]]] = keys[i];
        }
        return result;
    };
    _.functions = _.methods = function(obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };
    _.extend = function(obj) {
        each(slice.call(arguments, 1), function(source) {
            if (source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };
    _.pick = function(obj) {
        var copy = {};
        var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        each(keys, function(key) {
            if (key in obj) copy[key] = obj[key];
        });
        return copy;
    };
    _.omit = function(obj) {
        var copy = {};
        var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        for (var key in obj) {
            if (!_.contains(keys, key)) copy[key] = obj[key];
        }
        return copy;
    };
    _.defaults = function(obj) {
        each(slice.call(arguments, 1), function(source) {
            if (source) {
                for (var prop in source) {
                    if (obj[prop] === void 0) obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };
    _.clone = function(obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };
    _.tap = function(obj, interceptor) {
        interceptor(obj);
        return obj;
    };
    var eq = function(a, b, aStack, bStack) {
        if (a === b) return a !== 0 || 1 / a == 1 / b;
        if (a == null || b == null) return a === b;
        if (a instanceof _) a = a._wrapped;
        if (b instanceof _) b = b._wrapped;
        var className = toString.call(a);
        if (className != toString.call(b)) return false;
        switch (className) {
            case '[object String]':
                return a == String(b);
            case '[object Number]':
                return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
            case '[object Date]':
            case '[object Boolean]':
                return +a == +b;
            case '[object RegExp]':
                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
        }
        if (typeof a != 'object' || typeof b != 'object') return false;
        var length = aStack.length;
        while (length--) {
            if (aStack[length] == a) return bStack[length] == b;
        }
        var aCtor = a.constructor,
            bCtor = b.constructor;
        if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) && _.isFunction(bCtor) && (bCtor instanceof bCtor)) && ('constructor' in a && 'constructor' in b)) {
            return false;
        }
        aStack.push(a);
        bStack.push(b);
        var size = 0,
            result = true;
        if (className == '[object Array]') {
            size = a.length;
            result = size == b.length;
            if (result) {
                while (size--) {
                    if (!(result = eq(a[size], b[size], aStack, bStack))) break;
                }
            }
        } else {
            for (var key in a) {
                if (_.has(a, key)) {
                    size++;
                    if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
                }
            }
            if (result) {
                for (key in b) {
                    if (_.has(b, key) && !(size--)) break;
                }
                result = !size;
            }
        }
        aStack.pop();
        bStack.pop();
        return result;
    };
    _.isEqual = function(a, b) {
        return eq(a, b, [], []);
    };
    _.isEmpty = function(obj) {
        if (obj == null) return true;
        if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
        for (var key in obj)
            if (_.has(obj, key)) return false;
        return true;
    };
    _.isElement = function(obj) {
        return !!(obj && obj.nodeType === 1);
    };
    _.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) == '[object Array]';
    };
    _.isObject = function(obj) {
        return obj === Object(obj);
    };
    each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
        _['is' + name] = function(obj) {
            return toString.call(obj) == '[object ' + name + ']';
        };
    });
    if (!_.isArguments(arguments)) {
        _.isArguments = function(obj) {
            return !!(obj && _.has(obj, 'callee'));
        };
    }
    if (typeof(/./) !== 'function') {
        _.isFunction = function(obj) {
            return typeof obj === 'function';
        };
    }
    _.isFinite = function(obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
    };
    _.isNaN = function(obj) {
        return _.isNumber(obj) && obj != +obj;
    };
    _.isBoolean = function(obj) {
        return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
    };
    _.isNull = function(obj) {
        return obj === null;
    };
    _.isUndefined = function(obj) {
        return obj === void 0;
    };
    _.has = function(obj, key) {
        return hasOwnProperty.call(obj, key);
    };
    _.noConflict = function() {
        root._ = previousUnderscore;
        return this;
    };
    _.identity = function(value) {
        return value;
    };
    _.constant = function(value) {
        return function() {
            return value;
        };
    };
    _.property = function(key) {
        return function(obj) {
            return obj[key];
        };
    };
    _.matches = function(attrs) {
        return function(obj) {
            if (obj === attrs) return true;
            for (var key in attrs) {
                if (attrs[key] !== obj[key])
                    return false;
            }
            return true;
        }
    };
    _.times = function(n, iterator, context) {
        var accum = Array(Math.max(0, n));
        for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
        return accum;
    };
    _.random = function(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };
    _.now = Date.now || function() {
        return new Date().getTime();
    };
    var entityMap = {
        escape: {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;'
        }
    };
    entityMap.unescape = _.invert(entityMap.escape);
    var entityRegexes = {
        escape: new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
        unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
    };
    _.each(['escape', 'unescape'], function(method) {
        _[method] = function(string) {
            if (string == null) return '';
            return ('' + string).replace(entityRegexes[method], function(match) {
                return entityMap[method][match];
            });
        };
    });
    _.result = function(object, property) {
        if (object == null) return void 0;
        var value = object[property];
        return _.isFunction(value) ? value.call(object) : value;
    };
    _.mixin = function(obj) {
        each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
                var args = [this._wrapped];
                push.apply(args, arguments);
                return result.call(this, func.apply(_, args));
            };
        });
    };
    var idCounter = 0;
    _.uniqueId = function(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    };
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var noMatch = /(.)^/;
    var escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\t': 't',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };
    var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    _.template = function(text, data, settings) {
        var render;
        settings = _.defaults({}, settings, _.templateSettings);
        var matcher = new RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g');
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset).replace(escaper, function(match) {
                return '\\' + escapes[match];
            });
            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            }
            if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            }
            if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }
            index = offset + match.length;
            return match;
        });
        source += "';\n";
        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
        source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" +
            source + "return __p;\n";
        try {
            render = new Function(settings.variable || 'obj', '_', source);
        } catch (e) {
            e.source = source;
            throw e;
        }
        if (data) return render(data, _);
        var template = function(data) {
            return render.call(this, data, _);
        };
        template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';
        return template;
    };
    _.chain = function(obj) {
        return _(obj).chain();
    };
    var result = function(obj) {
        return this._chain ? _(obj).chain() : obj;
    };
    _.mixin(_);
    each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            var obj = this._wrapped;
            method.apply(obj, arguments);
            if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
            return result.call(this, obj);
        };
    });
    each(['concat', 'join', 'slice'], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            return result.call(this, method.apply(this._wrapped, arguments));
        };
    });
    _.extend(_.prototype, {
        chain: function() {
            this._chain = true;
            return this;
        },
        value: function() {
            return this._wrapped;
        }
    });
    if (typeof define === 'function' && define.amd) {
        define('underscore', [], function() {
            return _;
        });
    }
}).call(this);;

/* /web/static/lib/underscore.string/lib/underscore.string.js defined in bundle 'web.assets_common' */
! function(root, String) {
    'use strict';
    var nativeTrim = String.prototype.trim;
    var nativeTrimRight = String.prototype.trimRight;
    var nativeTrimLeft = String.prototype.trimLeft;
    var parseNumber = function(source) {
        return source * 1 || 0;
    };
    var strRepeat = function(str, qty) {
        if (qty < 1) return '';
        var result = '';
        while (qty > 0) {
            if (qty & 1) result += str;
            qty >>= 1, str += str;
        }
        return result;
    };
    var slice = [].slice;
    var defaultToWhiteSpace = function(characters) {
        if (characters == null)
            return '\\s';
        else if (characters.source)
            return characters.source;
        else
            return '[' + _s.escapeRegExp(characters) + ']';
    };

    function boolMatch(s, matchers) {
        var i, matcher, down = s.toLowerCase();
        matchers = [].concat(matchers);
        for (i = 0; i < matchers.length; i += 1) {
            matcher = matchers[i];
            if (!matcher) continue;
            if (matcher.test && matcher.test(s)) return true;
            if (matcher.toLowerCase() === down) return true;
        }
    }
    var escapeChars = {
        lt: '<',
        gt: '>',
        quot: '"',
        amp: '&',
        apos: "'"
    };
    var reversedEscapeChars = {};
    for (var key in escapeChars) reversedEscapeChars[escapeChars[key]] = key;
    reversedEscapeChars["'"] = '#39';
    var sprintf = (function() {
        function get_type(variable) {
            return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
        }
        var str_repeat = strRepeat;
        var str_format = function() {
            if (!str_format.cache.hasOwnProperty(arguments[0])) {
                str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
            }
            return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
        };
        str_format.format = function(parse_tree, argv) {
            var cursor = 1,
                tree_length = parse_tree.length,
                node_type = '',
                arg, output = [],
                i, k, match, pad, pad_character, pad_length;
            for (i = 0; i < tree_length; i++) {
                node_type = get_type(parse_tree[i]);
                if (node_type === 'string') {
                    output.push(parse_tree[i]);
                } else if (node_type === 'array') {
                    match = parse_tree[i];
                    if (match[2]) {
                        arg = argv[cursor];
                        for (k = 0; k < match[2].length; k++) {
                            if (!arg.hasOwnProperty(match[2][k])) {
                                throw new Error(sprintf('[_.sprintf] property "%s" does not exist', match[2][k]));
                            }
                            arg = arg[match[2][k]];
                        }
                    } else if (match[1]) {
                        arg = argv[match[1]];
                    } else {
                        arg = argv[cursor++];
                    }
                    if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
                        throw new Error(sprintf('[_.sprintf] expecting number but found %s', get_type(arg)));
                    }
                    switch (match[8]) {
                        case 'b':
                            arg = arg.toString(2);
                            break;
                        case 'c':
                            arg = String.fromCharCode(arg);
                            break;
                        case 'd':
                            arg = parseInt(arg, 10);
                            break;
                        case 'e':
                            arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential();
                            break;
                        case 'f':
                            arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg);
                            break;
                        case 'o':
                            arg = arg.toString(8);
                            break;
                        case 's':
                            arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg);
                            break;
                        case 'u':
                            arg = Math.abs(arg);
                            break;
                        case 'x':
                            arg = arg.toString(16);
                            break;
                        case 'X':
                            arg = arg.toString(16).toUpperCase();
                            break;
                    }
                    arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+' + arg : arg);
                    pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
                    pad_length = match[6] - String(arg).length;
                    pad = match[6] ? str_repeat(pad_character, pad_length) : '';
                    output.push(match[5] ? arg + pad : pad + arg);
                }
            }
            return output.join('');
        };
        str_format.cache = {};
        str_format.parse = function(fmt) {
            var _fmt = fmt,
                match = [],
                parse_tree = [],
                arg_names = 0;
            while (_fmt) {
                if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
                    parse_tree.push(match[0]);
                } else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
                    parse_tree.push('%');
                } else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
                    if (match[2]) {
                        arg_names |= 1;
                        var field_list = [],
                            replacement_field = match[2],
                            field_match = [];
                        if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                            field_list.push(field_match[1]);
                            while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                                if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                                    field_list.push(field_match[1]);
                                } else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                                    field_list.push(field_match[1]);
                                } else {
                                    throw new Error('[_.sprintf] huh?');
                                }
                            }
                        } else {
                            throw new Error('[_.sprintf] huh?');
                        }
                        match[2] = field_list;
                    } else {
                        arg_names |= 2;
                    }
                    if (arg_names === 3) {
                        throw new Error('[_.sprintf] mixing positional and named placeholders is not (yet) supported');
                    }
                    parse_tree.push(match);
                } else {
                    throw new Error('[_.sprintf] huh?');
                }
                _fmt = _fmt.substring(match[0].length);
            }
            return parse_tree;
        };
        return str_format;
    })();
    var _s = {
        VERSION: '2.3.0',
        isBlank: function(str) {
            if (str == null) str = '';
            return (/^\s*$/).test(str);
        },
        stripTags: function(str) {
            if (str == null) return '';
            return String(str).replace(/<\/?[^>]+>/g, '');
        },
        capitalize: function(str) {
            str = str == null ? '' : String(str);
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        chop: function(str, step) {
            if (str == null) return [];
            str = String(str);
            step = ~~step;
            return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
        },
        clean: function(str) {
            return _s.strip(str).replace(/\s+/g, ' ');
        },
        count: function(str, substr) {
            if (str == null || substr == null) return 0;
            str = String(str);
            substr = String(substr);
            var count = 0,
                pos = 0,
                length = substr.length;
            while (true) {
                pos = str.indexOf(substr, pos);
                if (pos === -1) break;
                count++;
                pos += length;
            }
            return count;
        },
        chars: function(str) {
            if (str == null) return [];
            return String(str).split('');
        },
        swapCase: function(str) {
            if (str == null) return '';
            return String(str).replace(/\S/g, function(c) {
                return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
            });
        },
        escapeHTML: function(str) {
            if (str == null) return '';
            return String(str).replace(/[&<>"']/g, function(m) {
                return '&' + reversedEscapeChars[m] + ';';
            });
        },
        unescapeHTML: function(str) {
            if (str == null) return '';
            return String(str).replace(/\&([^;]+);/g, function(entity, entityCode) {
                var match;
                if (entityCode in escapeChars) {
                    return escapeChars[entityCode];
                } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
                    return String.fromCharCode(parseInt(match[1], 16));
                } else if (match = entityCode.match(/^#(\d+)$/)) {
                    return String.fromCharCode(~~match[1]);
                } else {
                    return entity;
                }
            });
        },
        escapeRegExp: function(str) {
            if (str == null) return '';
            return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
        },
        splice: function(str, i, howmany, substr) {
            var arr = _s.chars(str);
            arr.splice(~~i, ~~howmany, substr);
            return arr.join('');
        },
        insert: function(str, i, substr) {
            return _s.splice(str, i, 0, substr);
        },
        include: function(str, needle) {
            if (needle === '') return true;
            if (str == null) return false;
            return String(str).indexOf(needle) !== -1;
        },
        join: function() {
            var args = slice.call(arguments),
                separator = args.shift();
            if (separator == null) separator = '';
            return args.join(separator);
        },
        lines: function(str) {
            if (str == null) return [];
            return String(str).split("\n");
        },
        reverse: function(str) {
            return _s.chars(str).reverse().join('');
        },
        startsWith: function(str, starts) {
            if (starts === '') return true;
            if (str == null || starts == null) return false;
            str = String(str);
            starts = String(starts);
            return str.length >= starts.length && str.slice(0, starts.length) === starts;
        },
        endsWith: function(str, ends) {
            if (ends === '') return true;
            if (str == null || ends == null) return false;
            str = String(str);
            ends = String(ends);
            return str.length >= ends.length && str.slice(str.length - ends.length) === ends;
        },
        succ: function(str) {
            if (str == null) return '';
            str = String(str);
            return str.slice(0, -1) + String.fromCharCode(str.charCodeAt(str.length - 1) + 1);
        },
        titleize: function(str) {
            if (str == null) return '';
            str = String(str).toLowerCase();
            return str.replace(/(?:^|\s|-)\S/g, function(c) {
                return c.toUpperCase();
            });
        },
        camelize: function(str) {
            return _s.trim(str).replace(/[-_\s]+(.)?/g, function(match, c) {
                return c ? c.toUpperCase() : "";
            });
        },
        underscored: function(str) {
            return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
        },
        dasherize: function(str) {
            return _s.trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
        },
        classify: function(str) {
            return _s.titleize(String(str).replace(/[\W_]/g, ' ')).replace(/\s/g, '');
        },
        humanize: function(str) {
            return _s.capitalize(_s.underscored(str).replace(/_id$/, '').replace(/_/g, ' '));
        },
        trim: function(str, characters) {
            if (str == null) return '';
            if (!characters && nativeTrim) return nativeTrim.call(str);
            characters = defaultToWhiteSpace(characters);
            return String(str).replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '');
        },
        ltrim: function(str, characters) {
            if (str == null) return '';
            if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str);
            characters = defaultToWhiteSpace(characters);
            return String(str).replace(new RegExp('^' + characters + '+'), '');
        },
        rtrim: function(str, characters) {
            if (str == null) return '';
            if (!characters && nativeTrimRight) return nativeTrimRight.call(str);
            characters = defaultToWhiteSpace(characters);
            return String(str).replace(new RegExp(characters + '+$'), '');
        },
        truncate: function(str, length, truncateStr) {
            if (str == null) return '';
            str = String(str);
            truncateStr = truncateStr || '...';
            length = ~~length;
            return str.length > length ? str.slice(0, length) + truncateStr : str;
        },
        prune: function(str, length, pruneStr) {
            if (str == null) return '';
            str = String(str);
            length = ~~length;
            pruneStr = pruneStr != null ? String(pruneStr) : '...';
            if (str.length <= length) return str;
            var tmpl = function(c) {
                    return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' ';
                },
                template = str.slice(0, length + 1).replace(/.(?=\W*\w*$)/g, tmpl);
            if (template.slice(template.length - 2).match(/\w\w/))
                template = template.replace(/\s*\S+$/, '');
            else
                template = _s.rtrim(template.slice(0, template.length - 1));
            return (template + pruneStr).length > str.length ? str : str.slice(0, template.length) + pruneStr;
        },
        words: function(str, delimiter) {
            if (_s.isBlank(str)) return [];
            return _s.trim(str, delimiter).split(delimiter || /\s+/);
        },
        pad: function(str, length, padStr, type) {
            str = str == null ? '' : String(str);
            length = ~~length;
            var padlen = 0;
            if (!padStr)
                padStr = ' ';
            else if (padStr.length > 1)
                padStr = padStr.charAt(0);
            switch (type) {
                case 'right':
                    padlen = length - str.length;
                    return str + strRepeat(padStr, padlen);
                case 'both':
                    padlen = length - str.length;
                    return strRepeat(padStr, Math.ceil(padlen / 2)) + str +
                        strRepeat(padStr, Math.floor(padlen / 2));
                default:
                    padlen = length - str.length;
                    return strRepeat(padStr, padlen) + str;
            }
        },
        lpad: function(str, length, padStr) {
            return _s.pad(str, length, padStr);
        },
        rpad: function(str, length, padStr) {
            return _s.pad(str, length, padStr, 'right');
        },
        lrpad: function(str, length, padStr) {
            return _s.pad(str, length, padStr, 'both');
        },
        sprintf: sprintf,
        vsprintf: function(fmt, argv) {
            argv.unshift(fmt);
            return sprintf.apply(null, argv);
        },
        toNumber: function(str, decimals) {
            if (!str) return 0;
            str = _s.trim(str);
            if (!str.match(/^-?\d+(?:\.\d+)?$/)) return NaN;
            return parseNumber(parseNumber(str).toFixed(~~decimals));
        },
        numberFormat: function(number, dec, dsep, tsep) {
            if (isNaN(number) || number == null) return '';
            number = number.toFixed(~~dec);
            tsep = typeof tsep == 'string' ? tsep : ',';
            var parts = number.split('.'),
                fnums = parts[0],
                decimals = parts[1] ? (dsep || '.') + parts[1] : '';
            return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
        },
        strRight: function(str, sep) {
            if (str == null) return '';
            str = String(str);
            sep = sep != null ? String(sep) : sep;
            var pos = !sep ? -1 : str.indexOf(sep);
            return ~pos ? str.slice(pos + sep.length, str.length) : str;
        },
        strRightBack: function(str, sep) {
            if (str == null) return '';
            str = String(str);
            sep = sep != null ? String(sep) : sep;
            var pos = !sep ? -1 : str.lastIndexOf(sep);
            return ~pos ? str.slice(pos + sep.length, str.length) : str;
        },
        strLeft: function(str, sep) {
            if (str == null) return '';
            str = String(str);
            sep = sep != null ? String(sep) : sep;
            var pos = !sep ? -1 : str.indexOf(sep);
            return ~pos ? str.slice(0, pos) : str;
        },
        strLeftBack: function(str, sep) {
            if (str == null) return '';
            str += '';
            sep = sep != null ? '' + sep : sep;
            var pos = str.lastIndexOf(sep);
            return ~pos ? str.slice(0, pos) : str;
        },
        toSentence: function(array, separator, lastSeparator, serial) {
            separator = separator || ', ';
            lastSeparator = lastSeparator || ' and ';
            var a = array.slice(),
                lastMember = a.pop();
            if (array.length > 2 && serial) lastSeparator = _s.rtrim(separator) + lastSeparator;
            return a.length ? a.join(separator) + lastSeparator + lastMember : lastMember;
        },
        toSentenceSerial: function() {
            var args = slice.call(arguments);
            args[3] = true;
            return _s.toSentence.apply(_s, args);
        },
        slugify: function(str) {
            if (str == null) return '';
            var from = "ąàáäâãåæăćęèéëêìíïîłńòóöôõøśșțùúüûñçżź",
                to = "aaaaaaaaaceeeeeiiiilnoooooosstuuuunczz",
                regex = new RegExp(defaultToWhiteSpace(from), 'g');
            str = String(str).toLowerCase().replace(regex, function(c) {
                var index = from.indexOf(c);
                return to.charAt(index) || '-';
            });
            return _s.dasherize(str.replace(/[^\w\s-]/g, ''));
        },
        surround: function(str, wrapper) {
            return [wrapper, str, wrapper].join('');
        },
        quote: function(str, quoteChar) {
            return _s.surround(str, quoteChar || '"');
        },
        unquote: function(str, quoteChar) {
            quoteChar = quoteChar || '"';
            if (str[0] === quoteChar && str[str.length - 1] === quoteChar)
                return str.slice(1, str.length - 1);
            else return str;
        },
        exports: function() {
            var result = {};
            for (var prop in this) {
                if (!this.hasOwnProperty(prop) || prop.match(/^(?:include|contains|reverse)$/)) continue;
                result[prop] = this[prop];
            }
            return result;
        },
        repeat: function(str, qty, separator) {
            if (str == null) return '';
            qty = ~~qty;
            if (separator == null) return strRepeat(String(str), qty);
            for (var repeat = []; qty > 0; repeat[--qty] = str) {}
            return repeat.join(separator);
        },
        naturalCmp: function(str1, str2) {
            if (str1 == str2) return 0;
            if (!str1) return -1;
            if (!str2) return 1;
            var cmpRegex = /(\.\d+)|(\d+)|(\D+)/g,
                tokens1 = String(str1).toLowerCase().match(cmpRegex),
                tokens2 = String(str2).toLowerCase().match(cmpRegex),
                count = Math.min(tokens1.length, tokens2.length);
            for (var i = 0; i < count; i++) {
                var a = tokens1[i],
                    b = tokens2[i];
                if (a !== b) {
                    var num1 = parseInt(a, 10);
                    if (!isNaN(num1)) {
                        var num2 = parseInt(b, 10);
                        if (!isNaN(num2) && num1 - num2)
                            return num1 - num2;
                    }
                    return a < b ? -1 : 1;
                }
            }
            if (tokens1.length === tokens2.length)
                return tokens1.length - tokens2.length;
            return str1 < str2 ? -1 : 1;
        },
        levenshtein: function(str1, str2) {
            if (str1 == null && str2 == null) return 0;
            if (str1 == null) return String(str2).length;
            if (str2 == null) return String(str1).length;
            str1 = String(str1);
            str2 = String(str2);
            var current = [],
                prev, value;
            for (var i = 0; i <= str2.length; i++)
                for (var j = 0; j <= str1.length; j++) {
                    if (i && j)
                        if (str1.charAt(j - 1) === str2.charAt(i - 1))
                            value = prev;
                        else
                            value = Math.min(current[j], current[j - 1], prev) + 1;
                    else
                        value = i + j;
                    prev = current[j];
                    current[j] = value;
                }
            return current.pop();
        },
        toBoolean: function(str, trueValues, falseValues) {
            if (typeof str === "number") str = "" + str;
            if (typeof str !== "string") return !!str;
            str = _s.trim(str);
            if (boolMatch(str, trueValues || ["true", "1"])) return true;
            if (boolMatch(str, falseValues || ["false", "0"])) return false;
        }
    };
    _s.strip = _s.trim;
    _s.lstrip = _s.ltrim;
    _s.rstrip = _s.rtrim;
    _s.center = _s.lrpad;
    _s.rjust = _s.lpad;
    _s.ljust = _s.rpad;
    _s.contains = _s.include;
    _s.q = _s.quote;
    _s.toBool = _s.toBoolean;
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports)
            module.exports = _s;
        exports._s = _s;
    }
    if (typeof define === 'function' && define.amd)
        define('underscore.string', [], function() {
            return _s;
        });
    root._ = root._ || {};
    root._.string = root._.str = _s;
}(this, String);;

/* /web/static/lib/datejs/globalization/en-US.js defined in bundle 'web.assets_common' */
Date.CultureInfo = {
    name: "en-US",
    englishName: "English (United States)",
    nativeName: "English (United States)",
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    amDesignator: "AM",
    pmDesignator: "PM",
    firstDayOfWeek: 0,
    twoDigitYearMax: 2029,
    dateElementOrder: "mdy",
    formatPatterns: {
        shortDate: "M/d/yyyy",
        longDate: "dddd, MMMM dd, yyyy",
        shortTime: "h:mm tt",
        longTime: "h:mm:ss tt",
        fullDateTime: "dddd, MMMM dd, yyyy h:mm:ss tt",
        sortableDateTime: "yyyy-MM-ddTHH:mm:ss",
        universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ",
        rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT",
        monthDay: "MMMM dd",
        yearMonth: "MMMM, yyyy"
    },
    regexPatterns: {
        jan: /^jan(uary)?/i,
        feb: /^feb(ruary)?/i,
        mar: /^mar(ch)?/i,
        apr: /^apr(il)?/i,
        may: /^may/i,
        jun: /^jun(e)?/i,
        jul: /^jul(y)?/i,
        aug: /^aug(ust)?/i,
        sep: /^sep(t(ember)?)?/i,
        oct: /^oct(ober)?/i,
        nov: /^nov(ember)?/i,
        dec: /^dec(ember)?/i,
        sun: /^su(n(day)?)?/i,
        mon: /^mo(n(day)?)?/i,
        tue: /^tu(e(s(day)?)?)?/i,
        wed: /^we(d(nesday)?)?/i,
        thu: /^th(u(r(s(day)?)?)?)?/i,
        fri: /^fr(i(day)?)?/i,
        sat: /^sa(t(urday)?)?/i,
        future: /^next/i,
        past: /^last|past|prev(ious)?/i,
        add: /^(\+|aft(er)?|from|hence)/i,
        subtract: /^(\-|bef(ore)?|ago)/i,
        yesterday: /^yes(terday)?/i,
        today: /^t(od(ay)?)?/i,
        tomorrow: /^tom(orrow)?/i,
        now: /^n(ow)?/i,
        millisecond: /^ms|milli(second)?s?/i,
        second: /^sec(ond)?s?/i,
        minute: /^mn|min(ute)?s?/i,
        hour: /^h(our)?s?/i,
        week: /^w(eek)?s?/i,
        month: /^m(onth)?s?/i,
        day: /^d(ay)?s?/i,
        year: /^y(ear)?s?/i,
        shortMeridian: /^(a|p)/i,
        longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i,
        timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i,
        ordinalSuffix: /^\s*(st|nd|rd|th)/i,
        timeContext: /^\s*(\:|a(?!u|p)|p)/i
    },
    timezones: [{
        name: "UTC",
        offset: "-000"
    }, {
        name: "GMT",
        offset: "-000"
    }, {
        name: "EST",
        offset: "-0500"
    }, {
        name: "EDT",
        offset: "-0400"
    }, {
        name: "CST",
        offset: "-0600"
    }, {
        name: "CDT",
        offset: "-0500"
    }, {
        name: "MST",
        offset: "-0700"
    }, {
        name: "MDT",
        offset: "-0600"
    }, {
        name: "PST",
        offset: "-0800"
    }, {
        name: "PDT",
        offset: "-0700"
    }]
};;

/* /web/static/lib/spinjs/spin.js defined in bundle 'web.assets_common' */
! function(window, document, undefined) {
    var prefixes = ['webkit', 'Moz', 'ms', 'O'],
        animations = {},
        useCssAnimations

    function createEl(tag, prop) {
        var el = document.createElement(tag || 'div'),
            n
        for (n in prop) el[n] = prop[n]
        return el
    }

    function ins(parent) {
        for (var i = 1, n = arguments.length; i < n; i++)
            parent.appendChild(arguments[i])
        return parent
    }
    var sheet = function() {
        var el = createEl('style', {
            type: 'text/css'
        })
        ins(document.getElementsByTagName('head')[0], el)
        return el.sheet || el.styleSheet
    }()

    function addAnimation(alpha, trail, i, lines) {
        var name = ['opacity', trail, ~~(alpha * 100), i, lines].join('-'),
            start = 0.01 + i / lines * 100,
            z = Math.max(1 - (1 - alpha) / trail * (100 - start), alpha),
            prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase(),
            pre = prefix && '-' + prefix + '-' || ''
        if (!animations[name]) {
            sheet.insertRule('@' + pre + 'keyframes ' + name + '{' + '0%{opacity:' + z + '}' +
                start + '%{opacity:' + alpha + '}' +
                (start + 0.01) + '%{opacity:1}' +
                (start + trail) % 100 + '%{opacity:' + alpha + '}' + '100%{opacity:' + z + '}' + '}', sheet.cssRules.length)
            animations[name] = 1
        }
        return name
    }

    function vendor(el, prop) {
        var s = el.style,
            pp, i
        if (s[prop] !== undefined) return prop
        prop = prop.charAt(0).toUpperCase() + prop.slice(1)
        for (i = 0; i < prefixes.length; i++) {
            pp = prefixes[i] + prop
            if (s[pp] !== undefined) return pp
        }
    }

    function css(el, prop) {
        for (var n in prop)
            el.style[vendor(el, n) || n] = prop[n]
        return el
    }

    function merge(obj) {
        for (var i = 1; i < arguments.length; i++) {
            var def = arguments[i]
            for (var n in def)
                if (obj[n] === undefined) obj[n] = def[n]
        }
        return obj
    }

    function pos(el) {
        var o = {
            x: el.offsetLeft,
            y: el.offsetTop
        }
        while ((el = el.offsetParent))
            o.x += el.offsetLeft, o.y += el.offsetTop
        return o
    }
    var defaults = {
        lines: 12,
        length: 7,
        width: 5,
        radius: 10,
        rotate: 0,
        corners: 1,
        color: '#000',
        speed: 1,
        trail: 100,
        opacity: 1 / 4,
        fps: 20,
        zIndex: 2e9,
        className: 'spinner',
        top: 'auto',
        left: 'auto',
        position: 'relative'
    }
    var Spinner = function Spinner(o) {
        if (!this.spin) return new Spinner(o)
        this.opts = merge(o || {}, Spinner.defaults, defaults)
    }
    Spinner.defaults = {}
    merge(Spinner.prototype, {
        spin: function(target) {
            this.stop()
            var self = this,
                o = self.opts,
                el = self.el = css(createEl(0, {
                    className: o.className
                }), {
                    position: o.position,
                    width: 0,
                    zIndex: o.zIndex
                }),
                mid = o.radius + o.length + o.width,
                ep, tp
            if (target) {
                target.insertBefore(el, target.firstChild || null)
                tp = pos(target)
                ep = pos(el)
                css(el, {
                    left: (o.left == 'auto' ? tp.x - ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + 'px',
                    top: (o.top == 'auto' ? tp.y - ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid) + 'px'
                })
            }
            el.setAttribute('aria-role', 'progressbar')
            self.lines(el, self.opts)
            if (!useCssAnimations) {
                var i = 0,
                    fps = o.fps,
                    f = fps / o.speed,
                    ostep = (1 - o.opacity) / (f * o.trail / 100),
                    astep = f / o.lines;
                (function anim() {
                    i++;
                    for (var s = o.lines; s; s--) {
                        var alpha = Math.max(1 - (i + s * astep) % f * ostep, o.opacity)
                        self.opacity(el, o.lines - s, alpha, o)
                    }
                    self.timeout = self.el && setTimeout(anim, ~~(1000 / fps))
                })()
            }
            return self
        },
        stop: function() {
            var el = this.el
            if (el) {
                clearTimeout(this.timeout)
                if (el.parentNode) el.parentNode.removeChild(el)
                this.el = undefined
            }
            return this
        },
        lines: function(el, o) {
            var i = 0,
                seg

            function fill(color, shadow) {
                return css(createEl(), {
                    position: 'absolute',
                    width: (o.length + o.width) + 'px',
                    height: o.width + 'px',
                    background: color,
                    boxShadow: shadow,
                    transformOrigin: 'left',
                    transform: 'rotate(' + ~~(360 / o.lines * i + o.rotate) + 'deg) translate(' + o.radius + 'px' + ',0)',
                    borderRadius: (o.corners * o.width >> 1) + 'px'
                })
            }
            for (; i < o.lines; i++) {
                seg = css(createEl(), {
                    position: 'absolute',
                    top: 1 + ~(o.width / 2) + 'px',
                    transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
                    opacity: o.opacity,
                    animation: useCssAnimations && addAnimation(o.opacity, o.trail, i, o.lines) + ' ' + 1 / o.speed + 's linear infinite'
                })
                if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {
                    top: 2 + 'px'
                }))
                ins(el, ins(seg, fill(o.color, '0 0 1px rgba(0,0,0,.1)')))
            }
            return el
        },
        opacity: function(el, i, val) {
            if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
        }
    });
    (function() {
        function vml(tag, attr) {
            return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
        }
        var s = css(createEl('group'), {
            behavior: 'url(#default#VML)'
        })
        if (!vendor(s, 'transform') && s.adj) {
            sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')
            Spinner.prototype.lines = function(el, o) {
                var r = o.length + o.width,
                    s = 2 * r

                function grp() {
                    return css(vml('group', {
                        coordsize: s + ' ' + s,
                        coordorigin: -r + ' ' + -r
                    }), {
                        width: s,
                        height: s
                    })
                }
                var margin = -(o.width + o.length) * 2 + 'px',
                    g = css(grp(), {
                        position: 'absolute',
                        top: margin,
                        left: margin
                    }),
                    i

                function seg(i, dx, filter) {
                    ins(g, ins(css(grp(), {
                        rotation: 360 / o.lines * i + 'deg',
                        left: ~~dx
                    }), ins(css(vml('roundrect', {
                        arcsize: o.corners
                    }), {
                        width: r,
                        height: o.width,
                        left: o.radius,
                        top: -o.width >> 1,
                        filter: filter
                    }), vml('fill', {
                        color: o.color,
                        opacity: o.opacity
                    }), vml('stroke', {
                        opacity: 0
                    }))))
                }
                if (o.shadow)
                    for (i = 1; i <= o.lines; i++)
                        seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')
                for (i = 1; i <= o.lines; i++) seg(i)
                return ins(el, g)
            }
            Spinner.prototype.opacity = function(el, i, val, o) {
                var c = el.firstChild
                o = o.shadow && o.lines || 0
                if (c && i + o < c.childNodes.length) {
                    c = c.childNodes[i + o];
                    c = c && c.firstChild;
                    c = c && c.firstChild
                    if (c) c.opacity = val
                }
            }
        } else
            useCssAnimations = vendor(s, 'animation')
    })()
    if (typeof define == 'function' && define.amd)
        define(function() {
            return Spinner
        })
    else
        window.Spinner = Spinner
}(window, document);;

/* /web/static/lib/jquery/jquery.js defined in bundle 'web.assets_common' */
(function(window, undefined) {
    var
        rootjQuery, readyList, document = window.document,
        location = window.location,
        navigator = window.navigator,
        _jQuery = window.jQuery,
        _$ = window.$,
        core_push = Array.prototype.push,
        core_slice = Array.prototype.slice,
        core_indexOf = Array.prototype.indexOf,
        core_toString = Object.prototype.toString,
        core_hasOwn = Object.prototype.hasOwnProperty,
        core_trim = String.prototype.trim,
        jQuery = function(selector, context) {
            return new jQuery.fn.init(selector, context, rootjQuery);
        },
        core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        core_rnotwhite = /\S/,
        core_rspace = /\s+/,
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        rvalidchars = /^[\],:{}\s]*$/,
        rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
        rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,
        fcamelCase = function(all, letter) {
            return (letter + "").toUpperCase();
        },
        DOMContentLoaded = function() {
            if (document.addEventListener) {
                document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
                jQuery.ready();
            } else if (document.readyState === "complete") {
                document.detachEvent("onreadystatechange", DOMContentLoaded);
                jQuery.ready();
            }
        },
        class2type = {};
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        init: function(selector, context, rootjQuery) {
            var match, elem, ret, doc;
            if (!selector) {
                return this;
            }
            if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;
            }
            if (typeof selector === "string") {
                if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                    match = [null, selector, null];
                } else {
                    match = rquickExpr.exec(selector);
                }
                if (match && (match[1] || !context)) {
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;
                        doc = (context && context.nodeType ? context.ownerDocument || context : document);
                        selector = jQuery.parseHTML(match[1], doc, true);
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            this.attr.call(selector, context, true);
                        }
                        return jQuery.merge(this, selector);
                    } else {
                        elem = document.getElementById(match[2]);
                        if (elem && elem.parentNode) {
                            if (elem.id !== match[2]) {
                                return rootjQuery.find(selector);
                            }
                            this.length = 1;
                            this[0] = elem;
                        }
                        this.context = document;
                        this.selector = selector;
                        return this;
                    }
                } else if (!context || context.jquery) {
                    return (context || rootjQuery).find(selector);
                } else {
                    return this.constructor(context).find(selector);
                }
            } else if (jQuery.isFunction(selector)) {
                return rootjQuery.ready(selector);
            }
            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context;
            }
            return jQuery.makeArray(selector, this);
        },
        selector: "",
        jquery: "1.8.3",
        length: 0,
        size: function() {
            return this.length;
        },
        toArray: function() {
            return core_slice.call(this);
        },
        get: function(num) {
            return num == null ? this.toArray() : (num < 0 ? this[this.length + num] : this[num]);
        },
        pushStack: function(elems, name, selector) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            ret.context = this.context;
            if (name === "find") {
                ret.selector = this.selector + (this.selector ? " " : "") + selector;
            } else if (name) {
                ret.selector = this.selector + "." + name + "(" + selector + ")";
            }
            return ret;
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        ready: function(fn) {
            jQuery.ready.promise().done(fn);
            return this;
        },
        eq: function(i) {
            i = +i;
            return i === -1 ? this.slice(i) : this.slice(i, i + 1);
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        slice: function() {
            return this.pushStack(core_slice.apply(this, arguments), "slice", core_slice.call(arguments).join(","));
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: core_push,
        sort: [].sort,
        splice: [].splice
    };
    jQuery.fn.init.prototype = jQuery.fn;
    jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }
        if (length === i) {
            target = this;
            --i;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }
                        target[name] = jQuery.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };
    jQuery.extend({
        noConflict: function(deep) {
            if (window.$ === jQuery) {
                window.$ = _$;
            }
            if (deep && window.jQuery === jQuery) {
                window.jQuery = _jQuery;
            }
            return jQuery;
        },
        isReady: false,
        readyWait: 1,
        holdReady: function(hold) {
            if (hold) {
                jQuery.readyWait++;
            } else {
                jQuery.ready(true);
            }
        },
        ready: function(wait) {
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
            }
            if (!document.body) {
                return setTimeout(jQuery.ready, 1);
            }
            jQuery.isReady = true;
            if (wait !== true && --jQuery.readyWait > 0) {
                return;
            }
            readyList.resolveWith(document, [jQuery]);
            if (jQuery.fn.trigger) {
                jQuery(document).trigger("ready").off("ready");
            }
        },
        isFunction: function(obj) {
            return jQuery.type(obj) === "function";
        },
        isArray: Array.isArray || function(obj) {
            return jQuery.type(obj) === "array";
        },
        isWindow: function(obj) {
            return obj != null && obj == obj.window;
        },
        isNumeric: function(obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },
        type: function(obj) {
            return obj == null ? String(obj) : class2type[core_toString.call(obj)] || "object";
        },
        isPlainObject: function(obj) {
            if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false;
            }
            try {
                if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                return false;
            }
            var key;
            for (key in obj) {}
            return key === undefined || core_hasOwn.call(obj, key);
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },
        error: function(msg) {
            throw new Error(msg);
        },
        parseHTML: function(data, context, scripts) {
            var parsed;
            if (!data || typeof data !== "string") {
                return null;
            }
            if (typeof context === "boolean") {
                scripts = context;
                context = 0;
            }
            context = context || document;
            if ((parsed = rsingleTag.exec(data))) {
                return [context.createElement(parsed[1])];
            }
            parsed = jQuery.buildFragment([data], context, scripts ? null : []);
            return jQuery.merge([], (parsed.cacheable ? jQuery.clone(parsed.fragment) : parsed.fragment).childNodes);
        },
        parseJSON: function(data) {
            if (!data || typeof data !== "string") {
                return null;
            }
            data = jQuery.trim(data);
            if (window.JSON && window.JSON.parse) {
                return window.JSON.parse(data);
            }
            if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
                return (new Function("return " + data))();
            }
            jQuery.error("Invalid JSON: " + data);
        },
        parseXML: function(data) {
            var xml, tmp;
            if (!data || typeof data !== "string") {
                return null;
            }
            try {
                if (window.DOMParser) {
                    tmp = new DOMParser();
                    xml = tmp.parseFromString(data, "text/xml");
                } else {
                    xml = new ActiveXObject("Microsoft.XMLDOM");
                    xml.async = "false";
                    xml.loadXML(data);
                }
            } catch (e) {
                xml = undefined;
            }
            if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
                jQuery.error("Invalid XML: " + data);
            }
            return xml;
        },
        noop: function() {},
        globalEval: function(data) {
            if (data && core_rnotwhite.test(data)) {
                (window.execScript || function(data) {
                    window["eval"].call(window, data);
                })(data);
            }
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function(obj, callback, args) {
            var name, i = 0,
                length = obj.length,
                isObj = length === undefined || jQuery.isFunction(obj);
            if (args) {
                if (isObj) {
                    for (name in obj) {
                        if (callback.apply(obj[name], args) === false) {
                            break;
                        }
                    }
                } else {
                    for (; i < length;) {
                        if (callback.apply(obj[i++], args) === false) {
                            break;
                        }
                    }
                }
            } else {
                if (isObj) {
                    for (name in obj) {
                        if (callback.call(obj[name], name, obj[name]) === false) {
                            break;
                        }
                    }
                } else {
                    for (; i < length;) {
                        if (callback.call(obj[i], i, obj[i++]) === false) {
                            break;
                        }
                    }
                }
            }
            return obj;
        },
        trim: core_trim && !core_trim.call("\uFEFF\xA0") ? function(text) {
            return text == null ? "" : core_trim.call(text);
        } : function(text) {
            return text == null ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function(arr, results) {
            var type, ret = results || [];
            if (arr != null) {
                type = jQuery.type(arr);
                if (arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow(arr)) {
                    core_push.call(ret, arr);
                } else {
                    jQuery.merge(ret, arr);
                }
            }
            return ret;
        },
        inArray: function(elem, arr, i) {
            var len;
            if (arr) {
                if (core_indexOf) {
                    return core_indexOf.call(arr, elem, i);
                }
                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
                for (; i < len; i++) {
                    if (i in arr && arr[i] === elem) {
                        return i;
                    }
                }
            }
            return -1;
        },
        merge: function(first, second) {
            var l = second.length,
                i = first.length,
                j = 0;
            if (typeof l === "number") {
                for (; j < l; j++) {
                    first[i++] = second[j];
                }
            } else {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }
            first.length = i;
            return first;
        },
        grep: function(elems, callback, inv) {
            var retVal, ret = [],
                i = 0,
                length = elems.length;
            inv = !!inv;
            for (; i < length; i++) {
                retVal = !!callback(elems[i], i);
                if (inv !== retVal) {
                    ret.push(elems[i]);
                }
            }
            return ret;
        },
        map: function(elems, callback, arg) {
            var value, key, ret = [],
                i = 0,
                length = elems.length,
                isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ((length > 0 && elems[0] && elems[length - 1]) || length === 0 || jQuery.isArray(elems));
            if (isArray) {
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret[ret.length] = value;
                    }
                }
            } else {
                for (key in elems) {
                    value = callback(elems[key], key, arg);
                    if (value != null) {
                        ret[ret.length] = value;
                    }
                }
            }
            return ret.concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var tmp, args, proxy;
            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }
            if (!jQuery.isFunction(fn)) {
                return undefined;
            }
            args = core_slice.call(arguments, 2);
            proxy = function() {
                return fn.apply(context, args.concat(core_slice.call(arguments)));
            };
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
            return proxy;
        },
        access: function(elems, fn, key, value, chainable, emptyGet, pass) {
            var exec, bulk = key == null,
                i = 0,
                length = elems.length;
            if (key && typeof key === "object") {
                for (i in key) {
                    jQuery.access(elems, fn, i, key[i], 1, emptyGet, value);
                }
                chainable = 1;
            } else if (value !== undefined) {
                exec = pass === undefined && jQuery.isFunction(value);
                if (bulk) {
                    if (exec) {
                        exec = fn;
                        fn = function(elem, key, value) {
                            return exec.call(jQuery(elem), value);
                        };
                    } else {
                        fn.call(elems, value);
                        fn = null;
                    }
                }
                if (fn) {
                    for (; i < length; i++) {
                        fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass);
                    }
                }
                chainable = 1;
            }
            return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
        },
        now: function() {
            return (new Date()).getTime();
        }
    });
    jQuery.ready.promise = function(obj) {
        if (!readyList) {
            readyList = jQuery.Deferred();
            if (document.readyState === "complete") {
                setTimeout(jQuery.ready, 1);
            } else if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
                window.addEventListener("load", jQuery.ready, false);
            } else {
                document.attachEvent("onreadystatechange", DOMContentLoaded);
                window.attachEvent("onload", jQuery.ready);
                var top = false;
                try {
                    top = window.frameElement == null && document.documentElement;
                } catch (e) {}
                if (top && top.doScroll) {
                    (function doScrollCheck() {
                        if (!jQuery.isReady) {
                            try {
                                top.doScroll("left");
                            } catch (e) {
                                return setTimeout(doScrollCheck, 50);
                            }
                            jQuery.ready();
                        }
                    })();
                }
            }
        }
        return readyList.promise(obj);
    };
    jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    rootjQuery = jQuery(document);
    var optionsCache = {};

    function createOptions(options) {
        var object = optionsCache[options] = {};
        jQuery.each(options.split(core_rspace), function(_, flag) {
            object[flag] = true;
        });
        return object;
    }
    jQuery.Callbacks = function(options) {
        options = typeof options === "string" ? (optionsCache[options] || createOptions(options)) : jQuery.extend({}, options);
        var
            memory, fired, firing, firingStart, firingLength, firingIndex, list = [],
            stack = !options.once && [],
            fire = function(data) {
                memory = options.memory && data;
                fired = true;
                firingIndex = firingStart || 0;
                firingStart = 0;
                firingLength = list.length;
                firing = true;
                for (; list && firingIndex < firingLength; firingIndex++) {
                    if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                        memory = false;
                        break;
                    }
                }
                firing = false;
                if (list) {
                    if (stack) {
                        if (stack.length) {
                            fire(stack.shift());
                        }
                    } else if (memory) {
                        list = [];
                    } else {
                        self.disable();
                    }
                }
            },
            self = {
                add: function() {
                    if (list) {
                        var start = list.length;
                        (function add(args) {
                            jQuery.each(args, function(_, arg) {
                                var type = jQuery.type(arg);
                                if (type === "function") {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg);
                                    }
                                } else if (arg && arg.length && type !== "string") {
                                    add(arg);
                                }
                            });
                        })(arguments);
                        if (firing) {
                            firingLength = list.length;
                        } else if (memory) {
                            firingStart = start;
                            fire(memory);
                        }
                    }
                    return this;
                },
                remove: function() {
                    if (list) {
                        jQuery.each(arguments, function(_, arg) {
                            var index;
                            while ((index = jQuery.inArray(arg, list, index)) > -1) {
                                list.splice(index, 1);
                                if (firing) {
                                    if (index <= firingLength) {
                                        firingLength--;
                                    }
                                    if (index <= firingIndex) {
                                        firingIndex--;
                                    }
                                }
                            }
                        });
                    }
                    return this;
                },
                has: function(fn) {
                    return jQuery.inArray(fn, list) > -1;
                },
                empty: function() {
                    list = [];
                    return this;
                },
                disable: function() {
                    list = stack = memory = undefined;
                    return this;
                },
                disabled: function() {
                    return !list;
                },
                lock: function() {
                    stack = undefined;
                    if (!memory) {
                        self.disable();
                    }
                    return this;
                },
                locked: function() {
                    return !stack;
                },
                fireWith: function(context, args) {
                    args = args || [];
                    args = [context, args.slice ? args.slice() : args];
                    if (list && (!fired || stack)) {
                        if (firing) {
                            stack.push(args);
                        } else {
                            fire(args);
                        }
                    }
                    return this;
                },
                fire: function() {
                    self.fireWith(this, arguments);
                    return this;
                },
                fired: function() {
                    return !!fired;
                }
            };
        return self;
    };
    jQuery.extend({
        Deferred: function(func) {
            var tuples = [
                    ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", jQuery.Callbacks("memory")]
                ],
                state = "pending",
                promise = {
                    state: function() {
                        return state;
                    },
                    always: function() {
                        deferred.done(arguments).fail(arguments);
                        return this;
                    },
                    then: function() {
                        var fns = arguments;
                        return jQuery.Deferred(function(newDefer) {
                            jQuery.each(tuples, function(i, tuple) {
                                var action = tuple[0],
                                    fn = fns[i];
                                deferred[tuple[1]](jQuery.isFunction(fn) ? function() {
                                    var returned = fn.apply(this, arguments);
                                    if (returned && jQuery.isFunction(returned.promise)) {
                                        returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                                    } else {
                                        newDefer[action + "With"](this === deferred ? newDefer : this, [returned]);
                                    }
                                } : newDefer[action]);
                            });
                            fns = null;
                        }).promise();
                    },
                    promise: function(obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise;
                    }
                },
                deferred = {};
            promise.pipe = promise.then;
            jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2],
                    stateString = tuple[3];
                promise[tuple[1]] = list.add;
                if (stateString) {
                    list.add(function() {
                        state = stateString;
                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
                }
                deferred[tuple[0]] = list.fire;
                deferred[tuple[0] + "With"] = list.fireWith;
            });
            promise.promise(deferred);
            if (func) {
                func.call(deferred, deferred);
            }
            return deferred;
        },
        when: function(subordinate) {
            var i = 0,
                resolveValues = core_slice.call(arguments),
                length = resolveValues.length,
                remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
                deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
                updateFunc = function(i, contexts, values) {
                    return function(value) {
                        contexts[i] = this;
                        values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
                        if (values === progressValues) {
                            deferred.notifyWith(contexts, values);
                        } else if (!(--remaining)) {
                            deferred.resolveWith(contexts, values);
                        }
                    };
                },
                progressValues, progressContexts, resolveContexts;
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (; i < length; i++) {
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                        resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
                    } else {
                        --remaining;
                    }
                }
            }
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues);
            }
            return deferred.promise();
        }
    });
    jQuery.support = (function() {
        var support, all, a, select, opt, input, fragment, eventName, i, isSupported, clickFn, div = document.createElement("div");
        div.setAttribute("className", "t");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        all = div.getElementsByTagName("*");
        a = div.getElementsByTagName("a")[0];
        if (!all || !a || !all.length) {
            return {};
        }
        select = document.createElement("select");
        opt = select.appendChild(document.createElement("option"));
        input = div.getElementsByTagName("input")[0];
        a.style.cssText = "top:1px;float:left;opacity:.5";
        support = {
            leadingWhitespace: (div.firstChild.nodeType === 3),
            tbody: !div.getElementsByTagName("tbody").length,
            htmlSerialize: !!div.getElementsByTagName("link").length,
            style: /top/.test(a.getAttribute("style")),
            hrefNormalized: (a.getAttribute("href") === "/a"),
            opacity: /^0.5/.test(a.style.opacity),
            cssFloat: !!a.style.cssFloat,
            checkOn: (input.value === "on"),
            optSelected: opt.selected,
            getSetAttribute: div.className !== "t",
            enctype: !!document.createElement("form").enctype,
            html5Clone: document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>",
            boxModel: (document.compatMode === "CSS1Compat"),
            submitBubbles: true,
            changeBubbles: true,
            focusinBubbles: false,
            deleteExpando: true,
            noCloneEvent: true,
            inlineBlockNeedsLayout: false,
            shrinkWrapBlocks: false,
            reliableMarginRight: true,
            boxSizingReliable: true,
            pixelPosition: false
        };
        input.checked = true;
        support.noCloneChecked = input.cloneNode(true).checked;
        select.disabled = true;
        support.optDisabled = !opt.disabled;
        try {
            delete div.test;
        } catch (e) {
            support.deleteExpando = false;
        }
        if (!div.addEventListener && div.attachEvent && div.fireEvent) {
            div.attachEvent("onclick", clickFn = function() {
                support.noCloneEvent = false;
            });
            div.cloneNode(true).fireEvent("onclick");
            div.detachEvent("onclick", clickFn);
        }
        input = document.createElement("input");
        input.value = "t";
        input.setAttribute("type", "radio");
        support.radioValue = input.value === "t";
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");
        div.appendChild(input);
        fragment = document.createDocumentFragment();
        fragment.appendChild(div.lastChild);
        support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
        support.appendChecked = input.checked;
        fragment.removeChild(input);
        fragment.appendChild(div);
        if (div.attachEvent) {
            for (i in {
                    submit: true,
                    change: true,
                    focusin: true
                }) {
                eventName = "on" + i;
                isSupported = (eventName in div);
                if (!isSupported) {
                    div.setAttribute(eventName, "return;");
                    isSupported = (typeof div[eventName] === "function");
                }
                support[i + "Bubbles"] = isSupported;
            }
        }
        jQuery(function() {
            var container, div, tds, marginDiv, divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                body = document.getElementsByTagName("body")[0];
            if (!body) {
                return;
            }
            container = document.createElement("div");
            container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
            body.insertBefore(container, body.firstChild);
            div = document.createElement("div");
            container.appendChild(div);
            div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
            tds = div.getElementsByTagName("td");
            tds[0].style.cssText = "padding:0;margin:0;border:0;display:none";
            isSupported = (tds[0].offsetHeight === 0);
            tds[0].style.display = "";
            tds[1].style.display = "none";
            support.reliableHiddenOffsets = isSupported && (tds[0].offsetHeight === 0);
            div.innerHTML = "";
            div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
            support.boxSizing = (div.offsetWidth === 4);
            support.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== 1);
            if (window.getComputedStyle) {
                support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== "1%";
                support.boxSizingReliable = (window.getComputedStyle(div, null) || {
                    width: "4px"
                }).width === "4px";
                marginDiv = document.createElement("div");
                marginDiv.style.cssText = div.style.cssText = divReset;
                marginDiv.style.marginRight = marginDiv.style.width = "0";
                div.style.width = "1px";
                div.appendChild(marginDiv);
                support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight);
            }
            if (typeof div.style.zoom !== "undefined") {
                div.innerHTML = "";
                div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
                support.inlineBlockNeedsLayout = (div.offsetWidth === 3);
                div.style.display = "block";
                div.style.overflow = "visible";
                div.innerHTML = "<div></div>";
                div.firstChild.style.width = "5px";
                support.shrinkWrapBlocks = (div.offsetWidth !== 3);
                container.style.zoom = 1;
            }
            body.removeChild(container);
            container = div = tds = marginDiv = null;
        });
        fragment.removeChild(div);
        all = a = select = opt = input = fragment = div = null;
        return support;
    })();
    var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        rmultiDash = /([A-Z])/g;
    jQuery.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (jQuery.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            "embed": true,
            "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            "applet": true
        },
        hasData: function(elem) {
            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
            return !!elem && !isEmptyDataObject(elem);
        },
        data: function(elem, name, data, pvt) {
            if (!jQuery.acceptData(elem)) {
                return;
            }
            var thisCache, ret, internalKey = jQuery.expando,
                getByName = typeof name === "string",
                isNode = elem.nodeType,
                cache = isNode ? jQuery.cache : elem,
                id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
            if ((!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined) {
                return;
            }
            if (!id) {
                if (isNode) {
                    elem[internalKey] = id = jQuery.deletedIds.pop() || jQuery.guid++;
                } else {
                    id = internalKey;
                }
            }
            if (!cache[id]) {
                cache[id] = {};
                if (!isNode) {
                    cache[id].toJSON = jQuery.noop;
                }
            }
            if (typeof name === "object" || typeof name === "function") {
                if (pvt) {
                    cache[id] = jQuery.extend(cache[id], name);
                } else {
                    cache[id].data = jQuery.extend(cache[id].data, name);
                }
            }
            thisCache = cache[id];
            if (!pvt) {
                if (!thisCache.data) {
                    thisCache.data = {};
                }
                thisCache = thisCache.data;
            }
            if (data !== undefined) {
                thisCache[jQuery.camelCase(name)] = data;
            }
            if (getByName) {
                ret = thisCache[name];
                if (ret == null) {
                    ret = thisCache[jQuery.camelCase(name)];
                }
            } else {
                ret = thisCache;
            }
            return ret;
        },
        removeData: function(elem, name, pvt) {
            if (!jQuery.acceptData(elem)) {
                return;
            }
            var thisCache, i, l, isNode = elem.nodeType,
                cache = isNode ? jQuery.cache : elem,
                id = isNode ? elem[jQuery.expando] : jQuery.expando;
            if (!cache[id]) {
                return;
            }
            if (name) {
                thisCache = pvt ? cache[id] : cache[id].data;
                if (thisCache) {
                    if (!jQuery.isArray(name)) {
                        if (name in thisCache) {
                            name = [name];
                        } else {
                            name = jQuery.camelCase(name);
                            if (name in thisCache) {
                                name = [name];
                            } else {
                                name = name.split(" ");
                            }
                        }
                    }
                    for (i = 0, l = name.length; i < l; i++) {
                        delete thisCache[name[i]];
                    }
                    if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) {
                        return;
                    }
                }
            }
            if (!pvt) {
                delete cache[id].data;
                if (!isEmptyDataObject(cache[id])) {
                    return;
                }
            }
            if (isNode) {
                jQuery.cleanData([elem], true);
            } else if (jQuery.support.deleteExpando || cache != cache.window) {
                delete cache[id];
            } else {
                cache[id] = null;
            }
        },
        _data: function(elem, name, data) {
            return jQuery.data(elem, name, data, true);
        },
        acceptData: function(elem) {
            var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
            return !noData || noData !== true && elem.getAttribute("classid") === noData;
        }
    });
    jQuery.fn.extend({
        data: function(key, value) {
            var parts, part, attr, name, l, elem = this[0],
                i = 0,
                data = null;
            if (key === undefined) {
                if (this.length) {
                    data = jQuery.data(elem);
                    if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                        attr = elem.attributes;
                        for (l = attr.length; i < l; i++) {
                            name = attr[i].name;
                            if (!name.indexOf("data-")) {
                                name = jQuery.camelCase(name.substring(5));
                                dataAttr(elem, name, data[name]);
                            }
                        }
                        jQuery._data(elem, "parsedAttrs", true);
                    }
                }
                return data;
            }
            if (typeof key === "object") {
                return this.each(function() {
                    jQuery.data(this, key);
                });
            }
            parts = key.split(".", 2);
            parts[1] = parts[1] ? "." + parts[1] : "";
            part = parts[1] + "!";
            return jQuery.access(this, function(value) {
                if (value === undefined) {
                    data = this.triggerHandler("getData" + part, [parts[0]]);
                    if (data === undefined && elem) {
                        data = jQuery.data(elem, key);
                        data = dataAttr(elem, key, data);
                    }
                    return data === undefined && parts[1] ? this.data(parts[0]) : data;
                }
                parts[1] = value;
                this.each(function() {
                    var self = jQuery(this);
                    self.triggerHandler("setData" + part, parts);
                    jQuery.data(this, key, value);
                    self.triggerHandler("changeData" + part, parts);
                });
            }, null, value, arguments.length > 1, null, false);
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key);
            });
        }
    });

    function dataAttr(elem, key, data) {
        if (data === undefined && elem.nodeType === 1) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) {}
                jQuery.data(elem, key, data);
            } else {
                data = undefined;
            }
        }
        return data;
    }

    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) {
            if (name === "data" && jQuery.isEmptyObject(obj[name])) {
                continue;
            }
            if (name !== "toJSON") {
                return false;
            }
        }
        return true;
    }
    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            if (elem) {
                type = (type || "fx") + "queue";
                queue = jQuery._data(elem, type);
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = jQuery._data(elem, type, jQuery.makeArray(data));
                    } else {
                        queue.push(data);
                    }
                }
                return queue || [];
            }
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type),
                next = function() {
                    jQuery.dequeue(elem, type);
                };
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
            }
            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress");
                }
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }
            if (!startLength && hooks) {
                hooks.empty.fire();
            }
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery.removeData(elem, type + "queue", true);
                    jQuery.removeData(elem, key, true);
                })
            });
        }
    });
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }
            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }
            return data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type);
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type);
                }
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        delay: function(time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";
            return this.queue(type, function(next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function() {
                    clearTimeout(timeout);
                };
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp, count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function() {
                    if (!(--count)) {
                        defer.resolveWith(elements, [elements]);
                    }
                };
            if (typeof type !== "string") {
                obj = type;
                type = undefined;
            }
            type = type || "fx";
            while (i--) {
                tmp = jQuery._data(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });
    var nodeHook, boolHook, fixSpecified, rclass = /[\t\r\n]/g,
        rreturn = /\r/g,
        rtype = /^(?:button|input)$/i,
        rfocusable = /^(?:button|input|object|select|textarea)$/i,
        rclickable = /^a(?:rea|)$/i,
        rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        getSetAttribute = jQuery.support.getSetAttribute;
    jQuery.fn.extend({
        attr: function(name, value) {
            return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        },
        prop: function(name, value) {
            return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            name = jQuery.propFix[name] || name;
            return this.each(function() {
                try {
                    this[name] = undefined;
                    delete this[name];
                } catch (e) {}
            });
        },
        addClass: function(value) {
            var classNames, i, l, elem, setClass, c, cl;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, this.className));
                });
            }
            if (value && typeof value === "string") {
                classNames = value.split(core_rspace);
                for (i = 0, l = this.length; i < l; i++) {
                    elem = this[i];
                    if (elem.nodeType === 1) {
                        if (!elem.className && classNames.length === 1) {
                            elem.className = value;
                        } else {
                            setClass = " " + elem.className + " ";
                            for (c = 0, cl = classNames.length; c < cl; c++) {
                                if (setClass.indexOf(" " + classNames[c] + " ") < 0) {
                                    setClass += classNames[c] + " ";
                                }
                            }
                            elem.className = jQuery.trim(setClass);
                        }
                    }
                }
            }
            return this;
        },
        removeClass: function(value) {
            var removes, className, elem, c, cl, i, l;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, this.className));
                });
            }
            if ((value && typeof value === "string") || value === undefined) {
                removes = (value || "").split(core_rspace);
                for (i = 0, l = this.length; i < l; i++) {
                    elem = this[i];
                    if (elem.nodeType === 1 && elem.className) {
                        className = (" " + elem.className + " ").replace(rclass, " ");
                        for (c = 0, cl = removes.length; c < cl; c++) {
                            while (className.indexOf(" " + removes[c] + " ") >= 0) {
                                className = className.replace(" " + removes[c] + " ", " ");
                            }
                        }
                        elem.className = value ? jQuery.trim(className) : "";
                    }
                }
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value,
                isBool = typeof stateVal === "boolean";
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
                });
            }
            return this.each(function() {
                if (type === "string") {
                    var className, i = 0,
                        self = jQuery(this),
                        state = stateVal,
                        classNames = value.split(core_rspace);
                    while ((className = classNames[i++])) {
                        state = isBool ? state : !self.hasClass(className);
                        self[state ? "addClass" : "removeClass"](className);
                    }
                } else if (type === "undefined" || type === "boolean") {
                    if (this.className) {
                        jQuery._data(this, "__className__", this.className);
                    }
                    this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
                }
            });
        },
        hasClass: function(selector) {
            var className = " " + selector + " ",
                i = 0,
                l = this.length;
            for (; i < l; i++) {
                if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
                    return true;
                }
            }
            return false;
        },
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret;
                    }
                    ret = elem.value;
                    return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
                }
                return;
            }
            isFunction = jQuery.isFunction(value);
            return this.each(function(i) {
                var val, self = jQuery(this);
                if (this.nodeType !== 1) {
                    return;
                }
                if (isFunction) {
                    val = value.call(this, i, self.val());
                } else {
                    val = value;
                }
                if (val == null) {
                    val = "";
                } else if (typeof val === "number") {
                    val += "";
                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function(value) {
                        return value == null ? "" : value + "";
                    });
                }
                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val;
                }
            });
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = elem.attributes.value;
                    return !val || val.specified ? elem.value : elem.text;
                }
            },
            select: {
                get: function(elem) {
                    var value, option, options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === "select-one" || index < 0,
                        values = one ? null : [],
                        max = one ? index + 1 : options.length,
                        i = index < 0 ? max : one ? index : 0;
                    for (; i < max; i++) {
                        option = options[i];
                        if ((option.selected || i === index) && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            value = jQuery(option).val();
                            if (one) {
                                return value;
                            }
                            values.push(value);
                        }
                    }
                    return values;
                },
                set: function(elem, value) {
                    var values = jQuery.makeArray(value);
                    jQuery(elem).find("option").each(function() {
                        this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
                    });
                    if (!values.length) {
                        elem.selectedIndex = -1;
                    }
                    return values;
                }
            }
        },
        attrFn: {},
        attr: function(elem, name, value, pass) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            if (pass && jQuery.isFunction(jQuery.fn[name])) {
                return jQuery(elem)[name](value);
            }
            if (typeof elem.getAttribute === "undefined") {
                return jQuery.prop(elem, name, value);
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook);
            }
            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                    return;
                } else if (hooks && "set" in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                } else {
                    elem.setAttribute(name, value + "");
                    return value;
                }
            } else if (hooks && "get" in hooks && notxml && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            } else {
                ret = elem.getAttribute(name);
                return ret === null ? undefined : ret;
            }
        },
        removeAttr: function(elem, value) {
            var propName, attrNames, name, isBool, i = 0;
            if (value && elem.nodeType === 1) {
                attrNames = value.split(core_rspace);
                for (; i < attrNames.length; i++) {
                    name = attrNames[i];
                    if (name) {
                        propName = jQuery.propFix[name] || name;
                        isBool = rboolean.test(name);
                        if (!isBool) {
                            jQuery.attr(elem, name, "");
                        }
                        elem.removeAttribute(getSetAttribute ? name : propName);
                        if (isBool && propName in elem) {
                            elem[propName] = false;
                        }
                    }
                }
            }
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (rtype.test(elem.nodeName) && elem.parentNode) {
                        jQuery.error("type property can't be changed");
                    } else if (!jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            },
            value: {
                get: function(elem, name) {
                    if (nodeHook && jQuery.nodeName(elem, "button")) {
                        return nodeHook.get(elem, name);
                    }
                    return name in elem ? elem.value : null;
                },
                set: function(elem, value, name) {
                    if (nodeHook && jQuery.nodeName(elem, "button")) {
                        return nodeHook.set(elem, value, name);
                    }
                    elem.value = value;
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }
            if (value !== undefined) {
                if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                } else {
                    return (elem[name] = value);
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret;
                } else {
                    return elem[name];
                }
            }
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var attributeNode = elem.getAttributeNode("tabindex");
                    return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined;
                }
            }
        }
    });
    boolHook = {
        get: function(elem, name) {
            var attrNode, property = jQuery.prop(elem, name);
            return property === true || typeof property !== "boolean" && (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== false ? name.toLowerCase() : undefined;
        },
        set: function(elem, value, name) {
            var propName;
            if (value === false) {
                jQuery.removeAttr(elem, name);
            } else {
                propName = jQuery.propFix[name] || name;
                if (propName in elem) {
                    elem[propName] = true;
                }
                elem.setAttribute(name, name.toLowerCase());
            }
            return name;
        }
    };
    if (!getSetAttribute) {
        fixSpecified = {
            name: true,
            id: true,
            coords: true
        };
        nodeHook = jQuery.valHooks.button = {
            get: function(elem, name) {
                var ret;
                ret = elem.getAttributeNode(name);
                return ret && (fixSpecified[name] ? ret.value !== "" : ret.specified) ? ret.value : undefined;
            },
            set: function(elem, value, name) {
                var ret = elem.getAttributeNode(name);
                if (!ret) {
                    ret = document.createAttribute(name);
                    elem.setAttributeNode(ret);
                }
                return (ret.value = value + "");
            }
        };
        jQuery.each(["width", "height"], function(i, name) {
            jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                set: function(elem, value) {
                    if (value === "") {
                        elem.setAttribute(name, "auto");
                        return value;
                    }
                }
            });
        });
        jQuery.attrHooks.contenteditable = {
            get: nodeHook.get,
            set: function(elem, value, name) {
                if (value === "") {
                    value = "false";
                }
                nodeHook.set(elem, value, name);
            }
        };
    }
    if (!jQuery.support.hrefNormalized) {
        jQuery.each(["href", "src", "width", "height"], function(i, name) {
            jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                get: function(elem) {
                    var ret = elem.getAttribute(name, 2);
                    return ret === null ? undefined : ret;
                }
            });
        });
    }
    if (!jQuery.support.style) {
        jQuery.attrHooks.style = {
            get: function(elem) {
                return elem.style.cssText.toLowerCase() || undefined;
            },
            set: function(elem, value) {
                return (elem.style.cssText = value + "");
            }
        };
    }
    if (!jQuery.support.optSelected) {
        jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
            get: function(elem) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
                return null;
            }
        });
    }
    if (!jQuery.support.enctype) {
        jQuery.propFix.enctype = "encoding";
    }
    if (!jQuery.support.checkOn) {
        jQuery.each(["radio", "checkbox"], function() {
            jQuery.valHooks[this] = {
                get: function(elem) {
                    return elem.getAttribute("value") === null ? "on" : elem.value;
                }
            };
        });
    }
    jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
            set: function(elem, value) {
                if (jQuery.isArray(value)) {
                    return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0);
                }
            }
        });
    });
    var rformElems = /^(?:textarea|input|select)$/i,
        rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/,
        rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        hoverHack = function(events) {
            return jQuery.event.special.hover ? events : events.replace(rhoverHack, "mouseenter$1 mouseleave$1");
        };
    jQuery.event = {
        add: function(elem, types, handler, data, selector) {
            var elemData, eventHandle, events, t, tns, type, namespaces, handleObj, handleObjIn, handlers, special;
            if (elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data(elem))) {
                return;
            }
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }
            events = elemData.events;
            if (!events) {
                elemData.events = events = {};
            }
            eventHandle = elemData.handle;
            if (!eventHandle) {
                elemData.handle = eventHandle = function(e) {
                    return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
                };
                eventHandle.elem = elem;
            }
            types = jQuery.trim(hoverHack(types)).split(" ");
            for (t = 0; t < types.length; t++) {
                tns = rtypenamespace.exec(types[t]) || [];
                type = tns[1];
                namespaces = (tns[2] || "").split(".").sort();
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                special = jQuery.event.special[type] || {};
                handleObj = jQuery.extend({
                    type: type,
                    origType: tns[1],
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);
                handlers = events[type];
                if (!handlers) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);
                        } else if (elem.attachEvent) {
                            elem.attachEvent("on" + type, eventHandle);
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }
                jQuery.event.global[type] = true;
            }
            elem = null;
        },
        global: {},
        remove: function(elem, types, handler, selector, mappedTypes) {
            var t, tns, type, origType, namespaces, origCount, j, events, special, eventType, handleObj, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (!elemData || !(events = elemData.events)) {
                return;
            }
            types = jQuery.trim(hoverHack(types || "")).split(" ");
            for (t = 0; t < types.length; t++) {
                tns = rtypenamespace.exec(types[t]) || [];
                type = origType = tns[1];
                namespaces = tns[2];
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    }
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                eventType = events[type] || [];
                origCount = eventType.length;
                namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                for (j = 0; j < eventType.length; j++) {
                    handleObj = eventType[j];
                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!namespaces || namespaces.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                        eventType.splice(j--, 1);
                        if (handleObj.selector) {
                            eventType.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }
                if (eventType.length === 0 && origCount !== eventType.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }
                    delete events[type];
                }
            }
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;
                jQuery.removeData(elem, "events", true);
            }
        },
        customEvent: {
            "getData": true,
            "setData": true,
            "changeData": true
        },
        trigger: function(event, data, elem, onlyHandlers) {
            if (elem && (elem.nodeType === 3 || elem.nodeType === 8)) {
                return;
            }
            var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType, type = event.type || event,
                namespaces = [];
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }
            if (type.indexOf("!") >= 0) {
                type = type.slice(0, -1);
                exclusive = true;
            }
            if (type.indexOf(".") >= 0) {
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            if ((!elem || jQuery.event.customEvent[type]) && !jQuery.event.global[type]) {
                return;
            }
            event = typeof event === "object" ? event[jQuery.expando] ? event : new jQuery.Event(type, event) : new jQuery.Event(type);
            event.type = type;
            event.isTrigger = true;
            event.exclusive = exclusive;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            ontype = type.indexOf(":") < 0 ? "on" + type : "";
            if (!elem) {
                cache = jQuery.cache;
                for (i in cache) {
                    if (cache[i].events && cache[i].events[type]) {
                        jQuery.event.trigger(event, data, cache[i].handle.elem, true);
                    }
                }
                return;
            }
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }
            data = data != null ? jQuery.makeArray(data) : [];
            data.unshift(event);
            special = jQuery.event.special[type] || {};
            if (special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }
            eventPath = [
                [elem, special.bindType || type]
            ];
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                bubbleType = special.delegateType || type;
                cur = rfocusMorph.test(bubbleType + type) ? elem : elem.parentNode;
                for (old = elem; cur; cur = cur.parentNode) {
                    eventPath.push([cur, bubbleType]);
                    old = cur;
                }
                if (old === (elem.ownerDocument || document)) {
                    eventPath.push([old.defaultView || old.parentWindow || window, bubbleType]);
                }
            }
            for (i = 0; i < eventPath.length && !event.isPropagationStopped(); i++) {
                cur = eventPath[i][0];
                event.type = eventPath[i][1];
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
                if (handle) {
                    handle.apply(cur, data);
                }
                handle = ontype && cur[ontype];
                if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) {
                    event.preventDefault();
                }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
                if ((!special._default || special._default.apply(elem.ownerDocument, data) === false) && !(type === "click" && jQuery.nodeName(elem, "a")) && jQuery.acceptData(elem)) {
                    if (ontype && elem[type] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow(elem)) {
                        old = elem[ontype];
                        if (old) {
                            elem[ontype] = null;
                        }
                        jQuery.event.triggered = type;
                        elem[type]();
                        jQuery.event.triggered = undefined;
                        if (old) {
                            elem[ontype] = old;
                        }
                    }
                }
            }
            return event.result;
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event || window.event);
            var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, related, handlers = ((jQuery._data(this, "events") || {})[event.type] || []),
                delegateCount = handlers.delegateCount,
                args = core_slice.call(arguments),
                run_all = !event.exclusive && !event.namespace,
                special = jQuery.event.special[event.type] || {},
                handlerQueue = [];
            args[0] = event;
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }
            if (delegateCount && !(event.button && event.type === "click")) {
                for (cur = event.target; cur != this; cur = cur.parentNode || this) {
                    if (cur.disabled !== true || event.type !== "click") {
                        selMatch = {};
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];
                            sel = handleObj.selector;
                            if (selMatch[sel] === undefined) {
                                selMatch[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length;
                            }
                            if (selMatch[sel]) {
                                matches.push(handleObj);
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({
                                elem: cur,
                                matches: matches
                            });
                        }
                    }
                }
            }
            if (handlers.length > delegateCount) {
                handlerQueue.push({
                    elem: this,
                    matches: handlers.slice(delegateCount)
                });
            }
            for (i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++) {
                matched = handlerQueue[i];
                event.currentTarget = matched.elem;
                for (j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++) {
                    handleObj = matched.matches[j];
                    if (run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test(handleObj.namespace)) {
                        event.data = handleObj.data;
                        event.handleObj = handleObj;
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                        if (ret !== undefined) {
                            event.result = ret;
                            if (ret === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }
            return event.result;
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode;
                }
                return event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var eventDoc, doc, body, button = original.button,
                    fromElement = original.fromElement;
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;
                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                }
                if (!event.relatedTarget && fromElement) {
                    event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
                }
                if (!event.which && button !== undefined) {
                    event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
                }
                return event;
            }
        },
        fix: function(event) {
            if (event[jQuery.expando]) {
                return event;
            }
            var i, prop, originalEvent = event,
                fixHook = jQuery.event.fixHooks[event.type] || {},
                copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            event = jQuery.Event(originalEvent);
            for (i = copy.length; i;) {
                prop = copy[--i];
                event[prop] = originalEvent[prop];
            }
            if (!event.target) {
                event.target = originalEvent.srcElement || document;
            }
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }
            event.metaKey = !!event.metaKey;
            return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        special: {
            load: {
                noBubble: true
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(data, namespaces, eventHandle) {
                    if (jQuery.isWindow(this)) {
                        this.onbeforeunload = eventHandle;
                    }
                },
                teardown: function(namespaces, eventHandle) {
                    if (this.onbeforeunload === eventHandle) {
                        this.onbeforeunload = null;
                    }
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true,
                originalEvent: {}
            });
            if (bubble) {
                jQuery.event.trigger(e, null, elem);
            } else {
                jQuery.event.dispatch.call(elem, e);
            }
            if (e.isDefaultPrevented()) {
                event.preventDefault();
            }
        }
    };
    jQuery.event.handle = jQuery.event.dispatch;
    jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle, false);
        }
    } : function(elem, type, handle) {
        var name = "on" + type;
        if (elem.detachEvent) {
            if (typeof elem[name] === "undefined") {
                elem[name] = null;
            }
            elem.detachEvent(name, handle);
        }
    };
    jQuery.Event = function(src, props) {
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;
        } else {
            this.type = src;
        }
        if (props) {
            jQuery.extend(this, props);
        }
        this.timeStamp = src && src.timeStamp || jQuery.now();
        this[jQuery.expando] = true;
    };

    function returnFalse() {
        return false;
    }

    function returnTrue() {
        return true;
    }
    jQuery.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return;
            }
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation: function() {
            this.isPropagationStopped = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return;
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation();
        },
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse
    };
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj,
                    selector = handleObj.selector;
                if (!related || (related !== target && !jQuery.contains(target, related))) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });
    if (!jQuery.support.submitBubbles) {
        jQuery.event.special.submit = {
            setup: function() {
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }
                jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                    var elem = e.target,
                        form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                    if (form && !jQuery._data(form, "_submit_attached")) {
                        jQuery.event.add(form, "submit._submit", function(event) {
                            event._submit_bubble = true;
                        });
                        jQuery._data(form, "_submit_attached", true);
                    }
                });
            },
            postDispatch: function(event) {
                if (event._submit_bubble) {
                    delete event._submit_bubble;
                    if (this.parentNode && !event.isTrigger) {
                        jQuery.event.simulate("submit", this.parentNode, event, true);
                    }
                }
            },
            teardown: function() {
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }
                jQuery.event.remove(this, "._submit");
            }
        };
    }
    if (!jQuery.support.changeBubbles) {
        jQuery.event.special.change = {
            setup: function() {
                if (rformElems.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio") {
                        jQuery.event.add(this, "propertychange._change", function(event) {
                            if (event.originalEvent.propertyName === "checked") {
                                this._just_changed = true;
                            }
                        });
                        jQuery.event.add(this, "click._change", function(event) {
                            if (this._just_changed && !event.isTrigger) {
                                this._just_changed = false;
                            }
                            jQuery.event.simulate("change", this, event, true);
                        });
                    }
                    return false;
                }
                jQuery.event.add(this, "beforeactivate._change", function(e) {
                    var elem = e.target;
                    if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "_change_attached")) {
                        jQuery.event.add(elem, "change._change", function(event) {
                            if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                                jQuery.event.simulate("change", this.parentNode, event, true);
                            }
                        });
                        jQuery._data(elem, "_change_attached", true);
                    }
                });
            },
            handle: function(event) {
                var elem = event.target;
                if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) {
                    return event.handleObj.handler.apply(this, arguments);
                }
            },
            teardown: function() {
                jQuery.event.remove(this, "._change");
                return !rformElems.test(this.nodeName);
            }
        };
    }
    if (!jQuery.support.focusinBubbles) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {
            var attaches = 0,
                handler = function(event) {
                    jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
                };
            jQuery.event.special[fix] = {
                setup: function() {
                    if (attaches++ === 0) {
                        document.addEventListener(orig, handler, true);
                    }
                },
                teardown: function() {
                    if (--attaches === 0) {
                        document.removeEventListener(orig, handler, true);
                    }
                }
            };
        });
    }
    jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var origFn, type;
            if (typeof types === "object") {
                if (typeof selector !== "string") {
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) {
                    this.on(type, selector, data, types[type], one);
                }
                return this;
            }
            if (data == null && fn == null) {
                fn = selector;
                data = selector = undefined;
            } else if (fn == null) {
                if (typeof selector === "string") {
                    fn = data;
                    data = undefined;
                } else {
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if (fn === false) {
                fn = returnFalse;
            } else if (!fn) {
                return this;
            }
            if (one === 1) {
                origFn = fn;
                fn = function(event) {
                    jQuery().off(event);
                    return origFn.apply(this, arguments);
                };
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
            }
            return this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                return this;
            }
            if (typeof types === "object") {
                for (type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        live: function(types, data, fn) {
            jQuery(this.context).on(types, this.selector, data, fn);
            return this;
        },
        die: function(types, fn) {
            jQuery(this.context).off(types, this.selector || "**", fn);
            return this;
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            if (this[0]) {
                return jQuery.event.trigger(type, data, this[0], true);
            }
        },
        toggle: function(fn) {
            var args = arguments,
                guid = fn.guid || jQuery.guid++,
                i = 0,
                toggler = function(event) {
                    var lastToggle = (jQuery._data(this, "lastToggle" + fn.guid) || 0) % i;
                    jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1);
                    event.preventDefault();
                    return args[lastToggle].apply(this, arguments) || false;
                };
            toggler.guid = guid;
            while (i < args.length) {
                args[i++].guid = guid;
            }
            return this.click(toggler);
        },
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
    });
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            if (fn == null) {
                fn = data;
                data = null;
            }
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
        if (rkeyEvent.test(name)) {
            jQuery.event.fixHooks[name] = jQuery.event.keyHooks;
        }
        if (rmouseEvent.test(name)) {
            jQuery.event.fixHooks[name] = jQuery.event.mouseHooks;
        }
    });
    (function(window, undefined) {
        var cachedruns, assertGetIdNotName, Expr, getText, isXML, contains, compile, sortOrder, hasDuplicate, outermostContext, baseHasDuplicate = true,
            strundefined = "undefined",
            expando = ("sizcache" + Math.random()).replace(".", ""),
            Token = String,
            document = window.document,
            docElem = document.documentElement,
            dirruns = 0,
            done = 0,
            pop = [].pop,
            push = [].push,
            slice = [].slice,
            indexOf = [].indexOf || function(elem) {
                var i = 0,
                    len = this.length;
                for (; i < len; i++) {
                    if (this[i] === elem) {
                        return i;
                    }
                }
                return -1;
            },
            markFunction = function(fn, value) {
                fn[expando] = value == null || value;
                return fn;
            },
            createCache = function() {
                var cache = {},
                    keys = [];
                return markFunction(function(key, value) {
                    if (keys.push(key) > Expr.cacheLength) {
                        delete cache[keys.shift()];
                    }
                    return (cache[key + " "] = value);
                }, cache);
            },
            classCache = createCache(),
            tokenCache = createCache(),
            compilerCache = createCache(),
            whitespace = "[\\x20\\t\\r\\n\\f]",
            characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
            identifier = characterEncoding.replace("w", "w#"),
            operators = "([*^$|!~]?=)",
            attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
            pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)",
            pos = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)",
            rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
            rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
            rcombinators = new RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"),
            rpseudo = new RegExp(pseudos),
            rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
            rnot = /^:not/,
            rsibling = /[\x20\t\r\n\f]*[+~]/,
            rendsWithNot = /:not\($/,
            rheader = /h\d/i,
            rinputs = /input|select|textarea|button/i,
            rbackslash = /\\(?!\\)/g,
            matchExpr = {
                "ID": new RegExp("^#(" + characterEncoding + ")"),
                "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
                "NAME": new RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
                "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                "ATTR": new RegExp("^" + attributes),
                "PSEUDO": new RegExp("^" + pseudos),
                "POS": new RegExp(pos, "i"),
                "CHILD": new RegExp("^:(only|nth|first|last)-child(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                "needsContext": new RegExp("^" + whitespace + "*[>+~]|" + pos, "i")
            },
            assert = function(fn) {
                var div = document.createElement("div");
                try {
                    return fn(div);
                } catch (e) {
                    return false;
                } finally {
                    div = null;
                }
            },
            assertTagNameNoComments = assert(function(div) {
                div.appendChild(document.createComment(""));
                return !div.getElementsByTagName("*").length;
            }),
            assertHrefNotNormalized = assert(function(div) {
                div.innerHTML = "<a href='#'></a>";
                return div.firstChild && typeof div.firstChild.getAttribute !== strundefined && div.firstChild.getAttribute("href") === "#";
            }),
            assertAttributes = assert(function(div) {
                div.innerHTML = "<select></select>";
                var type = typeof div.lastChild.getAttribute("multiple");
                return type !== "boolean" && type !== "string";
            }),
            assertUsableClassName = assert(function(div) {
                div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
                if (!div.getElementsByClassName || !div.getElementsByClassName("e").length) {
                    return false;
                }
                div.lastChild.className = "e";
                return div.getElementsByClassName("e").length === 2;
            }),
            assertUsableName = assert(function(div) {
                div.id = expando + 0;
                div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
                docElem.insertBefore(div, docElem.firstChild);
                var pass = document.getElementsByName && document.getElementsByName(expando).length === 2 +
                    document.getElementsByName(expando + 0).length;
                assertGetIdNotName = !document.getElementById(expando);
                docElem.removeChild(div);
                return pass;
            });
        try {
            slice.call(docElem.childNodes, 0)[0].nodeType;
        } catch (e) {
            slice = function(i) {
                var elem, results = [];
                for (;
                    (elem = this[i]); i++) {
                    results.push(elem);
                }
                return results;
            };
        }

        function Sizzle(selector, context, results, seed) {
            results = results || [];
            context = context || document;
            var match, elem, xml, m, nodeType = context.nodeType;
            if (!selector || typeof selector !== "string") {
                return results;
            }
            if (nodeType !== 1 && nodeType !== 9) {
                return [];
            }
            xml = isXML(context);
            if (!xml && !seed) {
                if ((match = rquickExpr.exec(selector))) {
                    if ((m = match[1])) {
                        if (nodeType === 9) {
                            elem = context.getElementById(m);
                            if (elem && elem.parentNode) {
                                if (elem.id === m) {
                                    results.push(elem);
                                    return results;
                                }
                            } else {
                                return results;
                            }
                        } else {
                            if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                results.push(elem);
                                return results;
                            }
                        }
                    } else if (match[2]) {
                        push.apply(results, slice.call(context.getElementsByTagName(selector), 0));
                        return results;
                    } else if ((m = match[3]) && assertUsableClassName && context.getElementsByClassName) {
                        push.apply(results, slice.call(context.getElementsByClassName(m), 0));
                        return results;
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed, xml);
        }
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        };
        Sizzle.matchesSelector = function(elem, expr) {
            return Sizzle(expr, null, null, [elem]).length > 0;
        };

        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type;
            };
        }

        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && elem.type === type;
            };
        }

        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                argument = +argument;
                return markFunction(function(seed, matches) {
                    var j, matchIndexes = fn([], seed.length, argument),
                        i = matchIndexes.length;
                    while (i--) {
                        if (seed[(j = matchIndexes[i])]) {
                            seed[j] = !(matches[j] = seed[j]);
                        }
                    }
                });
            });
        }
        getText = Sizzle.getText = function(elem) {
            var node, ret = "",
                i = 0,
                nodeType = elem.nodeType;
            if (nodeType) {
                if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    if (typeof elem.textContent === "string") {
                        return elem.textContent;
                    } else {
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem);
                        }
                    }
                } else if (nodeType === 3 || nodeType === 4) {
                    return elem.nodeValue;
                }
            } else {
                for (;
                    (node = elem[i]); i++) {
                    ret += getText(node);
                }
            }
            return ret;
        };
        isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };
        contains = Sizzle.contains = docElem.contains ? function(a, b) {
            var adown = a.nodeType === 9 ? a.documentElement : a,
                bup = b && b.parentNode;
            return a === bup || !!(bup && bup.nodeType === 1 && adown.contains && adown.contains(bup));
        } : docElem.compareDocumentPosition ? function(a, b) {
            return b && !!(a.compareDocumentPosition(b) & 16);
        } : function(a, b) {
            while ((b = b.parentNode)) {
                if (b === a) {
                    return true;
                }
            }
            return false;
        };
        Sizzle.attr = function(elem, name) {
            var val, xml = isXML(elem);
            if (!xml) {
                name = name.toLowerCase();
            }
            if ((val = Expr.attrHandle[name])) {
                return val(elem);
            }
            if (xml || assertAttributes) {
                return elem.getAttribute(name);
            }
            val = elem.getAttributeNode(name);
            return val ? typeof elem[name] === "boolean" ? elem[name] ? name : null : val.specified ? val.value : null : null;
        };
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: assertHrefNotNormalized ? {} : {
                "href": function(elem) {
                    return elem.getAttribute("href", 2);
                },
                "type": function(elem) {
                    return elem.getAttribute("type");
                }
            },
            find: {
                "ID": assertGetIdNotName ? function(id, context, xml) {
                    if (typeof context.getElementById !== strundefined && !xml) {
                        var m = context.getElementById(id);
                        return m && m.parentNode ? [m] : [];
                    }
                } : function(id, context, xml) {
                    if (typeof context.getElementById !== strundefined && !xml) {
                        var m = context.getElementById(id);
                        return m ? m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ? [m] : undefined : [];
                    }
                },
                "TAG": assertTagNameNoComments ? function(tag, context) {
                    if (typeof context.getElementsByTagName !== strundefined) {
                        return context.getElementsByTagName(tag);
                    }
                } : function(tag, context) {
                    var results = context.getElementsByTagName(tag);
                    if (tag === "*") {
                        var elem, tmp = [],
                            i = 0;
                        for (;
                            (elem = results[i]); i++) {
                            if (elem.nodeType === 1) {
                                tmp.push(elem);
                            }
                        }
                        return tmp;
                    }
                    return results;
                },
                "NAME": assertUsableName && function(tag, context) {
                    if (typeof context.getElementsByName !== strundefined) {
                        return context.getElementsByName(name);
                    }
                },
                "CLASS": assertUsableClassName && function(className, context, xml) {
                    if (typeof context.getElementsByClassName !== strundefined && !xml) {
                        return context.getElementsByClassName(className);
                    }
                }
            },
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: true
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                "ATTR": function(match) {
                    match[1] = match[1].replace(rbackslash, "");
                    match[3] = (match[4] || match[5] || "").replace(rbackslash, "");
                    if (match[2] === "~=") {
                        match[3] = " " + match[3] + " ";
                    }
                    return match.slice(0, 4);
                },
                "CHILD": function(match) {
                    match[1] = match[1].toLowerCase();
                    if (match[1] === "nth") {
                        if (!match[2]) {
                            Sizzle.error(match[0]);
                        }
                        match[3] = +(match[3] ? match[4] + (match[5] || 1) : 2 * (match[2] === "even" || match[2] === "odd"));
                        match[4] = +((match[6] + match[7]) || match[2] === "odd");
                    } else if (match[2]) {
                        Sizzle.error(match[0]);
                    }
                    return match;
                },
                "PSEUDO": function(match) {
                    var unquoted, excess;
                    if (matchExpr["CHILD"].test(match[0])) {
                        return null;
                    }
                    if (match[3]) {
                        match[2] = match[3];
                    } else if ((unquoted = match[4])) {
                        if (rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                            unquoted = unquoted.slice(0, excess);
                            match[0] = match[0].slice(0, excess);
                        }
                        match[2] = unquoted;
                    }
                    return match.slice(0, 3);
                }
            },
            filter: {
                "ID": assertGetIdNotName ? function(id) {
                    id = id.replace(rbackslash, "");
                    return function(elem) {
                        return elem.getAttribute("id") === id;
                    };
                } : function(id) {
                    id = id.replace(rbackslash, "");
                    return function(elem) {
                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                        return node && node.value === id;
                    };
                },
                "TAG": function(nodeName) {
                    if (nodeName === "*") {
                        return function() {
                            return true;
                        };
                    }
                    nodeName = nodeName.replace(rbackslash, "").toLowerCase();
                    return function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                "CLASS": function(className) {
                    var pattern = classCache[expando][className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test(elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "");
                    });
                },
                "ATTR": function(name, operator, check) {
                    return function(elem, context) {
                        var result = Sizzle.attr(elem, name);
                        if (result == null) {
                            return operator === "!=";
                        }
                        if (!operator) {
                            return true;
                        }
                        result += "";
                        return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.substr(result.length - check.length) === check : operator === "~=" ? (" " + result + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.substr(0, check.length + 1) === check + "-" : false;
                    };
                },
                "CHILD": function(type, argument, first, last) {
                    if (type === "nth") {
                        return function(elem) {
                            var node, diff, parent = elem.parentNode;
                            if (first === 1 && last === 0) {
                                return true;
                            }
                            if (parent) {
                                diff = 0;
                                for (node = parent.firstChild; node; node = node.nextSibling) {
                                    if (node.nodeType === 1) {
                                        diff++;
                                        if (elem === node) {
                                            break;
                                        }
                                    }
                                }
                            }
                            diff -= last;
                            return diff === first || (diff % first === 0 && diff / first >= 0);
                        };
                    }
                    return function(elem) {
                        var node = elem;
                        switch (type) {
                            case "only":
                            case "first":
                                while ((node = node.previousSibling)) {
                                    if (node.nodeType === 1) {
                                        return false;
                                    }
                                }
                                if (type === "first") {
                                    return true;
                                }
                                node = elem;
                            case "last":
                                while ((node = node.nextSibling)) {
                                    if (node.nodeType === 1) {
                                        return false;
                                    }
                                }
                                return true;
                        }
                    };
                },
                "PSEUDO": function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    if (fn[expando]) {
                        return fn(argument);
                    }
                    if (fn.length > 1) {
                        args = [pseudo, pseudo, "", argument];
                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                            var idx, matched = fn(seed, argument),
                                i = matched.length;
                            while (i--) {
                                idx = indexOf.call(seed, matched[i]);
                                seed[idx] = !(matches[idx] = matched[i]);
                            }
                        }) : function(elem) {
                            return fn(elem, 0, args);
                        };
                    }
                    return fn;
                }
            },
            pseudos: {
                "not": markFunction(function(selector) {
                    var input = [],
                        results = [],
                        matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        var elem, unmatched = matcher(seed, null, xml, []),
                            i = seed.length;
                        while (i--) {
                            if ((elem = unmatched[i])) {
                                seed[i] = !(matches[i] = elem);
                            }
                        }
                    }) : function(elem, context, xml) {
                        input[0] = elem;
                        matcher(input, null, xml, results);
                        return !results.pop();
                    };
                }),
                "has": markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                "contains": markFunction(function(text) {
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                "enabled": function(elem) {
                    return elem.disabled === false;
                },
                "disabled": function(elem) {
                    return elem.disabled === true;
                },
                "checked": function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                },
                "selected": function(elem) {
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex;
                    }
                    return elem.selected === true;
                },
                "parent": function(elem) {
                    return !Expr.pseudos["empty"](elem);
                },
                "empty": function(elem) {
                    var nodeType;
                    elem = elem.firstChild;
                    while (elem) {
                        if (elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4) {
                            return false;
                        }
                        elem = elem.nextSibling;
                    }
                    return true;
                },
                "header": function(elem) {
                    return rheader.test(elem.nodeName);
                },
                "text": function(elem) {
                    var type, attr;
                    return elem.nodeName.toLowerCase() === "input" && (type = elem.type) === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type);
                },
                "radio": createInputPseudo("radio"),
                "checkbox": createInputPseudo("checkbox"),
                "file": createInputPseudo("file"),
                "password": createInputPseudo("password"),
                "image": createInputPseudo("image"),
                "submit": createButtonPseudo("submit"),
                "reset": createButtonPseudo("reset"),
                "button": function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === "button" || name === "button";
                },
                "input": function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                "focus": function(elem) {
                    var doc = elem.ownerDocument;
                    return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                "active": function(elem) {
                    return elem === elem.ownerDocument.activeElement;
                },
                "first": createPositionalPseudo(function() {
                    return [0];
                }),
                "last": createPositionalPseudo(function(matchIndexes, length) {
                    return [length - 1];
                }),
                "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [argument < 0 ? argument + length : argument];
                }),
                "even": createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                "odd": createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length : argument; --i >= 0;) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length : argument; ++i < length;) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                })
            }
        };

        function siblingCheck(a, b, ret) {
            if (a === b) {
                return ret;
            }
            var cur = a.nextSibling;
            while (cur) {
                if (cur === b) {
                    return -1;
                }
                cur = cur.nextSibling;
            }
            return 1;
        }
        sortOrder = docElem.compareDocumentPosition ? function(a, b) {
            if (a === b) {
                hasDuplicate = true;
                return 0;
            }
            return (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1;
        } : function(a, b) {
            if (a === b) {
                hasDuplicate = true;
                return 0;
            } else if (a.sourceIndex && b.sourceIndex) {
                return a.sourceIndex - b.sourceIndex;
            }
            var al, bl, ap = [],
                bp = [],
                aup = a.parentNode,
                bup = b.parentNode,
                cur = aup;
            if (aup === bup) {
                return siblingCheck(a, b);
            } else if (!aup) {
                return -1;
            } else if (!bup) {
                return 1;
            }
            while (cur) {
                ap.unshift(cur);
                cur = cur.parentNode;
            }
            cur = bup;
            while (cur) {
                bp.unshift(cur);
                cur = cur.parentNode;
            }
            al = ap.length;
            bl = bp.length;
            for (var i = 0; i < al && i < bl; i++) {
                if (ap[i] !== bp[i]) {
                    return siblingCheck(ap[i], bp[i]);
                }
            }
            return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1);
        };
        [0, 0].sort(sortOrder);
        baseHasDuplicate = !hasDuplicate;
        Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [],
                i = 1,
                j = 0;
            hasDuplicate = baseHasDuplicate;
            results.sort(sortOrder);
            if (hasDuplicate) {
                for (;
                    (elem = results[i]); i++) {
                    if (elem === results[i - 1]) {
                        j = duplicates.push(i);
                    }
                }
                while (j--) {
                    results.splice(duplicates[j], 1);
                }
            }
            return results;
        };
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        };

        function tokenize(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[expando][selector + " "];
            if (cached) {
                return parseOnly ? 0 : cached.slice(0);
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                        soFar = soFar.slice(match[0].length) || soFar;
                    }
                    groups.push(tokens = []);
                }
                matched = false;
                if ((match = rcombinators.exec(soFar))) {
                    tokens.push(matched = new Token(match.shift()));
                    soFar = soFar.slice(matched.length);
                    matched.type = match[0].replace(rtrim, " ");
                }
                for (type in Expr.filter) {
                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                        tokens.push(matched = new Token(match.shift()));
                        soFar = soFar.slice(matched.length);
                        matched.type = type;
                        matched.matches = match;
                    }
                }
                if (!matched) {
                    break;
                }
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        }

        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir,
                checkNonElements = base && combinator.dir === "parentNode",
                doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                while ((elem = elem[dir])) {
                    if (checkNonElements || elem.nodeType === 1) {
                        return matcher(elem, context, xml);
                    }
                }
            } : function(elem, context, xml) {
                if (!xml) {
                    var cache, dirkey = dirruns + " " + doneName + " ",
                        cachedkey = dirkey + cachedruns;
                    while ((elem = elem[dir])) {
                        if (checkNonElements || elem.nodeType === 1) {
                            if ((cache = elem[expando]) === cachedkey) {
                                return elem.sizset;
                            } else if (typeof cache === "string" && cache.indexOf(dirkey) === 0) {
                                if (elem.sizset) {
                                    return elem;
                                }
                            } else {
                                elem[expando] = cachedkey;
                                if (matcher(elem, context, xml)) {
                                    elem.sizset = true;
                                    return elem;
                                }
                                elem.sizset = false;
                            }
                        }
                    }
                } else {
                    while ((elem = elem[dir])) {
                        if (checkNonElements || elem.nodeType === 1) {
                            if (matcher(elem, context, xml)) {
                                return elem;
                            }
                        }
                    }
                }
            };
        }

        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                var i = matchers.length;
                while (i--) {
                    if (!matchers[i](elem, context, xml)) {
                        return false;
                    }
                }
                return true;
            } : matchers[0];
        }

        function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [],
                i = 0,
                len = unmatched.length,
                mapped = map != null;
            for (; i < len; i++) {
                if ((elem = unmatched[i])) {
                    if (!filter || filter(elem, context, xml)) {
                        newUnmatched.push(elem);
                        if (mapped) {
                            map.push(i);
                        }
                    }
                }
            }
            return newUnmatched;
        }

        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
                postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
                postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [],
                    postMap = [],
                    preexisting = results.length,
                    elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
                    matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
                    matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml);
                }
                if (postFilter) {
                    temp = condense(matcherOut, postMap);
                    postFilter(temp, [], context, xml);
                    i = temp.length;
                    while (i--) {
                        if ((elem = temp[i])) {
                            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                        }
                    }
                }
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            temp = [];
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i])) {
                                    temp.push((matcherIn[i] = elem));
                                }
                            }
                            postFinder(null, (matcherOut = []), temp, xml);
                        }
                        i = matcherOut.length;
                        while (i--) {
                            if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
                                seed[temp] = !(results[temp] = elem);
                            }
                        }
                    }
                } else {
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                    if (postFinder) {
                        postFinder(null, results, matcherOut, xml);
                    } else {
                        push.apply(results, matcherOut);
                    }
                }
            });
        }

        function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length,
                leadingRelative = Expr.relative[tokens[0].type],
                implicitRelative = leadingRelative || Expr.relative[" "],
                i = leadingRelative ? 1 : 0,
                matchContext = addCombinator(function(elem) {
                    return elem === checkContext;
                }, implicitRelative, true),
                matchAnyContext = addCombinator(function(elem) {
                    return indexOf.call(checkContext, elem) > -1;
                }, implicitRelative, true),
                matchers = [function(elem, context, xml) {
                    return (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                }];
            for (; i < len; i++) {
                if ((matcher = Expr.relative[tokens[i].type])) {
                    matchers = [addCombinator(elementMatcher(matchers), matcher)];
                } else {
                    matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                    if (matcher[expando]) {
                        j = ++i;
                        for (; j < len; j++) {
                            if (Expr.relative[tokens[j].type]) {
                                break;
                            }
                        }
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && tokens.slice(0, i - 1).join("").replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && tokens.join(""));
                    }
                    matchers.push(matcher);
                }
            }
            return elementMatcher(matchers);
        }

        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0,
                byElement = elementMatchers.length > 0,
                superMatcher = function(seed, context, xml, results, expandContext) {
                    var elem, j, matcher, setMatched = [],
                        matchedCount = 0,
                        i = "0",
                        unmatched = seed && [],
                        outermost = expandContext != null,
                        contextBackup = outermostContext,
                        elems = seed || byElement && Expr.find["TAG"]("*", expandContext && context.parentNode || context),
                        dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);
                    if (outermost) {
                        outermostContext = context !== document && context;
                        cachedruns = superMatcher.el;
                    }
                    for (;
                        (elem = elems[i]) != null; i++) {
                        if (byElement && elem) {
                            for (j = 0;
                                (matcher = elementMatchers[j]); j++) {
                                if (matcher(elem, context, xml)) {
                                    results.push(elem);
                                    break;
                                }
                            }
                            if (outermost) {
                                dirruns = dirrunsUnique;
                                cachedruns = ++superMatcher.el;
                            }
                        }
                        if (bySet) {
                            if ((elem = !matcher && elem)) {
                                matchedCount--;
                            }
                            if (seed) {
                                unmatched.push(elem);
                            }
                        }
                    }
                    matchedCount += i;
                    if (bySet && i !== matchedCount) {
                        for (j = 0;
                            (matcher = setMatchers[j]); j++) {
                            matcher(unmatched, setMatched, context, xml);
                        }
                        if (seed) {
                            if (matchedCount > 0) {
                                while (i--) {
                                    if (!(unmatched[i] || setMatched[i])) {
                                        setMatched[i] = pop.call(results);
                                    }
                                }
                            }
                            setMatched = condense(setMatched);
                        }
                        push.apply(results, setMatched);
                        if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                            Sizzle.uniqueSort(results);
                        }
                    }
                    if (outermost) {
                        dirruns = dirrunsUnique;
                        outermostContext = contextBackup;
                    }
                    return unmatched;
                };
            superMatcher.el = 0;
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        compile = Sizzle.compile = function(selector, group) {
            var i, setMatchers = [],
                elementMatchers = [],
                cached = compilerCache[expando][selector + " "];
            if (!cached) {
                if (!group) {
                    group = tokenize(selector);
                }
                i = group.length;
                while (i--) {
                    cached = matcherFromTokens(group[i]);
                    if (cached[expando]) {
                        setMatchers.push(cached);
                    } else {
                        elementMatchers.push(cached);
                    }
                }
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
            }
            return cached;
        };

        function multipleContexts(selector, contexts, results) {
            var i = 0,
                len = contexts.length;
            for (; i < len; i++) {
                Sizzle(selector, contexts[i], results);
            }
            return results;
        }

        function select(selector, context, results, seed, xml) {
            var i, tokens, token, type, find, match = tokenize(selector),
                j = match.length;
            if (!seed) {
                if (match.length === 1) {
                    tokens = match[0] = match[0].slice(0);
                    if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && !xml && Expr.relative[tokens[1].type]) {
                        context = Expr.find["ID"](token.matches[0].replace(rbackslash, ""), context, xml)[0];
                        if (!context) {
                            return results;
                        }
                        selector = selector.slice(tokens.shift().length);
                    }
                    for (i = matchExpr["POS"].test(selector) ? -1 : tokens.length - 1; i >= 0; i--) {
                        token = tokens[i];
                        if (Expr.relative[(type = token.type)]) {
                            break;
                        }
                        if ((find = Expr.find[type])) {
                            if ((seed = find(token.matches[0].replace(rbackslash, ""), rsibling.test(tokens[0].type) && context.parentNode || context, xml))) {
                                tokens.splice(i, 1);
                                selector = seed.length && tokens.join("");
                                if (!selector) {
                                    push.apply(results, slice.call(seed, 0));
                                    return results;
                                }
                                break;
                            }
                        }
                    }
                }
            }
            compile(selector, match)(seed, context, xml, results, rsibling.test(selector));
            return results;
        }
        if (document.querySelectorAll) {
            (function() {
                var disconnectedMatch, oldSelect = select,
                    rescape = /'|\\/g,
                    rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                    rbuggyQSA = [":focus"],
                    rbuggyMatches = [":active"],
                    matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector;
                assert(function(div) {
                    div.innerHTML = "<select><option selected=''></option></select>";
                    if (!div.querySelectorAll("[selected]").length) {
                        rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
                    }
                    if (!div.querySelectorAll(":checked").length) {
                        rbuggyQSA.push(":checked");
                    }
                });
                assert(function(div) {
                    div.innerHTML = "<p test=''></p>";
                    if (div.querySelectorAll("[test^='']").length) {
                        rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')");
                    }
                    div.innerHTML = "<input type='hidden'/>";
                    if (!div.querySelectorAll(":enabled").length) {
                        rbuggyQSA.push(":enabled", ":disabled");
                    }
                });
                rbuggyQSA = new RegExp(rbuggyQSA.join("|"));
                select = function(selector, context, results, seed, xml) {
                    if (!seed && !xml && !rbuggyQSA.test(selector)) {
                        var groups, i, old = true,
                            nid = expando,
                            newContext = context,
                            newSelector = context.nodeType === 9 && selector;
                        if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                            groups = tokenize(selector);
                            if ((old = context.getAttribute("id"))) {
                                nid = old.replace(rescape, "\\$&");
                            } else {
                                context.setAttribute("id", nid);
                            }
                            nid = "[id='" + nid + "'] ";
                            i = groups.length;
                            while (i--) {
                                groups[i] = nid + groups[i].join("");
                            }
                            newContext = rsibling.test(selector) && context.parentNode || context;
                            newSelector = groups.join(",");
                        }
                        if (newSelector) {
                            try {
                                push.apply(results, slice.call(newContext.querySelectorAll(newSelector), 0));
                                return results;
                            } catch (qsaError) {} finally {
                                if (!old) {
                                    context.removeAttribute("id");
                                }
                            }
                        }
                    }
                    return oldSelect(selector, context, results, seed, xml);
                };
                if (matches) {
                    assert(function(div) {
                        disconnectedMatch = matches.call(div, "div");
                        try {
                            matches.call(div, "[test!='']:sizzle");
                            rbuggyMatches.push("!=", pseudos);
                        } catch (e) {}
                    });
                    rbuggyMatches = new RegExp(rbuggyMatches.join("|"));
                    Sizzle.matchesSelector = function(elem, expr) {
                        expr = expr.replace(rattributeQuotes, "='$1']");
                        if (!isXML(elem) && !rbuggyMatches.test(expr) && !rbuggyQSA.test(expr)) {
                            try {
                                var ret = matches.call(elem, expr);
                                if (ret || disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                                    return ret;
                                }
                            } catch (e) {}
                        }
                        return Sizzle(expr, null, null, [elem]).length > 0;
                    };
                }
            })();
        }
        Expr.pseudos["nth"] = Expr.pseudos["eq"];

        function setFilters() {}
        Expr.filters = setFilters.prototype = Expr.pseudos;
        Expr.setFilters = new setFilters();
        Sizzle.attr = jQuery.attr;
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.pseudos;
        jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains;
    })(window);
    var runtil = /Until$/,
        rparentsprev = /^(?:parents|prev(?:Until|All))/,
        isSimple = /^.[^:#\[\.,]*$/,
        rneedsContext = jQuery.expr.match.needsContext,
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    jQuery.fn.extend({
        find: function(selector) {
            var i, l, length, n, r, ret, self = this;
            if (typeof selector !== "string") {
                return jQuery(selector).filter(function() {
                    for (i = 0, l = self.length; i < l; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                });
            }
            ret = this.pushStack("", "find", selector);
            for (i = 0, l = this.length; i < l; i++) {
                length = ret.length;
                jQuery.find(selector, this[i], ret);
                if (i > 0) {
                    for (n = length; n < ret.length; n++) {
                        for (r = 0; r < length; r++) {
                            if (ret[r] === ret[n]) {
                                ret.splice(n--, 1);
                                break;
                            }
                        }
                    }
                }
            }
            return ret;
        },
        has: function(target) {
            var i, targets = jQuery(target, this),
                len = targets.length;
            return this.filter(function() {
                for (i = 0; i < len; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector, false), "not", selector);
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector, true), "filter", selector);
        },
        is: function(selector) {
            return !!selector && (typeof selector === "string" ? rneedsContext.test(selector) ? jQuery(selector, this.context).index(this[0]) >= 0 : jQuery.filter(selector, this).length > 0 : this.filter(selector).length > 0);
        },
        closest: function(selectors, context) {
            var cur, i = 0,
                l = this.length,
                ret = [],
                pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
            for (; i < l; i++) {
                cur = this[i];
                while (cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11) {
                    if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
                        ret.push(cur);
                        break;
                    }
                    cur = cur.parentNode;
                }
            }
            ret = ret.length > 1 ? jQuery.unique(ret) : ret;
            return this.pushStack(ret, "closest", selectors);
        },
        index: function(elem) {
            if (!elem) {
                return (this[0] && this[0].parentNode) ? this.prevAll().length : -1;
            }
            if (typeof elem === "string") {
                return jQuery.inArray(this[0], jQuery(elem));
            }
            return jQuery.inArray(elem.jquery ? elem[0] : elem, this);
        },
        add: function(selector, context) {
            var set = typeof selector === "string" ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector),
                all = jQuery.merge(this.get(), set);
            return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all : jQuery.unique(all));
        },
        addBack: function(selector) {
            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
        }
    });
    jQuery.fn.andSelf = jQuery.fn.addBack;

    function isDisconnected(node) {
        return !node || !node.parentNode || node.parentNode.nodeType === 11;
    }

    function sibling(cur, dir) {
        do {
            cur = cur[dir];
        } while (cur && cur.nodeType !== 1);
        return cur;
    }
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            if (!runtil.test(name)) {
                selector = until;
            }
            if (selector && typeof selector === "string") {
                ret = jQuery.filter(selector, ret);
            }
            ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret;
            if (this.length > 1 && rparentsprev.test(name)) {
                ret = ret.reverse();
            }
            return this.pushStack(ret, name, core_slice.call(arguments).join(","));
        };
    });
    jQuery.extend({
        filter: function(expr, elems, not) {
            if (not) {
                expr = ":not(" + expr + ")";
            }
            return elems.length === 1 ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems);
        },
        dir: function(elem, dir, until) {
            var matched = [],
                cur = elem[dir];
            while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                if (cur.nodeType === 1) {
                    matched.push(cur);
                }
                cur = cur[dir];
            }
            return matched;
        },
        sibling: function(n, elem) {
            var r = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n);
                }
            }
            return r;
        }
    });

    function winnow(elements, qualifier, keep) {
        qualifier = qualifier || 0;
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem, i) {
                var retVal = !!qualifier.call(elem, i, elem);
                return retVal === keep;
            });
        } else if (qualifier.nodeType) {
            return jQuery.grep(elements, function(elem, i) {
                return (elem === qualifier) === keep;
            });
        } else if (typeof qualifier === "string") {
            var filtered = jQuery.grep(elements, function(elem) {
                return elem.nodeType === 1;
            });
            if (isSimple.test(qualifier)) {
                return jQuery.filter(qualifier, filtered, !keep);
            } else {
                qualifier = jQuery.filter(qualifier, filtered);
            }
        }
        return jQuery.grep(elements, function(elem, i) {
            return (jQuery.inArray(elem, qualifier) >= 0) === keep;
        });
    }

    function createSafeFragment(document) {
        var list = nodeNames.split("|"),
            safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) {
            while (list.length) {
                safeFrag.createElement(list.pop());
            }
        }
        return safeFrag;
    }
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" + "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
        rnocache = /<(?:script|object|embed|option|style)/i,
        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
        rcheckableType = /^(?:checkbox|radio)$/,
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /\/(java|ecma)script/i,
        rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        safeFragment = createSafeFragment(document),
        fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    if (!jQuery.support.htmlSerialize) {
        wrapMap._default = [1, "X<div>", "</div>"];
    }
    jQuery.fn.extend({
        text: function(value) {
            return jQuery.access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
            }, null, value, arguments.length);
        },
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i));
                });
            }
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }
                wrap.map(function() {
                    var elem = this;
                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild;
                    }
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }
            return this.each(function() {
                var self = jQuery(this),
                    contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html);
                } else {
                    self.append(html);
                }
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes);
                }
            }).end();
        },
        append: function() {
            return this.domManip(arguments, true, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11) {
                    this.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, true, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11) {
                    this.insertBefore(elem, this.firstChild);
                }
            });
        },
        before: function() {
            if (!isDisconnected(this[0])) {
                return this.domManip(arguments, false, function(elem) {
                    this.parentNode.insertBefore(elem, this);
                });
            }
            if (arguments.length) {
                var set = jQuery.clean(arguments);
                return this.pushStack(jQuery.merge(set, this), "before", this.selector);
            }
        },
        after: function() {
            if (!isDisconnected(this[0])) {
                return this.domManip(arguments, false, function(elem) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                });
            }
            if (arguments.length) {
                var set = jQuery.clean(arguments);
                return this.pushStack(jQuery.merge(this, set), "after", this.selector);
            }
        },
        remove: function(selector, keepData) {
            var elem, i = 0;
            for (;
                (elem = this[i]) != null; i++) {
                if (!selector || jQuery.filter(selector, [elem]).length) {
                    if (!keepData && elem.nodeType === 1) {
                        jQuery.cleanData(elem.getElementsByTagName("*"));
                        jQuery.cleanData([elem]);
                    }
                    if (elem.parentNode) {
                        elem.parentNode.removeChild(elem);
                    }
                }
            }
            return this;
        },
        empty: function() {
            var elem, i = 0;
            for (;
                (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    jQuery.cleanData(elem.getElementsByTagName("*"));
                }
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild);
                }
            }
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return jQuery.access(this, function(value) {
                var elem = this[0] || {},
                    i = 0,
                    l = this.length;
                if (value === undefined) {
                    return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, "") : undefined;
                }
                if (typeof value === "string" && !rnoInnerhtml.test(value) && (jQuery.support.htmlSerialize || !rnoshimcache.test(value)) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; i < l; i++) {
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(elem.getElementsByTagName("*"));
                                elem.innerHTML = value;
                            }
                        }
                        elem = 0;
                    } catch (e) {}
                }
                if (elem) {
                    this.empty().append(value);
                }
            }, null, value, arguments.length);
        },
        replaceWith: function(value) {
            if (!isDisconnected(this[0])) {
                if (jQuery.isFunction(value)) {
                    return this.each(function(i) {
                        var self = jQuery(this),
                            old = self.html();
                        self.replaceWith(value.call(this, i, old));
                    });
                }
                if (typeof value !== "string") {
                    value = jQuery(value).detach();
                }
                return this.each(function() {
                    var next = this.nextSibling,
                        parent = this.parentNode;
                    jQuery(this).remove();
                    if (next) {
                        jQuery(next).before(value);
                    } else {
                        jQuery(parent).append(value);
                    }
                });
            }
            return this.length ? this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value) : this;
        },
        detach: function(selector) {
            return this.remove(selector, true);
        },
        domManip: function(args, table, callback) {
            args = [].concat.apply([], args);
            var results, first, fragment, iNoClone, i = 0,
                value = args[0],
                scripts = [],
                l = this.length;
            if (!jQuery.support.checkClone && l > 1 && typeof value === "string" && rchecked.test(value)) {
                return this.each(function() {
                    jQuery(this).domManip(args, table, callback);
                });
            }
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    var self = jQuery(this);
                    args[0] = value.call(this, i, table ? self.html() : undefined);
                    self.domManip(args, table, callback);
                });
            }
            if (this[0]) {
                results = jQuery.buildFragment(args, this, scripts);
                fragment = results.fragment;
                first = fragment.firstChild;
                if (fragment.childNodes.length === 1) {
                    fragment = first;
                }
                if (first) {
                    table = table && jQuery.nodeName(first, "tr");
                    for (iNoClone = results.cacheable || l - 1; i < l; i++) {
                        callback.call(table && jQuery.nodeName(this[i], "table") ? findOrAppend(this[i], "tbody") : this[i], i === iNoClone ? fragment : jQuery.clone(fragment, true, true));
                    }
                }
                fragment = first = null;
                if (scripts.length) {
                    jQuery.each(scripts, function(i, elem) {
                        if (elem.src) {
                            if (jQuery.ajax) {
                                jQuery.ajax({
                                    url: elem.src,
                                    type: "GET",
                                    dataType: "script",
                                    async: false,
                                    global: false,
                                    "throws": true
                                });
                            } else {
                                jQuery.error("no ajax");
                            }
                        } else {
                            jQuery.globalEval((elem.text || elem.textContent || elem.innerHTML || "").replace(rcleanScript, ""));
                        }
                        if (elem.parentNode) {
                            elem.parentNode.removeChild(elem);
                        }
                    });
                }
            }
            return this;
        }
    });

    function findOrAppend(elem, tag) {
        return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag));
    }

    function cloneCopyEvent(src, dest) {
        if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
            return;
        }
        var type, i, l, oldData = jQuery._data(src),
            curData = jQuery._data(dest, oldData),
            events = oldData.events;
        if (events) {
            delete curData.handle;
            curData.events = {};
            for (type in events) {
                for (i = 0, l = events[type].length; i < l; i++) {
                    jQuery.event.add(dest, type, events[type][i]);
                }
            }
        }
        if (curData.data) {
            curData.data = jQuery.extend({}, curData.data);
        }
    }

    function cloneFixAttributes(src, dest) {
        var nodeName;
        if (dest.nodeType !== 1) {
            return;
        }
        if (dest.clearAttributes) {
            dest.clearAttributes();
        }
        if (dest.mergeAttributes) {
            dest.mergeAttributes(src);
        }
        nodeName = dest.nodeName.toLowerCase();
        if (nodeName === "object") {
            if (dest.parentNode) {
                dest.outerHTML = src.outerHTML;
            }
            if (jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
                dest.innerHTML = src.innerHTML;
            }
        } else if (nodeName === "input" && rcheckableType.test(src.type)) {
            dest.defaultChecked = dest.checked = src.checked;
            if (dest.value !== src.value) {
                dest.value = src.value;
            }
        } else if (nodeName === "option") {
            dest.selected = src.defaultSelected;
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;
        } else if (nodeName === "script" && dest.text !== src.text) {
            dest.text = src.text;
        }
        dest.removeAttribute(jQuery.expando);
    }
    jQuery.buildFragment = function(args, context, scripts) {
        var fragment, cacheable, cachehit, first = args[0];
        context = context || document;
        context = !context.nodeType && context[0] || context;
        context = context.ownerDocument || context;
        if (args.length === 1 && typeof first === "string" && first.length < 512 && context === document && first.charAt(0) === "<" && !rnocache.test(first) && (jQuery.support.checkClone || !rchecked.test(first)) && (jQuery.support.html5Clone || !rnoshimcache.test(first))) {
            cacheable = true;
            fragment = jQuery.fragments[first];
            cachehit = fragment !== undefined;
        }
        if (!fragment) {
            fragment = context.createDocumentFragment();
            jQuery.clean(args, context, fragment, scripts);
            if (cacheable) {
                jQuery.fragments[first] = cachehit && fragment;
            }
        }
        return {
            fragment: fragment,
            cacheable: cacheable
        };
    };
    jQuery.fragments = {};
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var elems, i = 0,
                ret = [],
                insert = jQuery(selector),
                l = insert.length,
                parent = this.length === 1 && this[0].parentNode;
            if ((parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1) {
                insert[original](this[0]);
                return this;
            } else {
                for (; i < l; i++) {
                    elems = (i > 0 ? this.clone(true) : this).get();
                    jQuery(insert[i])[original](elems);
                    ret = ret.concat(elems);
                }
                return this.pushStack(ret, name, insert.selector);
            }
        };
    });

    function getAll(elem) {
        if (typeof elem.getElementsByTagName !== "undefined") {
            return elem.getElementsByTagName("*");
        } else if (typeof elem.querySelectorAll !== "undefined") {
            return elem.querySelectorAll("*");
        } else {
            return [];
        }
    }

    function fixDefaultChecked(elem) {
        if (rcheckableType.test(elem.type)) {
            elem.defaultChecked = elem.checked;
        }
    }
    jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var srcElements, destElements, i, clone;
            if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
                clone = elem.cloneNode(true);
            } else {
                fragmentDiv.innerHTML = elem.outerHTML;
                fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
            }
            if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                cloneFixAttributes(elem, clone);
                srcElements = getAll(elem);
                destElements = getAll(clone);
                for (i = 0; srcElements[i]; ++i) {
                    if (destElements[i]) {
                        cloneFixAttributes(srcElements[i], destElements[i]);
                    }
                }
            }
            if (dataAndEvents) {
                cloneCopyEvent(elem, clone);
                if (deepDataAndEvents) {
                    srcElements = getAll(elem);
                    destElements = getAll(clone);
                    for (i = 0; srcElements[i]; ++i) {
                        cloneCopyEvent(srcElements[i], destElements[i]);
                    }
                }
            }
            srcElements = destElements = null;
            return clone;
        },
        clean: function(elems, context, fragment, scripts) {
            var i, j, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags, safe = context === document && safeFragment,
                ret = [];
            if (!context || typeof context.createDocumentFragment === "undefined") {
                context = document;
            }
            for (i = 0;
                (elem = elems[i]) != null; i++) {
                if (typeof elem === "number") {
                    elem += "";
                }
                if (!elem) {
                    continue;
                }
                if (typeof elem === "string") {
                    if (!rhtml.test(elem)) {
                        elem = context.createTextNode(elem);
                    } else {
                        safe = safe || createSafeFragment(context);
                        div = context.createElement("div");
                        safe.appendChild(div);
                        elem = elem.replace(rxhtmlTag, "<$1></$2>");
                        tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                        wrap = wrapMap[tag] || wrapMap._default;
                        depth = wrap[0];
                        div.innerHTML = wrap[1] + elem + wrap[2];
                        while (depth--) {
                            div = div.lastChild;
                        }
                        if (!jQuery.support.tbody) {
                            hasBody = rtbody.test(elem);
                            tbody = tag === "table" && !hasBody ? div.firstChild && div.firstChild.childNodes : wrap[1] === "<table>" && !hasBody ? div.childNodes : [];
                            for (j = tbody.length - 1; j >= 0; --j) {
                                if (jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length) {
                                    tbody[j].parentNode.removeChild(tbody[j]);
                                }
                            }
                        }
                        if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                            div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild);
                        }
                        elem = div.childNodes;
                        div.parentNode.removeChild(div);
                    }
                }
                if (elem.nodeType) {
                    ret.push(elem);
                } else {
                    jQuery.merge(ret, elem);
                }
            }
            if (div) {
                elem = div = safe = null;
            }
            if (!jQuery.support.appendChecked) {
                for (i = 0;
                    (elem = ret[i]) != null; i++) {
                    if (jQuery.nodeName(elem, "input")) {
                        fixDefaultChecked(elem);
                    } else if (typeof elem.getElementsByTagName !== "undefined") {
                        jQuery.grep(elem.getElementsByTagName("input"), fixDefaultChecked);
                    }
                }
            }
            if (fragment) {
                handleScript = function(elem) {
                    if (!elem.type || rscriptType.test(elem.type)) {
                        return scripts ? scripts.push(elem.parentNode ? elem.parentNode.removeChild(elem) : elem) : fragment.appendChild(elem);
                    }
                };
                for (i = 0;
                    (elem = ret[i]) != null; i++) {
                    if (!(jQuery.nodeName(elem, "script") && handleScript(elem))) {
                        fragment.appendChild(elem);
                        if (typeof elem.getElementsByTagName !== "undefined") {
                            jsTags = jQuery.grep(jQuery.merge([], elem.getElementsByTagName("script")), handleScript);
                            ret.splice.apply(ret, [i + 1, 0].concat(jsTags));
                            i += jsTags.length;
                        }
                    }
                }
            }
            return ret;
        },
        cleanData: function(elems, acceptData) {
            var data, id, elem, type, i = 0,
                internalKey = jQuery.expando,
                cache = jQuery.cache,
                deleteExpando = jQuery.support.deleteExpando,
                special = jQuery.event.special;
            for (;
                (elem = elems[i]) != null; i++) {
                if (acceptData || jQuery.acceptData(elem)) {
                    id = elem[internalKey];
                    data = id && cache[id];
                    if (data) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type);
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle);
                                }
                            }
                        }
                        if (cache[id]) {
                            delete cache[id];
                            if (deleteExpando) {
                                delete elem[internalKey];
                            } else if (elem.removeAttribute) {
                                elem.removeAttribute(internalKey);
                            } else {
                                elem[internalKey] = null;
                            }
                            jQuery.deletedIds.push(id);
                        }
                    }
                }
            }
        }
    });
    (function() {
        var matched, browser;
        jQuery.uaMatch = function(ua) {
            ua = ua.toLowerCase();
            var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[\/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[\/]([\w.]+)/.exec(ua) || /(msie)([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
            return {
                browser: match[1] || "",
                version: match[2] || "0"
            };
        };
        matched = jQuery.uaMatch(navigator.userAgent);
        browser = {};
        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version;
        }
        if (browser.chrome) {
            browser.webkit = true;
        } else if (browser.webkit) {
            browser.safari = true;
        }
        jQuery.browser = browser;
        jQuery.sub = function() {
            function jQuerySub(selector, context) {
                return new jQuerySub.fn.init(selector, context);
            }
            jQuery.extend(true, jQuerySub, this);
            jQuerySub.superclass = this;
            jQuerySub.fn = jQuerySub.prototype = this();
            jQuerySub.fn.constructor = jQuerySub;
            jQuerySub.sub = this.sub;
            jQuerySub.fn.init = function init(selector, context) {
                if (context && context instanceof jQuery && !(context instanceof jQuerySub)) {
                    context = jQuerySub(context);
                }
                return jQuery.fn.init.call(this, selector, context, rootjQuerySub);
            };
            jQuerySub.fn.init.prototype = jQuerySub.fn;
            var rootjQuerySub = jQuerySub(document);
            return jQuerySub;
        };
    })();
    var curCSS, iframe, iframeDoc, ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity=([^)]*)/,
        rposition = /^(top|right|bottom|left)$/,
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rmargin = /^margin/,
        rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
        rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
        rrelNum = new RegExp("^([-+])=(" + core_pnum + ")", "i"),
        elemdisplay = {
            BODY: "block"
        },
        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        cssNormalTransform = {
            letterSpacing: 0,
            fontWeight: 400
        },
        cssExpand = ["Top", "Right", "Bottom", "Left"],
        cssPrefixes = ["Webkit", "O", "Moz", "ms"],
        eventsToggle = jQuery.fn.toggle;

    function vendorPropName(style, name) {
        if (name in style) {
            return name;
        }
        var capName = name.charAt(0).toUpperCase() + name.slice(1),
            origName = name,
            i = cssPrefixes.length;
        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in style) {
                return name;
            }
        }
        return origName;
    }

    function isHidden(elem, el) {
        elem = el || elem;
        return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
    }

    function showHide(elements, show) {
        var elem, display, values = [],
            index = 0,
            length = elements.length;
        for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            values[index] = jQuery._data(elem, "olddisplay");
            if (show) {
                if (!values[index] && elem.style.display === "none") {
                    elem.style.display = "";
                }
                if (elem.style.display === "" && isHidden(elem)) {
                    values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName));
                }
            } else {
                display = curCSS(elem, "display");
                if (!values[index] && display !== "none") {
                    jQuery._data(elem, "olddisplay", display);
                }
            }
        }
        for (index = 0; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            if (!show || elem.style.display === "none" || elem.style.display === "") {
                elem.style.display = show ? values[index] || "" : "none";
            }
        }
        return elements;
    }
    jQuery.fn.extend({
        css: function(name, value) {
            return jQuery.access(this, function(elem, name, value) {
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, true);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state, fn2) {
            var bool = typeof state === "boolean";
            if (jQuery.isFunction(state) && jQuery.isFunction(fn2)) {
                return eventsToggle.apply(this, arguments);
            }
            return this.each(function() {
                if (bool ? state : isHidden(this)) {
                    jQuery(this).show();
                } else {
                    jQuery(this).hide();
                }
            });
        }
    });
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            "fillOpacity": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },
        cssProps: {
            "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }
            var ret, type, hooks, origName = jQuery.camelCase(name),
                style = elem.style;
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (value !== undefined) {
                type = typeof value;
                if (type === "string" && (ret = rrelNum.exec(value))) {
                    value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
                    type = "number";
                }
                if (value == null || type === "number" && isNaN(value)) {
                    return;
                }
                if (type === "number" && !jQuery.cssNumber[origName]) {
                    value += "px";
                }
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                    try {
                        style[name] = value;
                    } catch (e) {}
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret;
                }
                return style[name];
            }
        },
        css: function(elem, name, numeric, extra) {
            var val, num, hooks, origName = jQuery.camelCase(name);
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra);
            }
            if (val === undefined) {
                val = curCSS(elem, name);
            }
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name];
            }
            if (numeric || extra !== undefined) {
                num = parseFloat(val);
                return numeric || jQuery.isNumeric(num) ? num || 0 : val;
            }
            return val;
        },
        swap: function(elem, options, callback) {
            var ret, name, old = {};
            for (name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }
            ret = callback.call(elem);
            for (name in options) {
                elem.style[name] = old[name];
            }
            return ret;
        }
    });
    if (window.getComputedStyle) {
        curCSS = function(elem, name) {
            var ret, width, minWidth, maxWidth, computed = window.getComputedStyle(elem, null),
                style = elem.style;
            if (computed) {
                ret = computed.getPropertyValue(name) || computed[name];
                if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                    ret = jQuery.style(elem, name);
                }
                if (rnumnonpx.test(ret) && rmargin.test(name)) {
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth;
                }
            }
            return ret;
        };
    } else if (document.documentElement.currentStyle) {
        curCSS = function(elem, name) {
            var left, rsLeft, ret = elem.currentStyle && elem.currentStyle[name],
                style = elem.style;
            if (ret == null && style && style[name]) {
                ret = style[name];
            }
            if (rnumnonpx.test(ret) && !rposition.test(name)) {
                left = style.left;
                rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;
                if (rsLeft) {
                    elem.runtimeStyle.left = elem.currentStyle.left;
                }
                style.left = name === "fontSize" ? "1em" : ret;
                ret = style.pixelLeft + "px";
                style.left = left;
                if (rsLeft) {
                    elem.runtimeStyle.left = rsLeft;
                }
            }
            return ret === "" ? "auto" : ret;
        };
    }

    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }

    function augmentWidthOrHeight(elem, name, extra, isBorderBox) {
        var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
            val = 0;
        for (; i < 4; i += 2) {
            if (extra === "margin") {
                val += jQuery.css(elem, extra + cssExpand[i], true);
            }
            if (isBorderBox) {
                if (extra === "content") {
                    val -= parseFloat(curCSS(elem, "padding" + cssExpand[i])) || 0;
                }
                if (extra !== "margin") {
                    val -= parseFloat(curCSS(elem, "border" + cssExpand[i] + "Width")) || 0;
                }
            } else {
                val += parseFloat(curCSS(elem, "padding" + cssExpand[i])) || 0;
                if (extra !== "padding") {
                    val += parseFloat(curCSS(elem, "border" + cssExpand[i] + "Width")) || 0;
                }
            }
        }
        return val;
    }

    function getWidthOrHeight(elem, name, extra) {
        var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
            valueIsBorderBox = true,
            isBorderBox = jQuery.support.boxSizing && jQuery.css(elem, "boxSizing") === "border-box";
        if (val <= 0 || val == null) {
            val = curCSS(elem, name);
            if (val < 0 || val == null) {
                val = elem.style[name];
            }
            if (rnumnonpx.test(val)) {
                return val;
            }
            valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]);
            val = parseFloat(val) || 0;
        }
        return (val +
            augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox)) + "px";
    }

    function css_defaultDisplay(nodeName) {
        if (elemdisplay[nodeName]) {
            return elemdisplay[nodeName];
        }
        var elem = jQuery("<" + nodeName + ">").appendTo(document.body),
            display = elem.css("display");
        elem.remove();
        if (display === "none" || display === "") {
            iframe = document.body.appendChild(iframe || jQuery.extend(document.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            }));
            if (!iframeDoc || !iframe.createElement) {
                iframeDoc = (iframe.contentWindow || iframe.contentDocument).document;
                iframeDoc.write("<!doctype html><html><body>");
                iframeDoc.close();
            }
            elem = iframeDoc.body.appendChild(iframeDoc.createElement(nodeName));
            display = curCSS(elem, "display");
            document.body.removeChild(iframe);
        }
        elemdisplay[nodeName] = display;
        return display;
    }
    jQuery.each(["height", "width"], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed) {
                    if (elem.offsetWidth === 0 && rdisplayswap.test(curCSS(elem, "display"))) {
                        return jQuery.swap(elem, cssShow, function() {
                            return getWidthOrHeight(elem, name, extra);
                        });
                    } else {
                        return getWidthOrHeight(elem, name, extra);
                    }
                }
            },
            set: function(elem, value, extra) {
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && jQuery.css(elem, "boxSizing") === "border-box") : 0);
            }
        };
    });
    if (!jQuery.support.opacity) {
        jQuery.cssHooks.opacity = {
            get: function(elem, computed) {
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (0.01 * parseFloat(RegExp.$1)) + "" : computed ? "1" : "";
            },
            set: function(elem, value) {
                var style = elem.style,
                    currentStyle = elem.currentStyle,
                    opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
                    filter = currentStyle && currentStyle.filter || style.filter || "";
                style.zoom = 1;
                if (value >= 1 && jQuery.trim(filter.replace(ralpha, "")) === "" && style.removeAttribute) {
                    style.removeAttribute("filter");
                    if (currentStyle && !currentStyle.filter) {
                        return;
                    }
                }
                style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity;
            }
        };
    }
    jQuery(function() {
        if (!jQuery.support.reliableMarginRight) {
            jQuery.cssHooks.marginRight = {
                get: function(elem, computed) {
                    return jQuery.swap(elem, {
                        "display": "inline-block"
                    }, function() {
                        if (computed) {
                            return curCSS(elem, "marginRight");
                        }
                    });
                }
            };
        }
        if (!jQuery.support.pixelPosition && jQuery.fn.position) {
            jQuery.each(["top", "left"], function(i, prop) {
                jQuery.cssHooks[prop] = {
                    get: function(elem, computed) {
                        if (computed) {
                            var ret = curCSS(elem, prop);
                            return rnumnonpx.test(ret) ? jQuery(elem).position()[prop] + "px" : ret;
                        }
                    }
                };
            });
        }
    });
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.hidden = function(elem) {
            return (elem.offsetWidth === 0 && elem.offsetHeight === 0) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || curCSS(elem, "display")) === "none");
        };
        jQuery.expr.filters.visible = function(elem) {
            return !jQuery.expr.filters.hidden(elem);
        };
    }
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                var i, parts = typeof value === "string" ? value.split(" ") : [value],
                    expanded = {};
                for (i = 0; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                }
                return expanded;
            }
        };
        if (!rmargin.test(prefix)) {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
    });
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        rselectTextarea = /^(?:select|textarea)/i;
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? jQuery.makeArray(this.elements) : this;
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val, i) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    });
    jQuery.param = function(a, traditional) {
        var prefix, s = [],
            add = function(key, value) {
                value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            };
        if (traditional === undefined) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        }
        if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
            jQuery.each(a, function() {
                add(this.name, this.value);
            });
        } else {
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }
        return s.join("&").replace(r20, "+");
    };

    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) {
            jQuery.each(obj, function(i, v) {
                if (traditional || rbracket.test(prefix)) {
                    add(prefix, v);
                } else {
                    buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
                }
            });
        } else if (!traditional && jQuery.type(obj) === "object") {
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }
        } else {
            add(prefix, obj);
        }
    }
    var
        ajaxLocParts, ajaxLocation, rhash = /#.*$/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rquery = /\?/,
        rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        rts = /([?&])_=[^&]*/,
        rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        _load = jQuery.fn.load,
        prefilters = {},
        transports = {},
        allTypes = ["*/"] + ["*"];
    try {
        ajaxLocation = location.href;
    } catch (e) {
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }
            var dataType, list, placeBefore, dataTypes = dataTypeExpression.toLowerCase().split(core_rspace),
                i = 0,
                length = dataTypes.length;
            if (jQuery.isFunction(func)) {
                for (; i < length; i++) {
                    dataType = dataTypes[i];
                    placeBefore = /^\+/.test(dataType);
                    if (placeBefore) {
                        dataType = dataType.substr(1) || "*";
                    }
                    list = structure[dataType] = structure[dataType] || [];
                    list[placeBefore ? "unshift" : "push"](func);
                }
            }
        };
    }

    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, dataType, inspected) {
        dataType = dataType || options.dataTypes[0];
        inspected = inspected || {};
        inspected[dataType] = true;
        var selection, list = structure[dataType],
            i = 0,
            length = list ? list.length : 0,
            executeOnly = (structure === prefilters);
        for (; i < length && (executeOnly || !selection); i++) {
            selection = list[i](options, originalOptions, jqXHR);
            if (typeof selection === "string") {
                if (!executeOnly || inspected[selection]) {
                    selection = undefined;
                } else {
                    options.dataTypes.unshift(selection);
                    selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, selection, inspected);
                }
            }
        }
        if ((executeOnly || !selection) && !inspected["*"]) {
            selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, "*", inspected);
        }
        return selection;
    }

    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }
    }
    jQuery.fn.load = function(url, params, callback) {
        if (typeof url !== "string" && _load) {
            return _load.apply(this, arguments);
        }
        if (!this.length) {
            return this;
        }
        var selector, type, response, self = this,
            off = url.indexOf(" ");
        if (off >= 0) {
            selector = url.slice(off, url.length);
            url = url.slice(0, off);
        }
        if (jQuery.isFunction(params)) {
            callback = params;
            params = undefined;
        } else if (params && typeof params === "object") {
            type = "POST";
        }
        jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params,
            complete: function(jqXHR, status) {
                if (callback) {
                    self.each(callback, response || [jqXHR.responseText, status, jqXHR]);
                }
            }
        }).done(function(responseText) {
            response = arguments;
            self.html(selector ? jQuery("<div>").append(responseText.replace(rscript, "")).find(selector) : responseText);
        });
        return this;
    };
    jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(i, o) {
        jQuery.fn[o] = function(f) {
            return this.on(o, f);
        };
    });
    jQuery.each(["get", "post"], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            return jQuery.ajax({
                type: method,
                url: url,
                data: data,
                success: callback,
                dataType: type
            });
        };
    });
    jQuery.extend({
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        ajaxSetup: function(target, settings) {
            if (settings) {
                ajaxExtend(target, jQuery.ajaxSettings);
            } else {
                settings = target;
                target = jQuery.ajaxSettings;
            }
            ajaxExtend(target, settings);
            return target;
        },
        ajaxSettings: {
            url: ajaxLocation,
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: true,
            async: true,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": allTypes
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": window.String,
                "text html": true,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                context: true,
                url: true
            }
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }
            options = options || {};
            var
                ifModifiedKey, responseHeadersString, responseHeaders, transport, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options),
                callbackContext = s.context || s,
                globalEventContext = callbackContext !== s && (callbackContext.nodeType || callbackContext instanceof jQuery) ? jQuery(callbackContext) : jQuery.event,
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),
                statusCode = s.statusCode || {},
                requestHeaders = {},
                requestHeadersNames = {},
                state = 0,
                strAbort = "canceled",
                jqXHR = {
                    readyState: 0,
                    setRequestHeader: function(name, value) {
                        if (!state) {
                            var lname = name.toLowerCase();
                            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                            requestHeaders[name] = value;
                        }
                        return this;
                    },
                    getAllResponseHeaders: function() {
                        return state === 2 ? responseHeadersString : null;
                    },
                    getResponseHeader: function(key) {
                        var match;
                        if (state === 2) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while ((match = rheaders.exec(responseHeadersString))) {
                                    responseHeaders[match[1].toLowerCase()] = match[2];
                                }
                            }
                            match = responseHeaders[key.toLowerCase()];
                        }
                        return match === undefined ? null : match;
                    },
                    overrideMimeType: function(type) {
                        if (!state) {
                            s.mimeType = type;
                        }
                        return this;
                    },
                    abort: function(statusText) {
                        statusText = statusText || strAbort;
                        if (transport) {
                            transport.abort(statusText);
                        }
                        done(0, statusText);
                        return this;
                    }
                };

            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                if (state === 2) {
                    return;
                }
                state = 2;
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }
                transport = undefined;
                responseHeadersString = headers || "";
                jqXHR.readyState = status > 0 ? 4 : 0;
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses);
                }
                if (status >= 200 && status < 300 || status === 304) {
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[ifModifiedKey] = modified;
                        }
                        modified = jqXHR.getResponseHeader("Etag");
                        if (modified) {
                            jQuery.etag[ifModifiedKey] = modified;
                        }
                    }
                    if (status === 304) {
                        statusText = "notmodified";
                        isSuccess = true;
                    } else {
                        isSuccess = ajaxConvert(s, response);
                        statusText = isSuccess.state;
                        success = isSuccess.data;
                        error = isSuccess.error;
                        isSuccess = !error;
                    }
                } else {
                    error = statusText;
                    if (!statusText || status) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                }
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger("ajax" + (isSuccess ? "Success" : "Error"), [jqXHR, s, isSuccess ? success : error]);
                }
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                    if (!(--jQuery.active)) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }
            deferred.promise(jqXHR);
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            jqXHR.complete = completeDeferred.add;
            jqXHR.statusCode = function(map) {
                if (map) {
                    var tmp;
                    if (state < 2) {
                        for (tmp in map) {
                            statusCode[tmp] = [statusCode[tmp], map[tmp]];
                        }
                    } else {
                        tmp = map[jqXHR.status];
                        jqXHR.always(tmp);
                    }
                }
                return this;
            };
            s.url = ((url || s.url) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().split(core_rspace);
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))));
            }
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (state === 2) {
                return jqXHR;
            }
            fireGlobals = s.global;
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }
            if (!s.hasContent) {
                if (s.data) {
                    s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
                    delete s.data;
                }
                ifModifiedKey = s.url;
                if (s.cache === false) {
                    var ts = jQuery.now(),
                        ret = s.url.replace(rts, "$1_=" + ts);
                    s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
                }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }
            if (s.ifModified) {
                ifModifiedKey = ifModifiedKey || s.url;
                if (jQuery.lastModified[ifModifiedKey]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[ifModifiedKey]);
                }
                if (jQuery.etag[ifModifiedKey]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[ifModifiedKey]);
                }
            }
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                return jqXHR.abort();
            }
            strAbort = "abort";
            for (i in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) {
                jqXHR[i](s[i]);
            }
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                }
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function() {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }
                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    if (state < 2) {
                        done(-1, e);
                    } else {
                        throw e;
                    }
                }
            }
            return jqXHR;
        },
        active: 0,
        lastModified: {},
        etag: {}
    });

    function ajaxHandleResponses(s, jqXHR, responses) {
        var ct, type, finalDataType, firstDataType, contents = s.contents,
            dataTypes = s.dataTypes,
            responseFields = s.responseFields;
        for (type in responseFields) {
            if (type in responses) {
                jqXHR[responseFields[type]] = responses[type];
            }
        }
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("content-type");
            }
        }
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        } else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }

    function ajaxConvert(s, response) {
        var conv, conv2, current, tmp, dataTypes = s.dataTypes.slice(),
            prev = dataTypes[0],
            converters = {},
            i = 0;
        if (s.dataFilter) {
            response = s.dataFilter(response, s.dataType);
        }
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
            }
        }
        for (;
            (current = dataTypes[++i]);) {
            if (current !== "*") {
                if (prev !== "*" && prev !== current) {
                    conv = converters[prev + " " + current] || converters["* " + current];
                    if (!conv) {
                        for (conv2 in converters) {
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {
                                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                                if (conv) {
                                    if (conv === true) {
                                        conv = converters[conv2];
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.splice(i--, 0, current);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    if (conv !== true) {
                        if (conv && s["throws"]) {
                            response = conv(response);
                        } else {
                            try {
                                response = conv(response);
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                };
                            }
                        }
                    }
                }
                prev = current;
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    var oldCallbacks = [],
        rquestion = /\?/,
        rjsonp = /(=)\?(?=&|$)|\?\?/,
        nonce = jQuery.now();
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
            this[callback] = true;
            return callback;
        }
    });
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, data = s.data,
            url = s.url,
            hasCallback = s.jsonp !== false,
            replaceInUrl = hasCallback && rjsonp.test(url),
            replaceInData = hasCallback && !replaceInUrl && typeof data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(data);
        if (s.dataTypes[0] === "jsonp" || replaceInUrl || replaceInData) {
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            overwritten = window[callbackName];
            if (replaceInUrl) {
                s.url = url.replace(rjsonp, "$1" + callbackName);
            } else if (replaceInData) {
                s.data = data.replace(rjsonp, "$1" + callbackName);
            } else if (hasCallback) {
                s.url += (rquestion.test(url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }
            s.converters["script json"] = function() {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                }
                return responseContainer[0];
            };
            s.dataTypes[0] = "json";
            window[callbackName] = function() {
                responseContainer = arguments;
            };
            jqXHR.always(function() {
                window[callbackName] = overwritten;
                if (s[callbackName]) {
                    s.jsonpCallback = originalSettings.jsonpCallback;
                    oldCallbacks.push(callbackName);
                }
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }
                responseContainer = overwritten = undefined;
            });
            return "script";
        }
    });
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });
    jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
            s.global = false;
        }
    });
    jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
            return {
                send: function(_, callback) {
                    script = document.createElement("script");
                    script.async = "async";
                    if (s.scriptCharset) {
                        script.charset = s.scriptCharset;
                    }
                    script.src = s.url;
                    script.onload = script.onreadystatechange = function(_, isAbort) {
                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                            script.onload = script.onreadystatechange = null;
                            if (head && script.parentNode) {
                                head.removeChild(script);
                            }
                            script = undefined;
                            if (!isAbort) {
                                callback(200, "success");
                            }
                        }
                    };
                    head.insertBefore(script, head.firstChild);
                },
                abort: function() {
                    if (script) {
                        script.onload(0, 1);
                    }
                }
            };
        }
    });
    var xhrCallbacks, xhrOnUnloadAbort = window.ActiveXObject ? function() {
            for (var key in xhrCallbacks) {
                xhrCallbacks[key](0, 1);
            }
        } : false,
        xhrId = 0;

    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
    }
    jQuery.ajaxSettings.xhr = window.ActiveXObject ? function() {
        return !this.isLocal && createStandardXHR() || createActiveXHR();
    } : createStandardXHR;
    (function(xhr) {
        jQuery.extend(jQuery.support, {
            ajax: !!xhr,
            cors: !!xhr && ("withCredentials" in xhr)
        });
    })(jQuery.ajaxSettings.xhr());
    if (jQuery.support.ajax) {
        jQuery.ajaxTransport(function(s) {
            if (!s.crossDomain || jQuery.support.cors) {
                var callback;
                return {
                    send: function(headers, complete) {
                        var handle, i, xhr = s.xhr();
                        if (s.username) {
                            xhr.open(s.type, s.url, s.async, s.username, s.password);
                        } else {
                            xhr.open(s.type, s.url, s.async);
                        }
                        if (s.xhrFields) {
                            for (i in s.xhrFields) {
                                xhr[i] = s.xhrFields[i];
                            }
                        }
                        if (s.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(s.mimeType);
                        }
                        if (!s.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest";
                        }
                        try {
                            for (i in headers) {
                                xhr.setRequestHeader(i, headers[i]);
                            }
                        } catch (_) {}
                        xhr.send((s.hasContent && s.data) || null);
                        callback = function(_, isAbort) {
                            var status, statusText, responseHeaders, responses, xml;
                            try {
                                if (callback && (isAbort || xhr.readyState === 4)) {
                                    callback = undefined;
                                    if (handle) {
                                        xhr.onreadystatechange = jQuery.noop;
                                        if (xhrOnUnloadAbort) {
                                            delete xhrCallbacks[handle];
                                        }
                                    }
                                    if (isAbort) {
                                        if (xhr.readyState !== 4) {
                                            xhr.abort();
                                        }
                                    } else {
                                        status = xhr.status;
                                        responseHeaders = xhr.getAllResponseHeaders();
                                        responses = {};
                                        xml = xhr.responseXML;
                                        if (xml && xml.documentElement) {
                                            responses.xml = xml;
                                        }
                                        try {
                                            responses.text = xhr.responseText;
                                        } catch (e) {}
                                        try {
                                            statusText = xhr.statusText;
                                        } catch (e) {
                                            statusText = "";
                                        }
                                        if (!status && s.isLocal && !s.crossDomain) {
                                            status = responses.text ? 200 : 404;
                                        } else if (status === 1223) {
                                            status = 204;
                                        }
                                    }
                                }
                            } catch (firefoxAccessException) {
                                if (!isAbort) {
                                    complete(-1, firefoxAccessException);
                                }
                            }
                            if (responses) {
                                complete(status, statusText, responses, responseHeaders);
                            }
                        };
                        if (!s.async) {
                            callback();
                        } else if (xhr.readyState === 4) {
                            setTimeout(callback, 0);
                        } else {
                            handle = ++xhrId;
                            if (xhrOnUnloadAbort) {
                                if (!xhrCallbacks) {
                                    xhrCallbacks = {};
                                    jQuery(window).unload(xhrOnUnloadAbort);
                                }
                                xhrCallbacks[handle] = callback;
                            }
                            xhr.onreadystatechange = callback;
                        }
                    },
                    abort: function() {
                        if (callback) {
                            callback(0, 1);
                        }
                    }
                };
            }
        });
    }
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp("^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i"),
        rrun = /queueHooks$/,
        animationPrefilters = [defaultPrefilter],
        tweeners = {
            "*": [function(prop, value) {
                var end, unit, tween = this.createTween(prop, value),
                    parts = rfxnum.exec(value),
                    target = tween.cur(),
                    start = +target || 0,
                    scale = 1,
                    maxIterations = 20;
                if (parts) {
                    end = +parts[2];
                    unit = parts[3] || (jQuery.cssNumber[prop] ? "" : "px");
                    if (unit !== "px" && start) {
                        start = jQuery.css(tween.elem, prop, true) || end || 1;
                        do {
                            scale = scale || ".5";
                            start = start / scale;
                            jQuery.style(tween.elem, prop, start + unit);
                        } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
                    }
                    tween.unit = unit;
                    tween.start = start;
                    tween.end = parts[1] ? start + (parts[1] + 1) * end : end;
                }
                return tween;
            }]
        };

    function createFxNow() {
        setTimeout(function() {
            fxNow = undefined;
        }, 0);
        return (fxNow = jQuery.now());
    }

    function createTweens(animation, props) {
        jQuery.each(props, function(prop, value) {
            var collection = (tweeners[prop] || []).concat(tweeners["*"]),
                index = 0,
                length = collection.length;
            for (; index < length; index++) {
                if (collection[index].call(animation, prop, value)) {
                    return;
                }
            }
        });
    }

    function Animation(elem, properties, options) {
        var result, index = 0,
            tweenerIndex = 0,
            length = animationPrefilters.length,
            deferred = jQuery.Deferred().always(function() {
                delete tick.elem;
            }),
            tick = function() {
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
                    temp = remaining / animation.duration || 0,
                    percent = 1 - temp,
                    index = 0,
                    length = animation.tweens.length;
                for (; index < length; index++) {
                    animation.tweens[index].run(percent);
                }
                deferred.notifyWith(elem, [animation, percent, remaining]);
                if (percent < 1 && length) {
                    return remaining;
                } else {
                    deferred.resolveWith(elem, [animation]);
                    return false;
                }
            },
            animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(true, {
                    specialEasing: {}
                }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function(prop, end, easing) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween;
                },
                stop: function(gotoEnd) {
                    var index = 0,
                        length = gotoEnd ? animation.tweens.length : 0;
                    for (; index < length; index++) {
                        animation.tweens[index].run(1);
                    }
                    if (gotoEnd) {
                        deferred.resolveWith(elem, [animation, gotoEnd]);
                    } else {
                        deferred.rejectWith(elem, [animation, gotoEnd]);
                    }
                    return this;
                }
            }),
            props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (; index < length; index++) {
            result = animationPrefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                return result;
            }
        }
        createTweens(animation, props);
        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
        }
        jQuery.fx.timer(jQuery.extend(tick, {
            anim: animation,
            queue: animation.opts.queue,
            elem: elem
        }));
        return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }

    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (jQuery.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
            }
            if (index !== name) {
                props[name] = value;
                delete props[index];
            }
            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];
                for (index in value) {
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing;
                    }
                }
            } else {
                specialEasing[name] = easing;
            }
        }
    }
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = ["*"];
            } else {
                props = props.split(" ");
            }
            var prop, index = 0,
                length = props.length;
            for (; index < length; index++) {
                prop = props[index];
                tweeners[prop] = tweeners[prop] || [];
                tweeners[prop].unshift(callback);
            }
        },
        prefilter: function(callback, prepend) {
            if (prepend) {
                animationPrefilters.unshift(callback);
            } else {
                animationPrefilters.push(callback);
            }
        }
    });

    function defaultPrefilter(elem, props, opts) {
        var index, prop, value, length, dataShow, toggle, tween, hooks, oldfire, anim = this,
            style = elem.style,
            orig = {},
            handled = [],
            hidden = elem.nodeType && isHidden(elem);
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if (!hooks.unqueued) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;
            anim.always(function() {
                anim.always(function() {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire();
                    }
                });
            });
        }
        if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];
            if (jQuery.css(elem, "display") === "inline" && jQuery.css(elem, "float") === "none") {
                if (!jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay(elem.nodeName) === "inline") {
                    style.display = "inline-block";
                } else {
                    style.zoom = 1;
                }
            }
        }
        if (opts.overflow) {
            style.overflow = "hidden";
            if (!jQuery.support.shrinkWrapBlocks) {
                anim.done(function() {
                    style.overflow = opts.overflow[0];
                    style.overflowX = opts.overflow[1];
                    style.overflowY = opts.overflow[2];
                });
            }
        }
        for (index in props) {
            value = props[index];
            if (rfxtypes.exec(value)) {
                delete props[index];
                toggle = toggle || value === "toggle";
                if (value === (hidden ? "hide" : "show")) {
                    continue;
                }
                handled.push(index);
            }
        }
        length = handled.length;
        if (length) {
            dataShow = jQuery._data(elem, "fxshow") || jQuery._data(elem, "fxshow", {});
            if ("hidden" in dataShow) {
                hidden = dataShow.hidden;
            }
            if (toggle) {
                dataShow.hidden = !hidden;
            }
            if (hidden) {
                jQuery(elem).show();
            } else {
                anim.done(function() {
                    jQuery(elem).hide();
                });
            }
            anim.done(function() {
                var prop;
                jQuery.removeData(elem, "fxshow", true);
                for (prop in orig) {
                    jQuery.style(elem, prop, orig[prop]);
                }
            });
            for (index = 0; index < length; index++) {
                prop = handled[index];
                tween = anim.createTween(prop, hidden ? dataShow[prop] : 0);
                orig[prop] = dataShow[prop] || jQuery.style(elem, prop);
                if (!(prop in dataShow)) {
                    dataShow[prop] = tween.start;
                    if (hidden) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0;
                    }
                }
            }
        }
    }

    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    jQuery.Tween = Tween;
    Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
            } else {
                this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }
            if (hooks && hooks.set) {
                hooks.set(this);
            } else {
                Tween.propHooks._default.set(this);
            }
            return this;
        }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
                    return tween.elem[tween.prop];
                }
                result = jQuery.css(tween.elem, tween.prop, false, "");
                return !result || result === "auto" ? 0 : result;
            },
            set: function(tween) {
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween);
                } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                } else {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        }
    };
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now;
            }
        }
    };
    jQuery.each(["toggle", "show", "hide"], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return speed == null || typeof speed === "boolean" || (!i && jQuery.isFunction(speed) && jQuery.isFunction(easing)) ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
        };
    });
    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop),
                optall = jQuery.speed(speed, easing, callback),
                doAnimation = function() {
                    var anim = Animation(this, jQuery.extend({}, prop), optall);
                    if (empty) {
                        anim.stop(true);
                    }
                };
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
            };
            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", []);
            }
            return this.each(function() {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = jQuery._data(this);
                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index]);
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index]);
                        }
                    }
                }
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1);
                    }
                }
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type);
                }
            });
        }
    });

    function genFx(type, includeWidth) {
        var which, attrs = {
                height: type
            },
            i = 0;
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
        }
        if (includeWidth) {
            attrs.opacity = attrs.width = type;
        }
        return attrs;
    }
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });
    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
        }
        opt.old = opt.complete;
        opt.complete = function() {
            if (jQuery.isFunction(opt.old)) {
                opt.old.call(this);
            }
            if (opt.queue) {
                jQuery.dequeue(this, opt.queue);
            }
        };
        return opt;
    };
    jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        }
    };
    jQuery.timers = [];
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.tick = function() {
        var timer, timers = jQuery.timers,
            i = 0;
        fxNow = jQuery.now();
        for (; i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1);
            }
        }
        if (!timers.length) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };
    jQuery.fx.timer = function(timer) {
        if (timer() && jQuery.timers.push(timer) && !timerId) {
            timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
        }
    };
    jQuery.fx.interval = 13;
    jQuery.fx.stop = function() {
        clearInterval(timerId);
        timerId = null;
    };
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    jQuery.fx.step = {};
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.animated = function(elem) {
            return jQuery.grep(jQuery.timers, function(fn) {
                return elem === fn.elem;
            }).length;
        };
    }
    var rroot = /^(?:body|html)$/i;
    jQuery.fn.offset = function(options) {
        if (arguments.length) {
            return options === undefined ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i);
            });
        }
        var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft, box = {
                top: 0,
                left: 0
            },
            elem = this[0],
            doc = elem && elem.ownerDocument;
        if (!doc) {
            return;
        }
        if ((body = doc.body) === elem) {
            return jQuery.offset.bodyOffset(elem);
        }
        docElem = doc.documentElement;
        if (!jQuery.contains(docElem, elem)) {
            return box;
        }
        if (typeof elem.getBoundingClientRect !== "undefined") {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        clientTop = docElem.clientTop || body.clientTop || 0;
        clientLeft = docElem.clientLeft || body.clientLeft || 0;
        scrollTop = win.pageYOffset || docElem.scrollTop;
        scrollLeft = win.pageXOffset || docElem.scrollLeft;
        return {
            top: box.top + scrollTop - clientTop,
            left: box.left + scrollLeft - clientLeft
        };
    };
    jQuery.offset = {
        bodyOffset: function(body) {
            var top = body.offsetTop,
                left = body.offsetLeft;
            if (jQuery.support.doesNotIncludeMarginInBodyOffset) {
                top += parseFloat(jQuery.css(body, "marginTop")) || 0;
                left += parseFloat(jQuery.css(body, "marginLeft")) || 0;
            }
            return {
                top: top,
                left: left
            };
        },
        setOffset: function(elem, options, i) {
            var position = jQuery.css(elem, "position");
            if (position === "static") {
                elem.style.position = "relative";
            }
            var curElem = jQuery(elem),
                curOffset = curElem.offset(),
                curCSSTop = jQuery.css(elem, "top"),
                curCSSLeft = jQuery.css(elem, "left"),
                calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
                props = {},
                curPosition = {},
                curTop, curLeft;
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset);
            }
            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop;
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft;
            }
            if ("using" in options) {
                options.using.call(elem, props);
            } else {
                curElem.css(props);
            }
        }
    };
    jQuery.fn.extend({
        position: function() {
            if (!this[0]) {
                return;
            }
            var elem = this[0],
                offsetParent = this.offsetParent(),
                offset = this.offset(),
                parentOffset = rroot.test(offsetParent[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : offsetParent.offset();
            offset.top -= parseFloat(jQuery.css(elem, "marginTop")) || 0;
            offset.left -= parseFloat(jQuery.css(elem, "marginLeft")) || 0;
            parentOffset.top += parseFloat(jQuery.css(offsetParent[0], "borderTopWidth")) || 0;
            parentOffset.left += parseFloat(jQuery.css(offsetParent[0], "borderLeftWidth")) || 0;
            return {
                top: offset.top - parentOffset.top,
                left: offset.left - parentOffset.left
            };
        },
        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent || document.body;
                while (offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || document.body;
            });
        }
    });
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return jQuery.access(this, function(elem, method, val) {
                var win = getWindow(elem);
                if (val === undefined) {
                    return win ? (prop in win) ? win[prop] : win.document.documentElement[method] : elem[method];
                }
                if (win) {
                    win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop());
                } else {
                    elem[method] = val;
                }
            }, method, val, arguments.length, null);
        };
    });

    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
    }
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
                    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                return jQuery.access(this, function(elem, type, value) {
                    var doc;
                    if (jQuery.isWindow(elem)) {
                        return elem.document.documentElement["client" + name];
                    }
                    if (elem.nodeType === 9) {
                        doc = elem.documentElement;
                        return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
                    }
                    return value === undefined ? jQuery.css(elem, type, value, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : undefined, chainable, null);
            };
        });
    });
    window.jQuery = window.$ = jQuery;
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define("jquery", [], function() {
            return jQuery;
        });
    }
})(window);;

/* /web/static/lib/jquery.blockUI/jquery.blockUI.js defined in bundle 'web.assets_common' */
;
(function($) {
    if (/1\.(0|1|2)\.(0|1|2)/.test($.fn.jquery) || /^1.1/.test($.fn.jquery)) {
        alert('blockUI requires jQuery v1.2.3 or later!  You are using v' + $.fn.jquery);
        return;
    }
    $.fn._fadeIn = $.fn.fadeIn;
    var noOp = function() {};
    var mode = document.documentMode || 0;
    var setExpr = $.browser.msie && (($.browser.version < 8 && !mode) || mode < 8);
    var ie6 = $.browser.msie && /MSIE 6.0/.test(navigator.userAgent) && !mode;
    $.blockUI = function(opts) {
        install(window, opts);
    };
    $.unblockUI = function(opts) {
        remove(window, opts);
    };
    $.growlUI = function(title, message, timeout, onClose) {
        var $m = $('<div class="growlUI"></div>');
        if (title) $m.append('<h1>' + title + '</h1>');
        if (message) $m.append('<h2>' + message + '</h2>');
        if (timeout == undefined) timeout = 3000;
        $.blockUI({
            message: $m,
            fadeIn: 700,
            fadeOut: 1000,
            centerY: false,
            timeout: timeout,
            showOverlay: false,
            onUnblock: onClose,
            css: $.blockUI.defaults.growlCSS
        });
    };
    $.fn.block = function(opts) {
        return this.unblock({
            fadeOut: 0
        }).each(function() {
            if ($.css(this, 'position') == 'static')
                this.style.position = 'relative';
            if ($.browser.msie)
                this.style.zoom = 1;
            install(this, opts);
        });
    };
    $.fn.unblock = function(opts) {
        return this.each(function() {
            remove(this, opts);
        });
    };
    $.blockUI.version = 2.39;
    $.blockUI.defaults = {
        message: '<h1>Please wait...</h1>',
        title: null,
        draggable: true,
        theme: false,
        css: {
            padding: 0,
            margin: 0,
            width: '30%',
            top: '40%',
            left: '35%',
            textAlign: 'center',
            color: '#000',
            border: '3px solid #aaa',
            backgroundColor: '#fff',
            cursor: 'wait'
        },
        themedCSS: {
            width: '30%',
            top: '40%',
            left: '35%'
        },
        overlayCSS: {
            backgroundColor: '#000',
            opacity: 0.6,
            cursor: 'wait'
        },
        growlCSS: {
            width: '350px',
            top: '10px',
            left: '',
            right: '10px',
            border: 'none',
            padding: '5px',
            opacity: 0.6,
            cursor: 'default',
            color: '#fff',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            'border-radius': '10px'
        },
        iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank',
        forceIframe: false,
        baseZ: 1000,
        centerX: true,
        centerY: true,
        allowBodyStretch: true,
        bindEvents: true,
        constrainTabKey: true,
        fadeIn: 200,
        fadeOut: 400,
        timeout: 0,
        showOverlay: true,
        focusInput: true,
        applyPlatformOpacityRules: true,
        onBlock: null,
        onUnblock: null,
        quirksmodeOffsetHack: 4,
        blockMsgClass: 'blockMsg'
    };
    var pageBlock = null;
    var pageBlockEls = [];

    function install(el, opts) {
        var full = (el == window);
        var msg = opts && opts.message !== undefined ? opts.message : undefined;
        opts = $.extend({}, $.blockUI.defaults, opts || {});
        opts.overlayCSS = $.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS || {});
        var css = $.extend({}, $.blockUI.defaults.css, opts.css || {});
        var themedCSS = $.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS || {});
        msg = msg === undefined ? opts.message : msg;
        if (full && pageBlock)
            remove(window, {
                fadeOut: 0
            });
        if (msg && typeof msg != 'string' && (msg.parentNode || msg.jquery)) {
            var node = msg.jquery ? msg[0] : msg;
            var data = {};
            $(el).data('blockUI.history', data);
            data.el = node;
            data.parent = node.parentNode;
            data.display = node.style.display;
            data.position = node.style.position;
            if (data.parent)
                data.parent.removeChild(node);
        }
        $(el).data('blockUI.onUnblock', opts.onUnblock);
        var z = opts.baseZ;
        var lyr1 = ($.browser.msie || opts.forceIframe) ? $('<iframe class="blockUI" style="z-index:' + (z++) + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + opts.iframeSrc + '"></iframe>') : $('<div class="blockUI" style="display:none"></div>');
        var lyr2 = opts.theme ? $('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + (z++) + ';display:none"></div>') : $('<div class="blockUI blockOverlay" style="z-index:' + (z++) + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');
        var lyr3, s;
        if (opts.theme && full) {
            s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (z + 10) + ';display:none;position:fixed">' + '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (opts.title || '&nbsp;') + '</div>' + '<div class="ui-widget-content ui-dialog-content"></div>' + '</div>';
        } else if (opts.theme) {
            s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (z + 10) + ';display:none;position:absolute">' + '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (opts.title || '&nbsp;') + '</div>' + '<div class="ui-widget-content ui-dialog-content"></div>' + '</div>';
        } else if (full) {
            s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage" style="z-index:' + (z + 10) + ';display:none;position:fixed"></div>';
        } else {
            s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement" style="z-index:' + (z + 10) + ';display:none;position:absolute"></div>';
        }
        lyr3 = $(s);
        if (msg) {
            if (opts.theme) {
                lyr3.css(themedCSS);
                lyr3.addClass('ui-widget-content');
            } else
                lyr3.css(css);
        }
        if (!opts.theme && (!opts.applyPlatformOpacityRules || !($.browser.mozilla && /Linux/.test(navigator.platform))))
            lyr2.css(opts.overlayCSS);
        lyr2.css('position', full ? 'fixed' : 'absolute');
        if ($.browser.msie || opts.forceIframe)
            lyr1.css('opacity', 0.0);
        var layers = [lyr1, lyr2, lyr3],
            $par = full ? $('body') : $(el);
        $.each(layers, function() {
            this.appendTo($par);
        });
        if (opts.theme && opts.draggable && $.fn.draggable) {
            lyr3.draggable({
                handle: '.ui-dialog-titlebar',
                cancel: 'li'
            });
        }
        var expr = setExpr && (!$.boxModel || $('object,embed', full ? null : el).length > 0);
        if (ie6 || expr) {
            if (full && opts.allowBodyStretch && $.boxModel)
                $('html,body').css('height', '100%');
            if ((ie6 || !$.boxModel) && !full) {
                var t = sz(el, 'borderTopWidth'),
                    l = sz(el, 'borderLeftWidth');
                var fixT = t ? '(0 - ' + t + ')' : 0;
                var fixL = l ? '(0 - ' + l + ')' : 0;
            }
            $.each([lyr1, lyr2, lyr3], function(i, o) {
                var s = o[0].style;
                s.position = 'absolute';
                if (i < 2) {
                    full ? s.setExpression('height', 'Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:' + opts.quirksmodeOffsetHack + ') + "px"') : s.setExpression('height', 'this.parentNode.offsetHeight + "px"');
                    full ? s.setExpression('width', 'jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"') : s.setExpression('width', 'this.parentNode.offsetWidth + "px"');
                    if (fixL) s.setExpression('left', fixL);
                    if (fixT) s.setExpression('top', fixT);
                } else if (opts.centerY) {
                    if (full) s.setExpression('top', '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
                    s.marginTop = 0;
                } else if (!opts.centerY && full) {
                    var top = (opts.css && opts.css.top) ? parseInt(opts.css.top) : 0;
                    var expression = '((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + ' + top + ') + "px"';
                    s.setExpression('top', expression);
                }
            });
        }
        if (msg) {
            if (opts.theme)
                lyr3.find('.ui-widget-content').append(msg);
            else
                lyr3.append(msg);
            if (msg.jquery || msg.nodeType)
                $(msg).show();
        }
        if (($.browser.msie || opts.forceIframe) && opts.showOverlay)
            lyr1.show();
        if (opts.fadeIn) {
            var cb = opts.onBlock ? opts.onBlock : noOp;
            var cb1 = (opts.showOverlay && !msg) ? cb : noOp;
            var cb2 = msg ? cb : noOp;
            if (opts.showOverlay)
                lyr2._fadeIn(opts.fadeIn, cb1);
            if (msg)
                lyr3._fadeIn(opts.fadeIn, cb2);
        } else {
            if (opts.showOverlay)
                lyr2.show();
            if (msg)
                lyr3.show();
            if (opts.onBlock)
                opts.onBlock();
        }
        bind(1, el, opts);
        if (full) {
            pageBlock = lyr3[0];
            pageBlockEls = $(':input:enabled:visible', pageBlock);
            if (opts.focusInput)
                setTimeout(focus, 20);
        } else
            center(lyr3[0], opts.centerX, opts.centerY);
        if (opts.timeout) {
            var to = setTimeout(function() {
                full ? $.unblockUI(opts) : $(el).unblock(opts);
            }, opts.timeout);
            $(el).data('blockUI.timeout', to);
        }
    };

    function remove(el, opts) {
        var full = (el == window);
        var $el = $(el);
        var data = $el.data('blockUI.history');
        var to = $el.data('blockUI.timeout');
        if (to) {
            clearTimeout(to);
            $el.removeData('blockUI.timeout');
        }
        opts = $.extend({}, $.blockUI.defaults, opts || {});
        bind(0, el, opts);
        if (opts.onUnblock === null) {
            opts.onUnblock = $el.data('blockUI.onUnblock');
            $el.removeData('blockUI.onUnblock');
        }
        var els;
        if (full)
            els = $('body').children().filter('.blockUI').add('body > .blockUI');
        else
            els = $('.blockUI', el);
        if (full)
            pageBlock = pageBlockEls = null;
        if (opts.fadeOut) {
            els.fadeOut(opts.fadeOut);
            setTimeout(function() {
                reset(els, data, opts, el);
            }, opts.fadeOut);
        } else
            reset(els, data, opts, el);
    };

    function reset(els, data, opts, el) {
        els.each(function(i, o) {
            if (this.parentNode)
                this.parentNode.removeChild(this);
        });
        if (data && data.el) {
            data.el.style.display = data.display;
            data.el.style.position = data.position;
            if (data.parent)
                data.parent.appendChild(data.el);
            $(el).removeData('blockUI.history');
        }
        if (typeof opts.onUnblock == 'function')
            opts.onUnblock(el, opts);
    };

    function bind(b, el, opts) {
        var full = el == window,
            $el = $(el);
        if (!b && (full && !pageBlock || !full && !$el.data('blockUI.isBlocked')))
            return;
        if (!full)
            $el.data('blockUI.isBlocked', b);
        if (!opts.bindEvents || (b && !opts.showOverlay))
            return;
        var events = 'mousedown mouseup keydown keypress';
        b ? $(document).bind(events, opts, handler) : $(document).unbind(events, handler);
    };

    function handler(e) {
        if (e.keyCode && e.keyCode == 9) {
            if (pageBlock && e.data.constrainTabKey) {
                var els = pageBlockEls;
                var fwd = !e.shiftKey && e.target === els[els.length - 1];
                var back = e.shiftKey && e.target === els[0];
                if (fwd || back) {
                    setTimeout(function() {
                        focus(back)
                    }, 10);
                    return false;
                }
            }
        }
        var opts = e.data;
        if ($(e.target).parents('div.' + opts.blockMsgClass).length > 0)
            return true;
        return $(e.target).parents().children().filter('div.blockUI').length == 0;
    };

    function focus(back) {
        if (!pageBlockEls)
            return;
        var e = pageBlockEls[back === true ? pageBlockEls.length - 1 : 0];
        if (e)
            e.focus();
    };

    function center(el, x, y) {
        var p = el.parentNode,
            s = el.style;
        var l = ((p.offsetWidth - el.offsetWidth) / 2) - sz(p, 'borderLeftWidth');
        var t = ((p.offsetHeight - el.offsetHeight) / 2) - sz(p, 'borderTopWidth');
        if (x) s.left = l > 0 ? (l + 'px') : '0';
        if (y) s.top = t > 0 ? (t + 'px') : '0';
    };

    function sz(el, p) {
        return parseInt($.css(el, p)) || 0;
    };
})(jQuery);;

/* /web/static/lib/jquery.hotkeys/jquery.hotkeys.js defined in bundle 'web.assets_common' */
(function(jQuery) {
    jQuery.hotkeys = {
        version: "0.8",
        specialKeys: {
            8: "backspace",
            9: "tab",
            13: "return",
            16: "shift",
            17: "ctrl",
            18: "alt",
            19: "pause",
            20: "capslock",
            27: "esc",
            32: "space",
            33: "pageup",
            34: "pagedown",
            35: "end",
            36: "home",
            37: "left",
            38: "up",
            39: "right",
            40: "down",
            45: "insert",
            46: "del",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9",
            106: "*",
            107: "+",
            109: "-",
            110: ".",
            111: "/",
            112: "f1",
            113: "f2",
            114: "f3",
            115: "f4",
            116: "f5",
            117: "f6",
            118: "f7",
            119: "f8",
            120: "f9",
            121: "f10",
            122: "f11",
            123: "f12",
            144: "numlock",
            145: "scroll",
            191: "/",
            224: "meta"
        },
        shiftNums: {
            "`": "~",
            "1": "!",
            "2": "@",
            "3": "#",
            "4": "$",
            "5": "%",
            "6": "^",
            "7": "&",
            "8": "*",
            "9": "(",
            "0": ")",
            "-": "_",
            "=": "+",
            ";": ": ",
            "'": "\"",
            ",": "<",
            ".": ">",
            "/": "?",
            "\\": "|"
        }
    };

    function keyHandler(handleObj) {
        if (typeof handleObj.data !== "string") {
            return;
        }
        var origHandler = handleObj.handler,
            keys = handleObj.data.toLowerCase().split(" ");
        handleObj.handler = function(event) {
            if (this !== event.target && (/textarea|select/i.test(event.target.nodeName) || event.target.type === "text")) {
                return;
            }
            var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[event.which],
                character = String.fromCharCode(event.which).toLowerCase(),
                key, modif = "",
                possible = {};
            if (event.altKey && special !== "alt") {
                modif += "alt+";
            }
            if (event.ctrlKey && special !== "ctrl") {
                modif += "ctrl+";
            }
            if (event.metaKey && !event.ctrlKey && special !== "meta") {
                modif += "meta+";
            }
            if (event.shiftKey && special !== "shift") {
                modif += "shift+";
            }
            if (special) {
                possible[modif + special] = true;
            } else {
                possible[modif + character] = true;
                possible[modif + jQuery.hotkeys.shiftNums[character]] = true;
                if (modif === "shift+") {
                    possible[jQuery.hotkeys.shiftNums[character]] = true;
                }
            }
            for (var i = 0, l = keys.length; i < l; i++) {
                if (possible[keys[i]]) {
                    return origHandler.apply(this, arguments);
                }
            }
        };
    }
    jQuery.each(["keydown", "keyup", "keypress"], function() {
        jQuery.event.special[this] = {
            add: keyHandler
        };
    });
})(jQuery);;

/* /web/static/lib/jquery.placeholder/jquery.placeholder.js defined in bundle 'web.assets_common' */
;
(function(window, document, $) {
    var isInputSupported = 'placeholder' in document.createElement('input'),
        isTextareaSupported = 'placeholder' in document.createElement('textarea'),
        prototype = $.fn,
        valHooks = $.valHooks,
        hooks, placeholder;
    if (isInputSupported && isTextareaSupported) {
        placeholder = prototype.placeholder = function() {
            return this;
        };
        placeholder.input = placeholder.textarea = true;
    } else {
        placeholder = prototype.placeholder = function() {
            var $this = this;
            $this.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]').not('.placeholder').bind({
                'focus.placeholder': clearPlaceholder,
                'blur.placeholder': setPlaceholder
            }).data('placeholder-enabled', true).trigger('blur.placeholder');
            return $this;
        };
        placeholder.input = isInputSupported;
        placeholder.textarea = isTextareaSupported;
        hooks = {
            'get': function(element) {
                var $element = $(element);
                return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
            },
            'set': function(element, value) {
                var $element = $(element);
                if (!$element.data('placeholder-enabled')) {
                    return element.value = value;
                }
                if (value == '') {
                    element.value = value;
                    if (element != document.activeElement) {
                        setPlaceholder.call(element);
                    }
                } else if ($element.hasClass('placeholder')) {
                    clearPlaceholder.call(element, true, value) || (element.value = value);
                } else {
                    element.value = value;
                }
                return $element;
            }
        };
        isInputSupported || (valHooks.input = hooks);
        isTextareaSupported || (valHooks.textarea = hooks);
        $(function() {
            $(document).delegate('form', 'submit.placeholder', function() {
                var $inputs = $('.placeholder', this).each(clearPlaceholder);
                setTimeout(function() {
                    $inputs.each(setPlaceholder);
                }, 10);
            });
        });
        $(window).bind('beforeunload.placeholder', function() {
            $('.placeholder').each(function() {
                this.value = '';
            });
        });
    }

    function args(elem) {
        var newAttrs = {},
            rinlinejQuery = /^jQuery\d+$/;
        $.each(elem.attributes, function(i, attr) {
            if (attr.specified && !rinlinejQuery.test(attr.name)) {
                newAttrs[attr.name] = attr.value;
            }
        });
        return newAttrs;
    }

    function clearPlaceholder(event, value) {
        var input = this,
            $input = $(input);
        if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
            if ($input.data('placeholder-password')) {
                $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
                if (event === true) {
                    return $input[0].value = value;
                }
                $input.focus();
            } else {
                input.value = '';
                $input.removeClass('placeholder');
                input == document.activeElement && input.select();
            }
        }
    }

    function setPlaceholder() {
        var $replacement, input = this,
            $input = $(input),
            $origInput = $input,
            id = this.id;
        if (input.value == '') {
            if (input.type == 'password') {
                if (!$input.data('placeholder-textinput')) {
                    try {
                        $replacement = $input.clone().attr({
                            'type': 'text'
                        });
                    } catch (e) {
                        $replacement = $('<input>').attr($.extend(args(this), {
                            'type': 'text'
                        }));
                    }
                    $replacement.removeAttr('name').data({
                        'placeholder-password': true,
                        'placeholder-id': id
                    }).bind('focus.placeholder', clearPlaceholder);
                    $input.data({
                        'placeholder-textinput': $replacement,
                        'placeholder-id': id
                    }).before($replacement);
                }
                $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
            }
            $input.addClass('placeholder');
            $input[0].value = $input.attr('placeholder');
        } else {
            $input.removeClass('placeholder');
        }
    }
}(this, document, jQuery));;

/* /web/static/lib/jquery.timeago/jquery.timeago.js defined in bundle 'web.assets_common' */
(function($) {
    $.timeago = function(timestamp) {
        if (timestamp instanceof Date) {
            return inWords(timestamp);
        } else if (typeof timestamp === "string") {
            return inWords($.timeago.parse(timestamp));
        } else if (typeof timestamp === "number") {
            return inWords(new Date(timestamp));
        } else {
            return inWords($.timeago.datetime(timestamp));
        }
    };
    var $t = $.timeago;
    $.extend($.timeago, {
        settings: {
            refreshMillis: 60000,
            allowFuture: false,
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "ago",
                suffixFromNow: "from now",
                seconds: "less than a minute",
                minute: "about a minute",
                minutes: "%d minutes",
                hour: "about an hour",
                hours: "about %d hours",
                day: "a day",
                days: "%d days",
                month: "about a month",
                months: "%d months",
                year: "about a year",
                years: "%d years",
                wordSeparator: " ",
                numbers: []
            },
            translator: null
        },
        inWords: function(distanceMillis) {
            var $l = this.settings.strings;
            var prefix = $l.prefixAgo;
            var suffix = $l.suffixAgo;
            if (this.settings.allowFuture) {
                if (distanceMillis < 0) {
                    prefix = $l.prefixFromNow;
                    suffix = $l.suffixFromNow;
                }
            }
            var seconds = Math.abs(distanceMillis) / 1000;
            var minutes = seconds / 60;
            var hours = minutes / 60;
            var days = hours / 24;
            var years = days / 365;

            function convert(stringOrFunction, number) {
                var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
                return {
                    'string': string,
                    'value': ($l.numbers && $l.numbers[number]) || number
                };
            }
            var stringAndNumber = seconds < 45 && convert($l.seconds, Math.round(seconds)) || seconds < 90 && convert($l.minute, 1) || minutes < 45 && convert($l.minutes, Math.round(minutes)) || minutes < 90 && convert($l.hour, 1) || hours < 24 && convert($l.hours, Math.round(hours)) || hours < 42 && convert($l.day, 1) || days < 30 && convert($l.days, Math.round(days)) || days < 45 && convert($l.month, 1) || days < 365 && convert($l.months, Math.round(days / 30)) || years < 1.5 && convert($l.year, 1) || convert($l.years, Math.round(years));
            var string = stringAndNumber.string;
            var value = stringAndNumber.value;
            var separator = $l.wordSeparator === undefined ? " " : $l.wordSeparator;
            var fullString = $.trim([prefix, string, suffix].join(separator));
            var translatedString = $t.settings.translator ? $t.settings.translator(fullString) : fullString;
            return translatedString.replace(/%d/i, value);
        },
        parse: function(iso8601) {
            var s = $.trim(iso8601);
            s = s.replace(/\.\d\d\d+/, "");
            s = s.replace(/-/, "/").replace(/-/, "/");
            s = s.replace(/T/, " ").replace(/Z/, " UTC");
            s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
            return new Date(s);
        },
        datetime: function(elem) {
            var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
            return $t.parse(iso8601);
        },
        isTime: function(elem) {
            return $(elem).get(0).tagName.toLowerCase() === "time";
        }
    });
    $.fn.timeago = function() {
        var self = this;
        self.each(refresh);
        var $s = $t.settings;
        if ($s.refreshMillis > 0) {
            setInterval(function() {
                self.each(refresh);
            }, $s.refreshMillis);
        }
        return self;
    };

    function refresh() {
        var data = prepareData(this);
        if (!isNaN(data.datetime)) {
            $(this).text(inWords(data.datetime));
        }
        return this;
    }

    function prepareData(element) {
        element = $(element);
        if (!element.data("timeago")) {
            element.data("timeago", {
                datetime: $t.datetime(element)
            });
            var text = $.trim(element.text());
            if (text.length > 0 && !($t.isTime(element) && element.attr("title"))) {
                element.attr("title", text);
            }
        }
        return element.data("timeago");
    }

    function inWords(date) {
        return $t.inWords(distance(date));
    }

    function distance(date) {
        return (new Date().getTime() - date.getTime());
    }
    document.createElement("abbr");
    document.createElement("time");
}(jQuery));;

/* /web/static/lib/jquery.form/jquery.form.js defined in bundle 'web.assets_common' */
;
(function($) {
    $.fn.ajaxSubmit = function(options) {
        if (!this.length) {
            log('ajaxSubmit: skipping submit process - no element selected');
            return this;
        }
        var method, action, url, $form = this;
        if (typeof options == 'function') {
            options = {
                success: options
            };
        }
        method = this.attr('method');
        action = this.attr('action');
        url = (typeof action === 'string') ? $.trim(action) : '';
        url = url || window.location.href || '';
        if (url) {
            url = (url.match(/^([^#]+)/) || [])[1];
        }
        options = $.extend(true, {
            url: url,
            success: $.ajaxSettings.success,
            type: method || 'GET',
            iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
        }, options);
        var veto = {};
        this.trigger('form-pre-serialize', [this, options, veto]);
        if (veto.veto) {
            log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
            return this;
        }
        if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
            log('ajaxSubmit: submit aborted via beforeSerialize callback');
            return this;
        }
        var n, v, a = this.formToArray(options.semantic);
        if (options.data) {
            options.extraData = options.data;
            for (n in options.data) {
                if (options.data[n] instanceof Array) {
                    for (var k in options.data[n]) {
                        a.push({
                            name: n,
                            value: options.data[n][k]
                        });
                    }
                } else {
                    v = options.data[n];
                    v = $.isFunction(v) ? v() : v;
                    a.push({
                        name: n,
                        value: v
                    });
                }
            }
        }
        if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
            log('ajaxSubmit: submit aborted via beforeSubmit callback');
            return this;
        }
        this.trigger('form-submit-validate', [a, this, options, veto]);
        if (veto.veto) {
            log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
            return this;
        }
        var q = $.param(a);
        if (options.type.toUpperCase() == 'GET') {
            options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
            options.data = null;
        } else {
            options.data = q;
        }
        var callbacks = [];
        if (options.resetForm) {
            callbacks.push(function() {
                $form.resetForm();
            });
        }
        if (options.clearForm) {
            callbacks.push(function() {
                $form.clearForm();
            });
        }
        if (!options.dataType && options.target) {
            var oldSuccess = options.success || function() {};
            callbacks.push(function(data) {
                var fn = options.replaceTarget ? 'replaceWith' : 'html';
                $(options.target)[fn](data).each(oldSuccess, arguments);
            });
        } else if (options.success) {
            callbacks.push(options.success);
        }
        options.success = function(data, status, xhr) {
            var context = options.context || options;
            for (var i = 0, max = callbacks.length; i < max; i++) {
                callbacks[i].apply(context, [data, status, xhr || $form, $form]);
            }
        };
        var fileInputs = $('input:file', this).length > 0;
        var mp = 'multipart/form-data';
        var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);
        if (options.iframe !== false && (fileInputs || options.iframe || multipart)) {
            if (options.closeKeepAlive) {
                $.get(options.closeKeepAlive, function() {
                    fileUpload(a);
                });
            } else {
                fileUpload(a);
            }
        } else {
            if ($.browser.msie && method == 'get') {
                var ieMeth = $form[0].getAttribute('method');
                if (typeof ieMeth === 'string')
                    options.type = ieMeth;
            }
            $.ajax(options);
        }
        this.trigger('form-submit-notify', [this, options]);
        return this;

        function fileUpload(a) {
            var form = $form[0],
                el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
            var useProp = !!$.fn.prop;
            if (a) {
                for (i = 0; i < a.length; i++) {
                    el = $(form[a[i].name]);
                    el[useProp ? 'prop' : 'attr']('disabled', false);
                }
            }
            if ($(':input[name=submit],:input[id=submit]', form).length) {
                alert('Error: Form elements must not have name or id of "submit".');
                return;
            }
            s = $.extend(true, {}, $.ajaxSettings, options);
            s.context = s.context || s;
            id = 'jqFormIO' + (new Date().getTime());
            if (s.iframeTarget) {
                $io = $(s.iframeTarget);
                n = $io.attr('name');
                if (n == null)
                    $io.attr('name', id);
                else
                    id = n;
            } else {
                $io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />');
                $io.css({
                    position: 'absolute',
                    top: '-1000px',
                    left: '-1000px'
                });
            }
            io = $io[0];
            xhr = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: 'n/a',
                getAllResponseHeaders: function() {},
                getResponseHeader: function() {},
                setRequestHeader: function() {},
                abort: function(status) {
                    var e = (status === 'timeout' ? 'timeout' : 'aborted');
                    log('aborting upload... ' + e);
                    this.aborted = 1;
                    $io.attr('src', s.iframeSrc);
                    xhr.error = e;
                    s.error && s.error.call(s.context, xhr, e, status);
                    g && $.event.trigger("ajaxError", [xhr, s, e]);
                    s.complete && s.complete.call(s.context, xhr, e);
                }
            };
            g = s.global;
            if (g && !$.active++) {
                $.event.trigger("ajaxStart");
            }
            if (g) {
                $.event.trigger("ajaxSend", [xhr, s]);
            }
            if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
                if (s.global) {
                    $.active--;
                }
                return;
            }
            if (xhr.aborted) {
                return;
            }
            sub = form.clk;
            if (sub) {
                n = sub.name;
                if (n && !sub.disabled) {
                    s.extraData = s.extraData || {};
                    s.extraData[n] = sub.value;
                    if (sub.type == "image") {
                        s.extraData[n + '.x'] = form.clk_x;
                        s.extraData[n + '.y'] = form.clk_y;
                    }
                }
            }
            var CLIENT_TIMEOUT_ABORT = 1;
            var SERVER_ABORT = 2;

            function getDoc(frame) {
                var doc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument ? frame.contentDocument : frame.document;
                return doc;
            }

            function doSubmit() {
                var t = $form.attr('target'),
                    a = $form.attr('action');
                form.setAttribute('target', id);
                if (!method) {
                    form.setAttribute('method', 'POST');
                }
                if (a != s.url) {
                    form.setAttribute('action', s.url);
                }
                if (!s.skipEncodingOverride && (!method || /post/i.test(method))) {
                    $form.attr({
                        encoding: 'multipart/form-data',
                        enctype: 'multipart/form-data'
                    });
                }
                if (s.timeout) {
                    timeoutHandle = setTimeout(function() {
                        timedOut = true;
                        cb(CLIENT_TIMEOUT_ABORT);
                    }, s.timeout);
                }

                function checkState() {
                    try {
                        var state = getDoc(io).readyState;
                        log('state = ' + state);
                        if (state.toLowerCase() == 'uninitialized')
                            setTimeout(checkState, 50);
                    } catch (e) {
                        log('Server abort: ', e, ' (', e.name, ')');
                        cb(SERVER_ABORT);
                        timeoutHandle && clearTimeout(timeoutHandle);
                        timeoutHandle = undefined;
                    }
                }
                var extraInputs = [];
                try {
                    if (s.extraData) {
                        for (var n in s.extraData) {
                            extraInputs.push($('<input type="hidden" name="' + n + '" />').attr('value', s.extraData[n]).appendTo(form)[0]);
                        }
                    }
                    if (!s.iframeTarget) {
                        $io.appendTo('body');
                        io.attachEvent ? io.attachEvent('onload', cb) : io.addEventListener('load', cb, false);
                    }
                    setTimeout(checkState, 15);
                    form.submit();
                } finally {
                    form.setAttribute('action', a);
                    if (t) {
                        form.setAttribute('target', t);
                    } else {
                        $form.removeAttr('target');
                    }
                    $(extraInputs).remove();
                }
            }
            if (s.forceSync) {
                doSubmit();
            } else {
                setTimeout(doSubmit, 10);
            }
            var data, doc, domCheckCount = 50,
                callbackProcessed;

            function cb(e) {
                if (xhr.aborted || callbackProcessed) {
                    return;
                }
                try {
                    doc = getDoc(io);
                } catch (ex) {
                    log('cannot access response document: ', ex);
                    e = SERVER_ABORT;
                }
                if (e === CLIENT_TIMEOUT_ABORT && xhr) {
                    xhr.abort('timeout');
                    return;
                } else if (e == SERVER_ABORT && xhr) {
                    xhr.abort('server abort');
                    return;
                }
                if (!doc || doc.location.href == s.iframeSrc) {
                    if (!timedOut)
                        return;
                }
                io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);
                var status = 'success',
                    errMsg;
                try {
                    if (timedOut) {
                        throw 'timeout';
                    }
                    var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
                    log('isXml=' + isXml);
                    if (!isXml && window.opera && (doc.body == null || doc.body.innerHTML == '')) {
                        if (--domCheckCount) {
                            log('requeing onLoad callback, DOM not available');
                            setTimeout(cb, 250);
                            return;
                        }
                    }
                    var docRoot = doc.body ? doc.body : doc.documentElement;
                    xhr.responseText = docRoot ? docRoot.innerHTML : null;
                    xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                    if (isXml)
                        s.dataType = 'xml';
                    xhr.getResponseHeader = function(header) {
                        var headers = {
                            'content-type': s.dataType
                        };
                        return headers[header];
                    };
                    if (docRoot) {
                        xhr.status = Number(docRoot.getAttribute('status')) || xhr.status;
                        xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
                    }
                    var dt = s.dataType || '';
                    var scr = /(json|script|text)/.test(dt.toLowerCase());
                    if (scr || s.textarea) {
                        var ta = doc.getElementsByTagName('textarea')[0];
                        if (ta) {
                            xhr.responseText = ta.value;
                            xhr.status = Number(ta.getAttribute('status')) || xhr.status;
                            xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
                        } else if (scr) {
                            var pre = doc.getElementsByTagName('pre')[0];
                            var b = doc.getElementsByTagName('body')[0];
                            if (pre) {
                                xhr.responseText = pre.textContent ? pre.textContent : pre.innerHTML;
                            } else if (b) {
                                xhr.responseText = b.innerHTML;
                            }
                        }
                    } else if (s.dataType == 'xml' && !xhr.responseXML && xhr.responseText != null) {
                        xhr.responseXML = toXml(xhr.responseText);
                    }
                    try {
                        data = httpData(xhr, s.dataType, s);
                    } catch (e) {
                        status = 'parsererror';
                        xhr.error = errMsg = (e || status);
                    }
                } catch (e) {
                    log('error caught: ', e);
                    status = 'error';
                    xhr.error = errMsg = (e || status);
                }
                if (xhr.aborted) {
                    log('upload aborted');
                    status = null;
                }
                if (xhr.status) {
                    status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
                }
                if (status === 'success') {
                    s.success && s.success.call(s.context, data, 'success', xhr);
                    g && $.event.trigger("ajaxSuccess", [xhr, s]);
                } else if (status) {
                    if (errMsg == undefined)
                        errMsg = xhr.statusText;
                    s.error && s.error.call(s.context, xhr, status, errMsg);
                    g && $.event.trigger("ajaxError", [xhr, s, errMsg]);
                }
                g && $.event.trigger("ajaxComplete", [xhr, s]);
                if (g && !--$.active) {
                    $.event.trigger("ajaxStop");
                }
                s.complete && s.complete.call(s.context, xhr, status);
                callbackProcessed = true;
                if (s.timeout)
                    clearTimeout(timeoutHandle);
                setTimeout(function() {
                    if (!s.iframeTarget)
                        $io.remove();
                    xhr.responseXML = null;
                }, 100);
            }
            var toXml = $.parseXML || function(s, doc) {
                if (window.ActiveXObject) {
                    doc = new ActiveXObject('Microsoft.XMLDOM');
                    doc.async = 'false';
                    doc.loadXML(s);
                } else {
                    doc = (new DOMParser()).parseFromString(s, 'text/xml');
                }
                return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
            };
            var parseJSON = $.parseJSON || function(s) {
                return window['eval']('(' + s + ')');
            };
            var httpData = function(xhr, type, s) {
                var ct = xhr.getResponseHeader('content-type') || '',
                    xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
                    data = xml ? xhr.responseXML : xhr.responseText;
                if (xml && data.documentElement.nodeName === 'parsererror') {
                    $.error && $.error('parsererror');
                }
                if (s && s.dataFilter) {
                    data = s.dataFilter(data, type);
                }
                if (typeof data === 'string') {
                    if (type === 'json' || !type && ct.indexOf('json') >= 0) {
                        data = parseJSON(data);
                    } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                        $.globalEval(data);
                    }
                }
                return data;
            };
        }
    };
    $.fn.ajaxForm = function(options) {
        if (this.length === 0) {
            var o = {
                s: this.selector,
                c: this.context
            };
            if (!$.isReady && o.s) {
                log('DOM not ready, queuing ajaxForm');
                $(function() {
                    $(o.s, o.c).ajaxForm(options);
                });
                return this;
            }
            log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
            return this;
        }
        return this.ajaxFormUnbind().bind('submit.form-plugin', function(e) {
            if (!e.isDefaultPrevented()) {
                e.preventDefault();
                $(this).ajaxSubmit(options);
            }
        }).bind('click.form-plugin', function(e) {
            var target = e.target;
            var $el = $(target);
            if (!($el.is(":submit,input:image"))) {
                var t = $el.closest(':submit');
                if (t.length == 0) {
                    return;
                }
                target = t[0];
            }
            var form = this;
            form.clk = target;
            if (target.type == 'image') {
                if (e.offsetX != undefined) {
                    form.clk_x = e.offsetX;
                    form.clk_y = e.offsetY;
                } else if (typeof $.fn.offset == 'function') {
                    var offset = $el.offset();
                    form.clk_x = e.pageX - offset.left;
                    form.clk_y = e.pageY - offset.top;
                } else {
                    form.clk_x = e.pageX - target.offsetLeft;
                    form.clk_y = e.pageY - target.offsetTop;
                }
            }
            setTimeout(function() {
                form.clk = form.clk_x = form.clk_y = null;
            }, 100);
        });
    };
    $.fn.ajaxFormUnbind = function() {
        return this.unbind('submit.form-plugin click.form-plugin');
    };
    $.fn.formToArray = function(semantic) {
        var a = [];
        if (this.length === 0) {
            return a;
        }
        var form = this[0];
        var els = semantic ? form.getElementsByTagName('*') : form.elements;
        if (!els) {
            return a;
        }
        var i, j, n, v, el, max, jmax;
        for (i = 0, max = els.length; i < max; i++) {
            el = els[i];
            n = el.name;
            if (!n) {
                continue;
            }
            if (semantic && form.clk && el.type == "image") {
                if (!el.disabled && form.clk == el) {
                    a.push({
                        name: n,
                        value: $(el).val()
                    });
                    a.push({
                        name: n + '.x',
                        value: form.clk_x
                    }, {
                        name: n + '.y',
                        value: form.clk_y
                    });
                }
                continue;
            }
            v = $.fieldValue(el, true);
            if (v && v.constructor == Array) {
                for (j = 0, jmax = v.length; j < jmax; j++) {
                    a.push({
                        name: n,
                        value: v[j]
                    });
                }
            } else if (v !== null && typeof v != 'undefined') {
                a.push({
                    name: n,
                    value: v
                });
            }
        }
        if (!semantic && form.clk) {
            var $input = $(form.clk),
                input = $input[0];
            n = input.name;
            if (n && !input.disabled && input.type == 'image') {
                a.push({
                    name: n,
                    value: $input.val()
                });
                a.push({
                    name: n + '.x',
                    value: form.clk_x
                }, {
                    name: n + '.y',
                    value: form.clk_y
                });
            }
        }
        return a;
    };
    $.fn.formSerialize = function(semantic) {
        return $.param(this.formToArray(semantic));
    };
    $.fn.fieldSerialize = function(successful) {
        var a = [];
        this.each(function() {
            var n = this.name;
            if (!n) {
                return;
            }
            var v = $.fieldValue(this, successful);
            if (v && v.constructor == Array) {
                for (var i = 0, max = v.length; i < max; i++) {
                    a.push({
                        name: n,
                        value: v[i]
                    });
                }
            } else if (v !== null && typeof v != 'undefined') {
                a.push({
                    name: this.name,
                    value: v
                });
            }
        });
        return $.param(a);
    };
    $.fn.fieldValue = function(successful) {
        for (var val = [], i = 0, max = this.length; i < max; i++) {
            var el = this[i];
            var v = $.fieldValue(el, successful);
            if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
                continue;
            }
            v.constructor == Array ? $.merge(val, v) : val.push(v);
        }
        return val;
    };
    $.fieldValue = function(el, successful) {
        var n = el.name,
            t = el.type,
            tag = el.tagName.toLowerCase();
        if (successful === undefined) {
            successful = true;
        }
        if (successful && (!n || el.disabled || t == 'reset' || t == 'button' || (t == 'checkbox' || t == 'radio') && !el.checked || (t == 'submit' || t == 'image') && el.form && el.form.clk != el || tag == 'select' && el.selectedIndex == -1)) {
            return null;
        }
        if (tag == 'select') {
            var index = el.selectedIndex;
            if (index < 0) {
                return null;
            }
            var a = [],
                ops = el.options;
            var one = (t == 'select-one');
            var max = (one ? index + 1 : ops.length);
            for (var i = (one ? index : 0); i < max; i++) {
                var op = ops[i];
                if (op.selected) {
                    var v = op.value;
                    if (!v) {
                        v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
                    }
                    if (one) {
                        return v;
                    }
                    a.push(v);
                }
            }
            return a;
        }
        return $(el).val();
    };
    $.fn.clearForm = function() {
        return this.each(function() {
            $('input,select,textarea', this).clearFields();
        });
    };
    $.fn.clearFields = $.fn.clearInputs = function() {
        var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var t = this.type,
                tag = this.tagName.toLowerCase();
            if (re.test(t) || tag == 'textarea') {
                this.value = '';
            } else if (t == 'checkbox' || t == 'radio') {
                this.checked = false;
            } else if (tag == 'select') {
                this.selectedIndex = -1;
            }
        });
    };
    $.fn.resetForm = function() {
        return this.each(function() {
            if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
                this.reset();
            }
        });
    };
    $.fn.enable = function(b) {
        if (b === undefined) {
            b = true;
        }
        return this.each(function() {
            this.disabled = !b;
        });
    };
    $.fn.selected = function(select) {
        if (select === undefined) {
            select = true;
        }
        return this.each(function() {
            var t = this.type;
            if (t == 'checkbox' || t == 'radio') {
                this.checked = select;
            } else if (this.tagName.toLowerCase() == 'option') {
                var $sel = $(this).parent('select');
                if (select && $sel[0] && $sel[0].type == 'select-one') {
                    $sel.find('option').selected(false);
                }
                this.selected = select;
            }
        });
    };

    function log() {
        var msg = '[jquery.form] ' + Array.prototype.join.call(arguments, '');
        if (window.console && window.console.log) {
            window.console.log(msg);
        } else if (window.opera && window.opera.postError) {
            window.opera.postError(msg);
        }
    };
})(jQuery);;

/* /web/static/lib/jquery.ba-bbq/jquery.ba-bbq.js defined in bundle 'web.assets_common' */
(function($, window) {
    '$:nomunge';
    var undefined, aps = Array.prototype.slice,
        decode = decodeURIComponent,
        jq_param = $.param,
        jq_param_fragment, jq_deparam, jq_deparam_fragment, jq_bbq = $.bbq = $.bbq || {},
        jq_bbq_pushState, jq_bbq_getState, jq_elemUrlAttr, jq_event_special = $.event.special,
        str_hashchange = 'hashchange',
        str_querystring = 'querystring',
        str_fragment = 'fragment',
        str_elemUrlAttr = 'elemUrlAttr',
        str_location = 'location',
        str_href = 'href',
        str_src = 'src',
        re_trim_querystring = /^.*\?|#.*$/g,
        re_trim_fragment = /^.*\#/,
        re_no_escape, elemUrlAttr_cache = {};

    function is_string(arg) {
        return typeof arg === 'string';
    };

    function curry(func) {
        var args = aps.call(arguments, 1);
        return function() {
            return func.apply(this, args.concat(aps.call(arguments)));
        };
    };

    function get_fragment(url) {
        return url.replace(/^[^#]*#?(.*)$/, '$1');
    };

    function get_querystring(url) {
        return url.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, '$1');
    };

    function jq_param_sub(is_fragment, get_func, url, params, merge_mode) {
        var result, qs, matches, url_params, hash;
        if (params !== undefined) {
            matches = url.match(is_fragment ? /^([^#]*)\#?(.*)$/ : /^([^#?]*)\??([^#]*)(#?.*)/);
            hash = matches[3] || '';
            if (merge_mode === 2 && is_string(params)) {
                qs = params.replace(is_fragment ? re_trim_fragment : re_trim_querystring, '');
            } else {
                url_params = jq_deparam(matches[2]);
                params = is_string(params) ? jq_deparam[is_fragment ? str_fragment : str_querystring](params) : params;
                qs = merge_mode === 2 ? params : merge_mode === 1 ? $.extend({}, params, url_params) : $.extend({}, url_params, params);
                qs = jq_param(qs);
                if (is_fragment) {
                    qs = qs.replace(re_no_escape, decode);
                }
            }
            result = matches[1] + (is_fragment ? '#' : qs || !matches[1] ? '?' : '') + qs + hash;
        } else {
            result = get_func(url !== undefined ? url : window[str_location][str_href]);
        }
        return result;
    };
    jq_param[str_querystring] = curry(jq_param_sub, 0, get_querystring);
    jq_param[str_fragment] = jq_param_fragment = curry(jq_param_sub, 1, get_fragment);
    jq_param_fragment.noEscape = function(chars) {
        chars = chars || '';
        var arr = $.map(chars.split(''), encodeURIComponent);
        re_no_escape = new RegExp(arr.join('|'), 'g');
    };
    jq_param_fragment.noEscape(',/');
    $.deparam = jq_deparam = function(params, coerce) {
        var obj = {},
            coerce_types = {
                'true': !0,
                'false': !1,
                'null': null
            };
        $.each(params.replace(/\+/g, ' ').split('&'), function(j, v) {
            var param = v.split('='),
                key = decode(param[0]),
                val, cur = obj,
                i = 0,
                keys = key.split(']['),
                keys_last = keys.length - 1;
            if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
                keys[keys_last] = keys[keys_last].replace(/\]$/, '');
                keys = keys.shift().split('[').concat(keys);
                keys_last = keys.length - 1;
            } else {
                keys_last = 0;
            }
            if (param.length === 2) {
                val = decode(param[1]);
                if (coerce) {
                    val = val && !isNaN(val) ? +val : val === 'undefined' ? undefined : coerce_types[val] !== undefined ? coerce_types[val] : val;
                }
                if (keys_last) {
                    for (; i <= keys_last; i++) {
                        key = keys[i] === '' ? cur.length : keys[i];
                        cur = cur[key] = i < keys_last ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : []) : val;
                    }
                } else {
                    if ($.isArray(obj[key])) {
                        obj[key].push(val);
                    } else if (obj[key] !== undefined) {
                        obj[key] = [obj[key], val];
                    } else {
                        obj[key] = val;
                    }
                }
            } else if (key) {
                obj[key] = coerce ? undefined : '';
            }
        });
        return obj;
    };

    function jq_deparam_sub(is_fragment, url_or_params, coerce) {
        if (url_or_params === undefined || typeof url_or_params === 'boolean') {
            coerce = url_or_params;
            url_or_params = jq_param[is_fragment ? str_fragment : str_querystring]();
        } else {
            url_or_params = is_string(url_or_params) ? url_or_params.replace(is_fragment ? re_trim_fragment : re_trim_querystring, '') : url_or_params;
        }
        return jq_deparam(url_or_params, coerce);
    };
    jq_deparam[str_querystring] = curry(jq_deparam_sub, 0);
    jq_deparam[str_fragment] = jq_deparam_fragment = curry(jq_deparam_sub, 1);
    $[str_elemUrlAttr] || ($[str_elemUrlAttr] = function(obj) {
        return $.extend(elemUrlAttr_cache, obj);
    })({
        a: str_href,
        base: str_href,
        iframe: str_src,
        img: str_src,
        input: str_src,
        form: 'action',
        link: str_href,
        script: str_src
    });
    jq_elemUrlAttr = $[str_elemUrlAttr];

    function jq_fn_sub(mode, force_attr, params, merge_mode) {
        if (!is_string(params) && typeof params !== 'object') {
            merge_mode = params;
            params = force_attr;
            force_attr = undefined;
        }
        return this.each(function() {
            var that = $(this),
                attr = force_attr || jq_elemUrlAttr()[(this.nodeName || '').toLowerCase()] || '',
                url = attr && that.attr(attr) || '';
            that.attr(attr, jq_param[mode](url, params, merge_mode));
        });
    };
    $.fn[str_querystring] = curry(jq_fn_sub, str_querystring);
    $.fn[str_fragment] = curry(jq_fn_sub, str_fragment);
    jq_bbq.pushState = jq_bbq_pushState = function(params, merge_mode) {
        if (is_string(params) && /^#/.test(params) && merge_mode === undefined) {
            merge_mode = 2;
        }
        var has_args = params !== undefined,
            url = jq_param_fragment(window[str_location][str_href], has_args ? params : {}, has_args ? merge_mode : 2);
        window[str_location][str_href] = url + (/#/.test(url) ? '' : '#');
    };
    jq_bbq.getState = jq_bbq_getState = function(key, coerce) {
        return key === undefined || typeof key === 'boolean' ? jq_deparam_fragment(key) : jq_deparam_fragment(coerce)[key];
    };
    jq_bbq.removeState = function(arr) {
        var state = {};
        if (arr !== undefined) {
            state = jq_bbq_getState();
            $.each($.isArray(arr) ? arr : arguments, function(i, v) {
                delete state[v];
            });
        }
        jq_bbq_pushState(state, 2);
    };
    jq_event_special[str_hashchange] = $.extend(jq_event_special[str_hashchange], {
        add: function(handleObj) {
            var old_handler;

            function new_handler(e) {
                var hash = e[str_fragment] = jq_param_fragment();
                e.getState = function(key, coerce) {
                    return key === undefined || typeof key === 'boolean' ? jq_deparam(hash, key) : jq_deparam(hash, coerce)[key];
                };
                old_handler.apply(this, arguments);
            };
            if ($.isFunction(handleObj)) {
                old_handler = handleObj;
                return new_handler;
            } else {
                old_handler = handleObj.handler;
                handleObj.handler = new_handler;
            }
        }
    });
})(jQuery, this);
(function($, window, undefined) {
    '$:nomunge';
    var fake_onhashchange, jq_event_special = $.event.special,
        str_location = 'location',
        str_hashchange = 'hashchange',
        str_href = 'href',
        browser = $.browser,
        mode = document.documentMode,
        is_old_ie = browser.msie && (mode === undefined || mode < 8),
        supports_onhashchange = 'on' + str_hashchange in window && !is_old_ie;

    function get_fragment(url) {
        url = url || window[str_location][str_href];
        return url.replace(/^[^#]*#?(.*)$/, '$1');
    };
    $[str_hashchange + 'Delay'] = 100;
    jq_event_special[str_hashchange] = $.extend(jq_event_special[str_hashchange], {
        setup: function() {
            if (supports_onhashchange) {
                return false;
            }
            $(fake_onhashchange.start);
        },
        teardown: function() {
            if (supports_onhashchange) {
                return false;
            }
            $(fake_onhashchange.stop);
        }
    });
    fake_onhashchange = (function() {
        var self = {},
            timeout_id, iframe, set_history, get_history;

        function init() {
            set_history = get_history = function(val) {
                return val;
            };
            if (is_old_ie) {
                iframe = $('<iframe src="javascript:0"/>').hide().insertAfter('body')[0].contentWindow;
                get_history = function() {
                    return get_fragment(iframe.document[str_location][str_href]);
                };
                set_history = function(hash, history_hash) {
                    if (hash !== history_hash) {
                        var doc = iframe.document;
                        doc.open().close();
                        doc[str_location].hash = '#' + hash;
                    }
                };
                set_history(get_fragment());
            }
        };
        self.start = function() {
            if (timeout_id) {
                return;
            }
            var last_hash = get_fragment();
            set_history || init();
            (function loopy() {
                var hash = get_fragment(),
                    history_hash = get_history(last_hash);
                if (hash !== last_hash) {
                    set_history(last_hash = hash, history_hash);
                    $(window).trigger(str_hashchange);
                } else if (history_hash !== last_hash) {
                    window[str_location][str_href] = window[str_location][str_href].replace(/#.*/, '') + '#' + history_hash;
                }
                timeout_id = setTimeout(loopy, $[str_hashchange + 'Delay']);
            })();
        };
        self.stop = function() {
            if (!iframe) {
                timeout_id && clearTimeout(timeout_id);
                timeout_id = 0;
            }
        };
        return self;
    })();
})(jQuery, this);;

/* /web/static/lib/qweb/qweb2.js defined in bundle 'web.assets_common' */
var QWeb2 = {
    expressions_cache: {},
    RESERVED_WORDS: 'true,false,NaN,null,undefined,debugger,console,window,in,instanceof,new,function,return,this,typeof,eval,void,Math,RegExp,Array,Object,Date'.split(','),
    ACTIONS_PRECEDENCE: 'foreach,if,call,set,esc,raw,js,debug,log'.split(','),
    WORD_REPLACEMENT: {
        'and': '&&',
        'or': '||',
        'gt': '>',
        'gte': '>=',
        'lt': '<',
        'lte': '<='
    },
    VOID_ELEMENTS: 'area,base,br,col,embed,hr,img,input,keygen,link,menuitem,meta,param,source,track,wbr'.split(','),
    tools: {
        exception: function(message, context) {
            context = context || {};
            var prefix = 'QWeb2';
            if (context.template) {
                prefix += " - template['" + context.template + "']";
            }
            throw new Error(prefix + ": " + message);
        },
        warning: function(message) {
            if (typeof(window) !== 'undefined' && window.console) {
                window.console.warn(message);
            }
        },
        trim: function(s, mode) {
            switch (mode) {
                case "left":
                    return s.replace(/^\s*/, "");
                case "right":
                    return s.replace(/\s*$/, "");
                default:
                    return s.replace(/^\s*|\s*$/g, "");
            }
        },
        js_escape: function(s, noquotes) {
            return (noquotes ? '' : "'") + s.replace(/\r?\n/g, "\\n").replace(/'/g, "\\'") + (noquotes ? '' : "'");
        },
        html_escape: function(s, attribute) {
            if (s == null) {
                return '';
            }
            s = String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            if (attribute) {
                s = s.replace(/"/g, '&quot;');
            }
            return s;
        },
        gen_attribute: function(o) {
            if (o !== null && o !== undefined) {
                if (o.constructor === Array) {
                    if (o[1] !== null && o[1] !== undefined) {
                        return this.format_attribute(o[0], o[1]);
                    }
                } else if (typeof o === 'object') {
                    var r = '';
                    for (var k in o) {
                        if (o.hasOwnProperty(k)) {
                            r += this.gen_attribute([k, o[k]]);
                        }
                    }
                    return r;
                }
            }
            return '';
        },
        format_attribute: function(name, value) {
            return ' ' + name + '="' + this.html_escape(value, true) + '"';
        },
        extend: function(dst, src, exclude) {
            for (var p in src) {
                if (src.hasOwnProperty(p) && !(exclude && this.arrayIndexOf(exclude, p) !== -1)) {
                    dst[p] = src[p];
                }
            }
            return dst;
        },
        arrayIndexOf: function(array, item) {
            for (var i = 0, ilen = array.length; i < ilen; i++) {
                if (array[i] === item) {
                    return i;
                }
            }
            return -1;
        },
        xml_node_to_string: function(node, childs_only) {
            if (childs_only) {
                var childs = node.childNodes,
                    r = [];
                for (var i = 0, ilen = childs.length; i < ilen; i++) {
                    r.push(this.xml_node_to_string(childs[i]));
                }
                return r.join('');
            } else {
                if (typeof XMLSerializer !== 'undefined') {
                    return (new XMLSerializer()).serializeToString(node);
                } else {
                    switch (node.nodeType) {
                        case 1:
                            return node.outerHTML;
                        case 3:
                            return node.data;
                        case 4:
                            return '<![CDATA[' + node.data + ']]>';
                        case 8:
                            return '<!-- ' + node.data + '-->';
                    }
                    throw new Error('Unknown node type ' + node.nodeType);
                }
            }
        },
        call: function(context, template, old_dict, _import, callback) {
            var new_dict = this.extend({}, old_dict);
            new_dict['__caller__'] = old_dict['__template__'];
            if (callback) {
                new_dict[0] = callback(context, new_dict);
            }
            return context.engine._render(template, new_dict);
        },
        foreach: function(context, enu, as, old_dict, callback) {
            if (enu != null) {
                var index, jlen, cur;
                var size, new_dict = this.extend({}, old_dict);
                new_dict[as + "_all"] = enu;
                var as_value = as + "_value",
                    as_index = as + "_index",
                    as_first = as + "_first",
                    as_last = as + "_last",
                    as_parity = as + "_parity";
                if (size = enu.length) {
                    new_dict[as + "_size"] = size;
                    for (index = 0, jlen = enu.length; index < jlen; index++) {
                        cur = enu[index];
                        new_dict[as_value] = cur;
                        new_dict[as_index] = index;
                        new_dict[as_first] = index === 0;
                        new_dict[as_last] = index + 1 === size;
                        new_dict[as_parity] = (index % 2 == 1 ? 'odd' : 'even');
                        if (cur.constructor === Object) {
                            this.extend(new_dict, cur);
                        }
                        new_dict[as] = cur;
                        callback(context, new_dict);
                    }
                } else if (enu.constructor == Number) {
                    var _enu = [];
                    for (var i = 0; i < enu; i++) {
                        _enu.push(i);
                    }
                    this.foreach(context, _enu, as, old_dict, callback);
                } else {
                    index = 0;
                    for (var k in enu) {
                        if (enu.hasOwnProperty(k)) {
                            cur = enu[k];
                            new_dict[as_value] = cur;
                            new_dict[as_index] = index;
                            new_dict[as_first] = index === 0;
                            new_dict[as_parity] = (index % 2 == 1 ? 'odd' : 'even');
                            new_dict[as] = k;
                            callback(context, new_dict);
                            index += 1;
                        }
                    }
                }
                _.each(Object.keys(old_dict), function(z) {
                    old_dict[z] = new_dict[z];
                });
            } else {
                this.exception("No enumerator given to foreach", context);
            }
        }
    }
};
QWeb2.Engine = (function() {
    function Engine() {
        this.prefix = 't';
        this.debug = false;
        this.templates_resources = [];
        this.templates = {};
        this.compiled_templates = {};
        this.extend_templates = {};
        this.default_dict = {};
        this.tools = QWeb2.tools;
        this.jQuery = window.jQuery;
        this.reserved_words = QWeb2.RESERVED_WORDS.slice(0);
        this.actions_precedence = QWeb2.ACTIONS_PRECEDENCE.slice(0);
        this.void_elements = QWeb2.VOID_ELEMENTS.slice(0);
        this.word_replacement = QWeb2.tools.extend({}, QWeb2.WORD_REPLACEMENT);
        this.preprocess_node = null;
        for (var i = 0; i < arguments.length; i++) {
            this.add_template(arguments[i]);
        }
    }
    QWeb2.tools.extend(Engine.prototype, {
        add_template: function(template, callback) {
            var self = this;
            this.templates_resources.push(template);
            if (template.constructor === String) {
                return this.load_xml(template, function(err, xDoc) {
                    if (err) {
                        if (callback) {
                            return callback(err);
                        } else {
                            throw err;
                        }
                    }
                    self.add_template(xDoc, callback);
                });
            }
            var ec = (template.documentElement && template.documentElement.childNodes) || template.childNodes || [];
            for (var i = 0; i < ec.length; i++) {
                var node = ec[i];
                if (node.nodeType === 1) {
                    if (node.nodeName == 'parsererror') {
                        return this.tools.exception(node.innerText);
                    }
                    var name = node.getAttribute(this.prefix + '-name');
                    var extend = node.getAttribute(this.prefix + '-extend');
                    if (name && extend) {
                        if (!this.templates[extend]) {
                            return this.tools.exception("Can't clone undefined template " + extend);
                        }
                        this.templates[name] = this.templates[extend].cloneNode(true);
                        extend = name;
                        name = undefined;
                    }
                    if (name) {
                        this.templates[name] = node;
                        this.compiled_templates[name] = null;
                    } else if (extend) {
                        delete(this.compiled_templates[extend]);
                        if (this.extend_templates[extend]) {
                            this.extend_templates[extend].push(node);
                        } else {
                            this.extend_templates[extend] = [node];
                        }
                    }
                }
            }
            if (callback) {
                callback(null, template);
            }
            return true;
        },
        load_xml: function(s, callback) {
            var self = this;
            var async = !!callback;
            s = this.tools.trim(s);
            if (s.charAt(0) === '<') {
                var tpl = this.load_xml_string(s);
                if (callback) {
                    callback(null, tpl);
                }
                return tpl;
            } else {
                var req = this.get_xhr();
                if (this.debug) {
                    s += '?debug=' + (new Date()).getTime();
                }
                req.open('GET', s, async);
                if (async) {
                    req.onreadystatechange = function() {
                        if (req.readyState == 4) {
                            if (req.status == 200) {
                                callback(null, self._parse_from_request(req));
                            } else {
                                callback(new Error("Can't load template, http status " + req.status));
                            }
                        }
                    };
                }
                req.send(null);
                if (!async) {
                    return this._parse_from_request(req);
                }
            }
        },
        _parse_from_request: function(req) {
            var xDoc = req.responseXML;
            if (xDoc) {
                if (!xDoc.documentElement) {
                    throw new Error("QWeb2: This xml document has no root document : " + xDoc.responseText);
                }
                if (xDoc.documentElement.nodeName == "parsererror") {
                    throw new Error("QWeb2: Could not parse document :" + xDoc.documentElement.childNodes[0].nodeValue);
                }
                return xDoc;
            } else {
                return this.load_xml_string(req.responseText);
            }
        },
        load_xml_string: function(s) {
            if (window.DOMParser) {
                var dp = new DOMParser();
                var r = dp.parseFromString(s, "text/xml");
                if (r.body && r.body.firstChild && r.body.firstChild.nodeName == 'parsererror') {
                    throw new Error("QWeb2: Could not parse document :" + r.body.innerText);
                }
                return r;
            }
            var xDoc;
            try {
                xDoc = new ActiveXObject("MSXML2.DOMDocument");
            } catch (e) {
                throw new Error("Could not find a DOM Parser: " + e.message);
            }
            xDoc.async = false;
            xDoc.preserveWhiteSpace = true;
            xDoc.loadXML(s);
            return xDoc;
        },
        has_template: function(template) {
            return !!this.templates[template];
        },
        get_xhr: function() {
            if (window.XMLHttpRequest) {
                return new window.XMLHttpRequest();
            }
            try {
                return new ActiveXObject('MSXML2.XMLHTTP.3.0');
            } catch (e) {
                throw new Error("Could not get XHR");
            }
        },
        compile: function(node) {
            var e = new QWeb2.Element(this, node);
            var template = node.getAttribute(this.prefix + '-name');
            return "   /* 'this' refers to Qweb2.Engine instance */\n" + "   var context = { engine : this, template : " + (this.tools.js_escape(template)) + " };\n" + "   dict = dict || {};\n" + "   dict['__template__'] = '" + template + "';\n" + "   var r = [];\n" + "   /* START TEMPLATE */" +
                (this.debug ? "" : " try {\n") +
                (e.compile()) + "\n" + "   /* END OF TEMPLATE */" +
                (this.debug ? "" : " } catch(error) {\n" + "       if (console && console.exception) console.exception(error);\n" + "       context.engine.tools.exception('Runtime Error: ' + error, context);\n") +
                (this.debug ? "" : "   }\n") + "   return r.join('');";
        },
        render: function(template, dict) {
            dict = dict || {};
            QWeb2.tools.extend(dict, this.default_dict);
            var r = this._render(template, dict);
            return r;
        },
        _render: function(template, dict) {
            if (this.compiled_templates[template]) {
                return this.compiled_templates[template].apply(this, [dict || {}]);
            } else if (this.templates[template]) {
                var ext;
                if (ext = this.extend_templates[template]) {
                    var extend_node;
                    while (extend_node = ext.shift()) {
                        this.extend(template, extend_node);
                    }
                }
                var code = this.compile(this.templates[template]),
                    tcompiled;
                try {
                    tcompiled = new Function(['dict'], code);
                } catch (error) {
                    if (this.debug && window.console) {
                        console.log(code);
                    }
                    this.tools.exception("Error evaluating template: " + error, {
                        template: name
                    });
                }
                if (!tcompiled) {
                    this.tools.exception("Error evaluating template: (IE?)" + error, {
                        template: name
                    });
                }
                this.compiled_templates[template] = tcompiled;
                return this.render(template, dict);
            } else {
                return this.tools.exception("Template '" + template + "' not found");
            }
        },
        extend: function(template, extend_node) {
            var jQuery = this.jQuery;
            if (!jQuery) {
                return this.tools.exception("Can't extend template " + template + " without jQuery");
            }
            var template_dest = this.templates[template];
            for (var i = 0, ilen = extend_node.childNodes.length; i < ilen; i++) {
                var child = extend_node.childNodes[i];
                if (child.nodeType === 1) {
                    var jquery = child.getAttribute(this.prefix + '-jquery'),
                        operation = child.getAttribute(this.prefix + '-operation'),
                        target, error_msg = "Error while extending template '" + template;
                    if (jquery) {
                        target = jQuery(jquery, template_dest);
                    } else {
                        this.tools.exception(error_msg + "No expression given");
                    }
                    error_msg += "' (expression='" + jquery + "') : ";
                    if (operation) {
                        var allowed_operations = "append,prepend,before,after,replace,inner,attributes".split(',');
                        if (this.tools.arrayIndexOf(allowed_operations, operation) == -1) {
                            this.tools.exception(error_msg + "Invalid operation : '" + operation + "'");
                        }
                        operation = {
                            'replace': 'replaceWith',
                            'inner': 'html'
                        }[operation] || operation;
                        if (operation === 'attributes') {
                            jQuery('attribute', child).each(function() {
                                var attrib = jQuery(this);
                                target.attr(attrib.attr('name'), attrib.text());
                            });
                        } else {
                            target[operation](child.cloneNode(true).childNodes);
                        }
                    } else {
                        try {
                            var f = new Function(['$', 'document'], this.tools.xml_node_to_string(child, true));
                        } catch (error) {
                            return this.tools.exception("Parse " + error_msg + error);
                        }
                        try {
                            f.apply(target, [jQuery, template_dest.ownerDocument]);
                        } catch (error) {
                            return this.tools.exception("Runtime " + error_msg + error);
                        }
                    }
                }
            }
        }
    });
    return Engine;
})();
QWeb2.Element = (function() {
    function Element(engine, node) {
        this.engine = engine;
        this.node = node;
        this.tag = node.tagName;
        this.actions = {};
        this.actions_done = [];
        this.attributes = {};
        this.children = [];
        this._top = [];
        this._bottom = [];
        this._indent = 1;
        this.process_children = true;
        this.is_void_element = ~QWeb2.tools.arrayIndexOf(this.engine.void_elements, this.tag);
        var childs = this.node.childNodes;
        if (childs) {
            for (var i = 0, ilen = childs.length; i < ilen; i++) {
                this.children.push(new QWeb2.Element(this.engine, childs[i]));
            }
        }
        var attrs = this.node.attributes;
        if (attrs) {
            for (var j = 0, jlen = attrs.length; j < jlen; j++) {
                var attr = attrs[j];
                var name = attr.name;
                var m = name.match(new RegExp("^" + this.engine.prefix + "-(.+)"));
                if (m) {
                    name = m[1];
                    if (name === 'name') {
                        continue;
                    }
                    this.actions[name] = attr.value;
                } else {
                    this.attributes[name] = attr.value;
                }
            }
        }
        if (this.engine.preprocess_node) {
            this.engine.preprocess_node.call(this);
        }
    }
    QWeb2.tools.extend(Element.prototype, {
        compile: function() {
            var r = [],
                instring = false,
                lines = this._compile().split('\n');
            for (var i = 0, ilen = lines.length; i < ilen; i++) {
                var m, line = lines[i];
                if (m = line.match(/^(\s*)\/\/@string=(.*)/)) {
                    if (instring) {
                        if (this.engine.debug) {
                            r.push((m[2].indexOf("\\n") != -1 ? "',\n\t" + m[1] + "'" : '') + m[2]);
                        } else {
                            r.push(m[2]);
                        }
                    } else {
                        r.push(m[1] + "r.push('" + m[2]);
                        instring = true;
                    }
                } else {
                    if (instring) {
                        r.push("');\n");
                    }
                    instring = false;
                    r.push(line + '\n');
                }
            }
            return r.join('');
        },
        _compile: function() {
            switch (this.node.nodeType) {
                case 3:
                case 4:
                    this.top_string(this.node.data);
                    break;
                case 1:
                    this.compile_element();
            }
            var r = this._top.join('');
            if (this.process_children) {
                for (var i = 0, ilen = this.children.length; i < ilen; i++) {
                    var child = this.children[i];
                    child._indent = this._indent;
                    r += child._compile();
                }
            }
            r += this._bottom.join('');
            return r;
        },
        format_expression: function(e) {
            if (QWeb2.expressions_cache[e]) {
                return QWeb2.expressions_cache[e];
            }
            var chars = e.split(''),
                instring = '',
                invar = '',
                invar_pos = 0,
                r = '';
            chars.push(' ');
            for (var i = 0, ilen = chars.length; i < ilen; i++) {
                var c = chars[i];
                if (instring.length) {
                    if (c === instring && chars[i - 1] !== "\\") {
                        instring = '';
                    }
                } else if (c === '"' || c === "'") {
                    instring = c;
                } else if (c.match(/[a-zA-Z_\$]/) && !invar.length) {
                    invar = c;
                    invar_pos = i;
                    continue;
                } else if (c.match(/\W/) && invar.length) {
                    if (chars[invar_pos - 1] !== '.' && QWeb2.tools.arrayIndexOf(this.engine.reserved_words, invar) < 0) {
                        invar = this.engine.word_replacement[invar] || ("dict['" + invar + "']");
                    }
                    r += invar;
                    invar = '';
                } else if (invar.length) {
                    invar += c;
                    continue;
                }
                r += c;
            }
            r = r.slice(0, -1);
            QWeb2.expressions_cache[e] = r;
            return r;
        },
        format_str: function(e) {
            if (e == '0') {
                return 'dict[0]';
            }
            return this.format_expression(e);
        },
        string_interpolation: function(s) {
            var _this = this;
            if (!s) {
                return "''";
            }

            function append_literal(s) {
                s && r.push(_this.engine.tools.js_escape(s));
            }
            var re = /(?:#{(.+?)}|{{(.+?)}})/g,
                start = 0,
                r = [],
                m;
            while (m = re.exec(s)) {
                append_literal(s.slice(start, re.lastIndex - m[0].length));
                r.push('(' + this.format_str(m[2] || m[1]) + ')');
                start = re.lastIndex;
            }
            append_literal(s.slice(start));
            return r.join(' + ');
        },
        indent: function() {
            return this._indent++;
        },
        dedent: function() {
            if (this._indent !== 0) {
                return this._indent--;
            }
        },
        get_indent: function() {
            return new Array(this._indent + 1).join("\t");
        },
        top: function(s) {
            return this._top.push(this.get_indent() + s + '\n');
        },
        top_string: function(s) {
            return this._top.push(this.get_indent() + "//@string=" + this.engine.tools.js_escape(s, true) + '\n');
        },
        bottom: function(s) {
            return this._bottom.unshift(this.get_indent() + s + '\n');
        },
        bottom_string: function(s) {
            return this._bottom.unshift(this.get_indent() + "//@string=" + this.engine.tools.js_escape(s, true) + '\n');
        },
        compile_element: function() {
            for (var i = 0, ilen = this.engine.actions_precedence.length; i < ilen; i++) {
                var a = this.engine.actions_precedence[i];
                if (a in this.actions) {
                    var value = this.actions[a];
                    var key = 'compile_action_' + a;
                    if (this[key]) {
                        this[key](value);
                    } else if (this.engine[key]) {
                        this.engine[key].call(this, value);
                    } else {
                        this.engine.tools.exception("No handler method for action '" + a + "'");
                    }
                }
            }
            if (this.tag.toLowerCase() !== this.engine.prefix) {
                var tag = "<" + this.tag;
                for (var a in this.attributes) {
                    tag += this.engine.tools.gen_attribute([a, this.attributes[a]]);
                }
                this.top_string(tag);
                if (this.actions.att) {
                    this.top("r.push(context.engine.tools.gen_attribute(" + (this.format_expression(this.actions.att)) + "));");
                }
                for (var a in this.actions) {
                    var v = this.actions[a];
                    var m = a.match(/att-(.+)/);
                    if (m) {
                        this.top("r.push(context.engine.tools.gen_attribute(['" + m[1] + "', (" + (this.format_expression(v)) + ")]));");
                    }
                    var m = a.match(/attf-(.+)/);
                    if (m) {
                        this.top("r.push(context.engine.tools.gen_attribute(['" + m[1] + "', (" + (this.string_interpolation(v)) + ")]));");
                    }
                }
                if (this.actions.opentag === 'true' || (!this.children.length && this.is_void_element)) {
                    this.top_string("/>");
                } else {
                    this.top_string(">");
                    this.bottom_string("</" + this.tag + ">");
                }
            }
        },
        compile_action_if: function(value) {
            this.top("if (" + (this.format_expression(value)) + ") {");
            this.bottom("}");
            this.indent();
        },
        compile_action_foreach: function(value) {
            var as = this.actions['as'] || value.replace(/[^a-zA-Z0-9]/g, '_');
            this.top("context.engine.tools.foreach(context, " + (this.format_expression(value)) + ", " + (this.engine.tools.js_escape(as)) + ", dict, function(context, dict) {");
            this.bottom("});");
            this.indent();
        },
        compile_action_call: function(value) {
            if (this.children.length === 0) {
                return this.top("r.push(context.engine.tools.call(context, " + (this.engine.tools.js_escape(value)) + ", dict));");
            } else {
                this.top("r.push(context.engine.tools.call(context, " + (this.engine.tools.js_escape(value)) + ", dict, null, function(context, dict) {");
                this.bottom("}));");
                this.indent();
                this.top("var r = [];");
                return this.bottom("return r.join('');");
            }
        },
        compile_action_set: function(value) {
            var variable = this.format_expression(value);
            if (this.actions['value']) {
                if (this.children.length) {
                    this.engine.tools.warning("@set with @value plus node chidren found. Children are ignored.");
                }
                this.top(variable + " = (" + (this.format_expression(this.actions['value'])) + ");");
                this.process_children = false;
            } else {
                if (this.children.length === 0) {
                    this.top(variable + " = '';");
                } else if (this.children.length === 1 && this.children[0].node.nodeType === 3) {
                    this.top(variable + " = " + (this.engine.tools.js_escape(this.children[0].node.data)) + ";");
                    this.process_children = false;
                } else {
                    this.top(variable + " = (function(dict) {");
                    this.bottom("})(dict);");
                    this.indent();
                    this.top("var r = [];");
                    this.bottom("return r.join('');");
                }
            }
        },
        compile_action_esc: function(value) {
            this.top("r.push(context.engine.tools.html_escape(" +
                this.format_expression(value) +
                "));");
        },
        compile_action_raw: function(value) {
            this.top("r.push(" + (this.format_str(value)) + ");");
        },
        compile_action_js: function(value) {
            this.top("(function(" + value + ") {");
            this.bottom("})(dict);");
            this.indent();
            var lines = this.engine.tools.xml_node_to_string(this.node, true).split(/\r?\n/);
            for (var i = 0, ilen = lines.length; i < ilen; i++) {
                this.top(lines[i]);
            }
            this.process_children = false;
        },
        compile_action_debug: function(value) {
            this.top("debugger;");
        },
        compile_action_log: function(value) {
            this.top("console.log(" + this.format_expression(value) + ");");
        }
    });
    return Element;
})();;

/* /web/static/src/js/openerpframework.js defined in bundle 'web.assets_common' */
(function() {
    "use strict";

    function declare($, _, QWeb2) {
        var openerp = {};
        (function() {
            var initializing = false,
                fnTest = /xyz/.test(function() {
                    xyz();
                }) ? /\b_super\b/ : /.*/;
            openerp.Class = function() {};
            openerp.Class.extend = function() {
                var _super = this.prototype;
                var args = _.toArray(arguments);
                args.unshift({});
                var prop = _.extend.apply(_, args);
                initializing = true;
                var This = this;
                var prototype = new This();
                initializing = false;
                _.each(prop, function(val, name) {
                    prototype[name] = typeof prop[name] == "function" && fnTest.test(prop[name]) ? (function(name, fn) {
                        return function() {
                            var tmp = this._super;
                            this._super = _super[name];
                            var ret = fn.apply(this, arguments);
                            this._super = tmp;
                            return ret;
                        };
                    })(name, prop[name]) : prop[name];
                });

                function Class() {
                    if (this.constructor !== openerp.Class) {
                        throw new Error("You can only instanciate objects with the 'new' operator");
                    }
                    this._super = null;
                    if (!initializing && this.init) {
                        var ret = this.init.apply(this, arguments);
                        if (ret) {
                            return ret;
                        }
                    }
                    return this;
                }
                Class.include = function(properties) {
                    _.each(properties, function(val, name) {
                        if (typeof properties[name] !== 'function' || !fnTest.test(properties[name])) {
                            prototype[name] = properties[name];
                        } else if (typeof prototype[name] === 'function' && prototype.hasOwnProperty(name)) {
                            prototype[name] = (function(name, fn, previous) {
                                return function() {
                                    var tmp = this._super;
                                    this._super = previous;
                                    var ret = fn.apply(this, arguments);
                                    this._super = tmp;
                                    return ret;
                                };
                            })(name, properties[name], prototype[name]);
                        } else if (typeof _super[name] === 'function') {
                            prototype[name] = (function(name, fn) {
                                return function() {
                                    var tmp = this._super;
                                    this._super = _super[name];
                                    var ret = fn.apply(this, arguments);
                                    this._super = tmp;
                                    return ret;
                                };
                            })(name, properties[name]);
                        }
                    });
                };
                Class.prototype = prototype;
                Class.constructor = Class;
                Class.extend = this.extend;
                return Class;
            };
        })();
        openerp.ParentedMixin = {
            __parentedMixin: true,
            init: function() {
                this.__parentedDestroyed = false;
                this.__parentedChildren = [];
                this.__parentedParent = null;
            },
            setParent: function(parent) {
                if (this.getParent()) {
                    if (this.getParent().__parentedMixin) {
                        this.getParent().__parentedChildren = _.without(this.getParent().getChildren(), this);
                    }
                }
                this.__parentedParent = parent;
                if (parent && parent.__parentedMixin) {
                    parent.__parentedChildren.push(this);
                }
            },
            getParent: function() {
                return this.__parentedParent;
            },
            getChildren: function() {
                return _.clone(this.__parentedChildren);
            },
            isDestroyed: function() {
                return this.__parentedDestroyed;
            },
            alive: function(promise, reject) {
                var self = this;
                return $.Deferred(function(def) {
                    promise.then(function() {
                        if (!self.isDestroyed()) {
                            def.resolve.apply(def, arguments);
                        }
                    }, function() {
                        if (!self.isDestroyed()) {
                            def.reject.apply(def, arguments);
                        }
                    }).always(function() {
                        if (reject) {
                            def.reject();
                        }
                    });
                }).promise();
            },
            destroy: function() {
                _.each(this.getChildren(), function(el) {
                    el.destroy();
                });
                this.setParent(undefined);
                this.__parentedDestroyed = true;
            }
        };
        var Events = openerp.Class.extend({
            on: function(events, callback, context) {
                var ev;
                events = events.split(/\s+/);
                var calls = this._callbacks || (this._callbacks = {});
                while ((ev = events.shift())) {
                    var list = calls[ev] || (calls[ev] = {});
                    var tail = list.tail || (list.tail = list.next = {});
                    tail.callback = callback;
                    tail.context = context;
                    list.tail = tail.next = {};
                }
                return this;
            },
            off: function(events, callback, context) {
                var ev, calls, node;
                if (!events) {
                    delete this._callbacks;
                } else if ((calls = this._callbacks)) {
                    events = events.split(/\s+/);
                    while ((ev = events.shift())) {
                        node = calls[ev];
                        delete calls[ev];
                        if (!callback || !node)
                            continue;
                        while ((node = node.next) && node.next) {
                            if (node.callback === callback && (!context || node.context === context))
                                continue;
                            this.on(ev, node.callback, node.context);
                        }
                    }
                }
                return this;
            },
            callbackList: function() {
                var lst = [];
                _.each(this._callbacks || {}, function(el, eventName) {
                    var node = el;
                    while ((node = node.next) && node.next) {
                        lst.push([eventName, node.callback, node.context]);
                    }
                });
                return lst;
            },
            trigger: function(events) {
                var event, node, calls, tail, args, all, rest;
                if (!(calls = this._callbacks))
                    return this;
                all = calls['all'];
                (events = events.split(/\s+/)).push(null);
                while ((event = events.shift())) {
                    if (all)
                        events.push({
                            next: all.next,
                            tail: all.tail,
                            event: event
                        });
                    if (!(node = calls[event]))
                        continue;
                    events.push({
                        next: node.next,
                        tail: node.tail
                    });
                }
                rest = Array.prototype.slice.call(arguments, 1);
                while ((node = events.pop())) {
                    tail = node.tail;
                    args = node.event ? [node.event].concat(rest) : rest;
                    while ((node = node.next) !== tail) {
                        node.callback.apply(node.context || this, args);
                    }
                }
                return this;
            }
        });
        openerp.EventDispatcherMixin = _.extend({}, openerp.ParentedMixin, {
            __eventDispatcherMixin: true,
            init: function() {
                openerp.ParentedMixin.init.call(this);
                this.__edispatcherEvents = new Events();
                this.__edispatcherRegisteredEvents = [];
            },
            on: function(events, dest, func) {
                var self = this;
                if (!(func instanceof Function)) {
                    throw new Error("Event handler must be a function.");
                }
                events = events.split(/\s+/);
                _.each(events, function(eventName) {
                    self.__edispatcherEvents.on(eventName, func, dest);
                    if (dest && dest.__eventDispatcherMixin) {
                        dest.__edispatcherRegisteredEvents.push({
                            name: eventName,
                            func: func,
                            source: self
                        });
                    }
                });
                return this;
            },
            off: function(events, dest, func) {
                var self = this;
                events = events.split(/\s+/);
                _.each(events, function(eventName) {
                    self.__edispatcherEvents.off(eventName, func, dest);
                    if (dest && dest.__eventDispatcherMixin) {
                        dest.__edispatcherRegisteredEvents = _.filter(dest.__edispatcherRegisteredEvents, function(el) {
                            return !(el.name === eventName && el.func === func && el.source === self);
                        });
                    }
                });
                return this;
            },
            trigger: function(events) {
                this.__edispatcherEvents.trigger.apply(this.__edispatcherEvents, arguments);
                return this;
            },
            destroy: function() {
                var self = this;
                _.each(this.__edispatcherRegisteredEvents, function(event) {
                    event.source.__edispatcherEvents.off(event.name, event.func, self);
                });
                this.__edispatcherRegisteredEvents = [];
                _.each(this.__edispatcherEvents.callbackList(), function(cal) {
                    this.off(cal[0], cal[2], cal[1]);
                }, this);
                this.__edispatcherEvents.off();
                openerp.ParentedMixin.destroy.call(this);
            }
        });
        openerp.PropertiesMixin = _.extend({}, openerp.EventDispatcherMixin, {
            init: function() {
                openerp.EventDispatcherMixin.init.call(this);
                this.__getterSetterInternalMap = {};
            },
            set: function(arg1, arg2, arg3) {
                var map;
                var options;
                if (typeof arg1 === "string") {
                    map = {};
                    map[arg1] = arg2;
                    options = arg3 || {};
                } else {
                    map = arg1;
                    options = arg2 || {};
                }
                var self = this;
                var changed = false;
                _.each(map, function(val, key) {
                    var tmp = self.__getterSetterInternalMap[key];
                    if (tmp === val)
                        return;
                    if (key === 'value' && self.field && self.field.type === 'float' && tmp && val) {
                        var digits = self.field.digits;
                        if (digits !== 0) {
                            digits = digits ? digits[1] : 2;
                            if (openerp.web.float_is_zero(tmp - val, digits)) {
                                return;
                            }
                        }
                    }
                    changed = true;
                    self.__getterSetterInternalMap[key] = val;
                    if (!options.silent)
                        self.trigger("change:" + key, self, {
                            oldValue: tmp,
                            newValue: val
                        });
                });
                if (changed)
                    self.trigger("change", self);
            },
            get: function(key) {
                return this.__getterSetterInternalMap[key];
            }
        });
        openerp.Widget = openerp.Class.extend(openerp.PropertiesMixin, {
            tagName: 'div',
            id: null,
            className: null,
            attributes: {},
            events: {},
            template: null,
            init: function(parent) {
                openerp.PropertiesMixin.init.call(this);
                this.setParent(parent);
                for (var name in this) {
                    if (typeof(this[name]) == "function") {
                        if ((/^on_|^do_/).test(name)) {
                            this[name] = _.bind(this[name], this);
                        }
                    }
                }
                this.setElement(this._make_descriptive());
            },
            destroy: function() {
                _.each(this.getChildren(), function(el) {
                    el.destroy();
                });
                if (this.$el) {
                    this.$el.remove();
                }
                openerp.PropertiesMixin.destroy.call(this);
            },
            appendTo: function(target) {
                var self = this;
                return this.__widgetRenderAndInsert(function(t) {
                    self.$el.appendTo(t);
                }, target);
            },
            prependTo: function(target) {
                var self = this;
                return this.__widgetRenderAndInsert(function(t) {
                    self.$el.prependTo(t);
                }, target);
            },
            insertAfter: function(target) {
                var self = this;
                return this.__widgetRenderAndInsert(function(t) {
                    self.$el.insertAfter(t);
                }, target);
            },
            insertBefore: function(target) {
                var self = this;
                return this.__widgetRenderAndInsert(function(t) {
                    self.$el.insertBefore(t);
                }, target);
            },
            replace: function(target) {
                return this.__widgetRenderAndInsert(_.bind(function(t) {
                    this.$el.replaceAll(t);
                }, this), target);
            },
            __widgetRenderAndInsert: function(insertion, target) {
                this.renderElement();
                insertion(target);
                return this.start();
            },
            start: function() {
                return $.when();
            },
            renderElement: function() {
                var $el;
                if (this.template) {
                    $el = $(openerp.qweb.render(this.template, {
                        widget: this
                    }).trim());
                } else {
                    $el = this._make_descriptive();
                }
                this.replaceElement($el);
            },
            replaceElement: function($el) {
                var $oldel = this.$el;
                this.setElement($el);
                if ($oldel && !$oldel.is(this.$el)) {
                    $oldel.replaceWith(this.$el);
                }
                return this;
            },
            setElement: function(element) {
                if (this.$el) {
                    this.undelegateEvents();
                }
                this.$el = (element instanceof $) ? element : $(element);
                this.el = this.$el[0];
                this.delegateEvents();
                return this;
            },
            make: function(tagName, attributes, content) {
                var el = document.createElement(tagName);
                if (!_.isEmpty(attributes)) {
                    $(el).attr(attributes);
                }
                if (content) {
                    $(el).html(content);
                }
                return el;
            },
            _make_descriptive: function() {
                var attrs = _.extend({}, this.attributes || {});
                if (this.id) {
                    attrs.id = this.id;
                }
                if (this.className) {
                    attrs['class'] = this.className;
                }
                return $(this.make(this.tagName, attrs));
            },
            delegateEvents: function() {
                var events = this.events;
                if (_.isEmpty(events)) {
                    return;
                }
                for (var key in events) {
                    if (!events.hasOwnProperty(key)) {
                        continue;
                    }
                    var method = this.proxy(events[key]);
                    var match = /^(\S+)(\s+(.*))?$/.exec(key);
                    var event = match[1];
                    var selector = match[3];
                    event += '.widget_events';
                    if (!selector) {
                        this.$el.on(event, method);
                    } else {
                        this.$el.on(event, selector, method);
                    }
                }
            },
            undelegateEvents: function() {
                this.$el.off('.widget_events');
            },
            $: function(selector) {
                if (selector === undefined)
                    return this.$el;
                return this.$el.find(selector);
            },
            proxy: function(method) {
                var self = this;
                return function() {
                    var fn = (typeof method === 'string') ? self[method] : method;
                    return fn.apply(self, arguments);
                };
            }
        });
        var genericJsonRpc = function(fct_name, params, fct) {
            var data = {
                jsonrpc: "2.0",
                method: fct_name,
                params: params,
                id: Math.floor(Math.random() * 1000 * 1000 * 1000)
            };
            var xhr = fct(data);
            var result = xhr.pipe(function(result) {
                if (result.error !== undefined) {
                    console.error("Server application error", result.error);
                    return $.Deferred().reject("server", result.error);
                } else {
                    return result.result;
                }
            }, function() {
                var def = $.Deferred();
                return def.reject.apply(def, ["communication"].concat(_.toArray(arguments)));
            });
            result.abort = function() {
                xhr.abort && xhr.abort();
            };
            return result;
        };

        function date_to_utc(k, v) {
            var value = this[k];
            if (!(value instanceof Date)) {
                return v;
            }
            return openerp.datetime_to_str(value);
        }
        openerp.jsonRpc = function(url, fct_name, params, settings) {
            return genericJsonRpc(fct_name, params, function(data) {
                return $.ajax(url, _.extend({}, settings, {
                    url: url,
                    dataType: 'json',
                    type: 'POST',
                    data: JSON.stringify(data, date_to_utc),
                    contentType: 'application/json'
                }));
            });
        };
        openerp.jsonpRpc = function(url, fct_name, params, settings) {
            settings = settings || {};
            return genericJsonRpc(fct_name, params, function(data) {
                var payload_str = JSON.stringify(data, date_to_utc);
                var payload_url = $.param({
                    r: payload_str
                });
                var force2step = settings.force2step || false;
                delete settings.force2step;
                var session_id = settings.session_id || null;
                delete settings.session_id;
                if (payload_url.length < 2000 && !force2step) {
                    return $.ajax(url, _.extend({}, settings, {
                        url: url,
                        dataType: 'jsonp',
                        jsonp: 'jsonp',
                        type: 'GET',
                        cache: false,
                        data: {
                            r: payload_str,
                            session_id: session_id
                        }
                    }));
                } else {
                    var args = {
                        session_id: session_id,
                        id: data.id
                    };
                    var ifid = _.uniqueId('oe_rpc_iframe');
                    var html = "<iframe src='javascript:false;' name='" + ifid + "' id='" + ifid + "' style='display:none'></iframe>";
                    var $iframe = $(html);
                    var nurl = 'jsonp=1&' + $.param(args);
                    nurl = url.indexOf("?") !== -1 ? url + "&" + nurl : url + "?" + nurl;
                    var $form = $('<form>').attr('method', 'POST').attr('target', ifid).attr('enctype', "multipart/form-data").attr('action', nurl).append($('<input type="hidden" name="r" />').attr('value', payload_str)).hide().appendTo($('body'));
                    var cleanUp = function() {
                        if ($iframe) {
                            $iframe.unbind("load").remove();
                        }
                        $form.remove();
                    };
                    var deferred = $.Deferred();
                    $iframe.bind('load', function() {
                        $iframe.unbind('load').bind('load', function() {
                            $.ajax({
                                url: url,
                                dataType: 'jsonp',
                                jsonp: 'jsonp',
                                type: 'GET',
                                cache: false,
                                data: {
                                    session_id: session_id,
                                    id: data.id
                                }
                            }).always(function() {
                                cleanUp();
                            }).done(function() {
                                deferred.resolve.apply(deferred, arguments);
                            }).fail(function() {
                                deferred.reject.apply(deferred, arguments);
                            });
                        });
                        $form.submit();
                    });
                    $form.after($iframe);
                    if (settings.timeout) {
                        realSetTimeout(function() {
                            deferred.reject({});
                        }, settings.timeout);
                    }
                    return deferred;
                }
            });
        };
        openerp.loadCSS = function(url) {
            if (!$('link[href="' + url + '"]').length) {
                $('head').append($('<link>', {
                    'href': url,
                    'rel': 'stylesheet',
                    'type': 'text/css'
                }));
            }
        };
        openerp.loadJS = function(url) {
            var def = $.Deferred();
            if ($('script[src="' + url + '"]').length) {
                def.resolve();
            } else {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = url;
                script.onload = script.onreadystatechange = function() {
                    if ((script.readyState && script.readyState != "loaded" && script.readyState != "complete") || script.onload_done) {
                        return;
                    }
                    script.onload_done = true;
                    def.resolve(url);
                };
                script.onerror = function() {
                    console.error("Error loading file", script.src);
                    def.reject(url);
                };
                var head = document.head || document.getElementsByTagName('head')[0];
                head.appendChild(script);
            }
            return def;
        };
        openerp.loadBundle = function(name) {
            return $.when(openerp.loadCSS('/web/css/' + name), openerp.loadJS('/web/js/' + name));
        };
        var realSetTimeout = function(fct, millis) {
            var finished = new Date().getTime() + millis;
            var wait = function() {
                var current = new Date().getTime();
                if (current < finished) {
                    setTimeout(wait, finished - current);
                } else {
                    fct();
                }
            };
            setTimeout(wait, millis);
        };
        openerp.Session = openerp.Class.extend(openerp.PropertiesMixin, {
            triggers: {
                'request': 'Request sent',
                'response': 'Response received',
                'response_failed': 'HTTP Error response or timeout received',
                'error': 'The received response is an JSON-RPC error'
            },
            init: function(parent, origin, options) {
                openerp.PropertiesMixin.init.call(this, parent);
                options = options || {};
                this.server = null;
                this.session_id = options.session_id || null;
                this.override_session = options.override_session || !!options.session_id || false;
                this.avoid_recursion = false;
                this.use_cors = options.use_cors || false;
                this.setup(origin);
            },
            setup: function(origin) {
                var window_origin = location.protocol + "//" + location.host;
                origin = origin ? origin.replace(/\/+$/, '') : window_origin;
                if (!_.isUndefined(this.origin) && this.origin !== origin)
                    throw new Error('Session already bound to ' + this.origin);
                else
                    this.origin = origin;
                this.prefix = this.origin;
                this.server = this.origin;
                this.origin_server = this.origin === window_origin;
            },
            session_reload: function() {
                var self = this;
                return self.rpc("/web/session/get_session_info", {}).then(function(result) {
                    delete result.session_id;
                    _.extend(self, result);
                });
            },
            session_authenticate: function(db, login, password) {
                var self = this;
                var params = {
                    db: db,
                    login: login,
                    password: password
                };
                return this.rpc("/web/session/authenticate", params).then(function(result) {
                    if (!result.uid) {
                        return $.Deferred().reject();
                    }
                    delete result.session_id;
                    _.extend(self, result);
                });
            },
            check_session_id: function() {
                var self = this;
                if (this.avoid_recursion)
                    return $.when();
                if (this.session_id)
                    return $.when();
                if (!this.use_cors && (this.override_session || !this.origin_server)) {
                    this.avoid_recursion = true;
                    return this.rpc("/gen_session_id", {}).then(function(result) {
                        self.session_id = result;
                    }).always(function() {
                        self.avoid_recursion = false;
                    });
                } else {
                    self.session_id = openerp.get_cookie("session_id");
                    return $.when();
                }
            },
            rpc: function(url, params, options) {
                var self = this;
                options = _.clone(options || {});
                var shadow = options.shadow || false;
                delete options.shadow;
                return self.check_session_id().then(function() {
                    if (!_.isString(url)) {
                        _.extend(options, url);
                        url = url.url;
                    }
                    if (!shadow)
                        self.trigger('request');
                    var fct;
                    if (self.origin_server) {
                        fct = openerp.jsonRpc;
                        if (self.override_session) {
                            options.headers = _.extend({}, options.headers, {
                                "X-Openerp-Session-Id": self.override_session ? self.session_id || '' : ''
                            });
                        }
                    } else if (self.use_cors) {
                        fct = openerp.jsonRpc;
                        url = self.url(url, null);
                        options.session_id = self.session_id || '';
                        if (self.override_session) {
                            options.headers = _.extend({}, options.headers, {
                                "X-Openerp-Session-Id": self.override_session ? self.session_id || '' : ''
                            });
                        }
                    } else {
                        fct = openerp.jsonpRpc;
                        url = self.url(url, null);
                        options.session_id = self.session_id || '';
                    }
                    var p = fct(url, "call", params, options);
                    p = p.then(function(result) {
                        if (!shadow)
                            self.trigger('response');
                        return result;
                    }, function(type, error, textStatus, errorThrown) {
                        if (type === "server") {
                            if (!shadow)
                                self.trigger('response');
                            if (error.code === 100) {
                                self.uid = false;
                            }
                            return $.Deferred().reject(error, $.Event());
                        } else {
                            if (!shadow)
                                self.trigger('response_failed');
                            var nerror = {
                                code: -32098,
                                message: "XmlHttpRequestError " + errorThrown,
                                data: {
                                    type: "xhr" + textStatus,
                                    debug: error.responseText,
                                    objects: [error, errorThrown]
                                }
                            };
                            return $.Deferred().reject(nerror, $.Event());
                        }
                    });
                    return p.fail(function() {
                        p.fail(function(error, event) {
                            if (!event.isDefaultPrevented()) {
                                self.trigger('error', error, event);
                            }
                        });
                    });
                });
            },
            url: function(path, params) {
                params = _.extend(params || {});
                if (this.override_session || (!this.origin_server))
                    params.session_id = this.session_id;
                var qs = $.param(params);
                if (qs.length > 0)
                    qs = "?" + qs;
                var prefix = _.any(['http://', 'https://', '//'], function(el) {
                    return path.length >= el.length && path.slice(0, el.length) === el;
                }) ? '' : this.prefix;
                return prefix + path + qs;
            },
            model: function(model_name) {
                return new openerp.Model(this, model_name);
            }
        });
        openerp.Model = openerp.Class.extend({
            init: function() {
                var session, model_name;
                var args = _.toArray(arguments);
                args.reverse();
                session = args.pop();
                if (session && !(session instanceof openerp.Session)) {
                    model_name = session;
                    session = null;
                } else {
                    model_name = args.pop();
                }
                this.name = model_name;
                this._session = session;
            },
            session: function() {
                if (!this._session)
                    throw new Error("Not session specified");
                return this._session;
            },
            call: function(method, args, kwargs, options) {
                args = args || [];
                kwargs = kwargs || {};
                if (!_.isArray(args)) {
                    kwargs = args;
                    args = [];
                }
                var call_kw = '/web/dataset/call_kw/' + this.name + '/' + method;
                return this.session().rpc(call_kw, {
                    model: this.name,
                    method: method,
                    args: args,
                    kwargs: kwargs
                }, options);
            }
        });
        openerp.TranslationDataBase = openerp.Class.extend({
            init: function() {
                this.db = {};
                this.parameters = {
                    "direction": 'ltr',
                    "date_format": '%m/%d/%Y',
                    "time_format": '%H:%M:%S',
                    "grouping": [],
                    "decimal_point": ".",
                    "thousands_sep": ","
                };
            },
            set_bundle: function(translation_bundle) {
                var self = this;
                this.db = {};
                var modules = _.keys(translation_bundle.modules);
                modules.sort();
                if (_.include(modules, "web")) {
                    modules = ["web"].concat(_.without(modules, "web"));
                }
                _.each(modules, function(name) {
                    self.add_module_translation(translation_bundle.modules[name]);
                });
                if (translation_bundle.lang_parameters) {
                    this.parameters = translation_bundle.lang_parameters;
                }
            },
            add_module_translation: function(mod) {
                var self = this;
                _.each(mod.messages, function(message) {
                    self.db[message.id] = message.string;
                });
            },
            build_translation_function: function() {
                var self = this;
                var fcnt = function(str) {
                    var tmp = self.get(str);
                    return tmp === undefined ? str : tmp;
                };
                fcnt.database = this;
                return fcnt;
            },
            get: function(key) {
                return this.db[key];
            },
            load_translations: function(session, modules, lang) {
                var self = this;
                return session.rpc('/web/webclient/translations', {
                    "mods": modules || null,
                    "lang": lang || null
                }).done(function(trans) {
                    self.set_bundle(trans);
                });
            }
        });
        openerp._t = new openerp.TranslationDataBase().build_translation_function();
        openerp.get_cookie = function(c_name) {
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            for (var i = 0, l = cookies.length; i < l; i++) {
                var parts = cookies[i].split('=');
                var name = parts.shift();
                var cookie = parts.join('=');
                if (c_name && c_name === name) {
                    return cookie;
                }
            }
            return "";
        };
        openerp.qweb = new QWeb2.Engine();
        openerp.qweb.default_dict = {
            '_': _,
            'JSON': JSON,
            '_t': openerp._t
        };
        openerp.Mutex = openerp.Class.extend({
            init: function() {
                this.def = $.Deferred().resolve();
            },
            exec: function(action) {
                var current = this.def;
                var next = this.def = $.Deferred();
                return current.then(function() {
                    return $.when(action()).always(function() {
                        next.resolve();
                    });
                });
            }
        });
        openerp.str_to_datetime = function(str) {
            if (!str) {
                return str;
            }
            var regex = /^(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d(?:\.(\d+))?)$/;
            var res = regex.exec(str);
            if (!res) {
                throw new Error("'" + str + "' is not a valid datetime");
            }
            var tmp = new Date(2000, 0, 1);
            tmp.setUTCMonth(1970);
            tmp.setUTCMonth(0);
            tmp.setUTCDate(1);
            tmp.setUTCFullYear(parseFloat(res[1]));
            tmp.setUTCMonth(parseFloat(res[2]) - 1);
            tmp.setUTCDate(parseFloat(res[3]));
            tmp.setUTCHours(parseFloat(res[4]));
            tmp.setUTCMinutes(parseFloat(res[5]));
            tmp.setUTCSeconds(parseFloat(res[6]));
            tmp.setUTCSeconds(parseFloat(res[6]));
            tmp.setUTCMilliseconds(parseFloat(rpad((res[7] || "").slice(0, 3), 3)));
            return tmp;
        };
        openerp.str_to_date = function(str) {
            if (!str) {
                return str;
            }
            var regex = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
            var res = regex.exec(str);
            if (!res) {
                throw new Error("'" + str + "' is not a valid date");
            }
            var tmp = new Date(2000, 0, 1);
            tmp.setFullYear(parseFloat(res[1]));
            tmp.setMonth(parseFloat(res[2]) - 1);
            tmp.setDate(parseFloat(res[3]));
            tmp.setHours(0);
            tmp.setMinutes(0);
            tmp.setSeconds(0);
            return tmp;
        };
        openerp.str_to_time = function(str) {
            if (!str) {
                return str;
            }
            var regex = /^(\d\d):(\d\d):(\d\d(?:\.(\d+))?)$/;
            var res = regex.exec(str);
            if (!res) {
                throw new Error("'" + str + "' is not a valid time");
            }
            var tmp = new Date();
            tmp.setFullYear(1970);
            tmp.setMonth(0);
            tmp.setDate(1);
            tmp.setHours(parseFloat(res[1]));
            tmp.setMinutes(parseFloat(res[2]));
            tmp.setSeconds(parseFloat(res[3]));
            tmp.setMilliseconds(parseFloat(rpad((res[4] || "").slice(0, 3), 3)));
            return tmp;
        };
        var lpad = function(str, size) {
            str = "" + str;
            return new Array(size - str.length + 1).join('0') + str;
        };
        var rpad = function(str, size) {
            str = "" + str;
            return str + new Array(size - str.length + 1).join('0');
        };
        openerp.datetime_to_str = function(obj) {
            if (!obj) {
                return false;
            }
            return lpad(obj.getUTCFullYear(), 4) + "-" + lpad(obj.getUTCMonth() + 1, 2) + "-" +
                lpad(obj.getUTCDate(), 2) + " " + lpad(obj.getUTCHours(), 2) + ":" +
                lpad(obj.getUTCMinutes(), 2) + ":" + lpad(obj.getUTCSeconds(), 2);
        };
        openerp.date_to_str = function(obj) {
            if (!obj) {
                return false;
            }
            return lpad(obj.getFullYear(), 4) + "-" + lpad(obj.getMonth() + 1, 2) + "-" +
                lpad(obj.getDate(), 2);
        };
        openerp.time_to_str = function(obj) {
            if (!obj) {
                return false;
            }
            return lpad(obj.getHours(), 2) + ":" + lpad(obj.getMinutes(), 2) + ":" +
                lpad(obj.getSeconds(), 2);
        };
        openerp.declare = declare;
        return openerp;
    }
    if (typeof(define) !== "undefined") {
        define(["jquery", "underscore", "qweb2"], declare);
    } else {
        window.openerp = declare($, _, QWeb2);
    }
})();;

/* /web/static/src/js/tour.js defined in bundle 'web.assets_common' */
(function() {
    'use strict';
    if (typeof openerp === "undefined") {
        var error = "openerp is undefined" +
            "\nhref: " + window.location.href +
            "\nreferrer: " + document.referrer +
            "\nlocalStorage: " + window.localStorage.getItem("tour");
        if (typeof $ !== "undefined") {
            error += '\n\n' + $("body").html();
        }
        throw new Error(error);
    }
    var website = openerp.website;
    if (typeof openerp.Tour !== "undefined") {
        return;
    }
    $.extend($.expr[':'], {
        containsExact: function(a, i, m) {
            return $.trim(a.innerHTML.toLowerCase()) === m[3].toLowerCase();
        },
        containsExactCase: function(a, i, m) {
            return $.trim(a.innerHTML) === m[3];
        },
        containsRegex: function(a, i, m) {
            var regreg = /^\/((?:\\\/|[^\/])+)\/([mig]{0,3})$/,
                reg = regreg.exec(m[3]);
            return reg ? new RegExp(reg[1], reg[2]).test($.trim(a.innerHTML)) : false;
        }
    });
    $.ajaxSetup({
        beforeSend: function() {
            $.ajaxBusy = ($.ajaxBusy | 0) + 1;
        },
        complete: function() {
            $.ajaxBusy--;
        }
    });
    var localStorage = window.localStorage;
    var Tour = {
        tours: {},
        defaultDelay: 50,
        autoRunning: true,
        retryRunningDelay: 1000,
        errorDelay: 5000,
        state: null,
        $element: null,
        timer: null,
        testtimer: null,
        currentTimer: null,
        register: function(tour) {
            if (tour.mode !== "test") tour.mode = "tutorial";
            Tour.tours[tour.id] = tour;
        },
        run: function(tour_id, mode) {
            var tour = Tour.tours[tour_id];
            if (!tour) {
                return Tour.error(null, "Can't run '" + tour_id + "' (tour undefined)");
            }
            Tour.log("Tour '" + tour_id + "' Begin from run method", true);
            var state = Tour.getState();
            if (state) {
                if (state.mode === "test") {
                    return Tour.error(false, "An other running tour has been detected all tours are now killed.");
                } else {
                    Tour.endTour();
                }
            }
            this.time = new Date().getTime();
            if (tour.path && !window.location.href.match(new RegExp("(" + Tour.getLang() + ")?" + tour.path + "#?$", "i"))) {
                var href = Tour.getLang() + tour.path;
                Tour.saveState(tour.id, mode || tour.mode, -1, 0);
                $(document).one("ajaxStop", Tour.running);
                window.location.href = href;
            } else {
                Tour.saveState(tour.id, mode || tour.mode, 0, 0);
                Tour.running();
            }
        },
        registerSteps: function(tour, mode) {
            if (tour.register) {
                return;
            }
            tour.register = true;
            for (var index = 0, len = tour.steps.length; index < len; index++) {
                var step = tour.steps[index];
                step.id = index;
                if (!step.waitNot && index > 0 && tour.steps[index - 1] && tour.steps[index - 1].popover && tour.steps[index - 1].popover.next) {
                    step.waitNot = '.popover.tour.fade.in:visible';
                }
                if (!step.waitFor && index > 0 && tour.steps[index - 1].snippet) {
                    step.waitFor = '.oe_overlay_options .oe_options:visible';
                }
                var snippet = step.element && step.element.match(/#oe_snippets (.*) \.oe_snippet_thumbnail/);
                if (snippet) {
                    step.snippet = snippet[1];
                } else if (step.snippet) {
                    step.element = '#oe_snippets ' + step.snippet + ' .oe_snippet_thumbnail';
                }
                if (!step.element) {
                    step.element = "body";
                    step.orphan = true;
                    step.backdrop = true;
                } else {
                    step.popover = step.popover || {};
                    step.popover.arrow = true;
                }
            }
            if (tour.steps[index - 1] && tour.steps[index - 1].popover && tour.steps[index - 1].popover.next) {
                var step = {
                    _title: "close popover and finish",
                    id: index,
                    waitNot: '.popover.tour.fade.in:visible'
                };
                tour.steps.push(step);
            }
            if (mode !== "test") {
                for (var index = 0, len = tour.steps.length; index < len; index++) {
                    var step = tour.steps[index];
                    step._title = step._title || step.title;
                    step.title = Tour.popoverTitle(tour, {
                        title: step._title
                    });
                    step.template = step.template || Tour.popover(step.popover);
                }
            }
        },
        closePopover: function() {
            if (Tour.$element) {
                Tour.$element.popover('destroy');
                Tour.$element.removeData("tour");
                Tour.$element.removeData("tour-step");
                $(".tour-backdrop").remove();
                $(".popover.tour").remove();
                Tour.$element = null;
            }
        },
        autoTogglePopover: function() {
            var state = Tour.getState();
            var step = state.step;
            if (Tour.$element && Tour.$element.is(":visible") && Tour.$element.data("tour") === state.id && Tour.$element.data("tour-step") === step.id) {
                Tour.repositionPopover();
                return;
            }
            if (step.busy) {
                return;
            }
            Tour.closePopover();
            var $element = $(step.element).first();
            if (!step.element || !$element.size() || !$element.is(":visible")) {
                return;
            }
            Tour.$element = $element;
            $element.data("tour", state.id);
            $element.data("tour-step", step.id);
            $element.popover({
                placement: step.placement || "auto",
                animation: true,
                trigger: "manual",
                title: step.title,
                content: step.content,
                html: true,
                container: "body",
                template: step.template,
                orphan: step.orphan
            }).popover("show");
            var $tip = $element.data("bs.popover").tip();
            if (step.orphan) {
                $tip.addClass("orphan");
            }
            var node = $element[0];
            var css;
            do {
                css = window.getComputedStyle(node);
                if (!css || css.position == "fixed") {
                    $tip.addClass("fixed");
                    break;
                }
            } while ((node = node.parentNode) && node !== document);
            if (step.backdrop) {
                $("body").append('<div class="tour-backdrop"></div>');
            }
            if (step.backdrop || $element.parents("#website-top-navbar, .oe_navbar, .modal").size()) {
                $tip.css("z-index", 2010);
            }
            $tip.find("button").one("click", function() {
                step.busy = true;
                if (!$(this).is("[data-role='next']")) {
                    clearTimeout(Tour.timer);
                    Tour.endTour();
                }
                Tour.closePopover();
            });
            Tour.repositionPopover();
        },
        repositionPopover: function() {
            var popover = Tour.$element.data("bs.popover");
            var $tip = popover.tip();
            if (popover.options.orphan) {
                return $tip.css("top", $(window).outerHeight() / 2 - $tip.outerHeight() / 2);
            }
            if (Tour.$element.parents("div").filter(function() {
                    return getComputedStyle(this).position === 'fixed';
                }).length) {
                var pos = popover.getPosition();
                var top = pos.top;
                if (popover.options.placement === "top") top -= $tip.height();
                if (popover.options.placement === "bottom") top += pos.height;
                $tip.css({
                    'top': top + 'px'
                });
            }
            var offsetBottom, offsetHeight, offsetRight, offsetWidth, originalLeft, originalTop, tipOffset;
            offsetWidth = $tip[0].offsetWidth;
            offsetHeight = $tip[0].offsetHeight;
            tipOffset = $tip.offset();
            originalLeft = tipOffset.left;
            originalTop = tipOffset.top;
            offsetBottom = $(document).outerHeight() - tipOffset.top - $tip.outerHeight();
            if (offsetBottom < 0) {
                tipOffset.top = tipOffset.top + offsetBottom;
            }
            offsetRight = $("html").outerWidth() - tipOffset.left - $tip.outerWidth();
            if (offsetRight < 0) {
                tipOffset.left = tipOffset.left + offsetRight;
            }
            if (tipOffset.top < 0) {
                tipOffset.top = 0;
            }
            if (tipOffset.left < 0) {
                tipOffset.left = 0;
            }
            $tip.offset(tipOffset);
            if (popover.options.placement === "bottom" || popover.options.placement === "top") {
                var left = Tour.$element.offset().left + Tour.$element.outerWidth() / 2 - tipOffset.left;
                popover.arrow().css("left", left ? left + "px" : "");
            } else if (popover.options.placement !== "auto") {
                var top = Tour.$element.offset().top + Tour.$element.outerHeight() / 2 - tipOffset.top;
                popover.arrow().css("top", top ? top + "px" : "");
            }
        },
        _load_template: false,
        load_template: function() {
            Tour._load_template = true;
            if (typeof QWeb2 === "undefined") return $.when();
            var def = $.Deferred();
            openerp.qweb.add_template('/web/static/src/xml/website.tour.xml', function(err) {
                if (err) {
                    def.reject(err);
                } else {
                    def.resolve();
                }
            });
            return def;
        },
        popoverTitle: function(tour, options) {
            return typeof QWeb2 !== "undefined" ? openerp.qweb.render('tour.popover_title', options) : options.title;
        },
        popover: function(options) {
            return typeof QWeb2 !== "undefined" ? openerp.qweb.render('tour.popover', options) : options.title;
        },
        getLang: function() {
            return $("html").attr("lang") ? "/" + $("html").attr("lang").replace(/-/, '_') : "";
        },
        getState: function() {
            var state = JSON.parse(localStorage.getItem("tour") || 'false') || {};
            if (state) {
                this.time = state.time;
            }
            var tour_id, mode, step_id;
            if (!state.id && window.location.href.indexOf("#tutorial.") > -1) {
                state = {
                    "id": window.location.href.match(/#tutorial\.(.*)=true/)[1],
                    "mode": "tutorial",
                    "step_id": 0
                };
                window.location.hash = "";
                Tour.log("Tour '" + state.id + "' Begin from url hash");
                Tour.saveState(state.id, state.mode, state.step_id, 0);
            }
            if (!state.id) {
                return;
            }
            state.tour = Tour.tours[state.id];
            state.step = state.tour && state.tour.steps[state.step_id === -1 ? 0 : state.step_id];
            return state;
        },
        log: function(message, add_user) {
            if (add_user) {
                var user = $(".navbar .dropdown:has(>.js_usermenu) a:first, .navbar .oe_topbar_name, .pos .username").text();
                if (!user && $('a[href*="/login"]')) user = 'Public User';
                message += " (" + (user || "").replace(/^\s*|\s*$/g, '') + ")";
            }
            console.log(message);
        },
        error: function(step, message) {
            var state = Tour.getState();
            console.log(state.tour.steps.slice());
            message += '\n tour: ' + state.id +
                (step ? '\n step: ' + step.id + ": '" + (step._title || step.title) + "'" : '') +
                '\n href: ' + window.location.href +
                '\n referrer: ' + document.referrer +
                (step ? '\n element: ' + Boolean(!step.element || ($(step.element).size() && $(step.element).is(":visible") && !$(step.element).is(":hidden"))) : '') +
                (step ? '\n waitNot: ' + Boolean(!step.waitNot || !$(step.waitNot).size()) : '') +
                (step ? '\n waitFor: ' + Boolean(!step.waitFor || $(step.waitFor).size()) : '') +
                "\n localStorage: " + JSON.stringify(localStorage) +
                '\n\n' + $("body").html();
            Tour.log(message, true);
            Tour.endTour();
        },
        lists: function() {
            var tour_ids = [];
            for (var k in Tour.tours) {
                tour_ids.push(k);
            }
            return tour_ids;
        },
        saveState: function(tour_id, mode, step_id, number, wait) {
            localStorage.setItem("tour", JSON.stringify({
                "id": tour_id,
                "mode": mode,
                "step_id": step_id || 0,
                "time": this.time,
                "number": number + 1,
                "wait": wait || 0
            }));
        },
        reset: function() {
            var state = Tour.getState();
            if (state && state.tour) {
                for (var k in state.tour.steps) {
                    state.tour.steps[k].busy = false;
                }
            }
            localStorage.removeItem("tour");
            clearTimeout(Tour.timer);
            clearTimeout(Tour.testtimer);
            Tour.closePopover();
            Tour.log("Tour reset");
        },
        running: function() {
            var state = Tour.getState();
            if (!state) return;
            else if (state.tour) {
                if (!Tour._load_template) {
                    Tour.load_template().then(Tour.running);
                    return;
                }
                Tour.log("Tour '" + state.id + "' is running", true);
                Tour.registerSteps(state.tour, state.mode);
                Tour.nextStep();
            } else {
                if (state.mode === "test" && state.wait >= 10) {
                    return Tour.error(state.step, "Tour '" + state.id + "' undefined");
                }
                Tour.saveState(state.id, state.mode, state.step_id, state.number - 1, state.wait + 1);
                Tour.log("Tour '" + state.id + "' wait for running (tour undefined)");
                setTimeout(Tour.running, Tour.retryRunningDelay);
            }
        },
        check: function(step) {
            return (step && (!step.element || ($(step.element).size() && $(step.element).is(":visible") && !$(step.element).is(":hidden"))) && (!step.waitNot || !$(step.waitNot).size()) && (!step.waitFor || $(step.waitFor).size()));
        },
        waitNextStep: function() {
            var state = Tour.getState();
            var time = new Date().getTime();
            var timer;
            var next = state.tour.steps[state.step.id + 1];
            var overlaps = state.mode === "test" ? Tour.errorDelay : 0;
            window.onbeforeunload = function() {
                clearTimeout(Tour.timer);
                clearTimeout(Tour.testtimer);
            };

            function checkNext() {
                if (!Tour.getState()) return;
                Tour.autoTogglePopover();
                clearTimeout(Tour.timer);
                if (Tour.check(next)) {
                    clearTimeout(Tour.currentTimer);
                    Tour.saveState(state.id, state.mode, state.step.id, 0);
                    setTimeout(function() {
                        Tour.nextStep(next);
                    }, Tour.defaultDelay);
                } else if (!overlaps || new Date().getTime() - time < overlaps) {
                    Tour.timer = setTimeout(checkNext, Tour.defaultDelay);
                } else {
                    return Tour.error(next, "Can't reach the next step");
                }
            }
            checkNext();
        },
        nextStep: function(step) {
            var state = Tour.getState();
            if (!state) {
                return;
            }
            step = step || state.step;
            var next = state.tour.steps[step.id + 1];
            if (state.mode === "test" && state.number > 3) {
                return Tour.error(next, "Cycling. Can't reach the next step");
            }
            Tour.saveState(state.id, state.mode, step.id, state.number);
            if (step.id !== state.step_id) {
                Tour.log("Tour '" + state.id + "' Step: '" + (step._title || step.title) + "' (" + (new Date().getTime() - this.time) + "ms)");
            }
            Tour.autoTogglePopover(true);
            if (step.onload) {
                step.onload();
            }
            if (next) {
                setTimeout(function() {
                    if (Tour.getState()) {
                        Tour.waitNextStep();
                    }
                    if (state.mode === "test") {
                        setTimeout(function() {
                            Tour.autoNextStep(state.tour, step);
                        }, Tour.defaultDelay);
                    }
                }, next.wait || 0);
            } else {
                setTimeout(function() {
                    Tour.autoNextStep(state.tour, step);
                }, Tour.defaultDelay);
                Tour.endTour();
            }
        },
        endTour: function() {
            var state = Tour.getState();
            var test = state.step && state.step.id >= state.tour.steps.length - 1;
            Tour.reset();
            if (test) {
                Tour.log("Tour '" + state.id + "' finish: ok");
                Tour.log('ok');
            } else {
                Tour.log("Tour '" + state.id + "' finish: error");
                Tour.log('error');
            }
        },
        autoNextStep: function(tour, step) {
            clearTimeout(Tour.testtimer);

            function autoStep() {
                if (!Tour.getState()) return;
                if (!step) return;
                if (step.autoComplete) {
                    step.autoComplete(tour);
                }
                $(".popover.tour [data-role='next']").click();
                var $element = $(step.element);
                if (!$element.size()) return;
                if (step.snippet) {
                    Tour.autoDragAndDropSnippet($element);
                } else if ($element.is(":visible")) {
                    $element.trigger($.Event("mouseenter", {
                        srcElement: $element[0]
                    }));
                    $element.trigger($.Event("mousedown", {
                        srcElement: $element[0]
                    }));
                    var evt = document.createEvent("MouseEvents");
                    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    $element[0].dispatchEvent(evt);
                    setTimeout(function() {
                        if (!Tour.getState()) return;
                        $element.trigger($.Event("mouseup", {
                            srcElement: $element[0]
                        }));
                        $element.trigger($.Event("mouseleave", {
                            srcElement: $element[0]
                        }));
                    }, 1000);
                }
                if (step.sampleText) {
                    $element.trigger($.Event("keydown", {
                        srcElement: $element
                    }));
                    if ($element.is("input")) {
                        $element.val(step.sampleText);
                    }
                    if ($element.is("select")) {
                        $element.find("[value='" + step.sampleText + "'], option:contains('" + step.sampleText + "')").attr("selected", true);
                        $element.val(step.sampleText);
                    } else {
                        $element.html(step.sampleText);
                    }
                    setTimeout(function() {
                        if (!Tour.getState()) return;
                        $element.trigger($.Event("keyup", {
                            srcElement: $element
                        }));
                        $element.trigger($.Event("change", {
                            srcElement: $element
                        }));
                    }, self.defaultDelay << 1);
                }
            }
            Tour.testtimer = setTimeout(autoStep, 100);
        },
        autoDragAndDropSnippet: function(selector) {
            var $thumbnail = $(selector).first();
            var thumbnailPosition = $thumbnail.position();
            $thumbnail.trigger($.Event("mousedown", {
                which: 1,
                pageX: thumbnailPosition.left,
                pageY: thumbnailPosition.top
            }));
            $thumbnail.trigger($.Event("mousemove", {
                which: 1,
                pageX: document.body.scrollWidth / 2,
                pageY: document.body.scrollHeight / 2
            }));
            var $dropZone = $(".oe_drop_zone").first();
            var dropPosition = $dropZone.position();
            $dropZone.trigger($.Event("mouseup", {
                which: 1,
                pageX: dropPosition.left,
                pageY: dropPosition.top
            }));
        }
    };
    openerp.Tour = Tour;
    $(document).ready(function() {
        if (Tour.autoRunning) {
            Tour.running();
        };
    });
}());