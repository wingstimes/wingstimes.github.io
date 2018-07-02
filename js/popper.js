! function(e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Popper = t()
}(this, function() {
  "use strict";

  function e(e) {
    return e && "[object Function]" === {}.toString.call(e)
  }

  function t(e, t) {
    if (1 !== e.nodeType) return [];
    var n = getComputedStyle(e, null);
    return t ? n[t] : n
  }

  function n(e) {
    return "HTML" === e.nodeName ? e : e.parentNode || e.host
  }

  function r(e) {
    if (!e) return document.body;
    switch (e.nodeName) {
      case "HTML":
      case "BODY":
        return e.ownerDocument.body;
      case "#document":
        return e.body
    }
    var o = t(e),
      i = o.overflow,
      f = o.overflowX;
    return /(auto|scroll)/.test(i + o.overflowY + f) ? e : r(n(e))
  }

  function o(e) {
    var n = e && e.offsetParent,
      r = n && n.nodeName;
    return r && "BODY" !== r && "HTML" !== r ? -1 !== ["TD", "TABLE"].indexOf(n.nodeName) && "static" === t(n, "position") ? o(n) : n : e ? e.ownerDocument.documentElement : document.documentElement
  }

  function i(e) {
    var t = e.nodeName;
    return "BODY" !== t && ("HTML" === t || o(e.firstElementChild) === e)
  }

  function f(e) {
    return null === e.parentNode ? e : f(e.parentNode)
  }

  function s(e, t) {
    if (!(e && e.nodeType && t && t.nodeType)) return document.documentElement;
    var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
      r = n ? e : t,
      a = n ? t : e,
      p = document.createRange();
    p.setStart(r, 0), p.setEnd(a, 0);
    var l = p.commonAncestorContainer;
    if (e !== l && t !== l || r.contains(a)) return i(l) ? l : o(l);
    var u = f(e);
    return u.host ? s(u.host, t) : s(e, f(t).host)
  }

  function a(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top",
      n = "top" === t ? "scrollTop" : "scrollLeft",
      r = e.nodeName;
    if ("BODY" === r || "HTML" === r) {
      var o = e.ownerDocument.documentElement;
      return (e.ownerDocument.scrollingElement || o)[n]
    }
    return e[n]
  }

  function p(e, t) {
    var n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
      r = a(t, "top"),
      o = a(t, "left"),
      i = n ? -1 : 1;
    return e.top += r * i, e.bottom += r * i, e.left += o * i, e.right += o * i, e
  }

  function l(e, t) {
    var n = "x" === t ? "Left" : "Top",
      r = "Left" == n ? "Right" : "Bottom";
    return parseFloat(e["border" + n + "Width"], 10) + parseFloat(e["border" + r + "Width"], 10)
  }

  function u(e, t, n, r) {
    return X(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], re() ? n["offset" + e] + r["margin" + ("Height" === e ? "Top" : "Left")] + r["margin" + ("Height" === e ? "Bottom" : "Right")] : 0)
  }

  function c() {
    var e = document.body,
      t = document.documentElement,
      n = re() && getComputedStyle(t);
    return {
      height: u("Height", e, t, n),
      width: u("Width", e, t, n)
    }
  }

  function d(e) {
    return se({}, e, {
      right: e.left + e.width,
      bottom: e.top + e.height
    })
  }

  function h(e) {
    var n = {};
    if (re()) try {
      n = e.getBoundingClientRect();
      var r = a(e, "top"),
        o = a(e, "left");
      n.top += r, n.left += o, n.bottom += r, n.right += o
    } catch (e) {} else n = e.getBoundingClientRect();
    var i = {
        left: n.left,
        top: n.top,
        width: n.right - n.left,
        height: n.bottom - n.top
      },
      f = "HTML" === e.nodeName ? c() : {},
      s = f.width || e.clientWidth || i.right - i.left,
      p = f.height || e.clientHeight || i.bottom - i.top,
      u = e.offsetWidth - s,
      h = e.offsetHeight - p;
    if (u || h) {
      var m = t(e);
      u -= l(m, "x"), h -= l(m, "y"), i.width -= u, i.height -= h
    }
    return d(i)
  }

  function m(e, n) {
    var o = re(),
      i = "HTML" === n.nodeName,
      f = h(e),
      s = h(n),
      a = r(e),
      l = t(n),
      u = parseFloat(l.borderTopWidth, 10),
      c = parseFloat(l.borderLeftWidth, 10),
      m = d({
        top: f.top - s.top - u,
        left: f.left - s.left - c,
        width: f.width,
        height: f.height
      });
    if (m.marginTop = 0, m.marginLeft = 0, !o && i) {
      var g = parseFloat(l.marginTop, 10),
        v = parseFloat(l.marginLeft, 10);
      m.top -= u - g, m.bottom -= u - g, m.left -= c - v, m.right -= c - v, m.marginTop = g, m.marginLeft = v
    }
    return (o ? n.contains(a) : n === a && "BODY" !== a.nodeName) && (m = p(m, n)), m
  }

  function g(e) {
    var t = e.ownerDocument.documentElement,
      n = m(e, t),
      r = X(t.clientWidth, window.innerWidth || 0),
      o = X(t.clientHeight, window.innerHeight || 0),
      i = a(t),
      f = a(t, "left");
    return d({
      top: i - n.top + n.marginTop,
      left: f - n.left + n.marginLeft,
      width: r,
      height: o
    })
  }

  function v(e) {
    var r = e.nodeName;
    return "BODY" !== r && "HTML" !== r && ("fixed" === t(e, "position") || v(n(e)))
  }

  function b(e, t, o, i) {
    var f = {
        top: 0,
        left: 0
      },
      a = s(e, t);
    if ("viewport" === i) f = g(a);
    else {
      var p;
      "scrollParent" === i ? (p = r(n(t)), "BODY" === p.nodeName && (p = e.ownerDocument.documentElement)) : p = "window" === i ? e.ownerDocument.documentElement : i;
      var l = m(p, a);
      if ("HTML" !== p.nodeName || v(a)) f = l;
      else {
        var u = c(),
          d = u.height,
          h = u.width;
        f.top += l.top - l.marginTop, f.bottom = d + l.top, f.left += l.left - l.marginLeft, f.right = h + l.left
      }
    }
    return f.left += o, f.top += o, f.right -= o, f.bottom -= o, f
  }

  function w(e) {
    return e.width * e.height
  }

  function y(e, t, n, r, o) {
    var i = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === e.indexOf("auto")) return e;
    var f = b(n, r, i, o),
      s = {
        top: {
          width: f.width,
          height: t.top - f.top
        },
        right: {
          width: f.right - t.right,
          height: f.height
        },
        bottom: {
          width: f.width,
          height: f.bottom - t.bottom
        },
        left: {
          width: t.left - f.left,
          height: f.height
        }
      },
      a = Object.keys(s).map(function(e) {
        return se({
          key: e
        }, s[e], {
          area: w(s[e])
        })
      }).sort(function(e, t) {
        return t.area - e.area
      }),
      p = a.filter(function(e) {
        var t = e.width,
          r = e.height;
        return t >= n.clientWidth && r >= n.clientHeight
      }),
      l = 0 < p.length ? p[0].key : a[0].key,
      u = e.split("-")[1];
    return l + (u ? "-" + u : "")
  }

  function E(e, t, n) {
    return m(n, s(t, n))
  }

  function O(e) {
    var t = getComputedStyle(e),
      n = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
      r = parseFloat(t.marginLeft) + parseFloat(t.marginRight);
    return {
      width: e.offsetWidth + r,
      height: e.offsetHeight + n
    }
  }

  function L(e) {
    var t = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
    return e.replace(/left|right|bottom|top/g, function(e) {
      return t[e]
    })
  }

  function x(e, t, n) {
    n = n.split("-")[0];
    var r = O(e),
      o = {
        width: r.width,
        height: r.height
      },
      i = -1 !== ["right", "left"].indexOf(n),
      f = i ? "top" : "left",
      s = i ? "left" : "top",
      a = i ? "height" : "width",
      p = i ? "width" : "height";
    return o[f] = t[f] + t[a] / 2 - r[a] / 2, o[s] = n === s ? t[s] - r[p] : t[L(s)], o
  }

  function T(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0]
  }

  function N(e, t, n) {
    if (Array.prototype.findIndex) return e.findIndex(function(e) {
      return e[t] === n
    });
    var r = T(e, function(e) {
      return e[t] === n
    });
    return e.indexOf(r)
  }

  function C(t, n, r) {
    return (void 0 === r ? t : t.slice(0, N(t, "name", r))).forEach(function(t) {
      t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
      var r = t.function || t.fn;
      t.enabled && e(r) && (n.offsets.popper = d(n.offsets.popper), n.offsets.reference = d(n.offsets.reference), n = r(n, t))
    }), n
  }

  function D() {
    if (!this.state.isDestroyed) {
      var e = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {}
      };
      e.offsets.reference = E(this.state, this.popper, this.reference), e.placement = y(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.offsets.popper = x(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = "absolute", e = C(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
    }
  }

  function k(e, t) {
    return e.some(function(e) {
      var n = e.name;
      return e.enabled && n === t
    })
  }

  function W(e) {
    for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), r = 0; r < t.length - 1; r++) {
      var o = t[r],
        i = o ? "" + o + n : e;
      if (void 0 !== document.body.style[i]) return i
    }
    return null
  }

  function S() {
    return this.state.isDestroyed = !0, k(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.left = "", this.popper.style.position = "", this.popper.style.top = "", this.popper.style[W("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
  }

  function F(e) {
    var t = e.ownerDocument;
    return t ? t.defaultView : window
  }

  function P(e, t, n, o) {
    var i = "BODY" === e.nodeName,
      f = i ? e.ownerDocument.defaultView : e;
    f.addEventListener(t, n, {
      passive: !0
    }), i || P(r(f.parentNode), t, n, o), o.push(f)
  }

  function B(e, t, n, o) {
    n.updateBound = o, F(e).addEventListener("resize", n.updateBound, {
      passive: !0
    });
    var i = r(e);
    return P(i, "scroll", n.updateBound, n.scrollParents), n.scrollElement = i, n.eventsEnabled = !0, n
  }

  function H() {
    this.state.eventsEnabled || (this.state = B(this.reference, this.options, this.state, this.scheduleUpdate))
  }

  function A(e, t) {
    return F(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(e) {
      e.removeEventListener("scroll", t.updateBound)
    }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
  }

  function M() {
    this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = A(this.reference, this.state))
  }

  function j(e) {
    return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
  }

  function I(e, t) {
    Object.keys(t).forEach(function(n) {
      var r = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && j(t[n]) && (r = "px"), e.style[n] = t[n] + r
    })
  }

  function R(e, t) {
    Object.keys(t).forEach(function(n) {
      !1 === t[n] ? e.removeAttribute(n) : e.setAttribute(n, t[n])
    })
  }

  function U(e, t, n) {
    var r = T(e, function(e) {
        return e.name === t
      }),
      o = !!r && e.some(function(e) {
        return e.name === n && e.enabled && e.order < r.order
      });
    if (!o) {
      var i = "`" + t + "`";
      console.warn("`" + n + "` modifier is required by " + i + " modifier in order to work, be sure to include it before " + i + "!")
    }
    return o
  }

  function Y(e) {
    return "end" === e ? "start" : "start" === e ? "end" : e
  }

  function q(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
      n = pe.indexOf(e),
      r = pe.slice(n + 1).concat(pe.slice(0, n));
    return t ? r.reverse() : r
  }

  function K(e, t, n, r) {
    var o = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
      i = +o[1],
      f = o[2];
    if (!i) return e;
    if (0 === f.indexOf("%")) {
      var s;
      switch (f) {
        case "%p":
          s = n;
          break;
        case "%":
        case "%r":
        default:
          s = r
      }
      return d(s)[t] / 100 * i
    }
    if ("vh" === f || "vw" === f) {
      return ("vh" === f ? X(document.documentElement.clientHeight, window.innerHeight || 0) : X(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * i
    }
    return i
  }

  function V(e, t, n, r) {
    var o = [0, 0],
      i = -1 !== ["right", "left"].indexOf(r),
      f = e.split(/(\+|\-)/).map(function(e) {
        return e.trim()
      }),
      s = f.indexOf(T(f, function(e) {
        return -1 !== e.search(/,|\s/)
      }));
    f[s] && -1 === f[s].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
    var a = /\s*,\s*|\s+/,
      p = -1 === s ? [f] : [f.slice(0, s).concat([f[s].split(a)[0]]), [f[s].split(a)[1]].concat(f.slice(s + 1))];
    return p = p.map(function(e, r) {
      var o = (1 === r ? !i : i) ? "height" : "width",
        f = !1;
      return e.reduce(function(e, t) {
        return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, f = !0, e) : f ? (e[e.length - 1] += t, f = !1, e) : e.concat(t)
      }, []).map(function(e) {
        return K(e, o, t, n)
      })
    }), p.forEach(function(e, t) {
      e.forEach(function(n, r) {
        j(n) && (o[t] += n * ("-" === e[r - 1] ? -1 : 1))
      })
    }), o
  }

  function z(e, t) {
    var n, r = t.offset,
      o = e.placement,
      i = e.offsets,
      f = i.popper,
      s = i.reference,
      a = o.split("-")[0];
    return n = j(+r) ? [+r, 0] : V(r, f, s, a), "left" === a ? (f.top += n[0], f.left -= n[1]) : "right" === a ? (f.top += n[0], f.left += n[1]) : "top" === a ? (f.left += n[0], f.top -= n[1]) : "bottom" === a && (f.left += n[0], f.top += n[1]), e.popper = f, e
  }
  for (var G = Math.min, _ = Math.floor, X = Math.max, J = "undefined" != typeof window && "undefined" != typeof document, Q = ["Edge", "Trident", "Firefox"], Z = 0, $ = 0; $ < Q.length; $ += 1)
    if (J && 0 <= navigator.userAgent.indexOf(Q[$])) {
      Z = 1;
      break
    }
  var ee, te = J && window.Promise,
    ne = te ? function(e) {
      var t = !1;
      return function() {
        t || (t = !0, window.Promise.resolve().then(function() {
          t = !1, e()
        }))
      }
    } : function(e) {
      var t = !1;
      return function() {
        t || (t = !0, setTimeout(function() {
          t = !1, e()
        }, Z))
      }
    },
    re = function() {
      return void 0 == ee && (ee = -1 !== navigator.appVersion.indexOf("MSIE 10")), ee
    },
    oe = function(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    },
    ie = function() {
      function e(e, t) {
        for (var n, r = 0; r < t.length; r++) n = t[r], n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
      }
      return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
      }
    }(),
    fe = function(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e
    },
    se = Object.assign || function(e) {
      for (var t, n = 1; n < arguments.length; n++)
        for (var r in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
      return e
    },
    ae = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
    pe = ae.slice(3),
    le = {
      FLIP: "flip",
      CLOCKWISE: "clockwise",
      COUNTERCLOCKWISE: "counterclockwise"
    },
    ue = function() {
      function t(n, r) {
        var o = this,
          i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        oe(this, t), this.scheduleUpdate = function() {
          return requestAnimationFrame(o.update)
        }, this.update = ne(this.update.bind(this)), this.options = se({}, t.Defaults, i), this.state = {
          isDestroyed: !1,
          isCreated: !1,
          scrollParents: []
        }, this.reference = n && n.jquery ? n[0] : n, this.popper = r && r.jquery ? r[0] : r, this.options.modifiers = {}, Object.keys(se({}, t.Defaults.modifiers, i.modifiers)).forEach(function(e) {
          o.options.modifiers[e] = se({}, t.Defaults.modifiers[e] || {}, i.modifiers ? i.modifiers[e] : {})
        }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
          return se({
            name: e
          }, o.options.modifiers[e])
        }).sort(function(e, t) {
          return e.order - t.order
        }), this.modifiers.forEach(function(t) {
          t.enabled && e(t.onLoad) && t.onLoad(o.reference, o.popper, o.options, t, o.state)
        }), this.update();
        var f = this.options.eventsEnabled;
        f && this.enableEventListeners(), this.state.eventsEnabled = f
      }
      return ie(t, [{
        key: "update",
        value: function() {
          return D.call(this)
        }
      }, {
        key: "destroy",
        value: function() {
          return S.call(this)
        }
      }, {
        key: "enableEventListeners",
        value: function() {
          return H.call(this)
        }
      }, {
        key: "disableEventListeners",
        value: function() {
          return M.call(this)
        }
      }]), t
    }();
  return ue.Utils = ("undefined" == typeof window ? global : window).PopperUtils, ue.placements = ae, ue.Defaults = {
    placement: "bottom",
    eventsEnabled: !0,
    removeOnDestroy: !1,
    onCreate: function() {},
    onUpdate: function() {},
    modifiers: {
      shift: {
        order: 100,
        enabled: !0,
        fn: function(e) {
          var t = e.placement,
            n = t.split("-")[0],
            r = t.split("-")[1];
          if (r) {
            var o = e.offsets,
              i = o.reference,
              f = o.popper,
              s = -1 !== ["bottom", "top"].indexOf(n),
              a = s ? "left" : "top",
              p = s ? "width" : "height",
              l = {
                start: fe({}, a, i[a]),
                end: fe({}, a, i[a] + i[p] - f[p])
              };
            e.offsets.popper = se({}, f, l[r])
          }
          return e
        }
      },
      offset: {
        order: 200,
        enabled: !0,
        fn: z,
        offset: 0
      },
      preventOverflow: {
        order: 300,
        enabled: !0,
        fn: function(e, t) {
          var n = t.boundariesElement || o(e.instance.popper);
          e.instance.reference === n && (n = o(n));
          var r = b(e.instance.popper, e.instance.reference, t.padding, n);
          t.boundaries = r;
          var i = t.priority,
            f = e.offsets.popper,
            s = {
              primary: function(e) {
                var n = f[e];
                return f[e] < r[e] && !t.escapeWithReference && (n = X(f[e], r[e])), fe({}, e, n)
              },
              secondary: function(e) {
                var n = "right" === e ? "left" : "top",
                  o = f[n];
                return f[e] > r[e] && !t.escapeWithReference && (o = G(f[n], r[e] - ("right" === e ? f.width : f.height))), fe({}, n, o)
              }
            };
          return i.forEach(function(e) {
            var t = -1 === ["left", "top"].indexOf(e) ? "secondary" : "primary";
            f = se({}, f, s[t](e))
          }), e.offsets.popper = f, e
        },
        priority: ["left", "right", "top", "bottom"],
        padding: 5,
        boundariesElement: "scrollParent"
      },
      keepTogether: {
        order: 400,
        enabled: !0,
        fn: function(e) {
          var t = e.offsets,
            n = t.popper,
            r = t.reference,
            o = e.placement.split("-")[0],
            i = _,
            f = -1 !== ["top", "bottom"].indexOf(o),
            s = f ? "right" : "bottom",
            a = f ? "left" : "top",
            p = f ? "width" : "height";
          return n[s] < i(r[a]) && (e.offsets.popper[a] = i(r[a]) - n[p]), n[a] > i(r[s]) && (e.offsets.popper[a] = i(r[s])), e
        }
      },
      arrow: {
        order: 500,
        enabled: !0,
        fn: function(e, n) {
          var r;
          if (!U(e.instance.modifiers, "arrow", "keepTogether")) return e;
          var o = n.element;
          if ("string" == typeof o) {
            if (!(o = e.instance.popper.querySelector(o))) return e
          } else if (!e.instance.popper.contains(o)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
          var i = e.placement.split("-")[0],
            f = e.offsets,
            s = f.popper,
            a = f.reference,
            p = -1 !== ["left", "right"].indexOf(i),
            l = p ? "height" : "width",
            u = p ? "Top" : "Left",
            c = u.toLowerCase(),
            h = p ? "left" : "top",
            m = p ? "bottom" : "right",
            g = O(o)[l];
          a[m] - g < s[c] && (e.offsets.popper[c] -= s[c] - (a[m] - g)), a[c] + g > s[m] && (e.offsets.popper[c] += a[c] + g - s[m]), e.offsets.popper = d(e.offsets.popper);
          var v = a[c] + a[l] / 2 - g / 2,
            b = t(e.instance.popper),
            w = parseFloat(b["margin" + u], 10),
            y = parseFloat(b["border" + u + "Width"], 10),
            E = v - e.offsets.popper[c] - w - y;
          return E = X(G(s[l] - g, E), 0), e.arrowElement = o, e.offsets.arrow = (r = {}, fe(r, c, Math.round(E)), fe(r, h, ""), r), e
        },
        element: "[x-arrow]"
      },
      flip: {
        order: 600,
        enabled: !0,
        fn: function(e, t) {
          if (k(e.instance.modifiers, "inner")) return e;
          if (e.flipped && e.placement === e.originalPlacement) return e;
          var n = b(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement),
            r = e.placement.split("-")[0],
            o = L(r),
            i = e.placement.split("-")[1] || "",
            f = [];
          switch (t.behavior) {
            case le.FLIP:
              f = [r, o];
              break;
            case le.CLOCKWISE:
              f = q(r);
              break;
            case le.COUNTERCLOCKWISE:
              f = q(r, !0);
              break;
            default:
              f = t.behavior
          }
          return f.forEach(function(s, a) {
            if (r !== s || f.length === a + 1) return e;
            r = e.placement.split("-")[0], o = L(r);
            var p = e.offsets.popper,
              l = e.offsets.reference,
              u = _,
              c = "left" === r && u(p.right) > u(l.left) || "right" === r && u(p.left) < u(l.right) || "top" === r && u(p.bottom) > u(l.top) || "bottom" === r && u(p.top) < u(l.bottom),
              d = u(p.left) < u(n.left),
              h = u(p.right) > u(n.right),
              m = u(p.top) < u(n.top),
              g = u(p.bottom) > u(n.bottom),
              v = "left" === r && d || "right" === r && h || "top" === r && m || "bottom" === r && g,
              b = -1 !== ["top", "bottom"].indexOf(r),
              w = !!t.flipVariations && (b && "start" === i && d || b && "end" === i && h || !b && "start" === i && m || !b && "end" === i && g);
            (c || v || w) && (e.flipped = !0, (c || v) && (r = f[a + 1]), w && (i = Y(i)), e.placement = r + (i ? "-" + i : ""), e.offsets.popper = se({}, e.offsets.popper, x(e.instance.popper, e.offsets.reference, e.placement)), e = C(e.instance.modifiers, e, "flip"))
          }), e
        },
        behavior: "flip",
        padding: 5,
        boundariesElement: "viewport"
      },
      inner: {
        order: 700,
        enabled: !1,
        fn: function(e) {
          var t = e.placement,
            n = t.split("-")[0],
            r = e.offsets,
            o = r.popper,
            i = r.reference,
            f = -1 !== ["left", "right"].indexOf(n),
            s = -1 === ["top", "left"].indexOf(n);
          return o[f ? "left" : "top"] = i[n] - (s ? o[f ? "width" : "height"] : 0), e.placement = L(t), e.offsets.popper = d(o), e
        }
      },
      hide: {
        order: 800,
        enabled: !0,
        fn: function(e) {
          if (!U(e.instance.modifiers, "hide", "preventOverflow")) return e;
          var t = e.offsets.reference,
            n = T(e.instance.modifiers, function(e) {
              return "preventOverflow" === e.name
            }).boundaries;
          if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
            if (!0 === e.hide) return e;
            e.hide = !0, e.attributes["x-out-of-boundaries"] = ""
          } else {
            if (!1 === e.hide) return e;
            e.hide = !1, e.attributes["x-out-of-boundaries"] = !1
          }
          return e
        }
      },
      computeStyle: {
        order: 850,
        enabled: !0,
        fn: function(e, t) {
          var n = t.x,
            r = t.y,
            i = e.offsets.popper,
            f = T(e.instance.modifiers, function(e) {
              return "applyStyle" === e.name
            }).gpuAcceleration;
          void 0 !== f && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
          var s, a, p = void 0 === f ? t.gpuAcceleration : f,
            l = o(e.instance.popper),
            u = h(l),
            c = {
              position: i.position
            },
            d = {
              left: _(i.left),
              top: _(i.top),
              bottom: _(i.bottom),
              right: _(i.right)
            },
            m = "bottom" === n ? "top" : "bottom",
            g = "right" === r ? "left" : "right",
            v = W("transform");
          if (a = "bottom" == m ? -u.height + d.bottom : d.top, s = "right" == g ? -u.width + d.right : d.left, p && v) c[v] = "translate3d(" + s + "px, " + a + "px, 0)", c[m] = 0, c[g] = 0, c.willChange = "transform";
          else {
            var b = "bottom" == m ? -1 : 1,
              w = "right" == g ? -1 : 1;
            c[m] = a * b, c[g] = s * w, c.willChange = m + ", " + g
          }
          var y = {
            "x-placement": e.placement
          };
          return e.attributes = se({}, y, e.attributes), e.styles = se({}, c, e.styles), e.arrowStyles = se({}, e.offsets.arrow, e.arrowStyles), e
        },
        gpuAcceleration: !0,
        x: "bottom",
        y: "right"
      },
      applyStyle: {
        order: 900,
        enabled: !0,
        fn: function(e) {
          return I(e.instance.popper, e.styles), R(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && I(e.arrowElement, e.arrowStyles), e
        },
        onLoad: function(e, t, n, r, o) {
          var i = E(o, t, e),
            f = y(n.placement, i, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
          return t.setAttribute("x-placement", f), I(t, {
            position: "absolute"
          }), n
        },
        gpuAcceleration: void 0
      }
    }
  }, ue
});
