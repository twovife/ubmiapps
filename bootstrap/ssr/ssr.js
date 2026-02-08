import { jsx } from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
async function resolvePageComponent(path, pages) {
  for (const p2 of Array.isArray(path) ? path : [path]) {
    const page = pages[p2];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
function t(t4, r2) {
  for (var e2 = 0; e2 < r2.length; e2++) {
    var n2 = r2[e2];
    n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(t4, "symbol" == typeof (o2 = function(t5, r3) {
      if ("object" != typeof t5 || null === t5) return t5;
      var e3 = t5[Symbol.toPrimitive];
      if (void 0 !== e3) {
        var n3 = e3.call(t5, "string");
        if ("object" != typeof n3) return n3;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(t5);
    }(n2.key)) ? o2 : String(o2), n2);
  }
  var o2;
}
function r(r2, e2, n2) {
  return e2 && t(r2.prototype, e2), Object.defineProperty(r2, "prototype", { writable: false }), r2;
}
function e() {
  return e = Object.assign ? Object.assign.bind() : function(t4) {
    for (var r2 = 1; r2 < arguments.length; r2++) {
      var e2 = arguments[r2];
      for (var n2 in e2) Object.prototype.hasOwnProperty.call(e2, n2) && (t4[n2] = e2[n2]);
    }
    return t4;
  }, e.apply(this, arguments);
}
function n(t4) {
  return n = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t5) {
    return t5.__proto__ || Object.getPrototypeOf(t5);
  }, n(t4);
}
function o(t4, r2) {
  return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t5, r3) {
    return t5.__proto__ = r3, t5;
  }, o(t4, r2);
}
function i(t4, r2, e2) {
  return i = function() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if ("function" == typeof Proxy) return true;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      })), true;
    } catch (t5) {
      return false;
    }
  }() ? Reflect.construct.bind() : function(t5, r3, e3) {
    var n2 = [null];
    n2.push.apply(n2, r3);
    var i2 = new (Function.bind.apply(t5, n2))();
    return e3 && o(i2, e3.prototype), i2;
  }, i.apply(null, arguments);
}
function u(t4) {
  var r2 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
  return u = function(t5) {
    if (null === t5 || -1 === Function.toString.call(t5).indexOf("[native code]")) return t5;
    if ("function" != typeof t5) throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r2) {
      if (r2.has(t5)) return r2.get(t5);
      r2.set(t5, e2);
    }
    function e2() {
      return i(t5, arguments, n(this).constructor);
    }
    return e2.prototype = Object.create(t5.prototype, { constructor: { value: e2, enumerable: false, writable: true, configurable: true } }), o(e2, t5);
  }, u(t4);
}
var f = String.prototype.replace, a = /%20/g, c = "RFC3986", l = { default: c, formatters: { RFC1738: function(t4) {
  return f.call(t4, a, "+");
}, RFC3986: function(t4) {
  return String(t4);
} }, RFC1738: "RFC1738" }, s = Object.prototype.hasOwnProperty, v = Array.isArray, p = function() {
  for (var t4 = [], r2 = 0; r2 < 256; ++r2) t4.push("%" + ((r2 < 16 ? "0" : "") + r2.toString(16)).toUpperCase());
  return t4;
}(), y = function(t4, r2) {
  for (var e2 = r2 && r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, n2 = 0; n2 < t4.length; ++n2) void 0 !== t4[n2] && (e2[n2] = t4[n2]);
  return e2;
}, d = { arrayToObject: y, assign: function(t4, r2) {
  return Object.keys(r2).reduce(function(t5, e2) {
    return t5[e2] = r2[e2], t5;
  }, t4);
}, combine: function(t4, r2) {
  return [].concat(t4, r2);
}, compact: function(t4) {
  for (var r2 = [{ obj: { o: t4 }, prop: "o" }], e2 = [], n2 = 0; n2 < r2.length; ++n2) for (var o2 = r2[n2], i2 = o2.obj[o2.prop], u2 = Object.keys(i2), f2 = 0; f2 < u2.length; ++f2) {
    var a2 = u2[f2], c2 = i2[a2];
    "object" == typeof c2 && null !== c2 && -1 === e2.indexOf(c2) && (r2.push({ obj: i2, prop: a2 }), e2.push(c2));
  }
  return function(t5) {
    for (; t5.length > 1; ) {
      var r3 = t5.pop(), e3 = r3.obj[r3.prop];
      if (v(e3)) {
        for (var n3 = [], o3 = 0; o3 < e3.length; ++o3) void 0 !== e3[o3] && n3.push(e3[o3]);
        r3.obj[r3.prop] = n3;
      }
    }
  }(r2), t4;
}, decode: function(t4, r2, e2) {
  var n2 = t4.replace(/\+/g, " ");
  if ("iso-8859-1" === e2) return n2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n2);
  } catch (t5) {
    return n2;
  }
}, encode: function(t4, r2, e2, n2, o2) {
  if (0 === t4.length) return t4;
  var i2 = t4;
  if ("symbol" == typeof t4 ? i2 = Symbol.prototype.toString.call(t4) : "string" != typeof t4 && (i2 = String(t4)), "iso-8859-1" === e2) return escape(i2).replace(/%u[0-9a-f]{4}/gi, function(t5) {
    return "%26%23" + parseInt(t5.slice(2), 16) + "%3B";
  });
  for (var u2 = "", f2 = 0; f2 < i2.length; ++f2) {
    var a2 = i2.charCodeAt(f2);
    45 === a2 || 46 === a2 || 95 === a2 || 126 === a2 || a2 >= 48 && a2 <= 57 || a2 >= 65 && a2 <= 90 || a2 >= 97 && a2 <= 122 || o2 === l.RFC1738 && (40 === a2 || 41 === a2) ? u2 += i2.charAt(f2) : a2 < 128 ? u2 += p[a2] : a2 < 2048 ? u2 += p[192 | a2 >> 6] + p[128 | 63 & a2] : a2 < 55296 || a2 >= 57344 ? u2 += p[224 | a2 >> 12] + p[128 | a2 >> 6 & 63] + p[128 | 63 & a2] : (a2 = 65536 + ((1023 & a2) << 10 | 1023 & i2.charCodeAt(f2 += 1)), u2 += p[240 | a2 >> 18] + p[128 | a2 >> 12 & 63] + p[128 | a2 >> 6 & 63] + p[128 | 63 & a2]);
  }
  return u2;
}, isBuffer: function(t4) {
  return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
}, isRegExp: function(t4) {
  return "[object RegExp]" === Object.prototype.toString.call(t4);
}, maybeMap: function(t4, r2) {
  if (v(t4)) {
    for (var e2 = [], n2 = 0; n2 < t4.length; n2 += 1) e2.push(r2(t4[n2]));
    return e2;
  }
  return r2(t4);
}, merge: function t2(r2, e2, n2) {
  if (!e2) return r2;
  if ("object" != typeof e2) {
    if (v(r2)) r2.push(e2);
    else {
      if (!r2 || "object" != typeof r2) return [r2, e2];
      (n2 && (n2.plainObjects || n2.allowPrototypes) || !s.call(Object.prototype, e2)) && (r2[e2] = true);
    }
    return r2;
  }
  if (!r2 || "object" != typeof r2) return [r2].concat(e2);
  var o2 = r2;
  return v(r2) && !v(e2) && (o2 = y(r2, n2)), v(r2) && v(e2) ? (e2.forEach(function(e3, o3) {
    if (s.call(r2, o3)) {
      var i2 = r2[o3];
      i2 && "object" == typeof i2 && e3 && "object" == typeof e3 ? r2[o3] = t2(i2, e3, n2) : r2.push(e3);
    } else r2[o3] = e3;
  }), r2) : Object.keys(e2).reduce(function(r3, o3) {
    var i2 = e2[o3];
    return r3[o3] = s.call(r3, o3) ? t2(r3[o3], i2, n2) : i2, r3;
  }, o2);
} }, b = Object.prototype.hasOwnProperty, h = { brackets: function(t4) {
  return t4 + "[]";
}, comma: "comma", indices: function(t4, r2) {
  return t4 + "[" + r2 + "]";
}, repeat: function(t4) {
  return t4;
} }, g = Array.isArray, m = String.prototype.split, j = Array.prototype.push, w = function(t4, r2) {
  j.apply(t4, g(r2) ? r2 : [r2]);
}, O = Date.prototype.toISOString, E = l.default, R = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: d.encode, encodeValuesOnly: false, format: E, formatter: l.formatters[E], indices: false, serializeDate: function(t4) {
  return O.call(t4);
}, skipNulls: false, strictNullHandling: false }, S = function t3(r2, e2, n2, o2, i2, u2, f2, a2, c2, l2, s2, v2, p2, y2) {
  var b2, h2 = r2;
  if ("function" == typeof f2 ? h2 = f2(e2, h2) : h2 instanceof Date ? h2 = l2(h2) : "comma" === n2 && g(h2) && (h2 = d.maybeMap(h2, function(t4) {
    return t4 instanceof Date ? l2(t4) : t4;
  })), null === h2) {
    if (o2) return u2 && !p2 ? u2(e2, R.encoder, y2, "key", s2) : e2;
    h2 = "";
  }
  if ("string" == typeof (b2 = h2) || "number" == typeof b2 || "boolean" == typeof b2 || "symbol" == typeof b2 || "bigint" == typeof b2 || d.isBuffer(h2)) {
    if (u2) {
      var j2 = p2 ? e2 : u2(e2, R.encoder, y2, "key", s2);
      if ("comma" === n2 && p2) {
        for (var O2 = m.call(String(h2), ","), E2 = "", S2 = 0; S2 < O2.length; ++S2) E2 += (0 === S2 ? "" : ",") + v2(u2(O2[S2], R.encoder, y2, "value", s2));
        return [v2(j2) + "=" + E2];
      }
      return [v2(j2) + "=" + v2(u2(h2, R.encoder, y2, "value", s2))];
    }
    return [v2(e2) + "=" + v2(String(h2))];
  }
  var k2, x2 = [];
  if (void 0 === h2) return x2;
  if ("comma" === n2 && g(h2)) k2 = [{ value: h2.length > 0 ? h2.join(",") || null : void 0 }];
  else if (g(f2)) k2 = f2;
  else {
    var T2 = Object.keys(h2);
    k2 = a2 ? T2.sort(a2) : T2;
  }
  for (var N2 = 0; N2 < k2.length; ++N2) {
    var C2 = k2[N2], A2 = "object" == typeof C2 && void 0 !== C2.value ? C2.value : h2[C2];
    if (!i2 || null !== A2) {
      var D2 = g(h2) ? "function" == typeof n2 ? n2(e2, C2) : e2 : e2 + (c2 ? "." + C2 : "[" + C2 + "]");
      w(x2, t3(A2, D2, n2, o2, i2, u2, f2, a2, c2, l2, s2, v2, p2, y2));
    }
  }
  return x2;
}, k = Object.prototype.hasOwnProperty, x = Array.isArray, T = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: d.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, N = function(t4) {
  return t4.replace(/&#(\d+);/g, function(t5, r2) {
    return String.fromCharCode(parseInt(r2, 10));
  });
}, C = function(t4, r2) {
  return t4 && "string" == typeof t4 && r2.comma && t4.indexOf(",") > -1 ? t4.split(",") : t4;
}, A = function(t4, r2, e2, n2) {
  if (t4) {
    var o2 = e2.allowDots ? t4.replace(/\.([^.[]+)/g, "[$1]") : t4, i2 = /(\[[^[\]]*])/g, u2 = e2.depth > 0 && /(\[[^[\]]*])/.exec(o2), f2 = u2 ? o2.slice(0, u2.index) : o2, a2 = [];
    if (f2) {
      if (!e2.plainObjects && k.call(Object.prototype, f2) && !e2.allowPrototypes) return;
      a2.push(f2);
    }
    for (var c2 = 0; e2.depth > 0 && null !== (u2 = i2.exec(o2)) && c2 < e2.depth; ) {
      if (c2 += 1, !e2.plainObjects && k.call(Object.prototype, u2[1].slice(1, -1)) && !e2.allowPrototypes) return;
      a2.push(u2[1]);
    }
    return u2 && a2.push("[" + o2.slice(u2.index) + "]"), function(t5, r3, e3, n3) {
      for (var o3 = n3 ? r3 : C(r3, e3), i3 = t5.length - 1; i3 >= 0; --i3) {
        var u3, f3 = t5[i3];
        if ("[]" === f3 && e3.parseArrays) u3 = [].concat(o3);
        else {
          u3 = e3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var a3 = "[" === f3.charAt(0) && "]" === f3.charAt(f3.length - 1) ? f3.slice(1, -1) : f3, c3 = parseInt(a3, 10);
          e3.parseArrays || "" !== a3 ? !isNaN(c3) && f3 !== a3 && String(c3) === a3 && c3 >= 0 && e3.parseArrays && c3 <= e3.arrayLimit ? (u3 = [])[c3] = o3 : "__proto__" !== a3 && (u3[a3] = o3) : u3 = { 0: o3 };
        }
        o3 = u3;
      }
      return o3;
    }(a2, r2, e2, n2);
  }
}, D = function(t4, r2) {
  var e2 = /* @__PURE__ */ function(t5) {
    return T;
  }();
  if ("" === t4 || null == t4) return e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n2 = "string" == typeof t4 ? function(t5, r3) {
    var e3, n3 = {}, o3 = (r3.ignoreQueryPrefix ? t5.replace(/^\?/, "") : t5).split(r3.delimiter, Infinity === r3.parameterLimit ? void 0 : r3.parameterLimit), i3 = -1, u3 = r3.charset;
    if (r3.charsetSentinel) for (e3 = 0; e3 < o3.length; ++e3) 0 === o3[e3].indexOf("utf8=") && ("utf8=%E2%9C%93" === o3[e3] ? u3 = "utf-8" : "utf8=%26%2310003%3B" === o3[e3] && (u3 = "iso-8859-1"), i3 = e3, e3 = o3.length);
    for (e3 = 0; e3 < o3.length; ++e3) if (e3 !== i3) {
      var f3, a3, c2 = o3[e3], l2 = c2.indexOf("]="), s2 = -1 === l2 ? c2.indexOf("=") : l2 + 1;
      -1 === s2 ? (f3 = r3.decoder(c2, T.decoder, u3, "key"), a3 = r3.strictNullHandling ? null : "") : (f3 = r3.decoder(c2.slice(0, s2), T.decoder, u3, "key"), a3 = d.maybeMap(C(c2.slice(s2 + 1), r3), function(t6) {
        return r3.decoder(t6, T.decoder, u3, "value");
      })), a3 && r3.interpretNumericEntities && "iso-8859-1" === u3 && (a3 = N(a3)), c2.indexOf("[]=") > -1 && (a3 = x(a3) ? [a3] : a3), n3[f3] = k.call(n3, f3) ? d.combine(n3[f3], a3) : a3;
    }
    return n3;
  }(t4, e2) : t4, o2 = e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i2 = Object.keys(n2), u2 = 0; u2 < i2.length; ++u2) {
    var f2 = i2[u2], a2 = A(f2, n2[f2], e2, "string" == typeof t4);
    o2 = d.merge(o2, a2, e2);
  }
  return d.compact(o2);
}, $ = /* @__PURE__ */ function() {
  function t4(t5, r2, e3) {
    var n2, o2;
    this.name = t5, this.definition = r2, this.bindings = null != (n2 = r2.bindings) ? n2 : {}, this.wheres = null != (o2 = r2.wheres) ? o2 : {}, this.config = e3;
  }
  var e2 = t4.prototype;
  return e2.matchesUrl = function(t5) {
    var r2 = this;
    if (!this.definition.methods.includes("GET")) return false;
    var e3 = this.template.replace(/(\/?){([^}?]*)(\??)}/g, function(t6, e4, n3, o3) {
      var i3, u3 = "(?<" + n3 + ">" + ((null == (i3 = r2.wheres[n3]) ? void 0 : i3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+") + ")";
      return o3 ? "(" + e4 + u3 + ")?" : "" + e4 + u3;
    }).replace(/^\w+:\/\//, ""), n2 = t5.replace(/^\w+:\/\//, "").split("?"), o2 = n2[0], i2 = n2[1], u2 = new RegExp("^" + e3 + "/?$").exec(decodeURI(o2));
    if (u2) {
      for (var f2 in u2.groups) u2.groups[f2] = "string" == typeof u2.groups[f2] ? decodeURIComponent(u2.groups[f2]) : u2.groups[f2];
      return { params: u2.groups, query: D(i2) };
    }
    return false;
  }, e2.compile = function(t5) {
    var r2 = this;
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, function(e3, n2, o2) {
      var i2, u2;
      if (!o2 && [null, void 0].includes(t5[n2])) throw new Error("Ziggy error: '" + n2 + "' parameter is required for route '" + r2.name + "'.");
      if (r2.wheres[n2] && !new RegExp("^" + (o2 ? "(" + r2.wheres[n2] + ")?" : r2.wheres[n2]) + "$").test(null != (u2 = t5[n2]) ? u2 : "")) throw new Error("Ziggy error: '" + n2 + "' parameter does not match required format '" + r2.wheres[n2] + "' for route '" + r2.name + "'.");
      return encodeURI(null != (i2 = t5[n2]) ? i2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.origin + "//", this.origin + "/").replace(/\/+$/, "") : this.template;
  }, r(t4, [{ key: "template", get: function() {
    var t5 = (this.origin + "/" + this.definition.uri).replace(/\/+$/, "");
    return "" === t5 ? "/" : t5;
  } }, { key: "origin", get: function() {
    return this.config.absolute ? this.definition.domain ? "" + this.config.url.match(/^\w+:\/\//)[0] + this.definition.domain + (this.config.port ? ":" + this.config.port : "") : this.config.url : "";
  } }, { key: "parameterSegments", get: function() {
    var t5, r2;
    return null != (t5 = null == (r2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : r2.map(function(t6) {
      return { name: t6.replace(/{|\??}/g, ""), required: !/\?}$/.test(t6) };
    })) ? t5 : [];
  } }]), t4;
}(), F = /* @__PURE__ */ function(t4) {
  var n2, i2;
  function u2(r2, n3, o2, i3) {
    var u3;
    if (void 0 === o2 && (o2 = true), (u3 = t4.call(this) || this).t = null != i3 ? i3 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, u3.t = e({}, u3.t, { absolute: o2 }), r2) {
      if (!u3.t.routes[r2]) throw new Error("Ziggy error: route '" + r2 + "' is not in the route list.");
      u3.i = new $(r2, u3.t.routes[r2], u3.t), u3.u = u3.l(n3);
    }
    return u3;
  }
  i2 = t4, (n2 = u2).prototype = Object.create(i2.prototype), n2.prototype.constructor = n2, o(n2, i2);
  var f2 = u2.prototype;
  return f2.toString = function() {
    var t5 = this, r2 = Object.keys(this.u).filter(function(r3) {
      return !t5.i.parameterSegments.some(function(t6) {
        return t6.name === r3;
      });
    }).filter(function(t6) {
      return "_query" !== t6;
    }).reduce(function(r3, n3) {
      var o2;
      return e({}, r3, ((o2 = {})[n3] = t5.u[n3], o2));
    }, {});
    return this.i.compile(this.u) + function(t6, r3) {
      var e2, n3 = t6, o2 = function(t7) {
        if (!t7) return R;
        if (null != t7.encoder && "function" != typeof t7.encoder) throw new TypeError("Encoder has to be a function.");
        var r4 = t7.charset || R.charset;
        if (void 0 !== t7.charset && "utf-8" !== t7.charset && "iso-8859-1" !== t7.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var e3 = l.default;
        if (void 0 !== t7.format) {
          if (!b.call(l.formatters, t7.format)) throw new TypeError("Unknown format option provided.");
          e3 = t7.format;
        }
        var n4 = l.formatters[e3], o3 = R.filter;
        return ("function" == typeof t7.filter || g(t7.filter)) && (o3 = t7.filter), { addQueryPrefix: "boolean" == typeof t7.addQueryPrefix ? t7.addQueryPrefix : R.addQueryPrefix, allowDots: void 0 === t7.allowDots ? R.allowDots : !!t7.allowDots, charset: r4, charsetSentinel: "boolean" == typeof t7.charsetSentinel ? t7.charsetSentinel : R.charsetSentinel, delimiter: void 0 === t7.delimiter ? R.delimiter : t7.delimiter, encode: "boolean" == typeof t7.encode ? t7.encode : R.encode, encoder: "function" == typeof t7.encoder ? t7.encoder : R.encoder, encodeValuesOnly: "boolean" == typeof t7.encodeValuesOnly ? t7.encodeValuesOnly : R.encodeValuesOnly, filter: o3, format: e3, formatter: n4, serializeDate: "function" == typeof t7.serializeDate ? t7.serializeDate : R.serializeDate, skipNulls: "boolean" == typeof t7.skipNulls ? t7.skipNulls : R.skipNulls, sort: "function" == typeof t7.sort ? t7.sort : null, strictNullHandling: "boolean" == typeof t7.strictNullHandling ? t7.strictNullHandling : R.strictNullHandling };
      }(r3);
      "function" == typeof o2.filter ? n3 = (0, o2.filter)("", n3) : g(o2.filter) && (e2 = o2.filter);
      var i3 = [];
      if ("object" != typeof n3 || null === n3) return "";
      var u3 = h[r3 && r3.arrayFormat in h ? r3.arrayFormat : r3 && "indices" in r3 ? r3.indices ? "indices" : "repeat" : "indices"];
      e2 || (e2 = Object.keys(n3)), o2.sort && e2.sort(o2.sort);
      for (var f3 = 0; f3 < e2.length; ++f3) {
        var a2 = e2[f3];
        o2.skipNulls && null === n3[a2] || w(i3, S(n3[a2], a2, u3, o2.strictNullHandling, o2.skipNulls, o2.encode ? o2.encoder : null, o2.filter, o2.sort, o2.allowDots, o2.serializeDate, o2.format, o2.formatter, o2.encodeValuesOnly, o2.charset));
      }
      var c2 = i3.join(o2.delimiter), s2 = true === o2.addQueryPrefix ? "?" : "";
      return o2.charsetSentinel && (s2 += "iso-8859-1" === o2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), c2.length > 0 ? s2 + c2 : "";
    }(e({}, r2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: function(t6, r3) {
      return "boolean" == typeof t6 ? Number(t6) : r3(t6);
    } });
  }, f2.v = function(t5) {
    var r2 = this;
    t5 ? this.t.absolute && t5.startsWith("/") && (t5 = this.p().host + t5) : t5 = this.h();
    var n3 = {}, o2 = Object.entries(this.t.routes).find(function(e2) {
      return n3 = new $(e2[0], e2[1], r2.t).matchesUrl(t5);
    }) || [void 0, void 0];
    return e({ name: o2[0] }, n3, { route: o2[1] });
  }, f2.h = function() {
    var t5 = this.p(), r2 = t5.pathname, e2 = t5.search;
    return (this.t.absolute ? t5.host + r2 : r2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + e2;
  }, f2.current = function(t5, r2) {
    var n3 = this.v(), o2 = n3.name, i3 = n3.params, u3 = n3.query, f3 = n3.route;
    if (!t5) return o2;
    var a2 = new RegExp("^" + t5.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$").test(o2);
    if ([null, void 0].includes(r2) || !a2) return a2;
    var c2 = new $(o2, f3, this.t);
    r2 = this.l(r2, c2);
    var l2 = e({}, i3, u3);
    return !(!Object.values(r2).every(function(t6) {
      return !t6;
    }) || Object.values(l2).some(function(t6) {
      return void 0 !== t6;
    })) || function t6(r3, e2) {
      return Object.entries(r3).every(function(r4) {
        var n4 = r4[0], o3 = r4[1];
        return Array.isArray(o3) && Array.isArray(e2[n4]) ? o3.every(function(t7) {
          return e2[n4].includes(t7);
        }) : "object" == typeof o3 && "object" == typeof e2[n4] && null !== o3 && null !== e2[n4] ? t6(o3, e2[n4]) : e2[n4] == o3;
      });
    }(r2, l2);
  }, f2.p = function() {
    var t5, r2, e2, n3, o2, i3, u3 = "undefined" != typeof window ? window.location : {}, f3 = u3.host, a2 = u3.pathname, c2 = u3.search;
    return { host: null != (t5 = null == (r2 = this.t.location) ? void 0 : r2.host) ? t5 : void 0 === f3 ? "" : f3, pathname: null != (e2 = null == (n3 = this.t.location) ? void 0 : n3.pathname) ? e2 : void 0 === a2 ? "" : a2, search: null != (o2 = null == (i3 = this.t.location) ? void 0 : i3.search) ? o2 : void 0 === c2 ? "" : c2 };
  }, f2.has = function(t5) {
    return Object.keys(this.t.routes).includes(t5);
  }, f2.l = function(t5, r2) {
    var n3 = this;
    void 0 === t5 && (t5 = {}), void 0 === r2 && (r2 = this.i), null != t5 || (t5 = {}), t5 = ["string", "number"].includes(typeof t5) ? [t5] : t5;
    var o2 = r2.parameterSegments.filter(function(t6) {
      return !n3.t.defaults[t6.name];
    });
    if (Array.isArray(t5)) t5 = t5.reduce(function(t6, r3, n4) {
      var i4, u3;
      return e({}, t6, o2[n4] ? ((i4 = {})[o2[n4].name] = r3, i4) : "object" == typeof r3 ? r3 : ((u3 = {})[r3] = "", u3));
    }, {});
    else if (1 === o2.length && !t5[o2[0].name] && (t5.hasOwnProperty(Object.values(r2.bindings)[0]) || t5.hasOwnProperty("id"))) {
      var i3;
      (i3 = {})[o2[0].name] = t5, t5 = i3;
    }
    return e({}, this.g(r2), this.m(t5, r2));
  }, f2.g = function(t5) {
    var r2 = this;
    return t5.parameterSegments.filter(function(t6) {
      return r2.t.defaults[t6.name];
    }).reduce(function(t6, n3, o2) {
      var i3, u3 = n3.name;
      return e({}, t6, ((i3 = {})[u3] = r2.t.defaults[u3], i3));
    }, {});
  }, f2.m = function(t5, r2) {
    var n3 = r2.bindings, o2 = r2.parameterSegments;
    return Object.entries(t5).reduce(function(t6, r3) {
      var i3, u3, f3 = r3[0], a2 = r3[1];
      if (!a2 || "object" != typeof a2 || Array.isArray(a2) || !o2.some(function(t7) {
        return t7.name === f3;
      })) return e({}, t6, ((u3 = {})[f3] = a2, u3));
      if (!a2.hasOwnProperty(n3[f3])) {
        if (!a2.hasOwnProperty("id")) throw new Error("Ziggy error: object passed as '" + f3 + "' parameter is missing route model binding key '" + n3[f3] + "'.");
        n3[f3] = "id";
      }
      return e({}, t6, ((i3 = {})[f3] = a2[n3[f3]], i3));
    }, {});
  }, f2.valueOf = function() {
    return this.toString();
  }, f2.check = function(t5) {
    return this.has(t5);
  }, r(u2, [{ key: "params", get: function() {
    var t5 = this.v();
    return e({}, t5.params, t5.query);
  } }]), u2;
}(/* @__PURE__ */ u(String));
function P(t4, r2, e2, n2) {
  var o2 = new F(t4, r2, e2, n2);
  return t4 ? o2.toString() : o2;
}
const appName = "Laravel";
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* @__PURE__ */ Object.assign({ "./Pages/AdminPanel/Components/AssignRoles.jsx": () => import("./assets/AssignRoles-D6mUC1iA.js"), "./Pages/AdminPanel/Components/MaintenerWorker.jsx": () => import("./assets/MaintenerWorker-l9-VQa8t.js"), "./Pages/AdminPanel/Components/Permission.jsx": () => import("./assets/Permission-DDvAOj-O.js"), "./Pages/AdminPanel/Components/Role.jsx": () => import("./assets/Role-twcrNh6z.js"), "./Pages/AdminPanel/Index.jsx": () => import("./assets/Index-3bHjger-.js"), "./Pages/AdminPanel/MonitoringStaff.jsx": () => import("./assets/MonitoringStaff-C0vxQ5FR.js"), "./Pages/Administrasi/ManPower/GenerateUser.jsx": () => import("./assets/GenerateUser-CG_MjEG4.js"), "./Pages/Administrasi/ManPower/ManPower.jsx": () => import("./assets/ManPower-jMzDMVYU.js"), "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-BGC3lnBb.js"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-B62fVdfp.js"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-OXpzYBQc.js"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-DSBrUNpx.js"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-DzdNQU-7.js"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-Ct35X4Sc.js"), "./Pages/BukuTransaksi/Action.jsx": () => import("./assets/Action-B3kswNf7.js"), "./Pages/BukuTransaksi/BukuTransaksi.jsx": () => import("./assets/BukuTransaksi-BJdAem84.js"), "./Pages/BukuTransaksi/BukuTransaksiKepala.jsx": () => import("./assets/BukuTransaksiKepala-CJkN4_u1.js"), "./Pages/BukuTransaksi/Components/Acc.jsx": () => import("./assets/Acc-CtGTC4IG.js"), "./Pages/BukuTransaksi/Components/ActionTable.jsx": () => import("./assets/ActionTable-BoZpZ8hB.js"), "./Pages/BukuTransaksi/Components/Approval.jsx": () => import("./assets/Approval-Cj7OCxD0.js"), "./Pages/BukuTransaksi/Components/ChangeDetail.jsx": () => import("./assets/ChangeDetail-D6hxBMKl.js"), "./Pages/BukuTransaksi/Components/DetailRiwayat.jsx": () => import("./assets/DetailRiwayat-Cu24LX1N.js"), "./Pages/BukuTransaksi/Components/ReStatus.jsx": () => import("./assets/ReStatus-CuPsPicK.js"), "./Pages/BukuTransaksi/Components/RemoveLoan.jsx": () => import("./assets/RemoveLoan-CDbYPCRH.js"), "./Pages/BukuTransaksi/Rencana.jsx": () => import("./assets/Rencana-BgQjZ8W6.js"), "./Pages/Dashboard.jsx": () => import("./assets/Dashboard-Dzb6Bwto.js"), "./Pages/Kasir/Rekap/Components/Action.jsx": () => import("./assets/Action-B7Gl9tFE.js"), "./Pages/Kasir/Rekap/Components/TableRekap.jsx": () => import("./assets/TableRekap-D8lehBfC.js"), "./Pages/Kasir/Rekap/Components/TableRekapKasir.jsx": () => import("./assets/TableRekapKasir-D1hP0HXY.js"), "./Pages/Kasir/Rekap/Components/TableRekapPerMantri.jsx": () => import("./assets/TableRekapPerMantri-BNQdYg-I.js"), "./Pages/Kasir/Rekap/Components/TunaiMantri.jsx": () => import("./assets/TunaiMantri-Cd1XmTmd.js"), "./Pages/Kasir/Rekap/Permantri.jsx": () => import("./assets/Permantri-BG9wFtrG.js"), "./Pages/Kasir/Rekap/RekapContent.jsx": () => import("./assets/RekapContent-BIZ7eLl7.js"), "./Pages/Kasir/RencanaDrop/Content.jsx": () => import("./assets/Content-C3ogxioF.js"), "./Pages/Kasir/RencanaDrop/TableRekap.jsx": () => import("./assets/TableRekap-BXZ_zJtu.js"), "./Pages/MobileApps/Angsuran/Index.jsx": () => import("./assets/Index-C0734sUL.js"), "./Pages/MobileApps/Angsuran/SearchByDate.jsx": () => import("./assets/SearchByDate-ZUbtqFuH.js"), "./Pages/MobileApps/BukuAngsuranMantri/Index.jsx": () => import("./assets/Index-CIvjHHUu.js"), "./Pages/MobileApps/BukuTransaksiKepala/TransaksiMantri.jsx": () => import("./assets/TransaksiMantri-BCmgcubr.js"), "./Pages/MobileApps/BukuTransaksiMantri/TransaksiMantri.jsx": () => import("./assets/TransaksiMantri-TLFO5N6n.js"), "./Pages/MobileApps/Create/Index.jsx": () => import("./assets/Index-DioB3W4N.js"), "./Pages/MobileApps/Index.jsx": () => import("./assets/Index-Cy5B7re0.js"), "./Pages/MobileApps/Rekap/RekapDua.jsx": () => import("./assets/RekapDua-C4H_bGmi.js"), "./Pages/MobileApps/Rekap/RekapPerMantri.jsx": () => import("./assets/RekapPerMantri-Be4h8h3s.js"), "./Pages/MobileApps/Rekap/RekapSatu.jsx": () => import("./assets/RekapSatu-DdFT4hG-.js"), "./Pages/MobileApps/RencanaDropKepala/Index.jsx": () => import("./assets/Index-r9YzKZnM.js"), "./Pages/NewAngsuran/Angsuran.jsx": () => import("./assets/Angsuran-D0XJQnK1.js"), "./Pages/NewAngsuran/AngsuranByDate.jsx": () => import("./assets/AngsuranByDate-Bvsqj2Nf.js"), "./Pages/NewAngsuran/Components/Action.jsx": () => import("./assets/Action-CZFUwQdw.js"), "./Pages/NewAngsuran/Components/Action22.jsx": () => import("./assets/Action22-DRFHcJS2.js"), "./Pages/NewAngsuran/Components/AngsuranByDateTable.jsx": () => import("./assets/AngsuranByDateTable-CqqAQg3D.js"), "./Pages/NewAngsuran/Components/AngsuranTable.jsx": () => import("./assets/AngsuranTable-C8vVbImC.js"), "./Pages/NewAngsuran/Components/AngsuranTableMobile.jsx": () => import("./assets/AngsuranTableMobile-DWew5ng7.js"), "./Pages/NewAngsuran/Components/ApprovalAkhir.jsx": () => import("./assets/ApprovalAkhir-BKii_Fbh.js"), "./Pages/NewAngsuran/Components/BayarAngsuran.jsx": () => import("./assets/BayarAngsuran-Daoj1Mle.js"), "./Pages/NewAngsuran/Components/BukuStorting.jsx": () => import("./assets/BukuStorting-BJsWpnp0.js"), "./Pages/NewAngsuran/Components/BukuStortingMobile.jsx": () => import("./assets/BukuStortingMobile-C0TnEIP5.js"), "./Pages/NewAngsuran/Components/ButtonAngsuran.jsx": () => import("./assets/ButtonAngsuran-B3tUEJFO.js"), "./Pages/NewAngsuran/Components/DeleteAngsuran.jsx": () => import("./assets/DeleteAngsuran-3Bs-fcCi.js"), "./Pages/NewAngsuran/Components/DeleteLoan.jsx": () => import("./assets/DeleteLoan-BRMUEAf1.js"), "./Pages/NewAngsuran/Components/JenisNasabah.jsx": () => import("./assets/JenisNasabah-CaYZthxZ.js"), "./Pages/NewAngsuran/Components/Pengajuan.jsx": () => import("./assets/Pengajuan-CCPOcjv6.js"), "./Pages/NewAngsuran/Components/PengajuanLama.jsx": () => import("./assets/PengajuanLama-CPWXFCy0.js"), "./Pages/NewAngsuran/Components/SyncAngsuran.jsx": () => import("./assets/SyncAngsuran-DEL4wamB.js"), "./Pages/NewAngsuran/Components/WhiteOff.jsx": () => import("./assets/WhiteOff-CmM5sBlW.js"), "./Pages/NewLoan/BatchUpload.jsx": () => import("./assets/BatchUpload-CWnYbMm6.js"), "./Pages/NewLoan/BatchUploadx.jsx": () => import("./assets/BatchUploadx-DzycAOGs.js"), "./Pages/NewLoan/Components/RiwayatPengajuan.jsx": () => import("./assets/RiwayatPengajuan-C1LEAz5f.js"), "./Pages/NewLoan/Components/RiwayatPengajuanLain.jsx": () => import("./assets/RiwayatPengajuanLain-C26ipk4u.js"), "./Pages/NewLoan/Components/RiwayatPengajuanMacet.jsx": () => import("./assets/RiwayatPengajuanMacet-4YfinBSn.js"), "./Pages/NewLoan/Components/RiwayatPengajuanNonBranch.jsx": () => import("./assets/RiwayatPengajuanNonBranch-D9ociZ2u.js"), "./Pages/NewLoan/Components/RiwayatPengajuanOri.jsx": () => import("./assets/RiwayatPengajuanOri-CcouajAp.js"), "./Pages/NewLoan/NewNasabah.jsx": () => import("./assets/NewNasabah-CTZlMGRG.js"), "./Pages/Profile/Edit.jsx": () => import("./assets/Edit-VjIaqrGN.js"), "./Pages/Profile/Partials/DeleteUserForm.jsx": () => import("./assets/DeleteUserForm-BAvS6V3C.js"), "./Pages/Profile/Partials/UpdatePasswordForm.jsx": () => import("./assets/UpdatePasswordForm-BINw7Pni.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": () => import("./assets/UpdateProfileInformationForm-C_BkfLV9.js"), "./Pages/SuperUser/BatchUpdate.jsx": () => import("./assets/BatchUpdate-B3heYqdu.js"), "./Pages/SuperUser/Components/NewCustomer.jsx": () => import("./assets/NewCustomer-DLrjyqsZ.js"), "./Pages/SuperUser/Components/OldCustomer.jsx": () => import("./assets/OldCustomer-CHEizQGR.js"), "./Pages/WebView/Angsuran/Index.jsx": () => import("./assets/Index-DWLGkYd-.js"), "./Pages/WebView/Angsuran/SearchByDate.jsx": () => import("./assets/SearchByDate-DHmgSdUp.js"), "./Pages/WebView/BukuTransaksi/BatchUpload.jsx": () => import("./assets/BatchUpload-D0zqkvh4.js"), "./Pages/WebView/BukuTransaksi/Create.jsx": () => import("./assets/Create-DHGEWTAu.js"), "./Pages/WebView/BukuTransaksi/FastCreateV2.jsx": () => import("./assets/FastCreateV2-C6rZxynV.js"), "./Pages/WebView/BukuTransaksi/InputMacet.jsx": () => import("./assets/InputMacet-DeYTI0bz.js"), "./Pages/WebView/BukuTransaksi/TransaksiMantri.jsx": () => import("./assets/TransaksiMantri-D94QaJVA.js"), "./Pages/WebView/ManPower/Index.jsx": () => import("./assets/Index-k6KZVSLs.js"), "./Pages/WebView/Rekap/RekapDua.jsx": () => import("./assets/RekapDua-CiELutPE.js"), "./Pages/WebView/Rekap/RekapPerMantri.jsx": () => import("./assets/RekapPerMantri-CzrVQFHW.js"), "./Pages/WebView/Rekap/RekapSatu.jsx": () => import("./assets/RekapSatu-CdiVgfRJ.js"), "./Pages/WebView/RencanaDropKepala/Index.jsx": () => import("./assets/Index-C9PjGr8J.js"), "./Pages/Welcome.jsx": () => import("./assets/Welcome-C0juehjj.js") })),
    setup: ({ App, props }) => {
      global.route = (name, params, absolute) => P(name, params, absolute, {
        ...page.props.ziggy,
        location: new URL(page.props.ziggy.location)
      });
      return /* @__PURE__ */ jsx(App, { ...props });
    }
  })
);
