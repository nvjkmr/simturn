var imagePath = 'js/node/';

! function(f) {
    "object" == typeof exports && "undefined" != typeof module ? module.P = f() : "function" == typeof define && define.Sc ? define([], f) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Hb = f()
}(function() {
    return function a(d, c, e) {
        function l(n, k) {
            if (!c[n]) {
                if (!d[n]) {
                    var E = "function" == typeof require && require;
                    if (!k && E) return E(n, !0);
                    if (p) return p(n, !0);
                    E = Error("Cannot find module '" + n + "'");
                    throw E.code = "MODULE_NOT_FOUND", E;
                }
                E = c[n] = {
                    P: {}
                };
                d[n][0].call(E.P,
                    function(a) {
                        var c = d[n][1][a];
                        return l(c ? c : a)
                    }, E, E.P, a, d, c, e)
            }
            return c[n].P
        }
        for (var p = "function" == typeof require && require, k = 0; k < e.length; k++) l(e[k]);
        return l
    }({
        1: [function(a, d, c) {
            function e(a) {
                if (!(this instanceof e)) return new e(a);
                a = this.options = k.assign({
                    level: O,
                    method: P,
                    gb: 16384,
                    s: 15,
                    mc: 8,
                    ea: H,
                    Ra: ""
                }, a || {});
                a.raw && 0 < a.s ? a.s = -a.s : a.yb && 0 < a.s && 16 > a.s && (a.s += 16);
                this.La = 0;
                this.j = "";
                this.ended = !1;
                this.ha = [];
                this.h = new E;
                this.h.b = 0;
                var c = p.$b(this.h, a.level, a.method, a.s, a.mc, a.ea);
                if (c !== v) throw Error(x[c]);
                a.kb && p.ac(this.h, a.kb)
            }

            function l(a, c) {
                var d = new e(c);
                if (d.push(a, !0), d.La) throw d.j;
                return d.result
            }
            var p = a("./zlib/deflate"),
                k = a("./utils/common"),
                n = a("./utils/strings"),
                x = a("./zlib/messages"),
                E = a("./zlib/zstream"),
                B = Object.prototype.toString,
                v = 0,
                O = -1,
                H = 0,
                P = 8;
            e.prototype.push = function(a, c) {
                var e, d, l = this.h,
                    x = this.options.gb;
                if (this.ended) return !1;
                d = c === ~~c ? c : !0 === c ? 4 : 0;
                "string" == typeof a ? l.input = n.rc(a) : "[object ArrayBuffer]" === B.call(a) ? l.input = new Uint8Array(a) : l.input = a;
                l.U = 0;
                l.v = l.input.length;
                do {
                    if (0 === l.b && (l.J = new k.ba(x), l.B = 0, l.b = x), e = p.ub(l, d), 1 !== e && e !== v) return this.wa(e), this.ended = !0, !1;
                    (0 === l.b || 0 === l.v && (4 === d || 2 === d)) && ("string" === this.options.Ra ? this.Pa(n.Xb(k.fb(l.J, l.B))) : this.Pa(k.fb(l.J, l.B)))
                } while ((0 < l.v || 0 === l.b) && 1 !== e);
                return 4 === d ? (e = p.Zb(this.h), this.wa(e), this.ended = !0, e === v) : 2 === d ? (this.wa(v), l.b = 0, !0) : !0
            };
            e.prototype.Pa = function(a) {
                this.ha.push(a)
            };
            e.prototype.wa = function(a) {
                a === v && ("string" === this.options.Ra ? this.result = this.ha.join("") : this.result = k.ib(this.ha));
                this.ha = [];
                this.La = a;
                this.j = this.h.j
            };
            c.vc = e;
            c.ub = l;
            c.Yc = function(a, c) {
                return c = c || {}, c.raw = !0, l(a, c)
            };
            c.yb = function(a, c) {
                return c = c || {}, c.yb = !0, l(a, c)
            }
        }, {
            "./utils/common": 3,
            "./utils/strings": 4,
            "./zlib/deflate": 8,
            "./zlib/messages": 13,
            "./zlib/zstream": 15
        }],
        2: [function(a, d, c) {
            function e(a) {
                if (!(this instanceof e)) return new e(a);
                var c = this.options = k.assign({
                    gb: 16384,
                    s: 0,
                    Ra: ""
                }, a || {});
                c.raw && 0 <= c.s && 16 > c.s && (c.s = -c.s, 0 === c.s && (c.s = -15));
                !(0 <= c.s && 16 > c.s) || a && a.s || (c.s += 32);
                15 < c.s && 48 > c.s && 0 === (15 & c.s) &&
                    (c.s |= 15);
                this.La = 0;
                this.j = "";
                this.ended = !1;
                this.ha = [];
                this.h = new B;
                this.h.b = 0;
                a = p.ic(this.h, c.s);
                if (a !== x.za) throw Error(E[a]);
                this.kb = new v;
                p.hc(this.h, this.kb)
            }

            function l(a, c) {
                var d = new e(c);
                if (d.push(a, !0), d.La) throw d.j;
                return d.result
            }
            var p = a("./zlib/inflate"),
                k = a("./utils/common"),
                n = a("./utils/strings"),
                x = a("./zlib/constants"),
                E = a("./zlib/messages"),
                B = a("./zlib/zstream"),
                v = a("./zlib/gzheader"),
                O = Object.prototype.toString;
            e.prototype.push = function(a, c) {
                var e, d, l, B, E, v = this.h,
                    z = this.options.gb,
                    r = !1;
                if (this.ended) return !1;
                d = c === ~~c ? c : !0 === c ? x.Va : x.rb;
                "string" == typeof a ? v.input = n.Wb(a) : "[object ArrayBuffer]" === O.call(a) ? v.input = new Uint8Array(a) : v.input = a;
                v.U = 0;
                v.v = v.input.length;
                do {
                    if (0 === v.b && (v.J = new k.ba(z), v.B = 0, v.b = z), e = p.ab(v, x.rb), e === x.Qb && !0 === r && (e = x.za, r = !1), e !== x.Wa && e !== x.za) return this.wa(e), this.ended = !0, !1;
                    v.B && (0 === v.b || e === x.Wa || 0 === v.v && (d === x.Va || d === x.sb)) && ("string" === this.options.Ra ? (l = n.sc(v.J, v.B), B = v.B - l, E = n.Yb(v.J, l), v.B = B, v.b = z - B, B && k.X(v.J, v.J, l, B, 0), this.Pa(E)) :
                        this.Pa(k.fb(v.J, v.B)));
                    0 === v.v && 0 === v.b && (r = !0)
                } while ((0 < v.v || 0 === v.b) && e !== x.Wa);
                return e === x.Wa && (d = x.Va), d === x.Va ? (e = p.gc(this.h), this.wa(e), this.ended = !0, e === x.za) : d === x.sb ? (this.wa(x.za), v.b = 0, !0) : !0
            };
            e.prototype.Pa = function(a) {
                this.ha.push(a)
            };
            e.prototype.wa = function(a) {
                a === x.za && ("string" === this.options.Ra ? this.result = this.ha.join("") : this.result = k.ib(this.ha));
                this.ha = [];
                this.La = a;
                this.j = this.h.j
            };
            c.wc = e;
            c.ab = l;
            c.cd = function(a, c) {
                return c = c || {}, c.raw = !0, l(a, c)
            };
            c.md = l
        }, {
            "./utils/common": 3,
            "./utils/strings": 4,
            "./zlib/constants": 6,
            "./zlib/gzheader": 9,
            "./zlib/inflate": 11,
            "./zlib/messages": 13,
            "./zlib/zstream": 15
        }],
        3: [function(a, d, c) {
            a = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
            c.assign = function(a) {
                for (var c = Array.prototype.slice.call(arguments, 1); c.length;) {
                    var e = c.shift();
                    if (e) {
                        if ("object" != typeof e) throw new TypeError(e + "must be non-object");
                        for (var d in e) e.hasOwnProperty(d) && (a[d] = e[d])
                    }
                }
                return a
            };
            c.fb = function(a, c) {
                return a.length ===
                    c ? a : a.subarray ? a.subarray(0, c) : (a.length = c, a)
            };
            var e = {
                    X: function(a, c, e, d, l) {
                        if (c.subarray && a.subarray) return void a.set(c.subarray(e, e + d), l);
                        for (var B = 0; d > B; B++) a[l + B] = c[e + B]
                    },
                    ib: function(a) {
                        var c, e, d, l, B;
                        c = d = 0;
                        for (e = a.length; e > c; c++) d += a[c].length;
                        B = new Uint8Array(d);
                        c = d = 0;
                        for (e = a.length; e > c; c++) l = a[c], B.set(l, d), d += l.length;
                        return B
                    }
                },
                l = {
                    X: function(a, c, e, d, l) {
                        for (var B = 0; d > B; B++) a[l + B] = c[e + B]
                    },
                    ib: function(a) {
                        return [].concat.apply([], a)
                    }
                };
            c.pc = function(a) {
                a ? (c.ba = Uint8Array, c.O = Uint16Array, c.Ja =
                    Int32Array, c.assign(c, e)) : (c.ba = Array, c.O = Array, c.Ja = Array, c.assign(c, l))
            };
            c.pc(a)
        }, {}],
        4: [function(a, d, c) {
            function e(a, c) {
                if (65537 > c && (a.subarray && k || !a.subarray && p)) return String.fromCharCode.apply(null, l.fb(a, c));
                for (var e = "", d = 0; c > d; d++) e += String.fromCharCode(a[d]);
                return e
            }
            var l = a("./common"),
                p = !0,
                k = !0;
            try {
                new Uint8Array(1)
            } catch (x) {
                k = !1
            }
            var n = new l.ba(256);
            for (a = 0; 256 > a; a++) n[a] = 252 <= a ? 6 : 248 <= a ? 5 : 240 <= a ? 4 : 224 <= a ? 3 : 192 <= a ? 2 : 1;
            n[254] = n[254] = 1;
            c.rc = function(a) {
                var c, e, d, n, k, p = a.length,
                    u = 0;
                for (n =
                    0; p > n; n++) e = a.charCodeAt(n), 55296 === (64512 & e) && p > n + 1 && (d = a.charCodeAt(n + 1), 56320 === (64512 & d) && (e = 65536 + (e - 55296 << 10) + (d - 56320), n++)), u += 128 > e ? 1 : 2048 > e ? 2 : 65536 > e ? 3 : 4;
                c = new l.ba(u);
                for (n = k = 0; u > k; n++) e = a.charCodeAt(n), 55296 === (64512 & e) && p > n + 1 && (d = a.charCodeAt(n + 1), 56320 === (64512 & d) && (e = 65536 + (e - 55296 << 10) + (d - 56320), n++)), 128 > e ? c[k++] = e : 2048 > e ? (c[k++] = 192 | e >>> 6, c[k++] = 128 | 63 & e) : 65536 > e ? (c[k++] = 224 | e >>> 12, c[k++] = 128 | e >>> 6 & 63, c[k++] = 128 | 63 & e) : (c[k++] = 240 | e >>> 18, c[k++] = 128 | e >>> 12 & 63, c[k++] = 128 | e >>> 6 & 63,
                    c[k++] = 128 | 63 & e);
                return c
            };
            c.Xb = function(a) {
                return e(a, a.length)
            };
            c.Wb = function(a) {
                for (var c = new l.ba(a.length), e = 0, d = c.length; d > e; e++) c[e] = a.charCodeAt(e);
                return c
            };
            c.Yb = function(a, c) {
                var d, l, k, p, P = c || a.length,
                    u = Array(2 * P);
                for (d = l = 0; P > d;)
                    if (k = a[d++], 128 > k) u[l++] = k;
                    else if (p = n[k], 4 < p) u[l++] = 65533, d += p - 1;
                else {
                    for (k &= 2 === p ? 31 : 3 === p ? 15 : 7; 1 < p && P > d;) k = k << 6 | 63 & a[d++], p--;
                    1 < p ? u[l++] = 65533 : 65536 > k ? u[l++] = k : (k -= 65536, u[l++] = 55296 | k >> 10 & 1023, u[l++] = 56320 | 1023 & k)
                }
                return e(u, l)
            };
            c.sc = function(a, c) {
                var e;
                c = c ||
                    a.length;
                c > a.length && (c = a.length);
                for (e = c - 1; 0 <= e && 128 === (192 & a[e]);) e--;
                return 0 > e ? c : 0 === e ? c : e + n[a[e]] > c ? e : c
            }
        }, {
            "./common": 3
        }],
        5: [function(a, d) {
            d.P = function(a, e, d, p) {
                var k = 65535 & a | 0;
                a = a >>> 16 & 65535 | 0;
                for (var n = 0; 0 !== d;) {
                    n = 2E3 < d ? 2E3 : d;
                    d -= n;
                    do k = k + e[p++] | 0, a = a + k | 0; while (--n);
                    k %= 65521;
                    a %= 65521
                }
                return k | a << 16 | 0
            }
        }, {}],
        6: [function(a, d) {
            d.P = {
                rb: 0,
                Mc: 1,
                sb: 2,
                Ic: 3,
                Va: 4,
                Ac: 5,
                Qc: 6,
                za: 0,
                Wa: 1,
                Kc: 2,
                Fc: -1,
                Oc: -2,
                Bc: -3,
                Qb: -5,
                Lc: 0,
                yc: 1,
                xc: 9,
                Cc: -1,
                Gc: 1,
                Jc: 2,
                Nc: 3,
                Hc: 4,
                Dc: 0,
                zc: 0,
                Pc: 1,
                Rc: 2,
                Ec: 8
            }
        }, {}],
        7: [function(a, d) {
            var c =
                function() {
                    for (var a, c = [], d = 0; 256 > d; d++) {
                        a = d;
                        for (var k = 0; 8 > k; k++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
                        c[d] = a
                    }
                    return c
                }();
            d.P = function(a, d, p, k) {
                p = k + p;
                for (a ^= -1; p > k; k++) a = a >>> 8 ^ c[255 & (a ^ d[k])];
                return -1 ^ a
            }
        }, {}],
        8: [function(a, d, c) {
            function e(a, b) {
                return a.j = w[b], b
            }

            function l(a) {
                for (var b = a.length; 0 <= --b;) a[b] = 0
            }

            function p(a) {
                var b = a.state,
                    I = b.f;
                I > a.b && (I = a.b);
                0 !== I && (M.X(a.J, b.w, b.Qa, I, a.B), a.B += I, b.Qa += I, a.sa += I, a.b -= I, b.f -= I, 0 === b.f && (b.Qa = 0))
            }

            function k(a, b) {
                C.Sb(a, 0 <= a.Y ? a.Y : -1, a.a - a.Y, b);
                a.Y = a.a;
                p(a.h)
            }

            function n(a, b) {
                a.w[a.f++] = b
            }

            function x(a, b) {
                a.w[a.f++] = b >>> 8 & 255;
                a.w[a.f++] = 255 & b
            }

            function E(a, b) {
                var I, h, c = a.Db,
                    e = a.a,
                    d = a.W,
                    l = a.Fb,
                    r = a.a > a.aa - Y ? a.a - (a.aa - Y) : 0,
                    g = a.window,
                    m = a.ya,
                    k = a.la,
                    n = a.a + T,
                    q = g[e + d - 1],
                    p = g[e + d];
                a.W >= a.xb && (c >>= 2);
                l > a.c && (l = a.c);
                do
                    if (I = b, g[I + d] === p && g[I + d - 1] === q && g[I] === g[e] && g[++I] === g[e + 1]) {
                        e += 2;
                        for (I++; g[++e] === g[++I] && g[++e] === g[++I] && g[++e] === g[++I] && g[++e] === g[++I] && g[++e] === g[++I] && g[++e] === g[++I] && g[++e] === g[++I] && g[++e] === g[++I] && n > e;);
                        if (h = T - (n - e), e = n - T, h > d) {
                            if (a.Ea =
                                b, d = h, h >= l) break;
                            q = g[e + d - 1];
                            p = g[e + d]
                        }
                    }
                while ((b = k[b & m]) > r && 0 !== --c);
                return d <= a.c ? d : a.c
            }

            function B(a) {
                var b, I, h, c, e = a.aa;
                do {
                    if (c = a.Nb - a.c - a.a, a.a >= e + (e - Y)) {
                        M.X(a.window, a.window, e, e, 0);
                        a.Ea -= e;
                        a.a -= e;
                        a.Y -= e;
                        b = I = a.$a;
                        do h = a.head[--b], a.head[b] = h >= e ? h - e : 0; while (--I);
                        b = I = e;
                        do h = a.la[--b], a.la[b] = h >= e ? h - e : 0; while (--I);
                        c += e
                    }
                    if (0 === a.h.v) break;
                    b = a.h;
                    h = a.window;
                    var d = a.a + a.c,
                        g = b.v;
                    if (I = (g > c && (g = c), 0 === g ? 0 : (b.v -= g, M.X(h, b.input, b.U, g, d), 1 === b.state.u ? b.g = z(b.g, h, g, d) : 2 === b.state.u && (b.g = r(b.g, h, g, d)), b.U +=
                            g, b.fa += g, g)), a.c += I, a.c + a.S >= F)
                        for (c = a.a - a.S, a.o = a.window[c], a.o = (a.o << a.pa ^ a.window[c + 1]) & a.oa; a.S && (a.o = (a.o << a.pa ^ a.window[c + F - 1]) & a.oa, a.la[c & a.ya] = a.head[a.o], a.head[a.o] = c, c++, a.S--, !(a.c + a.S < F)););
                } while (a.c < Y && 0 !== a.h.v)
            }

            function v(a, c) {
                for (var I, h;;) {
                    if (a.c < Y) {
                        if (B(a), a.c < Y && c === b) return R;
                        if (0 === a.c) break
                    }
                    if (I = 0, a.c >= F && (a.o = (a.o << a.pa ^ a.window[a.a + F - 1]) & a.oa, I = a.la[a.a & a.ya] = a.head[a.o], a.head[a.o] = a.a), 0 !== I && a.a - I <= a.aa - Y && (a.m = E(a, I)), a.m >= F)
                        if (h = C.na(a, a.a - a.Ea, a.m - F), a.c -= a.m, a.m <=
                            a.mb && a.c >= F) {
                            a.m--;
                            do a.a++, a.o = (a.o << a.pa ^ a.window[a.a + F - 1]) & a.oa, I = a.la[a.a & a.ya] = a.head[a.o], a.head[a.o] = a.a; while (0 !== --a.m);
                            a.a++
                        } else a.a += a.m, a.m = 0, a.o = a.window[a.a], a.o = (a.o << a.pa ^ a.window[a.a + 1]) & a.oa;
                    else h = C.na(a, 0, a.window[a.a]), a.c--, a.a++;
                    if (h && (k(a, !1), 0 === a.h.b)) return R
                }
                return a.S = a.a < F - 1 ? a.a : F - 1, c === L ? (k(a, !0), 0 === a.h.b ? V : X) : a.T && (k(a, !1), 0 === a.h.b) ? R : Z
            }

            function O(a, c) {
                for (var I, h, e;;) {
                    if (a.c < Y) {
                        if (B(a), a.c < Y && c === b) return R;
                        if (0 === a.c) break
                    }
                    if (I = 0, a.c >= F && (a.o = (a.o << a.pa ^ a.window[a.a +
                            F - 1]) & a.oa, I = a.la[a.a & a.ya] = a.head[a.o], a.head[a.o] = a.a), a.W = a.m, a.Ib = a.Ea, a.m = F - 1, 0 !== I && a.W < a.mb && a.a - I <= a.aa - Y && (a.m = E(a, I), 5 >= a.m && (a.ea === q || a.m === F && 4096 < a.a - a.Ea) && (a.m = F - 1)), a.W >= F && a.m <= a.W) {
                        e = a.a + a.c - F;
                        h = C.na(a, a.a - 1 - a.Ib, a.W - F);
                        a.c -= a.W - 1;
                        a.W -= 2;
                        do ++a.a <= e && (a.o = (a.o << a.pa ^ a.window[a.a + F - 1]) & a.oa, I = a.la[a.a & a.ya] = a.head[a.o], a.head[a.o] = a.a); while (0 !== --a.W);
                        if (a.Da = 0, a.m = F - 1, a.a++, h && (k(a, !1), 0 === a.h.b)) return R
                    } else if (a.Da) {
                        if (h = C.na(a, 0, a.window[a.a - 1]), h && k(a, !1), a.a++, a.c--, 0 === a.h.b) return R
                    } else a.Da =
                        1, a.a++, a.c--
                }
                return a.Da && (C.na(a, 0, a.window[a.a - 1]), a.Da = 0), a.S = a.a < F - 1 ? a.a : F - 1, c === L ? (k(a, !0), 0 === a.h.b ? V : X) : a.T && (k(a, !1), 0 === a.h.b) ? R : Z
            }

            function H(a, b, c, h, e) {
                this.fc = a;
                this.kc = b;
                this.nc = c;
                this.jc = h;
                this.ec = e
            }

            function P() {
                this.h = null;
                this.status = 0;
                this.w = null;
                this.u = this.f = this.Qa = this.V = 0;
                this.i = null;
                this.Z = 0;
                this.method = m;
                this.Ca = -1;
                this.ya = this.qb = this.aa = 0;
                this.window = null;
                this.Nb = 0;
                this.head = this.la = null;
                this.Fb = this.xb = this.ea = this.level = this.mb = this.Db = this.W = this.c = this.Ea = this.a = this.Da =
                    this.Ib = this.m = this.Y = this.pa = this.oa = this.jb = this.$a = this.o = 0;
                this.L = new M.O(2 * J);
                this.va = new M.O(2 * (2 * A + 1));
                this.H = new M.O(2 * (2 * ia + 1));
                l(this.L);
                l(this.va);
                l(this.H);
                this.tb = this.Xa = this.bb = null;
                this.ga = new M.O(wa + 1);
                this.A = new M.O(2 * G + 1);
                l(this.A);
                this.Ba = this.ia = 0;
                this.depth = new M.O(2 * G + 1);
                l(this.depth);
                this.G = this.K = this.S = this.matches = this.Ha = this.ka = this.Ka = this.T = this.Na = this.lb = 0
            }

            function u(a) {
                var c;
                return a && a.state ? (a.fa = a.sa = 0, a.Ya = g, c = a.state, c.f = 0, c.Qa = 0, 0 > c.u && (c.u = -c.u), c.status = c.u ?
                    ba : S, a.g = 2 === c.u ? 0 : 1, c.Ca = b, C.Tb(c), K) : e(a, D)
            }

            function y(a) {
                var b = u(a);
                b === K && (a = a.state, a.Nb = 2 * a.aa, l(a.head), a.mb = N[a.level].kc, a.xb = N[a.level].fc, a.Fb = N[a.level].nc, a.Db = N[a.level].jc, a.a = 0, a.Y = 0, a.c = 0, a.S = 0, a.m = a.W = F - 1, a.Da = 0, a.o = 0);
                return b
            }

            function Q(a, b, c, h, d, g) {
                if (!a) return D;
                var l = 1;
                if (b === U && (b = 6), 0 > h ? (l = 0, h = -h) : 15 < h && (l = 2, h -= 16), 1 > d || d > ca || c !== m || 8 > h || 15 < h || 0 > b || 9 < b || 0 > g || g > W) return e(a, D);
                8 === h && (h = 9);
                var r = new P;
                return a.state = r, r.h = a, r.u = l, r.i = null, r.qb = h, r.aa = 1 << r.qb, r.ya = r.aa - 1, r.jb =
                    d + 7, r.$a = 1 << r.jb, r.oa = r.$a - 1, r.pa = ~~((r.jb + F - 1) / F), r.window = new M.ba(2 * r.aa), r.head = new M.O(r.$a), r.la = new M.O(r.aa), r.Na = 1 << d + 6, r.V = 4 * r.Na, r.w = new M.ba(r.V), r.Ka = r.Na >> 1, r.lb = 3 * r.Na, r.level = b, r.ea = g, r.method = c, y(a)
            }
            var N, M = a("../utils/common"),
                C = a("./trees"),
                z = a("./adler32"),
                r = a("./crc32"),
                w = a("./messages"),
                b = 0,
                L = 4,
                K = 0,
                D = -2,
                U = -1,
                q = 1,
                W = 4,
                g = 2,
                m = 8,
                ca = 9,
                G = 286,
                A = 30,
                ia = 19,
                J = 2 * G + 1,
                wa = 15,
                F = 3,
                T = 258,
                Y = T + F + 1,
                ba = 42,
                S = 113,
                R = 1,
                Z = 2,
                V = 3,
                X = 4;
            N = [new H(0, 0, 0, 0, function(a, c) {
                var I = 65535;
                for (I > a.V - 5 && (I = a.V - 5);;) {
                    if (1 >=
                        a.c) {
                        if (B(a), 0 === a.c && c === b) return R;
                        if (0 === a.c) break
                    }
                    a.a += a.c;
                    a.c = 0;
                    var h = a.Y + I;
                    if ((0 === a.a || a.a >= h) && (a.c = a.a - h, a.a = h, k(a, !1), 0 === a.h.b) || a.a - a.Y >= a.aa - Y && (k(a, !1), 0 === a.h.b)) return R
                }
                return a.S = 0, c === L ? (k(a, !0), 0 === a.h.b ? V : X) : (a.a > a.Y && k(a, !1), R)
            }), new H(4, 4, 8, 4, v), new H(4, 5, 16, 8, v), new H(4, 6, 32, 32, v), new H(4, 4, 16, 16, O), new H(8, 16, 32, 32, O), new H(8, 16, 128, 128, O), new H(8, 32, 128, 256, O), new H(32, 128, 258, 1024, O), new H(32, 258, 258, 4096, O)];
            c.Xc = function(a, b) {
                return Q(a, b, m, 15, 8, 0)
            };
            c.$b = Q;
            c.Zc = y;
            c.$c =
                u;
            c.ac = function(a, b) {
                a && a.state && (2 !== a.state.u || (a.state.i = b))
            };
            c.ub = function(a, c) {
                var I, h, d, g;
                if (!a || !a.state || 5 < c || 0 > c) return a ? e(a, D) : D;
                if (h = a.state, !a.J || !a.input && 0 !== a.v || 666 === h.status && c !== L) return e(a, 0 === a.b ? -5 : D);
                if (h.h = a, I = h.Ca, h.Ca = c, h.status === ba) 2 === h.u ? (a.g = 0, n(h, 31), n(h, 139), n(h, 8), h.i ? (n(h, (h.i.text ? 1 : 0) + (h.i.ca ? 2 : 0) + (h.i.l ? 4 : 0) + (h.i.name ? 8 : 0) + (h.i.ta ? 16 : 0)), n(h, 255 & h.i.time), n(h, h.i.time >> 8 & 255), n(h, h.i.time >> 16 & 255), n(h, h.i.time >> 24 & 255), n(h, 9 === h.level ? 2 : 2 <= h.ea || 2 > h.level ? 4 :
                    0), n(h, 255 & h.i.Gb), h.i.l && h.i.l.length && (n(h, 255 & h.i.l.length), n(h, h.i.l.length >> 8 & 255)), h.i.ca && (a.g = r(a.g, h.w, h.f, 0)), h.Z = 0, h.status = 69) : (n(h, 0), n(h, 0), n(h, 0), n(h, 0), n(h, 0), n(h, 9 === h.level ? 2 : 2 <= h.ea || 2 > h.level ? 4 : 0), n(h, 3), h.status = S)) : (d = m + (h.qb - 8 << 4) << 8, g = -1, g = 2 <= h.ea || 2 > h.level ? 0 : 6 > h.level ? 1 : 6 === h.level ? 2 : 3, d |= g << 6, 0 !== h.a && (d |= 32), h.status = S, x(h, d + (31 - d % 31)), 0 !== h.a && (x(h, a.g >>> 16), x(h, 65535 & a.g)), a.g = 1);
                if (69 === h.status)
                    if (h.i.l) {
                        for (d = h.f; h.Z < (65535 & h.i.l.length) && (h.f !== h.V || (h.i.ca && h.f >
                                d && (a.g = r(a.g, h.w, h.f - d, d)), p(a), d = h.f, h.f !== h.V));) n(h, 255 & h.i.l[h.Z]), h.Z++;
                        h.i.ca && h.f > d && (a.g = r(a.g, h.w, h.f - d, d));
                        h.Z === h.i.l.length && (h.Z = 0, h.status = 73)
                    } else h.status = 73;
                if (73 === h.status)
                    if (h.i.name) {
                        d = h.f;
                        do {
                            if (h.f === h.V && (h.i.ca && h.f > d && (a.g = r(a.g, h.w, h.f - d, d)), p(a), d = h.f, h.f === h.V)) {
                                g = 1;
                                break
                            }
                            g = h.Z < h.i.name.length ? 255 & h.i.name.charCodeAt(h.Z++) : 0;
                            n(h, g)
                        } while (0 !== g);
                        h.i.ca && h.f > d && (a.g = r(a.g, h.w, h.f - d, d));
                        0 === g && (h.Z = 0, h.status = 91)
                    } else h.status = 91;
                if (91 === h.status)
                    if (h.i.ta) {
                        d = h.f;
                        do {
                            if (h.f ===
                                h.V && (h.i.ca && h.f > d && (a.g = r(a.g, h.w, h.f - d, d)), p(a), d = h.f, h.f === h.V)) {
                                g = 1;
                                break
                            }
                            g = h.Z < h.i.ta.length ? 255 & h.i.ta.charCodeAt(h.Z++) : 0;
                            n(h, g)
                        } while (0 !== g);
                        h.i.ca && h.f > d && (a.g = r(a.g, h.w, h.f - d, d));
                        0 === g && (h.status = 103)
                    } else h.status = 103;
                if (103 === h.status && (h.i.ca ? (h.f + 2 > h.V && p(a), h.f + 2 <= h.V && (n(h, 255 & a.g), n(h, a.g >> 8 & 255), a.g = 0, h.status = S)) : h.status = S), 0 !== h.f) {
                    if (p(a), 0 === a.b) return h.Ca = -1, K
                } else if (0 === a.v && (c << 1) - (4 < c ? 9 : 0) <= (I << 1) - (4 < I ? 9 : 0) && c !== L) return e(a, -5);
                if (666 === h.status && 0 !== a.v) return e(a, -5);
                if (0 !== a.v || 0 !== h.c || c !== b && 666 !== h.status) {
                    var q;
                    if (2 === h.ea) a: {
                        for (var w;;) {
                            if (0 === h.c && (B(h), 0 === h.c)) {
                                if (c === b) {
                                    q = R;
                                    break a
                                }
                                break
                            }
                            if (h.m = 0, w = C.na(h, 0, h.window[h.a]), h.c--, h.a++, w && (k(h, !1), 0 === h.h.b)) {
                                q = R;
                                break a
                            }
                        }
                        q = (h.S = 0, c === L ? (k(h, !0), 0 === h.h.b ? V : X) : h.T && (k(h, !1), 0 === h.h.b) ? R : Z)
                    }
                    else if (3 === h.ea) a: {
                        var u, v;
                        for (w = h.window;;) {
                            if (h.c <= T) {
                                if (B(h), h.c <= T && c === b) {
                                    q = R;
                                    break a
                                }
                                if (0 === h.c) break
                            }
                            if (h.m = 0, h.c >= F && 0 < h.a && (v = h.a - 1, u = w[v], u === w[++v] && u === w[++v] && u === w[++v])) {
                                for (I = h.a + T; u === w[++v] &&
                                    u === w[++v] && u === w[++v] && u === w[++v] && u === w[++v] && u === w[++v] && u === w[++v] && u === w[++v] && I > v;);
                                h.m = T - (I - v);
                                h.m > h.c && (h.m = h.c)
                            }
                            if (h.m >= F ? (q = C.na(h, 1, h.m - F), h.c -= h.m, h.a += h.m, h.m = 0) : (q = C.na(h, 0, h.window[h.a]), h.c--, h.a++), q && (k(h, !1), 0 === h.h.b)) {
                                q = R;
                                break a
                            }
                        }
                        q = (h.S = 0, c === L ? (k(h, !0), 0 === h.h.b ? V : X) : h.T && (k(h, !1), 0 === h.h.b) ? R : Z)
                    }
                    else q = N[h.level].ec(h, c);
                    if ((q === V || q === X) && (h.status = 666), q === R || q === V) return 0 === a.b && (h.Ca = -1), K;
                    if (q === Z && (1 === c ? C.Rb(h) : 5 !== c && (C.Ub(h, 0, 0, !1), 3 === c && (l(h.head), 0 === h.c && (h.a =
                            0, h.Y = 0, h.S = 0))), p(a), 0 === a.b)) return h.Ca = -1, K
                }
                return c !== L ? K : 0 >= h.u ? 1 : (2 === h.u ? (n(h, 255 & a.g), n(h, a.g >> 8 & 255), n(h, a.g >> 16 & 255), n(h, a.g >> 24 & 255), n(h, 255 & a.fa), n(h, a.fa >> 8 & 255), n(h, a.fa >> 16 & 255), n(h, a.fa >> 24 & 255)) : (x(h, a.g >>> 16), x(h, 65535 & a.g)), p(a), 0 < h.u && (h.u = -h.u), 0 !== h.f ? K : 1)
            };
            c.Zb = function(a) {
                var b;
                return a && a.state ? (b = a.state.status, b !== ba && 69 !== b && 73 !== b && 91 !== b && 103 !== b && b !== S && 666 !== b ? e(a, D) : (a.state = null, b === S ? e(a, -3) : K)) : D
            };
            c.Wc = ""
        }, {
            "../utils/common": 3,
            "./adler32": 5,
            "./crc32": 7,
            "./messages": 13,
            "./trees": 14
        }],
        9: [function(a, d) {
            d.P = function() {
                this.Gb = this.uc = this.time = this.text = 0;
                this.l = null;
                this.hb = 0;
                this.ta = this.name = "";
                this.ca = 0;
                this.done = !1
            }
        }, {}],
        10: [function(a, d) {
            d.P = function(a, d) {
                var l, p, k, n, x, E, B, v, O, H, P, u, y, Q, N, M, C, z, r, w, b, L, K, D;
                l = a.state;
                p = a.U;
                K = a.input;
                k = p + (a.v - 5);
                n = a.B;
                D = a.J;
                x = n - (d - a.b);
                E = n + (a.b - 257);
                B = l.Za;
                v = l.N;
                O = l.ma;
                H = l.M;
                P = l.window;
                u = l.qa;
                y = l.D;
                Q = l.ja;
                N = l.ua;
                M = (1 << l.da) - 1;
                C = (1 << l.Aa) - 1;
                a: do b: for (15 > y && (u += K[p++] << y, y += 8, u += K[p++] << y, y += 8), z = Q[u & M];;) {
                        if (r = z >>> 24, u >>>= r, y -=
                            r, r = z >>> 16 & 255, 0 === r) D[n++] = 65535 & z;
                        else {
                            if (!(16 & r)) {
                                if (0 === (64 & r)) {
                                    z = Q[(65535 & z) + (u & (1 << r) - 1)];
                                    continue b
                                }
                                if (32 & r) {
                                    l.mode = 12;
                                    break a
                                }
                                a.j = "invalid literal/length code";
                                l.mode = 30;
                                break a
                            }
                            w = 65535 & z;
                            (r &= 15) && (r > y && (u += K[p++] << y, y += 8), w += u & (1 << r) - 1, u >>>= r, y -= r);
                            15 > y && (u += K[p++] << y, y += 8, u += K[p++] << y, y += 8);
                            z = N[u & C];
                            c: for (;;) {
                                if (r = z >>> 24, u >>>= r, y -= r, r = z >>> 16 & 255, !(16 & r)) {
                                    if (0 === (64 & r)) {
                                        z = N[(65535 & z) + (u & (1 << r) - 1)];
                                        continue c
                                    }
                                    a.j = "invalid distance code";
                                    l.mode = 30;
                                    break a
                                }
                                if (b = 65535 & z, r &= 15, r > y && (u += K[p++] <<
                                        y, y += 8, r > y && (u += K[p++] << y, y += 8)), b += u & (1 << r) - 1, b > B) {
                                    a.j = "invalid distance too far back";
                                    l.mode = 30;
                                    break a
                                }
                                if (u >>>= r, y -= r, r = n - x, b > r) {
                                    if (r = b - r, r > O && l.nb) {
                                        a.j = "invalid distance too far back";
                                        l.mode = 30;
                                        break a
                                    }
                                    if (z = 0, L = P, 0 === H) {
                                        if (z += v - r, w > r) {
                                            w -= r;
                                            do D[n++] = P[z++]; while (--r);
                                            z = n - b;
                                            L = D
                                        }
                                    } else if (r > H) {
                                        if (z += v + H - r, r -= H, w > r) {
                                            w -= r;
                                            do D[n++] = P[z++]; while (--r);
                                            if (z = 0, w > H) {
                                                r = H;
                                                w -= r;
                                                do D[n++] = P[z++]; while (--r);
                                                z = n - b;
                                                L = D
                                            }
                                        }
                                    } else if (z += H - r, w > r) {
                                        w -= r;
                                        do D[n++] = P[z++]; while (--r);
                                        z = n - b;
                                        L = D
                                    }
                                    for (; 2 < w;) D[n++] = L[z++], D[n++] =
                                        L[z++], D[n++] = L[z++], w -= 3;
                                    w && (D[n++] = L[z++], 1 < w && (D[n++] = L[z++]))
                                } else {
                                    z = n - b;
                                    do D[n++] = D[z++], D[n++] = D[z++], D[n++] = D[z++], w -= 3; while (2 < w);
                                    w && (D[n++] = D[z++], 1 < w && (D[n++] = D[z++]))
                                }
                                break
                            }
                        }
                        break
                    }
                    while (k > p && E > n);
                    w = y >> 3;
                p -= w;
                y -= w << 3;
                a.U = p;
                a.B = n;
                a.v = k > p ? 5 + (k - p) : 5 - (p - k);
                a.b = E > n ? 257 + (E - n) : 257 - (n - E);
                l.qa = u & (1 << y) - 1;
                l.D = y
            }
        }, {}],
        11: [function(a, d, c) {
            function e(a) {
                return (a >>> 24 & 255) + (a >>> 8 & 65280) + ((65280 & a) << 8) + ((255 & a) << 24)
            }

            function l() {
                this.mode = 0;
                this.cb = !1;
                this.u = 0;
                this.Ab = !1;
                this.total = this.check = this.Za =
                    this.C = 0;
                this.head = null;
                this.M = this.ma = this.N = this.Ia = 0;
                this.window = null;
                this.l = this.offset = this.length = this.D = this.qa = 0;
                this.ua = this.ja = null;
                this.R = this.Oa = this.Ga = this.Eb = this.Aa = this.da = 0;
                this.next = null;
                this.I = new v.O(320);
                this.Sa = new v.O(288);
                this.vb = this.Cb = null;
                this.tc = this.back = this.nb = 0
            }

            function p(a) {
                var c;
                return a && a.state ? (c = a.state, a.fa = a.sa = c.total = 0, a.j = "", c.u && (a.g = 1 & c.u), c.mode = N, c.cb = 0, c.Ab = 0, c.Za = 32768, c.head = null, c.qa = 0, c.D = 0, c.ja = c.Cb = new v.Ja(M), c.ua = c.vb = new v.Ja(C), c.nb = 1, c.back = -1, y) : Q
            }

            function k(a) {
                var c;
                return a && a.state ? (c = a.state, c.N = 0, c.ma = 0, c.M = 0, p(a)) : Q
            }

            function n(a, c) {
                var b, d;
                return a && a.state ? (d = a.state, 0 > c ? (b = 0, c = -c) : (b = (c >> 4) + 1, 48 > c && (c &= 15)), c && (8 > c || 15 < c) ? Q : (null !== d.window && d.Ia !== c && (d.window = null), d.u = b, d.Ia = c, k(a))) : Q
            }

            function x(a, c) {
                var b, d;
                return a ? (d = new l, a.state = d, d.window = null, b = n(a, c), b !== y && (a.state = null), b) : Q
            }
            var E, B, v = a("../utils/common"),
                O = a("./adler32"),
                H = a("./crc32"),
                P = a("./inffast"),
                u = a("./inftrees"),
                y = 0,
                Q = -2,
                N = 1,
                M = 852,
                C = 592,
                z = !0;
            c.dd = k;
            c.ed =
                n;
            c.fd = p;
            c.bd = function(a) {
                return x(a, 15)
            };
            c.ic = x;
            c.ab = function(a, c) {
                var b, d, l, k, n, q, p, g, m, x, G, A, M, J, C, F, T, Y, ba, S, R, Z, V = 0,
                    X = new v.ba(4),
                    na = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                if (!a || !a.state || !a.J || !a.input && 0 !== a.v) return Q;
                b = a.state;
                12 === b.mode && (b.mode = 13);
                n = a.B;
                l = a.J;
                p = a.b;
                k = a.U;
                d = a.input;
                q = a.v;
                g = b.qa;
                m = b.D;
                x = q;
                G = p;
                R = y;
                a: for (;;) switch (b.mode) {
                    case N:
                        if (0 === b.u) {
                            b.mode = 13;
                            break
                        }
                        for (; 16 > m;) {
                            if (0 === q) break a;
                            q--;
                            g += d[k++] << m;
                            m += 8
                        }
                        if (2 & b.u && 35615 === g) {
                            b.check = 0;
                            X[0] = 255 & g;
                            X[1] = g >>> 8 & 255;
                            b.check = H(b.check, X, 2, 0);
                            m = g = 0;
                            b.mode = 2;
                            break
                        }
                        if (b.C = 0, b.head && (b.head.done = !1), !(1 & b.u) || (((255 & g) << 8) + (g >> 8)) % 31) {
                            a.j = "incorrect header check";
                            b.mode = 30;
                            break
                        }
                        if (8 !== (15 & g)) {
                            a.j = "unknown compression method";
                            b.mode = 30;
                            break
                        }
                        if (g >>>= 4, m -= 4, S = (15 & g) + 8, 0 === b.Ia) b.Ia = S;
                        else if (S > b.Ia) {
                            a.j = "invalid window size";
                            b.mode = 30;
                            break
                        }
                        b.Za = 1 << S;
                        a.g = b.check = 1;
                        b.mode = 512 & g ? 10 : 12;
                        m = g = 0;
                        break;
                    case 2:
                        for (; 16 > m;) {
                            if (0 === q) break a;
                            q--;
                            g += d[k++] << m;
                            m += 8
                        }
                        if (b.C = g, 8 !== (255 & b.C)) {
                            a.j = "unknown compression method";
                            b.mode =
                                30;
                            break
                        }
                        if (57344 & b.C) {
                            a.j = "unknown header flags set";
                            b.mode = 30;
                            break
                        }
                        b.head && (b.head.text = g >> 8 & 1);
                        512 & b.C && (X[0] = 255 & g, X[1] = g >>> 8 & 255, b.check = H(b.check, X, 2, 0));
                        m = g = 0;
                        b.mode = 3;
                    case 3:
                        for (; 32 > m;) {
                            if (0 === q) break a;
                            q--;
                            g += d[k++] << m;
                            m += 8
                        }
                        b.head && (b.head.time = g);
                        512 & b.C && (X[0] = 255 & g, X[1] = g >>> 8 & 255, X[2] = g >>> 16 & 255, X[3] = g >>> 24 & 255, b.check = H(b.check, X, 4, 0));
                        m = g = 0;
                        b.mode = 4;
                    case 4:
                        for (; 16 > m;) {
                            if (0 === q) break a;
                            q--;
                            g += d[k++] << m;
                            m += 8
                        }
                        b.head && (b.head.uc = 255 & g, b.head.Gb = g >> 8);
                        512 & b.C && (X[0] = 255 & g, X[1] = g >>> 8 & 255,
                            b.check = H(b.check, X, 2, 0));
                        m = g = 0;
                        b.mode = 5;
                    case 5:
                        if (1024 & b.C) {
                            for (; 16 > m;) {
                                if (0 === q) break a;
                                q--;
                                g += d[k++] << m;
                                m += 8
                            }
                            b.length = g;
                            b.head && (b.head.hb = g);
                            512 & b.C && (X[0] = 255 & g, X[1] = g >>> 8 & 255, b.check = H(b.check, X, 2, 0));
                            m = g = 0
                        } else b.head && (b.head.l = null);
                        b.mode = 6;
                    case 6:
                        if (1024 & b.C && (A = b.length, A > q && (A = q), A && (b.head && (S = b.head.hb - b.length, b.head.l || (b.head.l = Array(b.head.hb)), v.X(b.head.l, d, k, A, S)), 512 & b.C && (b.check = H(b.check, d, A, k)), q -= A, k += A, b.length -= A), b.length)) break a;
                        b.length = 0;
                        b.mode = 7;
                    case 7:
                        if (2048 &
                            b.C) {
                            if (0 === q) break a;
                            A = 0;
                            do S = d[k + A++], b.head && S && 65536 > b.length && (b.head.name += String.fromCharCode(S)); while (S && q > A);
                            if (512 & b.C && (b.check = H(b.check, d, A, k)), q -= A, k += A, S) break a
                        } else b.head && (b.head.name = null);
                        b.length = 0;
                        b.mode = 8;
                    case 8:
                        if (4096 & b.C) {
                            if (0 === q) break a;
                            A = 0;
                            do S = d[k + A++], b.head && S && 65536 > b.length && (b.head.ta += String.fromCharCode(S)); while (S && q > A);
                            if (512 & b.C && (b.check = H(b.check, d, A, k)), q -= A, k += A, S) break a
                        } else b.head && (b.head.ta = null);
                        b.mode = 9;
                    case 9:
                        if (512 & b.C) {
                            for (; 16 > m;) {
                                if (0 === q) break a;
                                q--;
                                g += d[k++] << m;
                                m += 8
                            }
                            if (g !== (65535 & b.check)) {
                                a.j = "header crc mismatch";
                                b.mode = 30;
                                break
                            }
                            m = g = 0
                        }
                        b.head && (b.head.ca = b.C >> 9 & 1, b.head.done = !0);
                        a.g = b.check = 0;
                        b.mode = 12;
                        break;
                    case 10:
                        for (; 32 > m;) {
                            if (0 === q) break a;
                            q--;
                            g += d[k++] << m;
                            m += 8
                        }
                        a.g = b.check = e(g);
                        m = g = 0;
                        b.mode = 11;
                    case 11:
                        if (0 === b.Ab) return a.B = n, a.b = p, a.U = k, a.v = q, b.qa = g, b.D = m, 2;
                        a.g = b.check = 1;
                        b.mode = 12;
                    case 12:
                        if (5 === c || 6 === c) break a;
                    case 13:
                        if (b.cb) {
                            g >>>= 7 & m;
                            m -= 7 & m;
                            b.mode = 27;
                            break
                        }
                        for (; 3 > m;) {
                            if (0 === q) break a;
                            q--;
                            g += d[k++] << m;
                            m += 8
                        }
                        switch (b.cb = 1 & g, g >>>=
                            1, --m, 3 & g) {
                            case 0:
                                b.mode = 14;
                                break;
                            case 1:
                                J = b;
                                if (z) {
                                    F = void 0;
                                    E = new v.Ja(512);
                                    B = new v.Ja(32);
                                    for (F = 0; 144 > F;) J.I[F++] = 8;
                                    for (; 256 > F;) J.I[F++] = 9;
                                    for (; 280 > F;) J.I[F++] = 7;
                                    for (; 288 > F;) J.I[F++] = 8;
                                    u(1, J.I, 0, 288, E, 0, J.Sa, {
                                        D: 9
                                    });
                                    for (F = 0; 32 > F;) J.I[F++] = 5;
                                    u(2, J.I, 0, 32, B, 0, J.Sa, {
                                        D: 5
                                    });
                                    z = !1
                                }
                                J.ja = E;
                                J.da = 9;
                                J.ua = B;
                                J.Aa = 5;
                                if (b.mode = 20, 6 === c) {
                                    g >>>= 2;
                                    m -= 2;
                                    break a
                                }
                                break;
                            case 2:
                                b.mode = 17;
                                break;
                            case 3:
                                a.j = "invalid block type", b.mode = 30
                        }
                        g >>>= 2;
                        m -= 2;
                        break;
                    case 14:
                        g >>>= 7 & m;
                        for (m -= 7 & m; 32 > m;) {
                            if (0 === q) break a;
                            q--;
                            g += d[k++] << m;
                            m += 8
                        }
                        if ((65535 & g) !== (g >>> 16 ^ 65535)) {
                            a.j = "invalid stored block lengths";
                            b.mode = 30;
                            break
                        }
                        if (b.length = 65535 & g, g = 0, m = 0, b.mode = 15, 6 === c) break a;
                    case 15:
                        b.mode = 16;
                    case 16:
                        if (A = b.length) {
                            if (A > q && (A = q), A > p && (A = p), 0 === A) break a;
                            v.X(l, d, k, A, n);
                            q -= A;
                            k += A;
                            p -= A;
                            n += A;
                            b.length -= A;
                            break
                        }
                        b.mode = 12;
                        break;
                    case 17:
                        for (; 14 > m;) {
                            if (0 === q) break a;
                            q--;
                            g += d[k++] << m;
                            m += 8
                        }
                        if (b.Ga = (31 & g) + 257, g >>>= 5, m -= 5, b.Oa = (31 & g) + 1, g >>>= 5, m -= 5, b.Eb = (15 & g) + 4, g >>>= 4, m -= 4, 286 < b.Ga || 30 < b.Oa) {
                            a.j = "too many length or distance symbols";
                            b.mode = 30;
                            break
                        }
                        b.R = 0;
                        b.mode = 18;
                    case 18:
                        for (; b.R < b.Eb;) {
                            for (; 3 > m;) {
                                if (0 === q) break a;
                                q--;
                                g += d[k++] << m;
                                m += 8
                            }
                            b.I[na[b.R++]] = 7 & g;
                            g >>>= 3;
                            m -= 3
                        }
                        for (; 19 > b.R;) b.I[na[b.R++]] = 0;
                        if (b.ja = b.Cb, b.da = 7, Z = {
                                D: b.da
                            }, R = u(0, b.I, 0, 19, b.ja, 0, b.Sa, Z), b.da = Z.D, R) {
                            a.j = "invalid code lengths set";
                            b.mode = 30;
                            break
                        }
                        b.R = 0;
                        b.mode = 19;
                    case 19:
                        for (; b.R < b.Ga + b.Oa;) {
                            for (; V = b.ja[g & (1 << b.da) - 1], C = V >>> 24, F = 65535 & V, !(m >= C);) {
                                if (0 === q) break a;
                                q--;
                                g += d[k++] << m;
                                m += 8
                            }
                            if (16 > F) g >>>= C, m -= C, b.I[b.R++] = F;
                            else {
                                if (16 === F) {
                                    for (J = C + 2; J > m;) {
                                        if (0 === q) break a;
                                        q--;
                                        g += d[k++] << m;
                                        m += 8
                                    }
                                    if (g >>>= C, m -= C, 0 === b.R) {
                                        a.j = "invalid bit length repeat";
                                        b.mode = 30;
                                        break
                                    }
                                    S = b.I[b.R - 1];
                                    A = 3 + (3 & g);
                                    g >>>= 2;
                                    m -= 2
                                } else if (17 === F) {
                                    for (J = C + 3; J > m;) {
                                        if (0 === q) break a;
                                        q--;
                                        g += d[k++] << m;
                                        m += 8
                                    }
                                    g >>>= C;
                                    m -= C;
                                    S = 0;
                                    A = 3 + (7 & g);
                                    g >>>= 3;
                                    m -= 3
                                } else {
                                    for (J = C + 7; J > m;) {
                                        if (0 === q) break a;
                                        q--;
                                        g += d[k++] << m;
                                        m += 8
                                    }
                                    g >>>= C;
                                    m -= C;
                                    S = 0;
                                    A = 11 + (127 & g);
                                    g >>>= 7;
                                    m -= 7
                                }
                                if (b.R + A > b.Ga + b.Oa) {
                                    a.j = "invalid bit length repeat";
                                    b.mode = 30;
                                    break
                                }
                                for (; A--;) b.I[b.R++] = S
                            }
                        }
                        if (30 === b.mode) break;
                        if (0 === b.I[256]) {
                            a.j = "invalid code -- missing end-of-block";
                            b.mode = 30;
                            break
                        }
                        if (b.da = 9, Z = {
                                D: b.da
                            }, R = u(1, b.I, 0, b.Ga, b.ja, 0, b.Sa, Z), b.da = Z.D, R) {
                            a.j = "invalid literal/lengths set";
                            b.mode = 30;
                            break
                        }
                        if (b.Aa = 6, b.ua = b.vb, Z = {
                                D: b.Aa
                            }, R = u(2, b.I, b.Ga, b.Oa, b.ua, 0, b.Sa, Z), b.Aa = Z.D, R) {
                            a.j = "invalid distances set";
                            b.mode = 30;
                            break
                        }
                        if (b.mode = 20, 6 === c) break a;
                    case 20:
                        b.mode = 21;
                    case 21:
                        if (6 <= q && 258 <= p) {
                            a.B = n;
                            a.b = p;
                            a.U = k;
                            a.v = q;
                            b.qa = g;
                            b.D = m;
                            P(a, G);
                            n = a.B;
                            l = a.J;
                            p = a.b;
                            k = a.U;
                            d = a.input;
                            q = a.v;
                            g = b.qa;
                            m = b.D;
                            12 === b.mode && (b.back = -1);
                            break
                        }
                        for (b.back = 0; V = b.ja[g & (1 << b.da) - 1], C = V >>> 24, J = V >>>
                            16 & 255, F = 65535 & V, !(m >= C);) {
                            if (0 === q) break a;
                            q--;
                            g += d[k++] << m;
                            m += 8
                        }
                        if (J && 0 === (240 & J)) {
                            T = C;
                            Y = J;
                            for (ba = F; V = b.ja[ba + ((g & (1 << T + Y) - 1) >> T)], C = V >>> 24, J = V >>> 16 & 255, F = 65535 & V, !(m >= T + C);) {
                                if (0 === q) break a;
                                q--;
                                g += d[k++] << m;
                                m += 8
                            }
                            g >>>= T;
                            m -= T;
                            b.back += T
                        }
                        if (g >>>= C, m -= C, b.back += C, b.length = F, 0 === J) {
                            b.mode = 26;
                            break
                        }
                        if (32 & J) {
                            b.back = -1;
                            b.mode = 12;
                            break
                        }
                        if (64 & J) {
                            a.j = "invalid literal/length code";
                            b.mode = 30;
                            break
                        }
                        b.l = 15 & J;
                        b.mode = 22;
                    case 22:
                        if (b.l) {
                            for (J = b.l; J > m;) {
                                if (0 === q) break a;
                                q--;
                                g += d[k++] << m;
                                m += 8
                            }
                            b.length += g & (1 << b.l) -
                                1;
                            g >>>= b.l;
                            m -= b.l;
                            b.back += b.l
                        }
                        b.tc = b.length;
                        b.mode = 23;
                    case 23:
                        for (; V = b.ua[g & (1 << b.Aa) - 1], C = V >>> 24, J = V >>> 16 & 255, F = 65535 & V, !(m >= C);) {
                            if (0 === q) break a;
                            q--;
                            g += d[k++] << m;
                            m += 8
                        }
                        if (0 === (240 & J)) {
                            T = C;
                            Y = J;
                            for (ba = F; V = b.ua[ba + ((g & (1 << T + Y) - 1) >> T)], C = V >>> 24, J = V >>> 16 & 255, F = 65535 & V, !(m >= T + C);) {
                                if (0 === q) break a;
                                q--;
                                g += d[k++] << m;
                                m += 8
                            }
                            g >>>= T;
                            m -= T;
                            b.back += T
                        }
                        if (g >>>= C, m -= C, b.back += C, 64 & J) {
                            a.j = "invalid distance code";
                            b.mode = 30;
                            break
                        }
                        b.offset = F;
                        b.l = 15 & J;
                        b.mode = 24;
                    case 24:
                        if (b.l) {
                            for (J = b.l; J > m;) {
                                if (0 === q) break a;
                                q--;
                                g += d[k++] <<
                                    m;
                                m += 8
                            }
                            b.offset += g & (1 << b.l) - 1;
                            g >>>= b.l;
                            m -= b.l;
                            b.back += b.l
                        }
                        if (b.offset > b.Za) {
                            a.j = "invalid distance too far back";
                            b.mode = 30;
                            break
                        }
                        b.mode = 25;
                    case 25:
                        if (0 === p) break a;
                        if (A = G - p, b.offset > A) {
                            if (A = b.offset - A, A > b.ma && b.nb) {
                                a.j = "invalid distance too far back";
                                b.mode = 30;
                                break
                            }
                            A > b.M ? (A -= b.M, M = b.N - A) : M = b.M - A;
                            A > b.length && (A = b.length);
                            J = b.window
                        } else J = l, M = n - b.offset, A = b.length;
                        A > p && (A = p);
                        p -= A;
                        b.length -= A;
                        do l[n++] = J[M++]; while (--A);
                        0 === b.length && (b.mode = 21);
                        break;
                    case 26:
                        if (0 === p) break a;
                        l[n++] = b.length;
                        p--;
                        b.mode =
                            21;
                        break;
                    case 27:
                        if (b.u) {
                            for (; 32 > m;) {
                                if (0 === q) break a;
                                q--;
                                g |= d[k++] << m;
                                m += 8
                            }
                            if (G -= p, a.sa += G, b.total += G, G && (a.g = b.check = b.C ? H(b.check, l, G, n - G) : O(b.check, l, G, n - G)), G = p, (b.C ? g : e(g)) !== b.check) {
                                a.j = "incorrect data check";
                                b.mode = 30;
                                break
                            }
                            m = g = 0
                        }
                        b.mode = 28;
                    case 28:
                        if (b.u && b.C) {
                            for (; 32 > m;) {
                                if (0 === q) break a;
                                q--;
                                g += d[k++] << m;
                                m += 8
                            }
                            if (g !== (4294967295 & b.total)) {
                                a.j = "incorrect length check";
                                b.mode = 30;
                                break
                            }
                            m = g = 0
                        }
                        b.mode = 29;
                    case 29:
                        R = 1;
                        break a;
                    case 30:
                        R = -3;
                        break a;
                    case 31:
                        return -4;
                    default:
                        return Q
                }
                a.B = n;
                a.b = p;
                a.U =
                    k;
                a.v = q;
                b.qa = g;
                b.D = m;
                if (k = b.N || G !== a.b && 30 > b.mode && (27 > b.mode || 4 !== c)) {
                    k = a.J;
                    n = a.B;
                    d = G - a.b;
                    var ga;
                    q = a.state;
                    k = (null === q.window && (q.N = 1 << q.Ia, q.M = 0, q.ma = 0, q.window = new v.ba(q.N)), d >= q.N ? (v.X(q.window, k, n - q.N, q.N, 0), q.M = 0, q.ma = q.N) : (ga = q.N - q.M, ga > d && (ga = d), v.X(q.window, k, n - d, ga, q.M), d -= ga, d ? (v.X(q.window, k, n - d, d, 0), q.M = d, q.ma = q.N) : (q.M += ga, q.M === q.N && (q.M = 0), q.ma < q.N && (q.ma += ga))), 0)
                }
                return k ? (b.mode = 31, -4) : (x -= a.v, G -= a.b, a.fa += x, a.sa += G, b.total += G, b.u && G && (a.g = b.check = b.C ? H(b.check, l, G, a.B - G) : O(b.check,
                    l, G, a.B - G)), a.Ya = b.D + (b.cb ? 64 : 0) + (12 === b.mode ? 128 : 0) + (20 === b.mode || 15 === b.mode ? 256 : 0), (0 === x && 0 === G || 4 === c) && R === y && (R = -5), R)
            };
            c.gc = function(a) {
                if (!a || !a.state) return Q;
                var c = a.state;
                return c.window && (c.window = null), a.state = null, y
            };
            c.hc = function(a, c) {
                var b;
                a && a.state && (b = a.state, 0 === (2 & b.u) || (b.head = c, c.done = !1))
            };
            c.ad = ""
        }, {
            "../utils/common": 3,
            "./adler32": 5,
            "./crc32": 7,
            "./inffast": 10,
            "./inftrees": 12
        }],
        12: [function(a, d) {
            var c = a("../utils/common"),
                e = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51,
                    59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
                ],
                l = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
                p = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
                k = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
            d.P = function(a, d, E, B, v, O, H, P) {
                var u, y, Q, N, M, C, z, r;
                N = P.D;
                for (var w = 0, b = 0, L = 0, K = 0, D = 0, U = 0, q = 0, W = u = 0, g = 0, m = null, ca = 0, G = new c.O(16), U = new c.O(16), A =
                        null, ia = 0, w = 0; 15 >= w; w++) G[w] = 0;
                for (b = 0; B > b; b++) G[d[E + b]]++;
                D = N;
                for (K = 15; 1 <= K && 0 === G[K]; K--);
                if (D > K && (D = K), 0 === K) return v[O++] = 20971520, v[O++] = 20971520, P.D = 1, 0;
                for (L = 1; K > L && 0 === G[L]; L++);
                L > D && (D = L);
                for (w = u = 1; 15 >= w; w++)
                    if (u <<= 1, u -= G[w], 0 > u) return -1;
                if (0 < u && (0 === a || 1 !== K)) return -1;
                U[1] = 0;
                for (w = 1; 15 > w; w++) U[w + 1] = U[w] + G[w];
                for (b = 0; B > b; b++) 0 !== d[E + b] && (H[U[d[E + b]]++] = b);
                if (0 === a ? (m = A = H, M = 19) : 1 === a ? (m = e, ca -= 257, A = l, ia -= 257, M = 256) : (m = p, A = k, M = -1), g = 0, b = 0, w = L, N = O, U = D, q = 0, Q = -1, W = 1 << D, B = W - 1, 1 === a && 852 < W || 2 ===
                    a && 592 < W) return 1;
                for (var J = 0;;) {
                    J++;
                    C = w - q;
                    H[b] < M ? (z = 0, r = H[b]) : H[b] > M ? (z = A[ia + H[b]], r = m[ca + H[b]]) : (z = 96, r = 0);
                    u = 1 << w - q;
                    L = y = 1 << U;
                    do y -= u, v[N + (g >> q) + y] = C << 24 | z << 16 | r | 0; while (0 !== y);
                    for (u = 1 << w - 1; g & u;) u >>= 1;
                    if (0 !== u ? (g &= u - 1, g += u) : g = 0, b++, 0 === --G[w]) {
                        if (w === K) break;
                        w = d[E + H[b]]
                    }
                    if (w > D && (g & B) !== Q) {
                        0 === q && (q = D);
                        N += L;
                        U = w - q;
                        for (u = 1 << U; K > U + q && (u -= G[U + q], !(0 >= u));) U++, u <<= 1;
                        if (W += 1 << U, 1 === a && 852 < W || 2 === a && 592 < W) return 1;
                        Q = g & B;
                        v[Q] = D << 24 | U << 16 | N - O | 0
                    }
                }
                return 0 !== g && (v[N + g] = w - q << 24 | 4194304), P.D = D, 0
            }
        }, {
            "../utils/common": 3
        }],
        13: [function(a, d) {
            d.P = {
                2: "need dictionary",
                1: "stream end",
                0: "",
                "-1": "file error",
                "-2": "stream error",
                "-3": "data error",
                "-4": "insufficient memory",
                "-5": "buffer error",
                "-6": "incompatible version"
            }
        }, {}],
        14: [function(a, d, c) {
            function e(a) {
                for (var b = a.length; 0 <= --b;) a[b] = 0
            }

            function l(a, b, c, d, e) {
                this.Jb = a;
                this.dc = b;
                this.cc = c;
                this.bc = d;
                this.lc = e;
                this.zb = a && a.length
            }

            function p(a, b) {
                this.wb = a;
                this.Fa = 0;
                this.ra = b
            }

            function k(a, b) {
                a.w[a.f++] = 255 & b;
                a.w[a.f++] = b >>> 8 & 255
            }

            function n(a, b, c) {
                a.G > g - c ? (a.K |= b << a.G & 65535,
                    k(a, a.K), a.K = b >> g - a.G, a.G += c - g) : (a.K |= b << a.G & 65535, a.G += c)
            }

            function x(a, b, c) {
                n(a, c[2 * b], c[2 * b + 1])
            }

            function E(a, b) {
                var c = 0;
                do c |= 1 & a, a >>>= 1, c <<= 1; while (0 < --b);
                return c >>> 1
            }

            function B(a, b, c) {
                var d, e = Array(W + 1),
                    g = 0;
                for (d = 1; W >= d; d++) e[d] = g = g + c[d - 1] << 1;
                for (c = 0; b >= c; c++) d = a[2 * c + 1], 0 !== d && (a[2 * c] = E(e[d]++, d))
            }

            function v(a) {
                var b;
                for (b = 0; K > b; b++) a.L[2 * b] = 0;
                for (b = 0; D > b; b++) a.va[2 * b] = 0;
                for (b = 0; U > b; b++) a.H[2 * b] = 0;
                a.L[2 * m] = 1;
                a.ka = a.Ha = 0;
                a.T = a.matches = 0
            }

            function O(a) {
                8 < a.G ? k(a, a.K) : 0 < a.G && (a.w[a.f++] = a.K);
                a.K =
                    0;
                a.G = 0
            }

            function H(a, b, c, d) {
                var e = 2 * b,
                    g = 2 * c;
                return a[e] < a[g] || a[e] === a[g] && d[b] <= d[c]
            }

            function P(a, b, c) {
                for (var d = a.A[c], e = c << 1; e <= a.ia && (e < a.ia && H(b, a.A[e + 1], a.A[e], a.depth) && e++, !H(b, d, a.A[e], a.depth));) a.A[c] = a.A[e], c = e, e <<= 1;
                a.A[c] = d
            }

            function u(a, b, c) {
                var d, e, g, k, l = 0;
                if (0 !== a.T) {
                    do d = a.w[a.Ka + 2 * l] << 8 | a.w[a.Ka + 2 * l + 1], e = a.w[a.lb + l], l++, 0 === d ? x(a, e, b) : (g = S[e], x(a, g + L + 1, b), k = ia[g], 0 !== k && (e -= R[g], n(a, e, k)), d--, g = 256 > d ? ba[d] : ba[256 + (d >>> 7)], x(a, g, c), k = J[g], 0 !== k && (d -= Z[g], n(a, d, k))); while (l < a.T)
                }
                x(a,
                    m, b)
            }

            function y(a, b) {
                var c, d, e, g = b.wb;
                d = b.ra.Jb;
                var k = b.ra.zb,
                    l = b.ra.bc,
                    n = -1;
                a.ia = 0;
                a.Ba = q;
                for (c = 0; l > c; c++) 0 !== g[2 * c] ? (a.A[++a.ia] = n = c, a.depth[c] = 0) : g[2 * c + 1] = 0;
                for (; 2 > a.ia;) e = a.A[++a.ia] = 2 > n ? ++n : 0, g[2 * e] = 1, a.depth[e] = 0, a.ka--, k && (a.Ha -= d[2 * e + 1]);
                b.Fa = n;
                for (c = a.ia >> 1; 1 <= c; c--) P(a, g, c);
                e = l;
                do c = a.A[1], a.A[1] = a.A[a.ia--], P(a, g, 1), d = a.A[1], a.A[--a.Ba] = c, a.A[--a.Ba] = d, g[2 * e] = g[2 * c] + g[2 * d], a.depth[e] = (a.depth[c] >= a.depth[d] ? a.depth[c] : a.depth[d]) + 1, g[2 * c + 1] = g[2 * d + 1] = e, a.A[1] = e++, P(a, g, 1); while (2 <= a.ia);
                a.A[--a.Ba] = a.A[1];
                var m, p, k = b.wb,
                    l = b.Fa,
                    r = b.ra.Jb,
                    u = b.ra.zb,
                    v = b.ra.dc,
                    w = b.ra.cc,
                    x = b.ra.lc,
                    y = 0;
                for (d = 0; W >= d; d++) a.ga[d] = 0;
                k[2 * a.A[a.Ba] + 1] = 0;
                for (c = a.Ba + 1; q > c; c++) e = a.A[c], d = k[2 * k[2 * e + 1] + 1] + 1, d > x && (d = x, y++), k[2 * e + 1] = d, e > l || (a.ga[d]++, m = 0, e >= w && (m = v[e - w]), p = k[2 * e], a.ka += p * (d + m), u && (a.Ha += p * (r[2 * e + 1] + m)));
                if (0 !== y) {
                    do {
                        for (d = x - 1; 0 === a.ga[d];) d--;
                        a.ga[d]--;
                        a.ga[d + 1] += 2;
                        a.ga[x]--;
                        y -= 2
                    } while (0 < y);
                    for (d = x; 0 !== d; d--)
                        for (e = a.ga[d]; 0 !== e;) m = a.A[--c], m > l || (k[2 * m + 1] !== d && (a.ka += (d - k[2 * m + 1]) * k[2 * m], k[2 * m + 1] = d),
                            e--)
                }
                B(g, n, a.ga)
            }

            function Q(a, b, c) {
                var d, e, g = -1,
                    k = b[1],
                    l = 0,
                    m = 7,
                    n = 4;
                0 === k && (m = 138, n = 3);
                b[2 * (c + 1) + 1] = 65535;
                for (d = 0; c >= d; d++) e = k, k = b[2 * (d + 1) + 1], ++l < m && e === k || (n > l ? a.H[2 * e] += l : 0 !== e ? (e !== g && a.H[2 * e]++, a.H[2 * ca]++) : 10 >= l ? a.H[2 * G]++ : a.H[2 * A]++, l = 0, g = e, 0 === k ? (m = 138, n = 3) : e === k ? (m = 6, n = 3) : (m = 7, n = 4))
            }

            function N(a, b, c) {
                var d, e, g = -1,
                    k = b[1],
                    l = 0,
                    m = 7,
                    p = 4;
                0 === k && (m = 138, p = 3);
                for (d = 0; c >= d; d++)
                    if (e = k, k = b[2 * (d + 1) + 1], !(++l < m && e === k)) {
                        if (p > l) {
                            do x(a, e, a.H); while (0 !== --l)
                        } else 0 !== e ? (e !== g && (x(a, e, a.H), l--), x(a, ca, a.H),
                            n(a, l - 3, 2)) : 10 >= l ? (x(a, G, a.H), n(a, l - 3, 3)) : (x(a, A, a.H), n(a, l - 11, 7));
                        l = 0;
                        g = e;
                        0 === k ? (m = 138, p = 3) : e === k ? (m = 6, p = 3) : (m = 7, p = 4)
                    }
            }

            function M(a) {
                var b, c = 4093624447;
                for (b = 0; 31 >= b; b++, c >>>= 1)
                    if (1 & c && 0 !== a.L[2 * b]) return r;
                if (0 !== a.L[18] || 0 !== a.L[20] || 0 !== a.L[26]) return w;
                for (b = 32; L > b; b++)
                    if (0 !== a.L[2 * b]) return w;
                return r
            }

            function C(a, c, d, e) {
                n(a, (b << 1) + (e ? 1 : 0), 3);
                O(a);
                k(a, d);
                k(a, ~d);
                z.X(a.w, a.window, c, d, a.f);
                a.f += d
            }
            var z = a("../utils/common"),
                r = 0,
                w = 1,
                b = 0,
                L = 256,
                K = L + 1 + 29,
                D = 30,
                U = 19,
                q = 2 * K + 1,
                W = 15,
                g = 16,
                m = 256,
                ca = 16,
                G = 17,
                A = 18,
                ia = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
                J = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
                wa = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
                F = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
                T = Array(2 * (K + 2));
            e(T);
            var Y = Array(2 * D);
            e(Y);
            var ba = Array(512);
            e(ba);
            var S = Array(256);
            e(S);
            var R = Array(29);
            e(R);
            var Z = Array(D);
            e(Z);
            var V, X, na, ga = !1;
            c.Tb = function(a) {
                if (!ga) {
                    var b, c, d, e = Array(W + 1);
                    for (d = c = 0; 28 > d; d++)
                        for (R[d] = c, b = 0; b < 1 << ia[d]; b++) S[c++] = d;
                    S[c - 1] = d;
                    for (d =
                        c = 0; 16 > d; d++)
                        for (Z[d] = c, b = 0; b < 1 << J[d]; b++) ba[c++] = d;
                    for (c >>= 7; D > d; d++)
                        for (Z[d] = c << 7, b = 0; b < 1 << J[d] - 7; b++) ba[256 + c++] = d;
                    for (b = 0; W >= b; b++) e[b] = 0;
                    for (b = 0; 143 >= b;) T[2 * b + 1] = 8, b++, e[8]++;
                    for (; 255 >= b;) T[2 * b + 1] = 9, b++, e[9]++;
                    for (; 279 >= b;) T[2 * b + 1] = 7, b++, e[7]++;
                    for (; 287 >= b;) T[2 * b + 1] = 8, b++, e[8]++;
                    B(T, K + 1, e);
                    for (b = 0; D > b; b++) Y[2 * b + 1] = 5, Y[2 * b] = E(b, 5);
                    V = new l(T, ia, L + 1, K, W);
                    X = new l(Y, J, 0, D, W);
                    na = new l([], wa, 0, U, 7);
                    ga = !0
                }
                a.bb = new p(a.L, V);
                a.Xa = new p(a.va, X);
                a.tb = new p(a.H, na);
                a.K = 0;
                a.G = 0;
                v(a)
            };
            c.Ub = C;
            c.Sb = function(a,
                b, c, d) {
                var e, g, k = 0;
                if (0 < a.level) {
                    2 === a.h.Ya && (a.h.Ya = M(a));
                    y(a, a.bb);
                    y(a, a.Xa);
                    Q(a, a.L, a.bb.Fa);
                    Q(a, a.va, a.Xa.Fa);
                    y(a, a.tb);
                    for (k = U - 1; 3 <= k && 0 === a.H[2 * F[k] + 1]; k--);
                    k = (a.ka += 3 * (k + 1) + 14, k);
                    e = a.ka + 3 + 7 >>> 3;
                    g = a.Ha + 3 + 7 >>> 3;
                    e >= g && (e = g)
                } else e = g = c + 5;
                if (e >= c + 4 && -1 !== b) C(a, b, c, d);
                else if (4 === a.ea || g === e) n(a, 2 + (d ? 1 : 0), 3), u(a, T, Y);
                else {
                    n(a, 4 + (d ? 1 : 0), 3);
                    b = a.bb.Fa + 1;
                    c = a.Xa.Fa + 1;
                    k = k + 1;
                    n(a, b - 257, 5);
                    n(a, c - 1, 5);
                    n(a, k - 4, 4);
                    for (e = 0; k > e; e++) n(a, a.H[2 * F[e] + 1], 3);
                    N(a, a.L, b - 1);
                    N(a, a.va, c - 1);
                    u(a, a.L, a.va)
                }
                v(a);
                d && O(a)
            };
            c.na =
                function(a, b, c) {
                    return a.w[a.Ka + 2 * a.T] = b >>> 8 & 255, a.w[a.Ka + 2 * a.T + 1] = 255 & b, a.w[a.lb + a.T] = 255 & c, a.T++, 0 === b ? a.L[2 * c]++ : (a.matches++, b--, a.L[2 * (S[c] + L + 1)]++, a.va[2 * (256 > b ? ba[b] : ba[256 + (b >>> 7)])]++), a.T === a.Na - 1
                };
            c.Rb = function(a) {
                n(a, 2, 3);
                x(a, m, T);
                16 === a.G ? (k(a, a.K), a.K = 0, a.G = 0) : 8 <= a.G && (a.w[a.f++] = 255 & a.K, a.K >>= 8, a.G -= 8)
            }
        }, {
            "../utils/common": 3
        }],
        15: [function(a, d) {
            d.P = function() {
                this.input = null;
                this.fa = this.v = this.U = 0;
                this.J = null;
                this.sa = this.b = this.B = 0;
                this.j = "";
                this.state = null;
                this.Ya = 2;
                this.g = 0
            }
        }, {}],
        "/": [function(a, d) {
            var c = a("./lib/utils/common").assign,
                e = a("./lib/deflate"),
                l = a("./lib/inflate"),
                p = a("./lib/zlib/constants"),
                k = {};
            c(k, e, l, p);
            d.P = k
        }, {
            "./lib/deflate": 1,
            "./lib/inflate": 2,
            "./lib/utils/common": 3,
            "./lib/zlib/constants": 6
        }]
    }, {}, [])("/")
});
glMatrixArrayType = "undefined" != typeof Float32Array ? Float32Array : "undefined" != typeof WebGLFloatArray ? WebGLFloatArray : Array;

function aa(f) {
    var a = new glMatrixArrayType(16);
    f && (a[0] = f[0], a[1] = f[1], a[2] = f[2], a[3] = f[3], a[4] = f[4], a[5] = f[5], a[6] = f[6], a[7] = f[7], a[8] = f[8], a[9] = f[9], a[10] = f[10], a[11] = f[11], a[12] = f[12], a[13] = f[13], a[14] = f[14], a[15] = f[15]);
    return a
}

function da(f, a, d) {
    d || (d = f);
    var c = f[0],
        e = f[1],
        l = f[2],
        p = f[3],
        k = f[4],
        n = f[5],
        x = f[6],
        E = f[7],
        B = f[8],
        v = f[9],
        O = f[10],
        H = f[11],
        P = f[12],
        u = f[13],
        y = f[14];
    f = f[15];
    var Q = a[0],
        N = a[1],
        M = a[2],
        C = a[3],
        z = a[4],
        r = a[5],
        w = a[6],
        b = a[7],
        L = a[8],
        K = a[9],
        D = a[10],
        U = a[11],
        q = a[12],
        W = a[13],
        g = a[14];
    a = a[15];
    d[0] = Q * c + N * k + M * B + C * P;
    d[1] = Q * e + N * n + M * v + C * u;
    d[2] = Q * l + N * x + M * O + C * y;
    d[3] = Q * p + N * E + M * H + C * f;
    d[4] = z * c + r * k + w * B + b * P;
    d[5] = z * e + r * n + w * v + b * u;
    d[6] = z * l + r * x + w * O + b * y;
    d[7] = z * p + r * E + w * H + b * f;
    d[8] = L * c + K * k + D * B + U * P;
    d[9] = L * e + K * n + D * v + U * u;
    d[10] = L * l + K * x + D * O + U *
        y;
    d[11] = L * p + K * E + D * H + U * f;
    d[12] = q * c + W * k + g * B + a * P;
    d[13] = q * e + W * n + g * v + a * u;
    d[14] = q * l + W * x + g * O + a * y;
    d[15] = q * p + W * E + g * H + a * f
}
quat4 = {
    create: function(f) {
        var a = new glMatrixArrayType(4);
        f && (a[0] = f[0], a[1] = f[1], a[2] = f[2], a[3] = f[3]);
        return a
    },
    set: function(f, a) {
        a[0] = f[0];
        a[1] = f[1];
        a[2] = f[2];
        a[3] = f[3];
        return a
    },
    Uc: function(f, a) {
        var d = f[0],
            c = f[1],
            e = f[2];
        if (!a || f == a) return f[3] = -Math.sqrt(Math.abs(1 - d * d - c * c - e * e)), f;
        a[0] = d;
        a[1] = c;
        a[2] = e;
        a[3] = -Math.sqrt(Math.abs(1 - d * d - c * c - e * e));
        return a
    },
    inverse: function(f, a) {
        if (!a || f == a) return f[0] *= 1, f[1] *= 1, f[2] *= 1, f;
        a[0] = -f[0];
        a[1] = -f[1];
        a[2] = -f[2];
        a[3] = f[3];
        return a
    },
    length: function(f) {
        var a =
            f[0],
            d = f[1],
            c = f[2];
        f = f[3];
        return Math.sqrt(a * a + d * d + c * c + f * f)
    },
    normalize: function(f, a) {
        a || (a = f);
        var d = f[0],
            c = f[1],
            e = f[2],
            l = f[3],
            p = Math.sqrt(d * d + c * c + e * e + l * l);
        if (0 == p) return a[0] = 0, a[1] = 0, a[2] = 0, a[3] = 0, a;
        p = 1 / p;
        a[0] = d * p;
        a[1] = c * p;
        a[2] = e * p;
        a[3] = l * p;
        return a
    },
    multiply: function(f, a, d) {
        d || (d = f);
        var c = f[0],
            e = f[1],
            l = f[2];
        f = f[3];
        var p = a[0],
            k = a[1],
            n = a[2];
        a = a[3];
        d[0] = c * a + f * p + e * n - l * k;
        d[1] = e * a + f * k + l * p - c * n;
        d[2] = l * a + f * n + c * k - e * p;
        d[3] = f * a - c * p - e * k - l * n;
        return d
    },
    gd: function(f, a, d) {
        d || (d = a);
        var c = a[0],
            e = a[1],
            l = a[2];
        a = f[0];
        var p = f[1],
            k = f[2];
        f = f[3];
        var n = f * c + p * l - k * e,
            x = f * e + k * c - a * l,
            E = f * l + a * e - p * c,
            c = -a * c - p * e - k * l;
        d[0] = n * f + c * -a + x * -k - E * -p;
        d[1] = x * f + c * -p + E * -a - n * -k;
        d[2] = E * f + c * -k + n * -p - x * -a;
        return d
    },
    kd: function(f, a) {
        a || (a = new glMatrixArrayType(9));
        var d = f[0],
            c = f[1],
            e = f[2],
            l = f[3],
            p = d + d,
            k = c + c,
            n = e + e,
            x = d * p,
            E = d * k,
            d = d * n,
            B = c * k,
            c = c * n,
            e = e * n,
            p = l * p,
            k = l * k,
            l = l * n;
        a[0] = 1 - (B + e);
        a[1] = E - l;
        a[2] = d + k;
        a[3] = E + l;
        a[4] = 1 - (x + e);
        a[5] = c - p;
        a[6] = d - k;
        a[7] = c + p;
        a[8] = 1 - (x + B);
        return a
    },
    ld: function(f, a) {
        a || (a = aa());
        var d = f[0],
            c = f[1],
            e = f[2],
            l = f[3],
            p = d + d,
            k = c + c,
            n = e +
            e,
            x = d * p,
            E = d * k,
            d = d * n,
            B = c * k,
            c = c * n,
            e = e * n,
            p = l * p,
            k = l * k,
            l = l * n;
        a[0] = 1 - (B + e);
        a[1] = E - l;
        a[2] = d + k;
        a[3] = 0;
        a[4] = E + l;
        a[5] = 1 - (x + e);
        a[6] = c - p;
        a[7] = 0;
        a[8] = d - k;
        a[9] = c + p;
        a[10] = 1 - (x + B);
        a[11] = 0;
        a[12] = 0;
        a[13] = 0;
        a[14] = 0;
        a[15] = 1;
        return a
    },
    hd: function(f, a, d, c) {
        c || (c = f);
        var e = d;
        0 > f[0] * a[0] + f[1] * a[1] + f[2] * a[2] + f[3] * a[3] && (e = -1 * d);
        c[0] = 1 - d * f[0] + e * a[0];
        c[1] = 1 - d * f[1] + e * a[1];
        c[2] = 1 - d * f[2] + e * a[2];
        c[3] = 1 - d * f[3] + e * a[3];
        return c
    },
    jd: function(f) {
        return "[" + f[0] + ", " + f[1] + ", " + f[2] + ", " + f[3] + "]"
    }
};
var ea = function() {
    function f(a, d) {
        for (var c = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"], e = null, f = 0; f < c.length; ++f) {
            try {
                e = a.getContext(c[f], d)
            } catch (p) {}
            if (e) break
        }
        return e
    }
    return {
        Vc: f,
        qc: function(a, d) {
            function c(c) {
                var d = a.parentNode;
                d && (d.innerHTML = '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr><td align="center"><div style="display: table-cell; vertical-align: middle;"><div style="">' + c + "</div></div></td></tr></table>")
            }
            if (!window.WebGLRenderingContext) return c('This page requires a browser that supports WebGL.<br/><a href="http://get.webgl.org">Click here to upgrade your browser.</a>'),
                null;
            var e = f(a, d);
            e || c('It doesn\'t appear your computer can support WebGL.<br/><a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>');
            return e
        }
    }
}();
window.Vb = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(f) {
    return window.setTimeout(f, 1E3 / 60)
};
window.Tc = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.clearTimeout;
var fa = document.getElementById("debug"),
    ha = JSON.stringify(["createWorkpiece", 100, 32, 500, 40]);
fa.innerHTML = ha;
var ja, ka, la, ma = 0;

function oa() {
    var f = {
        Pb: 100,
        Ob: 32,
        Ua: 500,
        Ta: 40
    };
    f.$ = 2 * f.Ta * f.Ua;
    f.eb = 6 * f.$;
    var a = new XMLHttpRequest;
    a.open("post", "http://localhost:8080/turning", !0);
    a.send(JSON.stringify(["createWorkpiece", f.Pb, f.Ob, f.Ua, f.Ta]));
    a.responseType = "arraybuffer";
    a.onreadystatechange = function() {
        if (4 == this.readyState && 200 == this.status && this.response) {
            var a = this.response.byteLength,
                c = window.Hb.ab(this.response);
            document.getElementById("debug").innerHTML = Math.round(1E4 * a / c.length) / 100 + "% compression";
            f.xa = c.buffer.slice(0,
                12 * f.$);
            f.F = c.buffer.slice(12 * f.$, 24 * f.$);
            f.Kb = c.buffer.slice(24 * f.$, 32 * f.$);
            f.Bb = c.buffer.slice(32 * f.$, 44 * f.$);
            ++ma;
            3 == ma && (pa(), qa())
        }
    };
    f.Ma = function() {
        var a = Math.sin(ra * sa * 2 * Math.PI * .03 / 600),
            c = Math.cos(ra * sa * 2 * Math.PI * .03 / 600);
        return aa([c, a, 0, 0, -a, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    };
    return f
}

function ta(f, a, d) {
    return Math.sqrt(f * f + a * a + d * d)
}

function ua(f, a, d) {
    var c = [f[3 * a[d]], f[3 * a[d] + 1], f[3 * a[d] + 2]],
        e = [f[3 * a[d + 1]], f[3 * a[d + 1] + 1], f[3 * a[d + 1] + 2]];
    f = [f[3 * a[d + 2]], f[3 * a[d + 2] + 1], f[3 * a[d + 2] + 2]];
    return [c[1] * (e[2] - f[2]) + e[1] * (f[2] - c[2]) + f[1] * (c[2] - e[2]), c[2] * (e[0] - f[0]) + e[2] * (f[0] - c[0]) + f[2] * (c[0] - e[0]), c[0] * (e[1] - f[1]) + e[0] * (f[1] - c[1]) + f[0] * (c[1] - e[1])]
}

function va(f, a, d) {
    var c = {};
    c.eb = f.index.length;
    var e;
    c.xa = new Float32Array(f.position.length);
    for (e = 0; e < f.position.length; e += 3) c.xa[e] = f.position[e] * a[0] + d[0], c.xa[e + 1] = f.position[e + 1] * a[1] + d[1], c.xa[e + 2] = f.position[e + 2] * a[2] + d[2];
    c.F = new Float32Array(f.position.length);
    for (e = 0; e < c.F.length; ++e) c.F[e] = 0;
    for (e = 0; e < f.index.length; e += 3) {
        a = ua(f.position, f.index, e);
        0 > a[0] * f.position[3 * f.index[e]] + a[1] * f.position[3 * f.index[e] + 1] + a[2] * f.position[3 * f.index[e] + 2] && (a[0] = -a[0], a[1] = -a[1], a[2] = -a[2]);
        d = ta(a[0],
            a[1], a[2]);
        0 == d && (d = 1);
        a[0] /= d;
        a[1] /= d;
        a[2] /= d;
        var l;
        for (l = 0; 3 > l; ++l) c.F[3 * f.index[e + l] + 1] += a[0], c.F[3 * f.index[e + l] + 2] += a[1], c.F[3 * f.index[e + l] + 3] += a[2]
    }
    for (e = 0; e < c.F.length; e += 3)
        for (d = ta(c.F[e], c.F[e + 1], c.F[e + 2]), 0 == d && (d = 1), l = 0; 3 > l; ++l) c.F[e + l] /= d;
    c.Kb = new Float32Array(f.texture);
    c.Bb = new Uint16Array(f.index);
    c.Ma = function() {
        return aa([0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    };
    return c
}
ka = va({
    position: [-.235294, 1, -1.02798, -.430384, .980785, -1.02798, -.430384, .980785, .972015, -.617977, .923879, -1.02798, -.617977, .92388, .972015, -.790864, .83147, -1.02798, -.790864, .83147, .972015, -.942401, .707107, -1.02798, -.942401, .707107, .972015, -1.06676, .55557, -1.02798, -1.06676, .55557, .972015, -1.06676, .55557, -1.02798, -1.15917, .382683, -1.02798, -1.15917, .382683, .972015, -1.21608, .19509, -1.02798, -1.21608, .19509, .972015, -1.23529, 0, -1.02798, -1.23529, 0, .972015, -1.21608, -.19509, -1.02798, -1.21608, -.19509, .972015, -1.15917, -.382683, -1.02798, -1.15917, -.382683, .972015, -1.06676, -.55557, -1.02798, -1.06676, -.55557, .972015, -.942401, -.707107, -1.02798, -.942401, -.707107, .972015, -.790864, -.83147, -1.02798, -.790864, -.83147, .972015, -.790864, -.83147, -1.02798, -.617977, -.92388, -1.02798, -.617977, -.92388, .972015, -.430384, -.980785, -1.02798, -.430384, -.980785, .972015, -.235294, -1, -1.02798, -.235294, -1, .972015, -.0402032, -.980785, -1.02798, -.0402032, -.980785, .972015, .14739, -.923879, -1.02798, .14739, -.923879, .972015, .320277, -.831469, -1.02798,
        .320277, -.831469, .972015, .471813, -.707106, -1.02798, .471813, -.707106, .972015, .471813, -.707106, -1.02798, .596176, -.55557, -1.02798, .596176, -.555569, .972015, .688586, -.382683, -1.02798, .688586, -.382683, .972015, .745491, -.195089, -1.02798, .745491, -.195089, .972015, .764706, 9.71622E-7, -1.02798, .764706, 1.14647E-6, .972015, .745491, .195091, -1.02798, .745491, .195092, .972015, .688585, .382684, -1.02798, .688585, .382685, .972015, .596175, .555571, -1.02798, .596175, .555571, .972015, .596175, .555571, -1.02798, .471812, .707108, -1.02798,
        .471812, .707108, .972015, .320275, .83147, -1.02798, .320275, .831471, .972015, .147388, .92388, -1.02798, .147388, .92388, .972015, .14739, -.923879, -1.02798, -1.15917, -.382683, -1.02798, .688585, .382684, -1.02798, -.0402052, .980786, -1.02798, -.235294, 1, .972015, -.0402052, .980786, .972015, -.430384, -.980785, .972015, .745491, -.195089, .972015, -1.21608, .19509, .972015, -1.06676, .55557, .972015, -.790864, -.83147, .972015, .471813, -.707106, .972015, .596175, .555571, .972015, -.617977, .923879, -1.02798, -.430384, .980785, -1.02798, -.235294,
        1, -1.02798, -.0402052, .980786, -1.02798, .147388, .92388, -1.02798, .320275, .83147, -1.02798, .471812, .707108, -1.02798, .596175, .555571, -1.02798, .745491, .195091, -1.02798, .764706, 9.71622E-7, -1.02798, .745491, -.195089, -1.02798, .688586, -.382683, -1.02798, .596176, -.55557, -1.02798, .471813, -.707106, -1.02798, .320277, -.831469, -1.02798, -.0402032, -.980785, -1.02798, -.235294, -1, -1.02798, -.430384, -.980785, -1.02798, -.617977, -.92388, -1.02798, -.790864, -.83147, -1.02798, -.942401, -.707107, -1.02798, -1.06676, -.55557, -1.02798, -1.21608, -.19509, -1.02798, -1.23529, 0, -1.02798, -1.21608, .19509, -1.02798, -1.15917, .382683, -1.02798, -1.06676, .55557, -1.02798, -.942401, .707107, -1.02798, -.790864, .83147, -1.02798, -.0402052, .980786, .972015, -.235294, 1, .972015, -.430384, .980785, .972015, -.617977, .92388, .972015, -.790864, .83147, .972015, -.942401, .707107, .972015, -1.06676, .55557, .972015, -1.15917, .382683, .972015, -1.23529, 0, .972015, -1.21608, -.19509, .972015, -1.15917, -.382683, .972015, -1.06676, -.55557, .972015, -.942401, -.707107, .972015, -.790864, -.83147, .972015, -.617977, -.92388, .972015, -.235294, -1, .972015, -.0402032, -.980785, .972015, .14739, -.923879, .972015, .320277, -.831469, .972015, .471813, -.707106, .972015, .596176, -.555569, .972015, .688586, -.382683, .972015, .764706, 1.14647E-6, .972015, .745491, .195092, .972015, .688585, .382685, .972015, .596175, .555571, .972015, .471812, .707108, .972015, .320275, .831471, .972015, .147388, .92388, .972015, -.235294, -1, -1.02798, 1.76471, 1, -.947858, -.235294, 1, -1.02798, 1.76471, -1, -.947858, -.235294, -1, .972015, 1.76471, 1, 1.36763, -.235294, 1, .972015,
        1.76471, -1, 1.36763, 1.76105, -1, -.856528, 1.76105, 1, -.856528, -.238953, -1, -.936655, 1.74735, -1, 1.45536, 1.74735, 1, 1.45536, -.252647, -1, 1.05974, -.252647, 1, 1.05974, -.238953, 1, -.936655, -.430384, -.980785, .972015, -.430384, .980785, .972015, -.252647, 1, 1.05974, -.252647, 1, 1.05974, -.430384, .980785, .972015, -.235294, -1, .972015, -.252647, -1, 1.05974
    ],
    texture: [.86114, 0, .895198, 0, .895198, .333333, .92728, 0, .92728, .333333, .956153, 0, .956153, .333333, .980708, 0, .980708, .333333, 1, 0, 1, .333333, .956153, .666667, .931599, .666667, .931599,
        .333333, .902726, .666667, .902726, .333333, .870644, .666667, .870644, .333333, .836586, .666667, .836586, .333333, .801861, .666667, .801861, .333333, .767803, .666667, .767803, .333333, .735721, .666667, .735721, .333333, .706848, .666667, .706848, .333333, .354277, .663456, .38315, .663456, .38315, .99679, .415232, .663456, .415232, .99679, .44929, .663456, .44929, .99679, .484015, .663456, .484015, .99679, .518073, .663456, .518073, .99679, .550155, .663456, .550155, .99679, .579028, .663456, .579028, .99679, 0, .666667, .0320819, .666667, .032082, 1, .0661399,
        .666667, .06614, 1, .100865, .666667, .100865, 1, .134923, .666667, .134923, 1, .167005, .666667, .167005, 1, .195878, .666667, .195878, 1, .220433, .666667, .220433, 1, .706848, 0, .731403, 0, .731403, .333333, .760275, 0, .760275, .333333, .792357, 0, .792357, .333333, .393633, .060132, .642938, .037029, .418187, .294699, .826415, 0, .86114, .333333, .826415, .333333, .642938, .368757, .667492, .603325, .393633, .39186, .956153, .333333, .354277, .99679, 0, 1, .706848, .333333, .667492, .271596, .642938, .294699, .614065, .312851, .581983, .325354, .547925, .331728,
        .5132, .331728, .479142, .325354, .44706, .312851, .393633, .271596, .37434, .24443, .361052, .214245, .354277, .1822, .354277, .149528, .361051, .117483, .37434, .087298, .418187, .0370291, .44706, .0188773, .479142, .00637406, .5132, 0, .547925, 0, .581983, .00637406, .614065, .0188772, .667492, .0601319, .686785, .087298, .700073, .117483, .706848, .149528, .706848, .1822, .700073, .214245, .686785, .24443, .418187, .626427, .393633, .603325, .37434, .576159, .361051, .545973, .354277, .513928, .354277, .481256, .361051, .449212, .37434, .419026, .418187, .368757,
        .44706, .350605, .479142, .338102, .5132, .331728, .547925, .331728, .581983, .338102, .614065, .350605, .667492, .39186, .686785, .419026, .700073, .449212, .706848, .481256, .706848, .513929, .700073, .545973, .686785, .576159, .642938, .626427, .614065, .644579, .581983, .657082, .547925, .663456, .5132, .663456, .479142, .657082, .44706, .644579, .354277, .666667, 0, .333333, 0, .666667, .354277, .333333, .354277, .333333, 0, 0, 0, .333333, .354277, 0, .354277, .333333, 0, .333333, .354277, .666667, .354277, 0, 0, 0, .354277, .333333, 0, .333333, 0, .666667, 0, 0,
        0, 0, .354277, .333333, 0, 0, .393633, .603325, .642938, .368757, 0, 0
    ],
    index: [0, 1, 2, 1, 3, 4, 3, 5, 6, 5, 7, 8, 7, 9, 10, 11, 12, 13, 12, 14, 15, 14, 16, 17, 16, 18, 19, 18, 20, 21, 20, 22, 23, 22, 24, 25, 24, 26, 27, 28, 29, 30, 29, 31, 32, 31, 33, 34, 33, 35, 36, 35, 37, 38, 37, 39, 40, 39, 41, 42, 43, 44, 45, 44, 46, 47, 46, 48, 49, 48, 50, 51, 50, 52, 53, 52, 54, 55, 54, 56, 57, 58, 59, 60, 59, 61, 62, 61, 63, 64, 65, 66, 67, 68, 0, 69, 63, 68, 70, 71, 72, 73, 69, 0, 2, 2, 1, 4, 4, 3, 6, 6, 5, 8, 8, 7, 10, 74, 11, 13, 13, 12, 15, 15, 14, 17, 17, 16, 19, 19, 18, 21, 21, 20, 23, 23, 22, 25, 25, 24, 27, 75, 28, 30, 30, 29, 32, 32, 31, 34, 34, 33, 36, 36,
        35, 38, 38, 37, 40, 40, 39, 42, 76, 43, 45, 45, 44, 47, 47, 46, 49, 49, 48, 51, 51, 50, 53, 53, 52, 55, 55, 54, 57, 77, 58, 60, 60, 59, 62, 62, 61, 64, 78, 79, 80, 80, 81, 78, 82, 83, 84, 84, 85, 67, 67, 86, 87, 87, 88, 67, 89, 90, 65, 91, 92, 65, 65, 93, 94, 94, 95, 96, 96, 97, 98, 98, 99, 66, 66, 100, 101, 101, 102, 66, 103, 104, 105, 105, 106, 78, 78, 81, 82, 82, 84, 78, 67, 88, 89, 90, 91, 65, 65, 94, 66, 96, 98, 66, 66, 102, 103, 103, 105, 66, 78, 84, 67, 67, 89, 65, 94, 96, 66, 66, 105, 78, 78, 67, 66, 70, 68, 69, 64, 63, 70, 107, 108, 109, 109, 110, 111, 111, 112, 113, 113, 114, 111, 73, 115, 116, 116, 117, 73, 118, 119, 71, 120, 121, 71, 71,
        122, 123, 123, 124, 125, 125, 126, 127, 127, 128, 72, 72, 129, 130, 130, 131, 132, 132, 133, 107, 134, 135, 107, 107, 109, 73, 111, 114, 73, 73, 117, 118, 119, 120, 71, 71, 123, 72, 125, 127, 72, 72, 130, 107, 133, 134, 107, 109, 111, 73, 73, 118, 71, 123, 125, 72, 130, 132, 107, 107, 73, 72, 136, 137, 138, 139, 137, 136, 140, 141, 142, 143, 141, 140, 139, 144, 145, 136, 146, 144, 141, 143, 147, 142, 141, 148, 143, 140, 149, 142, 150, 149, 137, 145, 151, 138, 151, 146, 144, 146, 145, 146, 151, 145, 149, 150, 148, 147, 149, 148, 152, 153, 154, 142, 155, 156, 152, 149, 157, 137, 139, 145, 139, 136, 144, 148, 141, 147, 150, 142,
        148, 147, 143, 149, 140, 142, 149, 138, 137, 151, 136, 138, 146, 158, 152, 154
    ]
}, [30, 30, 30], [7.5, 0, 130]);
++ma;
var xa = [0, 0];
la = va({
    position: [-4.83527, -.334684, -11.9887, -6.14781, -.334683, -11.4622, -6.14781, 1.07953, -11.4622, -2.37091, -.334681, -2.04721, -1.05837, -.334681, -2.57374, -2.37091, 1.07953, -2.04721, -4.83527, 1.07953, -11.9887, -1.05837, 1.07953, -2.57374, -.786536, .372427, -2.68279, -6.41964, .372423, -11.3531, -2.64275, .372426, -1.93816, -2.37091, 1.07953, -2.04721, -5.49154, -.627578, -11.7254, -1.71464, -.627574, -2.31048, -2.37091, -.334681, -2.04721, -4.56343, .372423, -12.0978, -1.05837, -.334681, -2.57374, -5.49154, 1.37242, -11.7254, -1.71464,
        1.37243, -2.31048, -1.05837, 1.07953, -2.57374, -6.14781, 1.07953, -11.4622, -2.37091, 1.07953, -2.04721, -6.14781, -.334683, -11.4622, -2.37091, -.334681, -2.04721, -4.83527, -.334684, -11.9887, -1.05837, -.334681, -2.57374, -.183421, -.1097, -.294296, -.851206, -.508369, -.11201, -.234762, -.299424, -.293394, -1.36846, -.332612, .108937, -1.42796, -.109701, .204962, -.234762, -.299424, -.293394, -.183421, -.1097, -.294296, -.851206, -.508369, -.11201, -1.1516, -.292337, .0940961, -.749022, -.1097, -.0674013, -.805692, -.1097, -.0446674, -1.36846, -.332612,
        .108937, -1.14309, .104424, -1.07756, -1.42796, -.109701, .204962, -.805692, -.1097, -.0446674, -.786536, .372427, -2.68279, -2.64275, .372426, -1.93816, -.907418, .700258, -2.64191, -.0916374, .0641961, -.204858, -.907418, .700258, -2.64191, -1.14309, .453725, -1.07756, -.786536, .372427, -2.68279, -1.14309, .104424, -1.07756, -1.14309, .453725, -1.07756, -.0916374, .0641961, -.204858, -1.41684E-4, -3.58331E-5, -3.18279E-5, -.091925, -.173931, -.0894696, -.749022, -.1097, -.0674013, -.697491, .0710349, .0769824, -.697491, .0710349, .0769824, -1.42796, -.109701, .204962, -.749022, -.1097, -.0674013, -5.49154, 1.37242, -11.7254, -4.83527, 1.07953, -11.9887, -4.56343, .372423, -12.0978, -5.49154, -.627578, -11.7254, -6.41964, .372423, -11.3531, -1.05837, 1.07953, -2.57374, -1.71464, 1.37243, -2.31048, -2.64275, .372426, -1.93816, -1.71464, -.627574, -2.31048, -.786536, .372427, -2.68279, -6.14781, 1.07953, -11.4622, -6.14781, -.334683, -11.4622, -4.83527, -.334684, -11.9887, -4.83527, 1.07953, -11.9887, -.234762, -.299424, -.293394, -1.36846, -.332612, .108937, -1.42796, -.109701, .204962, -.749022, -.1097, -.0674013, -.697491, .0710349, .0769824, -.907418, .700258, -2.64191, -.657525, -.173932, .137425, -.091925, -.173931, -.0894696, -1.41684E-4, -3.58331E-5, -3.18279E-5, -.605995, .00680393, .281808, -.657525, -.173932, .137425, -.605995, .00680393, .281808, -1.41684E-4, -3.58331E-5, -3.18279E-5, -.749022, -.1097, -.0674013, -.183421, -.1097, -.294296, -.091925, -.173931, -.0894696, -.605995, .00680393, .281808, -.657525, -.173932, .137425
    ],
    texture: [.787063, .355776, .954344, .39823, .885054, .500723, .885054, .210829, .954344, .313322, .717774, .253283,
        .536921, 0, .536922, .795768, .459216, .795786, .272614, .987243, .272614, .191475, .362055, .191514, .0905319, .98686, .0905318, .191281, .181063, .191783, .459216, 1.74309E-5, .362056, .795782, .625537, 0, .625537, .78546, .536922, .789572, .717774, .00325209, .717774, .788713, .181064, .987276, .181064, .191509, 2.442E-7, .987362, 0, .191783, .388658, .987288, .0905317, 0, 0, 3.18817E-4, .181064, 0, .209725, 5.34547E-6, .741619, .500723, .770424, .503597, .717774, .556193, .747041, .585429, .770424, .551403, .770424, .556192, .741619, .611661, .848847, .0997852,
        .749321, .0150225, .835022, .0133623, .973417, .205877, .717774, .210829, .49552, .795224, .928162, .00467265, .959339, .210829, .851177, .104143, 1, .216162, .998277, .324403, .954344, .31934, .411883, .99648, .410309, 1, .387084, .990807, .999517, .411093, .973139, .420281, .793061, .500723, .793061, .559382, .770424, .503699, .787064, .500723, .717774, .45827, .717774, .39823, .885054, .355776, .954344, .458269, .787063, .355776, .717774, .313322, .787063, .210829, .954344, .253283, .885054, .355776, .362056, .987282, .181064, .987362, .362056, 1.384E-5, .536922,
        .00411141, .362056, .987292, .181063, 3.18803E-4, .770424, .608788, .842827, .0132111, .842812, .00362289, .958479, .210829, 1, .41473, .793861, .504654, .816192, .500723, .816192, .553067, .793061, .552457, .842401, 0, .927751, .00104976, .821969, .500843, .821969, .548648, .816192, .548529, .973622, .423918, .816192, .500723
    ],
    index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 8, 16, 17, 18, 19, 20, 21, 18, 22, 23, 10, 24, 25, 13, 16, 8, 26, 14, 13, 27, 25, 28, 27, 23, 29, 30, 31, 32, 33, 34, 35, 36, 37, 33, 34, 38, 39, 40, 38, 41, 42, 26, 8, 43, 33, 32, 35, 44, 45, 46, 47, 48, 49, 50, 51,
        52, 53, 54, 49, 46, 42, 39, 55, 56, 57, 45, 42, 46, 2, 58, 59, 59, 60, 0, 0, 61, 1, 1, 62, 2, 2, 59, 0, 63, 64, 5, 5, 65, 3, 3, 66, 4, 4, 67, 63, 63, 5, 4, 15, 6, 8, 68, 9, 11, 69, 12, 14, 70, 15, 16, 71, 17, 19, 17, 20, 18, 9, 22, 10, 12, 24, 13, 72, 16, 26, 73, 14, 27, 13, 25, 27, 10, 23, 30, 74, 34, 36, 74, 37, 34, 75, 38, 40, 39, 38, 42, 50, 26, 43, 34, 33, 35, 76, 44, 46, 77, 47, 49, 54, 53, 78, 48, 53, 49, 76, 46, 39, 79, 80, 81, 82, 79, 81, 76, 83, 84, 85, 86, 87, 26, 50, 52, 88, 54, 78, 44, 76, 84, 89, 85, 87
    ]
}, [5, 5, 5], [2, 0, 0]);
la.Ma = function() {
    return aa([0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, xa[0], -xa[1], 1])
};
++ma;
3 == ma && (pa(), qa());
var ya, t, za, Aa, Ba, Ca, Da = [],
    Ea = [],
    Fa = [],
    Ga = !1,
    Ha = Math.PI / 2,
    Ia = 0,
    Ja = !0,
    ra = 0,
    Ka = Date.now(),
    La = 0,
    sa = 0,
    Ma = [],
    Na = [0];

function Oa(f) {
    Ga && (Ha -= .005 * (f.clientX - Ia), Ia = f.clientX, Pa())
}

function Qa(f) {
    Ga = !0;
    Ia = f.clientX
}
window.addStep = function(f, a, d, c, e) {
    Ma.push([f, a, d, c, e])
};


function Ra() {
    ya = document.getElementById("glcanvas");
    ya.onmousedown = Qa;
    ya.onmousemove = Oa;
    t = null;
    try {
        t = ea.qc(ya)
    } catch (c) {}
    if (!t) return alert("Unable to initialize WebGL. Your browser may not support it."), !1;
    var f = Sa("shader-fs"),
        a = Sa("shader-vs");
    za = t.createProgram();
    t.attachShader(za, a);
    t.attachShader(za, f);
    t.linkProgram(za);
    t.getProgramParameter(za, t.LINK_STATUS) || alert("Unable to initialize the shader program.");
    t.useProgram(za);
    Aa = t.getAttribLocation(za, "aVertexPosition");
    t.enableVertexAttribArray(Aa);
    Ba = t.getAttribLocation(za, "aVertexNormal");
    t.enableVertexAttribArray(Ba);
    Ca = t.getAttribLocation(za, "aTextureCoord");
    t.enableVertexAttribArray(Ca);
    t.clearColor(.2, 0, 0, 1);
    t.clearDepth(1);
    t.enable(t.DEPTH_TEST);
    t.depthFunc(t.LEQUAL);
    for (var a = [imagePath+"silver.jpg", imagePath+"green.jpg", imagePath+"tool.jpg"], d, f = 0; f < a.length; ++f) d = Ea.length, Ea.push(t.createTexture()), Da.push(new Image), Da[d].oc = d, Da[d].onload = function() {
        var a = this.oc;
        t.bindTexture(t.TEXTURE_2D, Ea[a]);
        t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, Da[a]);
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR);
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_NEAREST);
        t.generateMipmap(t.TEXTURE_2D);
        t.bindTexture(t.TEXTURE_2D, null)
    }, Da[d].src = a[d];
    f = Math.PI / 4;
    t.uniformMatrix4fv(t.getUniformLocation(za, "uPMatrix"), !1, new Float32Array([1 / Math.tan(f / 2) * ya.height / ya.width, 0, 0, 0, 0, 1 / Math.tan(f / 2), 0, 0, 0, 0, 1000.1 / -999.9, -1, 0, 0, 200 / -999.9, 0]));
    window.loadJob();
    xa[0] = Ma[0][0] / 2;
    xa[1] = Ma[0][1];
    a = 0;
    for (f = 1; f < Ma.length; ++f) a += Ta(Ma[f - 1][0],
        Ma[f - 1][1], Ma[f][0], Ma[f][1]) / Ma[f][2] * 6E4, Na.push(a);
    return !0
}

function pa() {
    var f = [ja, ka, la],
        a;
    for (a = 0; a < f.length; ++a) {
        var d = {};
        d.ob = t.createBuffer();
        t.bindBuffer(t.ARRAY_BUFFER, d.ob);
        t.bufferData(t.ARRAY_BUFFER, new Float32Array(f[a].xa), t.DYNAMIC_DRAW);
        d.pb = t.createBuffer();
        t.bindBuffer(t.ARRAY_BUFFER, d.pb);
        t.bufferData(t.ARRAY_BUFFER, f[a].F, t.DYNAMIC_DRAW);
        d.Mb = t.createBuffer();
        t.bindBuffer(t.ARRAY_BUFFER, d.Mb);
        t.bufferData(t.ARRAY_BUFFER, f[a].Kb, t.STATIC_DRAW);
        d.Lb = t.createBuffer();
        t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, d.Lb);
        t.bufferData(t.ELEMENT_ARRAY_BUFFER,
            f[a].Bb, t.STATIC_DRAW);
        d.eb = f[a].eb;
        d.Ma = f[a].Ma;
        Fa.push(d)
    }
}

function qa() {
    if (Ja && !(La > Na[Na.length - 1] + 5E3)) {
        window.Vb(qa);
        Pa();
        0 == sa % 15 && (document.getElementById("status").innerHTML = Math.floor(La / 1E3) + " s / " + Math.floor(1E3 * sa / La) + " fps");
        if (sa % 2) {
            var f;
            for (f = 0; f < Na.length; ++f)
                if (La < Na[f]) {
                    var a = Ma[f - 1][0],
                        d = Na[f - 1];
                    xa[0] = (a + (Ma[f][0] - a) / (Na[f] - d) * (La - d)) / 2;
                    a = Ma[f - 1][1];
                    d = Na[f - 1];
                    xa[1] = a + (Ma[f][1] - a) / (Na[f] - d) * (La - d);
                    break
                }
            if (f > Ua && f < Na.length) {
                var a = Math.floor(10 * (Na[f] - Na[f - 1]) / 6E4 * Ma[f][3]),
                    d = -Ma[f - 1][1],
                    c = -Ma[f][1],
                    e = Ma[f - 1][0],
                    l = Ma[f][0],
                    p = Ma[f][4];
                ra =
                    2E3 * Math.pow(Ma[f][3] / 2E3, .5);
                Va(a, d, c, e, l, p);
                Ua = f
            }
            t.bindBuffer(t.ARRAY_BUFFER, Fa[0].ob);
            t.bufferData(t.ARRAY_BUFFER, new Float32Array(ja.xa), t.DYNAMIC_DRAW);
            t.bindBuffer(t.ARRAY_BUFFER, Fa[0].pb);
            t.bufferData(t.ARRAY_BUFFER, new Float32Array(ja.F), t.DYNAMIC_DRAW)
        }
        La = Date.now() - Ka;
        ++sa
    }
}

function Ta(f, a, d, c) {
    return Math.sqrt((f - d) * (f - d) + (a - c) * (a - c))
}

function Va(f, a, d, c, e, l) {
    var p = new XMLHttpRequest;
    p.open("post", "http://localhost:8080/turning", !0);
    p.send(JSON.stringify(["modifyWorkpiece", ja.Ua, ja.Ta, f, a, d, c, e, l]));
    p.responseType = "arraybuffer";
    p.onreadystatechange = function() {};
    p = new XMLHttpRequest;
    p.open("post", "http://localhost:8080/turning", !0);
    p.send(JSON.stringify(["queryWorkpiece", ja.Ua, ja.Ta]));
    p.responseType = "arraybuffer";
    p.onreadystatechange = function() {
        if (4 == this.readyState && 200 == this.status && this.response) {
            var a = this.response.byteLength,
                c = window.Hb.ab(this.response);
            document.getElementById("debug").innerHTML = Math.round(1E4 * a / c.length) / 100 + "% compression, ";
            ja.xa = c.buffer.slice(0, 12 * ja.$);
            ja.F = c.buffer.slice(12 * ja.$, 24 * ja.$)
        }
    }
}
var Ua = 0;

function Pa() {
    t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT);
    var f = Math.sin(Ha),
        a = Math.cos(Ha),
        d = aa([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -70, 1]),
        c = aa();
    da(aa([a, 0, f, 0, 0, 1, 0, 0, -f, 0, a, 0, 0, 0, -200, 1]), d, c);
    for (f = 0; f < Fa.length; ++f) {
        t.activeTexture(t.TEXTURE0);
        t.bindTexture(t.TEXTURE_2D, Ea[f]);
        var a = Fa[f],
            d = c,
            e = aa();
        da(d, a.Ma(), e);
        t.uniformMatrix4fv(t.getUniformLocation(za, "uMVMatrix"), !1, e);
        var d = t.getUniformLocation(za, "uNormalMatrix"),
            l = aa(),
            p = aa(),
            k = l;
        k || (k = e);
        var n = e[0],
            x = e[1],
            E = e[2],
            B = e[3],
            v = e[4],
            O = e[5],
            H = e[6],
            P = e[7],
            u = e[8],
            y = e[9],
            Q = e[10],
            N = e[11],
            M = e[12],
            C = e[13],
            z = e[14],
            e = e[15],
            r = n * O - x * v,
            w = n * H - E * v,
            b = n * P - B * v,
            L = x * H - E * O,
            K = x * P - B * O,
            D = E * P - B * H,
            U = u * C - y * M,
            q = u * z - Q * M,
            W = u * e - N * M,
            g = y * z - Q * C,
            m = y * e - N * C,
            ca = Q * e - N * z,
            G = 1 / (r * ca - w * m + b * g + L * W - K * q + D * U);
        k[0] = (O * ca - H * m + P * g) * G;
        k[1] = (-x * ca + E * m - B * g) * G;
        k[2] = (C * D - z * K + e * L) * G;
        k[3] = (-y * D + Q * K - N * L) * G;
        k[4] = (-v * ca + H * W - P * q) * G;
        k[5] = (n * ca - E * W + B * q) * G;
        k[6] = (-M * D + z * b - e * w) * G;
        k[7] = (u * D - Q * b + N * w) * G;
        k[8] = (v * m - O * W + P * U) * G;
        k[9] = (-n * m + x * W - B * U) * G;
        k[10] = (M * K - C * b + e * r) * G;
        k[11] = (-u * K + y * b - N * r) * G;
        k[12] = (-v *
            g + O * q - H * U) * G;
        k[13] = (n * g - x * q + E * U) * G;
        k[14] = (-M * L + C * w - z * r) * G;
        k[15] = (u * L - y * w + Q * r) * G;
        (k = p) && l != k ? (k[0] = l[0], k[1] = l[4], k[2] = l[8], k[3] = l[12], k[4] = l[1], k[5] = l[5], k[6] = l[9], k[7] = l[13], k[8] = l[2], k[9] = l[6], k[10] = l[10], k[11] = l[14], k[12] = l[3], k[13] = l[7], k[14] = l[11], k[15] = l[15]) : (k = l[1], n = l[2], x = l[3], E = l[6], B = l[7], v = l[11], l[1] = l[4], l[2] = l[8], l[3] = l[12], l[4] = k, l[6] = l[9], l[7] = l[13], l[8] = n, l[9] = E, l[11] = l[14], l[12] = x, l[13] = B, l[14] = v);
        t.uniformMatrix4fv(d, !1, p);
        t.bindBuffer(t.ARRAY_BUFFER, a.ob);
        t.vertexAttribPointer(Aa,
            3, t.FLOAT, !1, 0, 0);
        t.bindBuffer(t.ARRAY_BUFFER, a.pb);
        t.vertexAttribPointer(Ba, 3, t.FLOAT, !1, 0, 0);
        t.bindBuffer(t.ARRAY_BUFFER, a.Mb);
        t.vertexAttribPointer(Ca, 2, t.FLOAT, !1, 0, 0);
        t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, a.Lb);
        t.uniform1i(t.getUniformLocation(za, "uSampler"), 0);
        t.drawElements(t.TRIANGLES, a.eb, t.UNSIGNED_SHORT, 0)
    }
}

function Sa(f) {
    var a = t,
        d = document.getElementById(f);
    if (!d) return null;
    f = "";
    for (var c = d.firstChild; c;) 3 == c.nodeType && (f += c.textContent), c = c.nextSibling;
    if ("x-shader/x-fragment" == d.type) d = a.createShader(a.FRAGMENT_SHADER);
    else if ("x-shader/x-vertex" == d.type) d = a.createShader(a.VERTEX_SHADER);
    else return null;
    a.shaderSource(d, f);
    a.compileShader(d);
    return a.getShaderParameter(d, a.COMPILE_STATUS) ? d : (alert("An error occurred compiling the shaders: " + a.getShaderInfoLog(d)), null)
}
var Wa = document.getElementById("body");
window.runSimulation = function() {
    Ra() && (ja = oa())
};
Wa.onmouseup = function() {
    Ga = !1
};
document.getElementById("playButton").onclick = function() {
    Ja = !Ja;
    var f = document.getElementById("playButton");
    Ja ? (Ka += Date.now(), f.value = "||", qa()) : (Ka -= Date.now(), f.value = " >")
};

// window.loadJob = function() {
//     window.addStep(41, 10, 2E4, 1500, 4);
//     for (i = 0; 40 > i; ++i) window.addStep(31 - .25 * i, 10, 8E3, 1500, 4), window.addStep(51 - .5 * i, -50, 8E3, 1500, 4);
//     window.addStep(41, 10, 2E4, 1500, 4);
//     for (i = 0; 25 > i; ++i) window.addStep(31 - .5 * i, 10, 1E4, 333, 2), window.addStep(31 - .5 * i, -48, 1E4, 333, 2), window.addStep(41, -48, 2E4, 333, 2), window.addStep(41, 10, 2E4, 333, 2)
// };
