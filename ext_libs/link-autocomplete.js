/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/@editorjs/link-autocomplete@0.1.0/dist/link-autocomplete.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
/*! For license information please see link-autocomplete.js.LICENSE.txt */
!(function (e, t) {
    "object" == typeof exports && "object" == typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? (exports.LinkAutocomplete = t()) : (e.LinkAutocomplete = t());
})(self, function () {
    return (() => {
        var e = {
                580: (e) => {
                    window,
                        (e.exports = (function (e) {
                            var t = {};
                            function n(i) {
                                if (t[i]) return t[i].exports;
                                var o = (t[i] = { i, l: !1, exports: {} });
                                return e[i].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
                            }
                            return (
                                (n.m = e),
                                (n.c = t),
                                (n.d = function (e, t, i) {
                                    n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
                                }),
                                (n.r = function (e) {
                                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
                                }),
                                (n.t = function (e, t) {
                                    if ((1 & t && (e = n(e)), 8 & t)) return e;
                                    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                                    var i = Object.create(null);
                                    if ((n.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e))
                                        for (var o in e)
                                            n.d(
                                                i,
                                                o,
                                                function (t) {
                                                    return e[t];
                                                }.bind(null, o)
                                            );
                                    return i;
                                }),
                                (n.n = function (e) {
                                    var t =
                                        e && e.__esModule
                                            ? function () {
                                                  return e.default;
                                              }
                                            : function () {
                                                  return e;
                                              };
                                    return n.d(t, "a", t), t;
                                }),
                                (n.o = function (e, t) {
                                    return Object.prototype.hasOwnProperty.call(e, t);
                                }),
                                (n.p = "/"),
                                n((n.s = 0))
                            );
                        })([
                            function (e, t, n) {
                                "use strict";
                                n(1),
                                    (e.exports = (function () {
                                        var e = n(6),
                                            t = null;
                                        return {
                                            show: function (n) {
                                                if (n.message) {
                                                    !(function () {
                                                        if (t) return !0;
                                                        (t = e.getWrapper()), document.body.appendChild(t);
                                                    })();
                                                    var i = null,
                                                        o = n.time || 8e3;
                                                    switch (n.type) {
                                                        case "confirm":
                                                            i = e.confirm(n);
                                                            break;
                                                        case "prompt":
                                                            i = e.prompt(n);
                                                            break;
                                                        default:
                                                            (i = e.alert(n)),
                                                                window.setTimeout(function () {
                                                                    i.remove();
                                                                }, o);
                                                    }
                                                    t.appendChild(i), i.classList.add("cdx-notify--bounce-in");
                                                }
                                            },
                                        };
                                    })());
                            },
                            function (e, t, n) {
                                var i = n(2);
                                "string" == typeof i && (i = [[e.i, i, ""]]);
                                n(4)(i, { hmr: !0, transform: void 0, insertInto: void 0 }), i.locals && (e.exports = i.locals);
                            },
                            function (e, t, n) {
                                (e.exports = n(3)(!1)).push([
                                    e.i,
                                    '.cdx-notify--error{background:#fffbfb!important}.cdx-notify--error::before{background:#fb5d5d!important}.cdx-notify__input{max-width:130px;padding:5px 10px;background:#f7f7f7;border:0;border-radius:3px;font-size:13px;color:#656b7c;outline:0}.cdx-notify__input:-ms-input-placeholder{color:#656b7c}.cdx-notify__input::placeholder{color:#656b7c}.cdx-notify__input:focus:-ms-input-placeholder{color:rgba(101,107,124,.3)}.cdx-notify__input:focus::placeholder{color:rgba(101,107,124,.3)}.cdx-notify__button{border:none;border-radius:3px;font-size:13px;padding:5px 10px;cursor:pointer}.cdx-notify__button:last-child{margin-left:10px}.cdx-notify__button--cancel{background:#f2f5f7;box-shadow:0 2px 1px 0 rgba(16,19,29,0);color:#656b7c}.cdx-notify__button--cancel:hover{background:#eee}.cdx-notify__button--confirm{background:#34c992;box-shadow:0 1px 1px 0 rgba(18,49,35,.05);color:#fff}.cdx-notify__button--confirm:hover{background:#33b082}.cdx-notify__btns-wrapper{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;margin-top:5px}.cdx-notify__cross{position:absolute;top:5px;right:5px;width:10px;height:10px;padding:5px;opacity:.54;cursor:pointer}.cdx-notify__cross::after,.cdx-notify__cross::before{content:\'\';position:absolute;left:9px;top:5px;height:12px;width:2px;background:#575d67}.cdx-notify__cross::before{transform:rotate(-45deg)}.cdx-notify__cross::after{transform:rotate(45deg)}.cdx-notify__cross:hover{opacity:1}.cdx-notifies{position:fixed;z-index:2;bottom:20px;left:20px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif}.cdx-notify{position:relative;width:220px;margin-top:15px;padding:13px 16px;background:#fff;box-shadow:0 11px 17px 0 rgba(23,32,61,.13);border-radius:5px;font-size:14px;line-height:1.4em;word-wrap:break-word}.cdx-notify::before{content:\'\';position:absolute;display:block;top:0;left:0;width:3px;height:calc(100% - 6px);margin:3px;border-radius:5px;background:0 0}@keyframes bounceIn{0%{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1.05)}70%{transform:scale(.9)}100%{transform:scale(1)}}.cdx-notify--bounce-in{animation-name:bounceIn;animation-duration:.6s;animation-iteration-count:1}.cdx-notify--success{background:#fafffe!important}.cdx-notify--success::before{background:#41ffb1!important}',
                                    "",
                                ]);
                            },
                            function (e, t) {
                                e.exports = function (e) {
                                    var t = [];
                                    return (
                                        (t.toString = function () {
                                            return this.map(function (t) {
                                                var n = (function (e, t) {
                                                    var n,
                                                        i = e[1] || "",
                                                        o = e[3];
                                                    if (!o) return i;
                                                    if (t && "function" == typeof btoa) {
                                                        var r = ((n = o), "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(n)))) + " */"),
                                                            a = o.sources.map(function (e) {
                                                                return "/*# sourceURL=" + o.sourceRoot + e + " */";
                                                            });
                                                        return [i].concat(a).concat([r]).join("\n");
                                                    }
                                                    return [i].join("\n");
                                                })(t, e);
                                                return t[2] ? "@media " + t[2] + "{" + n + "}" : n;
                                            }).join("");
                                        }),
                                        (t.i = function (e, n) {
                                            "string" == typeof e && (e = [[null, e, ""]]);
                                            for (var i = {}, o = 0; o < this.length; o++) {
                                                var r = this[o][0];
                                                "number" == typeof r && (i[r] = !0);
                                            }
                                            for (o = 0; o < e.length; o++) {
                                                var a = e[o];
                                                ("number" == typeof a[0] && i[a[0]]) || (n && !a[2] ? (a[2] = n) : n && (a[2] = "(" + a[2] + ") and (" + n + ")"), t.push(a));
                                            }
                                        }),
                                        t
                                    );
                                };
                            },
                            function (e, t, n) {
                                var i,
                                    o,
                                    r = {},
                                    a =
                                        ((i = function () {
                                            return window && document && document.all && !window.atob;
                                        }),
                                        function () {
                                            return void 0 === o && (o = i.apply(this, arguments)), o;
                                        }),
                                    s = (function (e) {
                                        var t = {};
                                        return function (e) {
                                            if ("function" == typeof e) return e();
                                            if (void 0 === t[e]) {
                                                var n = function (e) {
                                                    return document.querySelector(e);
                                                }.call(this, e);
                                                if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement)
                                                    try {
                                                        n = n.contentDocument.head;
                                                    } catch (e) {
                                                        n = null;
                                                    }
                                                t[e] = n;
                                            }
                                            return t[e];
                                        };
                                    })(),
                                    c = null,
                                    l = 0,
                                    d = [],
                                    p = n(5);
                                function u(e, t) {
                                    for (var n = 0; n < e.length; n++) {
                                        var i = e[n],
                                            o = r[i.id];
                                        if (o) {
                                            o.refs++;
                                            for (var a = 0; a < o.parts.length; a++) o.parts[a](i.parts[a]);
                                            for (; a < i.parts.length; a++) o.parts.push(v(i.parts[a], t));
                                        } else {
                                            var s = [];
                                            for (a = 0; a < i.parts.length; a++) s.push(v(i.parts[a], t));
                                            r[i.id] = { id: i.id, refs: 1, parts: s };
                                        }
                                    }
                                }
                                function f(e, t) {
                                    for (var n = [], i = {}, o = 0; o < e.length; o++) {
                                        var r = e[o],
                                            a = t.base ? r[0] + t.base : r[0],
                                            s = { css: r[1], media: r[2], sourceMap: r[3] };
                                        i[a] ? i[a].parts.push(s) : n.push((i[a] = { id: a, parts: [s] }));
                                    }
                                    return n;
                                }
                                function h(e, t) {
                                    var n = s(e.insertInto);
                                    if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
                                    var i = d[d.length - 1];
                                    if ("top" === e.insertAt) i ? (i.nextSibling ? n.insertBefore(t, i.nextSibling) : n.appendChild(t)) : n.insertBefore(t, n.firstChild), d.push(t);
                                    else if ("bottom" === e.insertAt) n.appendChild(t);
                                    else {
                                        if ("object" != typeof e.insertAt || !e.insertAt.before)
                                            throw new Error(
                                                "[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n"
                                            );
                                        var o = s(e.insertInto + " " + e.insertAt.before);
                                        n.insertBefore(t, o);
                                    }
                                }
                                function m(e) {
                                    if (null === e.parentNode) return !1;
                                    e.parentNode.removeChild(e);
                                    var t = d.indexOf(e);
                                    t >= 0 && d.splice(t, 1);
                                }
                                function g(e) {
                                    var t = document.createElement("style");
                                    return void 0 === e.attrs.type && (e.attrs.type = "text/css"), b(t, e.attrs), h(e, t), t;
                                }
                                function b(e, t) {
                                    Object.keys(t).forEach(function (n) {
                                        e.setAttribute(n, t[n]);
                                    });
                                }
                                function v(e, t) {
                                    var n, i, o, r;
                                    if (t.transform && e.css) {
                                        if (!(r = t.transform(e.css))) return function () {};
                                        e.css = r;
                                    }
                                    if (t.singleton) {
                                        var a = l++;
                                        (n = c || (c = g(t))), (i = y.bind(null, n, a, !1)), (o = y.bind(null, n, a, !0));
                                    } else
                                        e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa
                                            ? ((n = (function (e) {
                                                  var t = document.createElement("link");
                                                  return void 0 === e.attrs.type && (e.attrs.type = "text/css"), (e.attrs.rel = "stylesheet"), b(t, e.attrs), h(e, t), t;
                                              })(t)),
                                              (i = function (e, t, n) {
                                                  var i = n.css,
                                                      o = n.sourceMap,
                                                      r = void 0 === t.convertToAbsoluteUrls && o;
                                                  (t.convertToAbsoluteUrls || r) && (i = p(i)), o && (i += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */");
                                                  var a = new Blob([i], { type: "text/css" }),
                                                      s = e.href;
                                                  (e.href = URL.createObjectURL(a)), s && URL.revokeObjectURL(s);
                                              }.bind(null, n, t)),
                                              (o = function () {
                                                  m(n), n.href && URL.revokeObjectURL(n.href);
                                              }))
                                            : ((n = g(t)),
                                              (i = function (e, t) {
                                                  var n = t.css,
                                                      i = t.media;
                                                  if ((i && e.setAttribute("media", i), e.styleSheet)) e.styleSheet.cssText = n;
                                                  else {
                                                      for (; e.firstChild; ) e.removeChild(e.firstChild);
                                                      e.appendChild(document.createTextNode(n));
                                                  }
                                              }.bind(null, n)),
                                              (o = function () {
                                                  m(n);
                                              }));
                                    return (
                                        i(e),
                                        function (t) {
                                            if (t) {
                                                if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                                                i((e = t));
                                            } else o();
                                        }
                                    );
                                }
                                e.exports = function (e, t) {
                                    if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
                                    ((t = t || {}).attrs = "object" == typeof t.attrs ? t.attrs : {}),
                                        t.singleton || "boolean" == typeof t.singleton || (t.singleton = a()),
                                        t.insertInto || (t.insertInto = "head"),
                                        t.insertAt || (t.insertAt = "bottom");
                                    var n = f(e, t);
                                    return (
                                        u(n, t),
                                        function (e) {
                                            for (var i = [], o = 0; o < n.length; o++) {
                                                var a = n[o];
                                                (s = r[a.id]).refs--, i.push(s);
                                            }
                                            for (e && u(f(e, t), t), o = 0; o < i.length; o++) {
                                                var s;
                                                if (0 === (s = i[o]).refs) {
                                                    for (var c = 0; c < s.parts.length; c++) s.parts[c]();
                                                    delete r[s.id];
                                                }
                                            }
                                        }
                                    );
                                };
                                var k,
                                    x =
                                        ((k = []),
                                        function (e, t) {
                                            return (k[e] = t), k.filter(Boolean).join("\n");
                                        });
                                function y(e, t, n, i) {
                                    var o = n ? "" : i.css;
                                    if (e.styleSheet) e.styleSheet.cssText = x(t, o);
                                    else {
                                        var r = document.createTextNode(o),
                                            a = e.childNodes;
                                        a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(r, a[t]) : e.appendChild(r);
                                    }
                                }
                            },
                            function (e, t) {
                                e.exports = function (e) {
                                    var t = "undefined" != typeof window && window.location;
                                    if (!t) throw new Error("fixUrls requires window.location");
                                    if (!e || "string" != typeof e) return e;
                                    var n = t.protocol + "//" + t.host,
                                        i = n + t.pathname.replace(/\/[^\/]*$/, "/");
                                    return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (e, t) {
                                        var o,
                                            r = t
                                                .trim()
                                                .replace(/^"(.*)"$/, function (e, t) {
                                                    return t;
                                                })
                                                .replace(/^'(.*)'$/, function (e, t) {
                                                    return t;
                                                });
                                        return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r)
                                            ? e
                                            : ((o = 0 === r.indexOf("//") ? r : 0 === r.indexOf("/") ? n + r : i + r.replace(/^\.\//, "")), "url(" + JSON.stringify(o) + ")");
                                    });
                                };
                            },
                            function (e, t, n) {
                                "use strict";
                                var i, o, r, a, s, c;
                                e.exports =
                                    ("cdx-notifies",
                                    (i = "cdx-notify"),
                                    (o = "cdx-notify__cross"),
                                    (r = "cdx-notify__button--confirm"),
                                    "cdx-notify__button--cancel",
                                    "cdx-notify__input",
                                    (a = "cdx-notify__button"),
                                    (s = "cdx-notify__btns-wrapper"),
                                    {
                                        alert: (c = function (e) {
                                            var t = document.createElement("DIV"),
                                                n = document.createElement("DIV"),
                                                r = e.message,
                                                a = e.style;
                                            return t.classList.add(i), a && t.classList.add(i + "--" + a), (t.innerHTML = r), n.classList.add(o), n.addEventListener("click", t.remove.bind(t)), t.appendChild(n), t;
                                        }),
                                        confirm: function (e) {
                                            var t = c(e),
                                                n = document.createElement("div"),
                                                i = document.createElement("button"),
                                                l = document.createElement("button"),
                                                d = t.querySelector("." + o),
                                                p = e.cancelHandler,
                                                u = e.okHandler;
                                            return (
                                                n.classList.add(s),
                                                (i.innerHTML = e.okText || "Confirm"),
                                                (l.innerHTML = e.cancelText || "Cancel"),
                                                i.classList.add(a),
                                                l.classList.add(a),
                                                i.classList.add(r),
                                                l.classList.add("cdx-notify__button--cancel"),
                                                p && "function" == typeof p && (l.addEventListener("click", p), d.addEventListener("click", p)),
                                                u && "function" == typeof u && i.addEventListener("click", u),
                                                i.addEventListener("click", t.remove.bind(t)),
                                                l.addEventListener("click", t.remove.bind(t)),
                                                n.appendChild(i),
                                                n.appendChild(l),
                                                t.appendChild(n),
                                                t
                                            );
                                        },
                                        prompt: function (e) {
                                            var t = c(e),
                                                n = document.createElement("div"),
                                                i = document.createElement("button"),
                                                l = document.createElement("input"),
                                                d = t.querySelector("." + o),
                                                p = e.cancelHandler,
                                                u = e.okHandler;
                                            return (
                                                n.classList.add(s),
                                                (i.innerHTML = e.okText || "Ok"),
                                                i.classList.add(a),
                                                i.classList.add(r),
                                                l.classList.add("cdx-notify__input"),
                                                e.placeholder && l.setAttribute("placeholder", e.placeholder),
                                                e.default && (l.value = e.default),
                                                e.inputType && (l.type = e.inputType),
                                                p && "function" == typeof p && d.addEventListener("click", p),
                                                u &&
                                                    "function" == typeof u &&
                                                    i.addEventListener("click", function () {
                                                        u(l.value);
                                                    }),
                                                i.addEventListener("click", t.remove.bind(t)),
                                                n.appendChild(l),
                                                n.appendChild(i),
                                                t.appendChild(n),
                                                t
                                            );
                                        },
                                        getWrapper: function () {
                                            var e = document.createElement("DIV");
                                            return e.classList.add("cdx-notifies"), e;
                                        },
                                    });
                            },
                        ]));
                },
                384: (e, t, n) => {
                    "use strict";
                    n.d(t, { Z: () => r });
                    var i = n(645),
                        o = n.n(i)()(function (e) {
                            return e[1];
                        });
                    o.push([
                        e.id,
                        ".ce-link-autocomplete__icon-wrapper svg {\n        display: block;\n    }\n    .ce-link-autocomplete__actions-wrapper {\n        border-top: 1px solid #E8E8EB;\n        width: 400px;\n    }\n    .ce-link-autocomplete__field {\n        position: relative;\n    }\n    .ce-link-autocomplete__field-input {\n            width: calc(100% - 12px);\n            margin: 6px;\n            padding: 7px 10px;\n            border-radius: 5px;\n            border: solid 1px #E8E8EB;\n            background-color: rgba(232, 232, 235, 0.49);\n            outline: none;\n            -webkit-appearance: none;\n            box-sizing: border-box;\n            font-size: 14px;\n            font-weight: 500;\n            letter-spacing: -0.15px;\n            font-family: inherit;\n        }\n    .ce-link-autocomplete__field-input::placeholder {\n                color: #7B7E89;\n            }\n    /**\n         * Loader created in DOM but hidden bu default\n         */\n    .ce-link-autocomplete__field::after {\n\n            content: '';\n            position: absolute;\n            right: 16px;\n            top: 50%;\n            margin-top: calc(14px / 2 * -1);\n\n            width: 14px;\n            height: 14px;\n            border: 2px solid rgba(29, 32, 43, 0.3);\n            border-top: 2px solid transparent;\n            border-radius: 50%;\n            opacity: 0;\n            will-change: transform, opacity;\n            box-sizing: border-box;\n        }\n    .ce-link-autocomplete__field--loading::after {\n            animation: ce-link-autocomplete__spin 1s linear infinite;\n            opacity: 1;\n        }\n    .ce-link-autocomplete__items {\n        margin: 0 6px;\n    }\n    .ce-link-autocomplete__search-item {\n        outline: none;\n        border: 0;\n        border-radius: 5px;\n        font-size: 14px;\n        padding: 7px 10px;\n        margin-bottom: 6px;\n        box-sizing: border-box;\n        cursor: pointer;\n    }\n    .ce-link-autocomplete__search-item:not(:last-of-type) {\n        }\n    .ce-link-autocomplete__search-item:hover, .ce-link-autocomplete__search-item--selected {\n            background-color: rgba(232, 232, 235, 0.49);\n        }\n    .ce-link-autocomplete__search-item-name {\n            font-size: 14px;\n            line-height: 16px;\n\n            overflow:hidden;\n            white-space:nowrap;\n            text-overflow: ellipsis;\n        }\n    .ce-link-autocomplete__search-item-description {\n            color: #7b7e89;\n\n            font-size: 12px;\n            line-height: 36px;\n            margin-top: 1px;\n\n            overflow:hidden;\n            white-space:nowrap;\n            text-overflow: ellipsis;\n        }\n    .ce-link-autocomplete__hidden {\n        display: none;\n    }\n    .ce-link-autocomplete__link-data-wrapper {\n            width: 200px;\n            outline: none;\n            border: 0;\n            border-radius: 4px;\n            font-size: 13px;\n            padding: 10px;\n            box-sizing: border-box;\n        }\n    .ce-link-autocomplete__link-data-title-wrapper {\n            margin-bottom: 10px;\n        }\n    .ce-link-autocomplete__link-data-name {\n            font-size: 14px;\n            line-height: 16px;\n\n            overflow:hidden;\n            white-space:nowrap;\n            text-overflow: ellipsis;\n        }\n    .ce-link-autocomplete__link-data-description {\n            color: #7b7e89;\n\n            font-size: 12px;\n            line-height: 16px;\n            margin-top: 1px;\n\n            overflow:hidden;\n            white-space:nowrap;\n            text-overflow: ellipsis;\n        }\n    .ce-link-autocomplete__link-data-url {\n            display: block;\n\n            overflow:hidden;\n            white-space:nowrap;\n            text-overflow: ellipsis;\n        }\n\n@keyframes ce-link-autocomplete__spin {\n    0% { transform: rotate(0deg); }\n    100% { transform: rotate(360deg); }\n}\n",
                        "",
                    ]);
                    const r = o;
                },
                645: (e) => {
                    "use strict";
                    e.exports = function (e) {
                        var t = [];
                        return (
                            (t.toString = function () {
                                return this.map(function (t) {
                                    var n = e(t);
                                    return t[2] ? "@media ".concat(t[2], " {").concat(n, "}") : n;
                                }).join("");
                            }),
                            (t.i = function (e, n, i) {
                                "string" == typeof e && (e = [[null, e, ""]]);
                                var o = {};
                                if (i)
                                    for (var r = 0; r < this.length; r++) {
                                        var a = this[r][0];
                                        null != a && (o[a] = !0);
                                    }
                                for (var s = 0; s < e.length; s++) {
                                    var c = [].concat(e[s]);
                                    (i && o[c[0]]) || (n && (c[2] ? (c[2] = "".concat(n, " and ").concat(c[2])) : (c[2] = n)), t.push(c));
                                }
                            }),
                            t
                        );
                    };
                },
                379: (e, t, n) => {
                    "use strict";
                    var i,
                        o = (function () {
                            var e = {};
                            return function (t) {
                                if (void 0 === e[t]) {
                                    var n = document.querySelector(t);
                                    if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement)
                                        try {
                                            n = n.contentDocument.head;
                                        } catch (e) {
                                            n = null;
                                        }
                                    e[t] = n;
                                }
                                return e[t];
                            };
                        })(),
                        r = [];
                    function a(e) {
                        for (var t = -1, n = 0; n < r.length; n++)
                            if (r[n].identifier === e) {
                                t = n;
                                break;
                            }
                        return t;
                    }
                    function s(e, t) {
                        for (var n = {}, i = [], o = 0; o < e.length; o++) {
                            var s = e[o],
                                c = t.base ? s[0] + t.base : s[0],
                                l = n[c] || 0,
                                d = "".concat(c, " ").concat(l);
                            n[c] = l + 1;
                            var p = a(d),
                                u = { css: s[1], media: s[2], sourceMap: s[3] };
                            -1 !== p ? (r[p].references++, r[p].updater(u)) : r.push({ identifier: d, updater: m(u, t), references: 1 }), i.push(d);
                        }
                        return i;
                    }
                    function c(e) {
                        var t = document.createElement("style"),
                            i = e.attributes || {};
                        if (void 0 === i.nonce) {
                            var r = n.nc;
                            r && (i.nonce = r);
                        }
                        if (
                            (Object.keys(i).forEach(function (e) {
                                t.setAttribute(e, i[e]);
                            }),
                            "function" == typeof e.insert)
                        )
                            e.insert(t);
                        else {
                            var a = o(e.insert || "head");
                            if (!a) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                            a.appendChild(t);
                        }
                        return t;
                    }
                    var l,
                        d =
                            ((l = []),
                            function (e, t) {
                                return (l[e] = t), l.filter(Boolean).join("\n");
                            });
                    function p(e, t, n, i) {
                        var o = n ? "" : i.media ? "@media ".concat(i.media, " {").concat(i.css, "}") : i.css;
                        if (e.styleSheet) e.styleSheet.cssText = d(t, o);
                        else {
                            var r = document.createTextNode(o),
                                a = e.childNodes;
                            a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(r, a[t]) : e.appendChild(r);
                        }
                    }
                    function u(e, t, n) {
                        var i = n.css,
                            o = n.media,
                            r = n.sourceMap;
                        if (
                            (o ? e.setAttribute("media", o) : e.removeAttribute("media"),
                            r && "undefined" != typeof btoa && (i += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r)))), " */")),
                            e.styleSheet)
                        )
                            e.styleSheet.cssText = i;
                        else {
                            for (; e.firstChild; ) e.removeChild(e.firstChild);
                            e.appendChild(document.createTextNode(i));
                        }
                    }
                    var f = null,
                        h = 0;
                    function m(e, t) {
                        var n, i, o;
                        if (t.singleton) {
                            var r = h++;
                            (n = f || (f = c(t))), (i = p.bind(null, n, r, !1)), (o = p.bind(null, n, r, !0));
                        } else
                            (n = c(t)),
                                (i = u.bind(null, n, t)),
                                (o = function () {
                                    !(function (e) {
                                        if (null === e.parentNode) return !1;
                                        e.parentNode.removeChild(e);
                                    })(n);
                                });
                        return (
                            i(e),
                            function (t) {
                                if (t) {
                                    if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                                    i((e = t));
                                } else o();
                            }
                        );
                    }
                    e.exports = function (e, t) {
                        (t = t || {}).singleton || "boolean" == typeof t.singleton || (t.singleton = (void 0 === i && (i = Boolean(window && document && document.all && !window.atob)), i));
                        var n = s((e = e || []), t);
                        return function (e) {
                            if (((e = e || []), "[object Array]" === Object.prototype.toString.call(e))) {
                                for (var i = 0; i < n.length; i++) {
                                    var o = a(n[i]);
                                    r[o].references--;
                                }
                                for (var c = s(e, t), l = 0; l < n.length; l++) {
                                    var d = a(n[l]);
                                    0 === r[d].references && (r[d].updater(), r.splice(d, 1));
                                }
                                n = c;
                            }
                        };
                    };
                },
            },
            t = {};
        function n(i) {
            if (t[i]) return t[i].exports;
            var o = (t[i] = { id: i, exports: {} });
            return e[i](o, o.exports, n), o.exports;
        }
        (n.n = (e) => {
            var t = e && e.__esModule ? () => e.default : () => e;
            return n.d(t, { a: t }), t;
        }),
            (n.d = (e, t) => {
                for (var i in t) n.o(t, i) && !n.o(e, i) && Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
            }),
            (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t));
        var i = {};
        return (
            (() => {
                "use strict";
                n.d(i, { default: () => f });
                var e = n(379),
                    t = n.n(e),
                    o = n(384);
                t()(o.Z, { insert: "head", singleton: !1 }), o.Z.locals;
                var r = n(580),
                    a = n.n(r);
                class s {
                    static isNumber(e) {
                        return "number" == typeof e;
                    }
                    static isArray(e) {
                        return Array.isArray(e);
                    }
                    static isUrl(e) {
                        return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
                            e
                        );
                    }
                }
                function c(e, t = null, n = {}) {
                    const i = document.createElement(e);
                    Array.isArray(t) ? i.classList.add(...t) : t && i.classList.add(t);
                    for (const e in n) Object.prototype.hasOwnProperty.call(n, e) && (i[e] = n[e]);
                    return i;
                }
                function l(e) {
                    return !(!e || !e.tagName) && ["INPUT", "TEXTAREA"].includes(e.tagName);
                }
                class d {
                    constructor() {
                        (this.selection = null), (this.savedSelectionRange = null), (this.isFakeBackgroundEnabled = !1), (this.commandBackground = "backColor"), (this.commandRemoveFormat = "removeFormat");
                    }
                    static get anchorNode() {
                        const e = window.getSelection();
                        return e ? e.anchorNode : null;
                    }
                    static get anchorElement() {
                        const e = window.getSelection();
                        if (!e) return null;
                        const t = e.anchorNode;
                        return t ? ((n = t), !s.isNumber(n) && n && n.nodeType && n.nodeType === Node.ELEMENT_NODE ? t : t.parentElement) : null;
                        var n;
                    }
                    static get anchorOffset() {
                        const e = window.getSelection();
                        return e ? e.anchorOffset : null;
                    }
                    static get isCollapsed() {
                        const e = window.getSelection();
                        return e ? e.isCollapsed : null;
                    }
                    static get isSelectionExists() {
                        return !!d.get().anchorNode;
                    }
                    static get range() {
                        const e = window.getSelection();
                        return e && e.rangeCount ? e.getRangeAt(0) : null;
                    }
                    static get rect() {
                        let e,
                            t = document.selection,
                            n = { x: 0, y: 0, width: 0, height: 0 };
                        if (t && "Control" !== t.type) return (e = t.createRange()), (n.x = e.boundingLeft), (n.y = e.boundingTop), (n.width = e.boundingWidth), (n.height = e.boundingHeight), n;
                        if (!window.getSelection) return console.warn("Method window.getSelection is not supported"), n;
                        if (((t = window.getSelection()), null === t.rangeCount || isNaN(t.rangeCount))) return console.warn("Method SelectionUtils.rangeCount is not supported"), n;
                        if (0 === t.rangeCount) return n;
                        if (((e = t.getRangeAt(0).cloneRange()), e.getBoundingClientRect && (n = e.getBoundingClientRect()), 0 === n.x && 0 === n.y)) {
                            const t = document.createElement("span");
                            if (t.getBoundingClientRect) {
                                t.appendChild(document.createTextNode("​")), e.insertNode(t), (n = t.getBoundingClientRect());
                                const i = t.parentNode;
                                i.removeChild(t), i.normalize();
                            }
                        }
                        return n;
                    }
                    static get text() {
                        return window.getSelection ? window.getSelection().toString() : "";
                    }
                    static get() {
                        return window.getSelection();
                    }
                    static setCursor(e, t = 0) {
                        const n = document.createRange(),
                            i = window.getSelection();
                        if (l(e)) {
                            if (
                                !(function (e) {
                                    let t = !0;
                                    if (l(e))
                                        switch (e.type) {
                                            case "file":
                                            case "checkbox":
                                            case "radio":
                                            case "hidden":
                                            case "submit":
                                            case "button":
                                            case "image":
                                            case "reset":
                                                t = !1;
                                        }
                                    else t = "true" === e.contentEditable;
                                    return t;
                                })(e)
                            )
                                return;
                            return e.focus(), (e.selectionStart = e.selectionEnd = t), e.getBoundingClientRect();
                        }
                        return n.setStart(e, t), n.setEnd(e, t), i.removeAllRanges(), i.addRange(n), n.getBoundingClientRect();
                    }
                    removeFakeBackground() {
                        this.isFakeBackgroundEnabled && ((this.isFakeBackgroundEnabled = !1), document.execCommand(this.commandRemoveFormat));
                    }
                    setFakeBackground() {
                        document.execCommand(this.commandBackground, !1, "#a8d6ff"), (this.isFakeBackgroundEnabled = !0);
                    }
                    save() {
                        this.savedSelectionRange = d.range;
                    }
                    restore() {
                        if (!this.savedSelectionRange) return;
                        const e = window.getSelection();
                        e.removeAllRanges(), e.addRange(this.savedSelectionRange);
                    }
                    clearSaved() {
                        this.savedSelectionRange = null;
                    }
                    collapseToEnd() {
                        const e = window.getSelection(),
                            t = document.createRange();
                        t.selectNodeContents(e.focusNode), t.collapse(!1), e.removeAllRanges(), e.addRange(t);
                    }
                    findParentTag(e, t, n = 10) {
                        const i = window.getSelection();
                        let o = null;
                        return i && i.anchorNode && i.focusNode
                            ? ([i.anchorNode, i.focusNode].forEach((i) => {
                                  let r = n;
                                  for (; r > 0 && i.parentNode && (i.tagName !== e || ((o = i), t && i.classList && !i.classList.contains(t) && (o = null), !o)); ) (i = i.parentNode), r--;
                              }),
                              o)
                            : null;
                    }
                    expandToTag(e) {
                        const t = window.getSelection();
                        t.removeAllRanges();
                        const n = document.createRange();
                        n.selectNodeContents(e), t.addRange(n);
                    }
                }
                const p = "Cannot process search request because of",
                    u = "Next";
                class f {
                    static get isInline() {
                        return !0;
                    }
                    static get sanitize() {
                        return { a: !0 };
                    }
                    static get title() {
                        return "Link Autocomplete";
                    }
                    get shortcut() {
                        return "CMD+K";
                    }
                    static get CSS() {
                        return {
                            iconWrapper: "ce-link-autocomplete__icon-wrapper",
                            hidden: "ce-link-autocomplete__hidden",
                            actionsWrapper: "ce-link-autocomplete__actions-wrapper",
                            field: "ce-link-autocomplete__field",
                            fieldLoading: "ce-link-autocomplete__field--loading",
                            fieldInput: "ce-link-autocomplete__field-input",
                            foundItems: "ce-link-autocomplete__items",
                            searchItem: "ce-link-autocomplete__search-item",
                            searchItemSelected: "ce-link-autocomplete__search-item--selected",
                            searchItemName: "ce-link-autocomplete__search-item-name",
                            searchItemDescription: "ce-link-autocomplete__search-item-description",
                            linkDataWrapper: "ce-link-autocomplete__link-data-wrapper",
                            linkDataTitleWrapper: "ce-link-autocomplete__link-data-title-wrapper",
                            linkDataName: "ce-link-autocomplete__link-data-name",
                            linkDataDescription: "ce-link-autocomplete__link-data-description",
                            linkDataURL: "ce-link-autocomplete__link-data-url",
                        };
                    }
                    constructor({ config: e, api: t }) {
                        (this.api = t),
                            (this.config = e || {}),
                            (this.selection = new d()),
                            (this.searchEndpointUrl = this.config.endpoint),
                            (this.searchQueryParam = this.config.queryParam),
                            (this.nodes = {
                                toolButtons: null,
                                toolButtonLink: null,
                                toolButtonUnlink: null,
                                actionsWrapper: null,
                                inputWrapper: null,
                                inputField: null,
                                searchResults: null,
                                linkDataWrapper: null,
                                linkDataTitleWrapper: null,
                                linkDataName: null,
                                linkDataDescription: null,
                                linkDataURL: null,
                            }),
                            (this.tagName = "A"),
                            (this.KEYS = { ENTER: 13, UP: 38, DOWN: 40 }),
                            (this.typingTimer = null);
                    }
                    render() {
                        return (
                            (this.nodes.toolButtons = c("button", this.api.styles.inlineToolButton)),
                            (this.nodes.toolButtonLink = c("span", f.CSS.iconWrapper, {
                                innerHTML:
                                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.69998 12.6L7.67896 12.62C6.53993 13.7048 6.52012 15.5155 7.63516 16.625V16.625C8.72293 17.7073 10.4799 17.7102 11.5712 16.6314L13.0263 15.193C14.0703 14.1609 14.2141 12.525 13.3662 11.3266L13.22 11.12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16.22 11.12L16.3564 10.9805C17.2895 10.0265 17.3478 8.5207 16.4914 7.49733V7.49733C15.569 6.39509 13.9269 6.25143 12.8271 7.17675L11.39 8.38588C10.0935 9.47674 9.95704 11.4241 11.0887 12.6852L11.12 12.72"/></svg>',
                            })),
                            this.nodes.toolButtons.appendChild(this.nodes.toolButtonLink),
                            (this.nodes.toolButtonUnlink = c("span", f.CSS.iconWrapper, {
                                innerHTML:
                                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M15.7795 11.5C15.7795 11.5 16.053 11.1962 16.5497 10.6722C17.4442 9.72856 17.47 8.2475 16.578 7.30145V7.30145C15.6482 6.31522 14.0873 6.29227 13.1288 7.25073L11.8795 8.49999"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8.24516 12.3883C8.24516 12.3883 7.9717 12.6922 7.47503 13.2161C6.5805 14.1598 6.55465 15.6408 7.44665 16.5869V16.5869C8.37652 17.5731 9.93743 17.5961 10.8959 16.6376L12.1452 15.3883"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M17.7802 15.1032L16.597 14.9422C16.0109 14.8624 15.4841 15.3059 15.4627 15.8969L15.4199 17.0818"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6.39063 9.03238L7.58431 9.06668C8.17549 9.08366 8.65218 8.58665 8.61055 7.99669L8.52708 6.81397"/><line x1="12.1142" x2="11.7" y1="12.2" y2="11.7858" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>',
                            })),
                            this.nodes.toolButtons.appendChild(this.nodes.toolButtonUnlink),
                            this.toggleVisibility(this.nodes.toolButtonUnlink, !1),
                            this.nodes.toolButtons
                        );
                    }
                    renderActions() {
                        return (
                            (this.nodes.actionsWrapper = c("div", [f.CSS.actionsWrapper])),
                            this.toggleVisibility(this.nodes.actionsWrapper, !1),
                            (this.nodes.inputWrapper = c("div", f.CSS.field)),
                            (this.nodes.inputField = c("input", f.CSS.fieldInput, { placeholder: this.api.i18n.t(this.isServerEnabled ? "Paste or search" : "Paste a link") })),
                            this.nodes.inputWrapper.appendChild(this.nodes.inputField),
                            this.toggleVisibility(this.nodes.inputWrapper, !1),
                            (this.nodes.searchResults = c("div", f.CSS.foundItems)),
                            this.nodes.searchResults.addEventListener("mouseenter", () => {
                                this.getSearchItems().forEach((e) => {
                                    e.classList.remove(f.CSS.searchItemSelected);
                                });
                            }),
                            this.nodes.searchResults.addEventListener("click", (e) => {
                                const t = e.target.closest(`.${f.CSS.searchItem}`);
                                t && (e.preventDefault(), e.stopPropagation(), this.searchItemPressed(t));
                            }),
                            this.nodes.inputField.addEventListener("keydown", this.fieldKeydownHandler.bind(this)),
                            this.nodes.inputField.addEventListener("input", this.fieldInputHandler.bind(this)),
                            (this.nodes.linkDataWrapper = c("div", f.CSS.linkDataWrapper)),
                            this.toggleVisibility(this.nodes.linkDataWrapper, !1),
                            (this.nodes.linkDataTitleWrapper = c("div", f.CSS.linkDataTitleWrapper)),
                            this.nodes.linkDataWrapper.appendChild(this.nodes.linkDataTitleWrapper),
                            this.toggleVisibility(this.nodes.linkDataTitleWrapper, !1),
                            (this.nodes.linkDataName = c("div", f.CSS.linkDataName)),
                            this.nodes.linkDataTitleWrapper.appendChild(this.nodes.linkDataName),
                            (this.nodes.linkDataDescription = c("div", f.CSS.linkDataDescription)),
                            this.nodes.linkDataTitleWrapper.appendChild(this.nodes.linkDataDescription),
                            (this.nodes.linkDataURL = c("A", f.CSS.linkDataURL)),
                            this.nodes.linkDataWrapper.appendChild(this.nodes.linkDataURL),
                            this.nodes.actionsWrapper.appendChild(this.nodes.inputWrapper),
                            this.nodes.actionsWrapper.appendChild(this.nodes.searchResults),
                            this.nodes.actionsWrapper.appendChild(this.nodes.linkDataWrapper),
                            this.nodes.actionsWrapper
                        );
                    }
                    fieldKeydownHandler(e) {
                        const t = [this.KEYS.UP, this.KEYS.DOWN].includes(e.keyCode),
                            n = this.KEYS.ENTER === e.keyCode;
                        if (t || n)
                            switch ((e.preventDefault(), e.stopPropagation(), !0)) {
                                case t: {
                                    const t = e.keyCode === this.KEYS.DOWN ? u : "Previous";
                                    this.navigate(t);
                                    break;
                                }
                                case n:
                                    this.processEnterKeyPressed();
                            }
                    }
                    fieldInputHandler(e) {
                        clearTimeout(this.typingTimer);
                        const t = e.target.value;
                        t && t.trim()
                            ? s.isUrl(t)
                                ? this.generateSearchList([{ href: t }])
                                : this.isServerEnabled &&
                                  (this.typingTimer = setTimeout(async () => {
                                      this.toggleLoadingState(!0);
                                      try {
                                          const e = await this.searchRequest(t);
                                          this.generateSearchList(e);
                                      } catch (e) {
                                          a().show({ message: `${p} "${e.message}"`, style: "error" });
                                      }
                                      this.toggleLoadingState(!1);
                                  }, 250))
                            : this.clearSearchList();
                    }
                    toggleLoadingState(e) {
                        this.nodes.inputWrapper.classList.toggle(f.CSS.fieldLoading, e);
                    }
                    navigate(e) {
                        const t = this.getSearchItems(),
                            n = this.getSelectedItem();
                        if (!t.length) return;
                        const i = e === u ? 1 : -1;
                        let o = (n ? t.indexOf(n) : -1) + i;
                        o > t.length - 1 ? (o = 0) : o < 0 && (o = t.length - 1), n && n.classList.remove(f.CSS.searchItemSelected), t[o].classList.add(f.CSS.searchItemSelected);
                    }
                    processEnterKeyPressed() {
                        const e = this.getSelectedItem();
                        if (e) return void this.searchItemPressed(e);
                        const t = this.nodes.inputField.value;
                        if (!t || !t.trim()) return;
                        if (!s.isUrl(t)) return void a().show({ message: "Link URL is invalid", style: "error" });
                        const n = this.getSearchItems()[0];
                        this.searchItemPressed(n);
                    }
                    getSearchItems() {
                        const e = this.nodes.searchResults.querySelectorAll(`.${f.CSS.searchItem}`);
                        return Array.from(e);
                    }
                    getSelectedItem() {
                        return this.nodes.searchResults.querySelector(`.${f.CSS.searchItemSelected}`);
                    }
                    clearSearchList() {
                        this.nodes.searchResults.innerHTML = "";
                    }
                    generateSearchList(e = []) {
                        this.clearSearchList(),
                            s.isArray(e)
                                ? 0 !== e.length &&
                                  e.forEach((e) => {
                                      const t = c("div", [f.CSS.searchItem]),
                                          n = c("div", [f.CSS.searchItemName], { innerText: e.name || e.href });
                                      if ((t.appendChild(n), e.description)) {
                                          const n = c("div", [f.CSS.searchItemDescription], { innerText: e.description });
                                          t.appendChild(n);
                                      }
                                      Object.keys(e).forEach((n) => {
                                          t.dataset[n] = e[n];
                                      }),
                                          this.nodes.searchResults.appendChild(t);
                                  })
                                : a().show({ message: "Server responded with invalid data", style: "error" });
                    }
                    searchItemPressed(e) {
                        if (!e.dataset || !e.dataset.href) return;
                        const t = e.dataset.href;
                        this.selection.restore(), this.selection.removeFakeBackground(), document.execCommand("createLink", !1, t);
                        const n = this.selection.findParentTag(this.tagName);
                        Object.keys(e.dataset).forEach((t) => {
                            "href" !== t && (n.dataset[t] = e.dataset[t]);
                        }),
                            this.selection.collapseToEnd(),
                            this.api.inlineToolbar.close();
                    }
                    surround(e) {
                        if (!e) return;
                        this.toggleVisibility(this.nodes.actionsWrapper, !0);
                        const t = this.nodes.toolButtonUnlink.classList.contains(this.api.styles.inlineToolButtonActive);
                        if ((this.selection.setFakeBackground(), this.selection.save(), t)) {
                            const e = this.selection.findParentTag("A");
                            this.selection.expandToTag(e), document.execCommand("unlink"), this.selection.removeFakeBackground(), this.api.inlineToolbar.close();
                        } else this.toggleVisibility(this.nodes.inputWrapper, !0), this.nodes.inputField.focus();
                    }
                    checkState(e) {
                        if (!e.anchorNode) return;
                        const t = this.selection.findParentTag(this.tagName);
                        t &&
                            (this.toggleVisibility(this.nodes.actionsWrapper, !0),
                            (this.nodes.linkDataName.innerText = t.dataset.name || ""),
                            (this.nodes.linkDataDescription.innerText = t.dataset.description || ""),
                            (this.nodes.linkDataURL.innerText = t.href || ""),
                            (this.nodes.linkDataURL.href = t.href || ""),
                            (this.nodes.linkDataURL.target = "_blank"),
                            (t.dataset.name || t.dataset.description) && this.toggleVisibility(this.nodes.linkDataTitleWrapper, !0),
                            this.toggleVisibility(this.nodes.linkDataWrapper, !0),
                            this.toggleVisibility(this.nodes.toolButtonLink, !1),
                            this.toggleVisibility(this.nodes.toolButtonUnlink, !0),
                            this.nodes.toolButtonUnlink.classList.add(this.api.styles.inlineToolButtonActive));
                    }
                    toggleVisibility(e, t = !0) {
                        e.classList.toggle(f.CSS.hidden, !t);
                    }
                    async searchRequest(e) {
                        const t = new URLSearchParams({ [this.searchQueryParam]: e }).toString();
                        try {
                            const e = await fetch(`${this.searchEndpointUrl}?${t}`),
                                n = await e.json();
                            if (n && n.success) return n.items;
                            console.warn('Link Autocomplete: invalid response format: "success: true" expected, but got %o. Response: %o', n.success, n);
                        } catch (e) {
                            a().show({ message: `${p} "${e.message}"`, style: "error" });
                        }
                        return [];
                    }
                    isServerEnabled() {
                        return !!this.searchEndpointUrl;
                    }
                    clear() {
                        if (this.selection.isFakeBackgroundEnabled) {
                            const e = new d();
                            e.save(), this.selection.restore(), this.selection.removeFakeBackground(), this.selection.clearSaved(), e.restore();
                        }
                    }
                }
            })(),
            i.default
        );
    })();
});
