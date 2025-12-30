(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  [11],
  {
    '+QRC': function(e, t, n) {
      'use strict';
      var r = n('E9nw'),
        a = { 'text/plain': 'Text', 'text/html': 'Url', default: 'Text' },
        o = 'Copy to clipboard: #{key}, Enter';
      function i(e) {
        var t = (/mac os x/i.test(navigator.userAgent) ? '\u2318' : 'Ctrl') + '+C';
        return e.replace(/#{\s*key\s*}/g, t);
      }
      function c(e, t) {
        var n,
          c,
          l,
          s,
          u,
          p,
          f = !1;
        t || (t = {}), (n = t.debug || !1);
        try {
          (l = r()),
            (s = document.createRange()),
            (u = document.getSelection()),
            (p = document.createElement('span')),
            (p.textContent = e),
            (p.ariaHidden = 'true'),
            (p.style.all = 'unset'),
            (p.style.position = 'fixed'),
            (p.style.top = 0),
            (p.style.clip = 'rect(0, 0, 0, 0)'),
            (p.style.whiteSpace = 'pre'),
            (p.style.webkitUserSelect = 'text'),
            (p.style.MozUserSelect = 'text'),
            (p.style.msUserSelect = 'text'),
            (p.style.userSelect = 'text'),
            p.addEventListener('copy', function(r) {
              if ((r.stopPropagation(), t.format))
                if ((r.preventDefault(), 'undefined' === typeof r.clipboardData)) {
                  n && console.warn('unable to use e.clipboardData'),
                    n && console.warn('trying IE specific stuff'),
                    window.clipboardData.clearData();
                  var o = a[t.format] || a['default'];
                  window.clipboardData.setData(o, e);
                } else r.clipboardData.clearData(), r.clipboardData.setData(t.format, e);
              t.onCopy && (r.preventDefault(), t.onCopy(r.clipboardData));
            }),
            document.body.appendChild(p),
            s.selectNodeContents(p),
            u.addRange(s);
          var m = document.execCommand('copy');
          if (!m) throw new Error('copy command was unsuccessful');
          f = !0;
        } catch (r) {
          n && console.error('unable to copy using execCommand: ', r),
            n && console.warn('trying IE specific stuff');
          try {
            window.clipboardData.setData(t.format || 'text', e),
              t.onCopy && t.onCopy(window.clipboardData),
              (f = !0);
          } catch (r) {
            n && console.error('unable to copy using clipboardData: ', r),
              n && console.error('falling back to prompt'),
              (c = i('message' in t ? t.message : o)),
              window.prompt(c, e);
          }
        } finally {
          u && ('function' == typeof u.removeRange ? u.removeRange(s) : u.removeAllRanges()),
            p && document.body.removeChild(p),
            l();
        }
        return f;
      }
      e.exports = c;
    },
    '3wW7': function(e, t, n) {
      e.exports = {
        'ant-list': 'ant-list',
        'ant-list-pagination': 'ant-list-pagination',
        'ant-pagination-options': 'ant-pagination-options',
        'ant-list-more': 'ant-list-more',
        'ant-list-spin': 'ant-list-spin',
        'ant-list-empty-text': 'ant-list-empty-text',
        'ant-list-items': 'ant-list-items',
        'ant-list-item': 'ant-list-item',
        'ant-list-item-content': 'ant-list-item-content',
        'ant-list-item-meta': 'ant-list-item-meta',
        'ant-list-item-meta-avatar': 'ant-list-item-meta-avatar',
        'ant-list-item-meta-content': 'ant-list-item-meta-content',
        'ant-list-item-meta-title': 'ant-list-item-meta-title',
        'ant-list-item-meta-description': 'ant-list-item-meta-description',
        'ant-list-item-action': 'ant-list-item-action',
        'ant-list-item-action-split': 'ant-list-item-action-split',
        'ant-list-header': 'ant-list-header',
        'ant-list-footer': 'ant-list-footer',
        'ant-list-empty': 'ant-list-empty',
        'ant-list-split': 'ant-list-split',
        'ant-list-loading': 'ant-list-loading',
        'ant-list-spin-nested-loading': 'ant-list-spin-nested-loading',
        'ant-list-something-after-last-item': 'ant-list-something-after-last-item',
        'ant-spin-container': 'ant-spin-container',
        'ant-list-lg': 'ant-list-lg',
        'ant-list-sm': 'ant-list-sm',
        'ant-list-vertical': 'ant-list-vertical',
        'ant-list-item-main': 'ant-list-item-main',
        'ant-list-item-extra': 'ant-list-item-extra',
        'ant-list-grid': 'ant-list-grid',
        'ant-col': 'ant-col',
        'ant-list-item-no-flex': 'ant-list-item-no-flex',
        'ant-list-bordered': 'ant-list-bordered',
      };
    },
    '4Ofr': function(e, t, n) {
      e.exports = {
        themeColor: 'antd-pro-components-setting-drawer-theme-color-themeColor',
        title: 'antd-pro-components-setting-drawer-theme-color-title',
        colorBlock: 'antd-pro-components-setting-drawer-theme-color-colorBlock',
      };
    },
    BFsb: function(e, t, n) {
      e.exports = {
        content: 'antd-pro-components-setting-drawer-index-content',
        blockChecbox: 'antd-pro-components-setting-drawer-index-blockChecbox',
        item: 'antd-pro-components-setting-drawer-index-item',
        selectIcon: 'antd-pro-components-setting-drawer-index-selectIcon',
        color_block: 'antd-pro-components-setting-drawer-index-color_block',
        title: 'antd-pro-components-setting-drawer-index-title',
        handle: 'antd-pro-components-setting-drawer-index-handle',
        productionHint: 'antd-pro-components-setting-drawer-index-productionHint',
      };
    },
    E9nw: function(e, t) {
      e.exports = function() {
        var e = document.getSelection();
        if (!e.rangeCount) return function() {};
        for (var t = document.activeElement, n = [], r = 0; r < e.rangeCount; r++)
          n.push(e.getRangeAt(r));
        switch (t.tagName.toUpperCase()) {
          case 'INPUT':
          case 'TEXTAREA':
            t.blur();
            break;
          default:
            t = null;
            break;
        }
        return (
          e.removeAllRanges(),
          function() {
            'Caret' === e.type && e.removeAllRanges(),
              e.rangeCount ||
                n.forEach(function(t) {
                  e.addRange(t);
                }),
              t && t.focus();
          }
        );
      };
    },
    P5Jw: function(e, t, n) {
      'use strict';
      var r = n('rHrb'),
        a = r.CopyToClipboard;
      (a.CopyToClipboard = a), (e.exports = a);
    },
    PceP: function(e, t, n) {
      'use strict';
      n.r(t);
      n('bbsP');
      var r = n('/wGt'),
        a = (n('cIOH'), n('YkAm'), n('q1tI')),
        o = n.n(a),
        i = n('i8i4'),
        c = n('MFj2'),
        l = n('eHJ2'),
        s = n.n(l),
        u = n('CtXQ'),
        p = n('H84U');
      function f(e) {
        return Object.keys(e).reduce(function(t, n) {
          return (
            ('data-' !== n.substr(0, 5) && 'aria-' !== n.substr(0, 5) && 'role' !== n) ||
              'data-__' === n.substr(0, 7) ||
              (t[n] = e[n]),
            t
          );
        }, {});
      }
      var m = n('6CfX');
      function d(e) {
        '@babel/helpers - typeof';
        return (
          (d =
            'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' === typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          d(e)
        );
      }
      function y() {
        return (
          (y =
            Object.assign ||
            function(e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            }),
          y.apply(this, arguments)
        );
      }
      function g(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      function b(e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
      }
      function h(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function v(e, t, n) {
        return t && h(e.prototype, t), n && h(e, n), e;
      }
      function O(e, t) {
        if ('function' !== typeof t && null !== t)
          throw new TypeError('Super expression must either be null or a function');
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          t && w(e, t);
      }
      function w(e, t) {
        return (
          (w =
            Object.setPrototypeOf ||
            function(e, t) {
              return (e.__proto__ = t), e;
            }),
          w(e, t)
        );
      }
      function E(e) {
        var t = j();
        return function() {
          var n,
            r = k(e);
          if (t) {
            var a = k(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return C(this, n);
        };
      }
      function C(e, t) {
        return !t || ('object' !== d(t) && 'function' !== typeof t) ? x(e) : t;
      }
      function x(e) {
        if (void 0 === e)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
      }
      function j() {
        if ('undefined' === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ('function' === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0;
        } catch (e) {
          return !1;
        }
      }
      function k(e) {
        return (
          (k = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
              }),
          k(e)
        );
      }
      function S() {}
      var P = (function(e) {
          O(n, e);
          var t = E(n);
          function n(e) {
            var r;
            return (
              b(this, n),
              (r = t.call(this, e)),
              (r.handleClose = function(e) {
                e.preventDefault();
                var t = i['findDOMNode'](x(r));
                (t.style.height = ''.concat(t.offsetHeight, 'px')),
                  (t.style.height = ''.concat(t.offsetHeight, 'px')),
                  r.setState({ closing: !0 }),
                  (r.props.onClose || S)(e);
              }),
              (r.animationEnd = function() {
                r.setState({ closing: !1, closed: !0 }), (r.props.afterClose || S)();
              }),
              (r.renderAlert = function(e) {
                var t,
                  n = e.getPrefixCls,
                  o = r.props,
                  i = o.description,
                  l = o.prefixCls,
                  p = o.message,
                  m = o.closeText,
                  d = o.banner,
                  b = o.className,
                  h = void 0 === b ? '' : b,
                  v = o.style,
                  O = o.icon,
                  w = r.props,
                  E = w.closable,
                  C = w.type,
                  x = w.showIcon,
                  j = w.iconType,
                  k = r.state,
                  S = k.closing,
                  P = k.closed,
                  N = n('alert', l);
                (x = !(!d || void 0 !== x) || x), (C = d && void 0 === C ? 'warning' : C || 'info');
                var R = 'filled';
                if (!j) {
                  switch (C) {
                    case 'success':
                      j = 'check-circle';
                      break;
                    case 'info':
                      j = 'info-circle';
                      break;
                    case 'error':
                      j = 'close-circle';
                      break;
                    case 'warning':
                      j = 'exclamation-circle';
                      break;
                    default:
                      j = 'default';
                  }
                  i && (R = 'outlined');
                }
                m && (E = !0);
                var _ = s()(
                    N,
                    ''.concat(N, '-').concat(C),
                    ((t = {}),
                    g(t, ''.concat(N, '-closing'), S),
                    g(t, ''.concat(N, '-with-description'), !!i),
                    g(t, ''.concat(N, '-no-icon'), !x),
                    g(t, ''.concat(N, '-banner'), !!d),
                    g(t, ''.concat(N, '-closable'), E),
                    t),
                    h
                  ),
                  D = E
                    ? a['createElement'](
                        'button',
                        {
                          type: 'button',
                          onClick: r.handleClose,
                          className: ''.concat(N, '-close-icon'),
                          tabIndex: 0,
                        },
                        m
                          ? a['createElement'](
                              'span',
                              { className: ''.concat(N, '-close-text') },
                              m
                            )
                          : a['createElement'](u['a'], { type: 'close' })
                      )
                    : null,
                  M = f(r.props),
                  I =
                    (O &&
                      (a['isValidElement'](O)
                        ? a['cloneElement'](O, {
                            className: s()(
                              ''.concat(N, '-icon'),
                              g({}, O.props.className, O.props.className)
                            ),
                          })
                        : a['createElement']('span', { className: ''.concat(N, '-icon') }, O))) ||
                    a['createElement'](u['a'], {
                      className: ''.concat(N, '-icon'),
                      type: j,
                      theme: R,
                    });
                return P
                  ? null
                  : a['createElement'](
                      c['a'],
                      {
                        component: '',
                        showProp: 'data-show',
                        transitionName: ''.concat(N, '-slide-up'),
                        onEnd: r.animationEnd,
                      },
                      a['createElement'](
                        'div',
                        y({ 'data-show': !S, className: _, style: v }, M),
                        x ? I : null,
                        a['createElement']('span', { className: ''.concat(N, '-message') }, p),
                        a['createElement']('span', { className: ''.concat(N, '-description') }, i),
                        D
                      )
                    );
              }),
              Object(m['a'])(
                !('iconType' in e),
                'Alert',
                '`iconType` is deprecated. Please use `icon` instead.'
              ),
              (r.state = { closing: !1, closed: !1 }),
              r
            );
          }
          return (
            v(n, [
              {
                key: 'render',
                value: function() {
                  return a['createElement'](p['a'], null, this.renderAlert);
                },
              },
            ]),
            n
          );
        })(a['Component']),
        N = (n('+L6B'), n('2/Rp')),
        R = (n('miYZ'), n('tsqr')),
        _ = (n('/zsF'), n('PArb')),
        D = (n('Pwec'), n('5Dmo'), n('3S7+')),
        M = (n('3wW7'), n('R9oj'), n('T2oS'), n('DjyN'), n('1GLa'), n('17x9')),
        I = n('BGR+'),
        A = n('W9HT'),
        T = n('NUBc'),
        z = n('qrJ5'),
        L = n('/kpp');
      function H(e) {
        if (!a['isValidElement'](e)) return e;
        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
          n[r - 1] = arguments[r];
        return a['cloneElement'].apply(a, [e].concat(n));
      }
      function B(e) {
        '@babel/helpers - typeof';
        return (
          (B =
            'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' === typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          B(e)
        );
      }
      function F(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      function U(e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
      }
      function J(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function W(e, t, n) {
        return t && J(e.prototype, t), n && J(e, n), e;
      }
      function q(e, t) {
        if ('function' !== typeof t && null !== t)
          throw new TypeError('Super expression must either be null or a function');
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          t && Y(e, t);
      }
      function Y(e, t) {
        return (
          (Y =
            Object.setPrototypeOf ||
            function(e, t) {
              return (e.__proto__ = t), e;
            }),
          Y(e, t)
        );
      }
      function Q(e) {
        var t = Z();
        return function() {
          var n,
            r = G(e);
          if (t) {
            var a = G(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return K(this, n);
        };
      }
      function K(e, t) {
        return !t || ('object' !== B(t) && 'function' !== typeof t) ? X(e) : t;
      }
      function X(e) {
        if (void 0 === e)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
      }
      function Z() {
        if ('undefined' === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ('function' === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0;
        } catch (e) {
          return !1;
        }
      }
      function G(e) {
        return (
          (G = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
              }),
          G(e)
        );
      }
      function V() {
        return (
          (V =
            Object.assign ||
            function(e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            }),
          V.apply(this, arguments)
        );
      }
      var $ = function(e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var a = 0;
            for (r = Object.getOwnPropertySymbols(e); a < r.length; a++)
              t.indexOf(r[a]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[a]) &&
                (n[r[a]] = e[r[a]]);
          }
          return n;
        },
        ee = function(e) {
          return a['createElement'](p['a'], null, function(t) {
            var n = t.getPrefixCls,
              r = e.prefixCls,
              o = e.className,
              i = e.avatar,
              c = e.title,
              l = e.description,
              u = $(e, ['prefixCls', 'className', 'avatar', 'title', 'description']),
              p = n('list', r),
              f = s()(''.concat(p, '-item-meta'), o),
              m = a['createElement'](
                'div',
                { className: ''.concat(p, '-item-meta-content') },
                c && a['createElement']('h4', { className: ''.concat(p, '-item-meta-title') }, c),
                l &&
                  a['createElement'](
                    'div',
                    { className: ''.concat(p, '-item-meta-description') },
                    l
                  )
              );
            return a['createElement'](
              'div',
              V({}, u, { className: f }),
              i && a['createElement']('div', { className: ''.concat(p, '-item-meta-avatar') }, i),
              (c || l) && m
            );
          });
        };
      function te(e, t) {
        return e[t] && Math.floor(24 / e[t]);
      }
      var ne = (function(e) {
        q(n, e);
        var t = Q(n);
        function n() {
          var e;
          return (
            U(this, n),
            (e = t.apply(this, arguments)),
            (e.renderItem = function(t) {
              var n = t.getPrefixCls,
                r = e.context,
                o = r.grid,
                i = r.itemLayout,
                c = e.props,
                l = c.prefixCls,
                u = c.children,
                p = c.actions,
                f = c.extra,
                m = c.className,
                d = $(c, ['prefixCls', 'children', 'actions', 'extra', 'className']),
                y = n('list', l),
                g =
                  p &&
                  p.length > 0 &&
                  a['createElement'](
                    'ul',
                    { className: ''.concat(y, '-item-action'), key: 'actions' },
                    p.map(function(e, t) {
                      return a['createElement'](
                        'li',
                        { key: ''.concat(y, '-item-action-').concat(t) },
                        e,
                        t !== p.length - 1 &&
                          a['createElement']('em', {
                            className: ''.concat(y, '-item-action-split'),
                          })
                      );
                    })
                  ),
                b = o ? 'div' : 'li',
                h = a['createElement'](
                  b,
                  V({}, d, {
                    className: s()(
                      ''.concat(y, '-item'),
                      m,
                      F({}, ''.concat(y, '-item-no-flex'), !e.isFlexMode())
                    ),
                  }),
                  'vertical' === i && f
                    ? [
                        a['createElement'](
                          'div',
                          { className: ''.concat(y, '-item-main'), key: 'content' },
                          u,
                          g
                        ),
                        a['createElement'](
                          'div',
                          { className: ''.concat(y, '-item-extra'), key: 'extra' },
                          f
                        ),
                      ]
                    : [u, g, H(f, { key: 'extra' })]
                );
              return o
                ? a['createElement'](
                    L['a'],
                    {
                      span: te(o, 'column'),
                      xs: te(o, 'xs'),
                      sm: te(o, 'sm'),
                      md: te(o, 'md'),
                      lg: te(o, 'lg'),
                      xl: te(o, 'xl'),
                      xxl: te(o, 'xxl'),
                    },
                    h
                  )
                : h;
            }),
            e
          );
        }
        return (
          W(n, [
            {
              key: 'isItemContainsTextNodeAndNotSingular',
              value: function() {
                var e,
                  t = this.props.children;
                return (
                  a['Children'].forEach(t, function(t) {
                    'string' === typeof t && (e = !0);
                  }),
                  e && a['Children'].count(t) > 1
                );
              },
            },
            {
              key: 'isFlexMode',
              value: function() {
                var e = this.props.extra,
                  t = this.context.itemLayout;
                return 'vertical' === t ? !!e : !this.isItemContainsTextNodeAndNotSingular();
              },
            },
            {
              key: 'render',
              value: function() {
                return a['createElement'](p['a'], null, this.renderItem);
              },
            },
          ]),
          n
        );
      })(a['Component']);
      function re(e) {
        '@babel/helpers - typeof';
        return (
          (re =
            'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' === typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          re(e)
        );
      }
      function ae(e) {
        return le(e) || ce(e) || ie(e) || oe();
      }
      function oe() {
        throw new TypeError(
          'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        );
      }
      function ie(e, t) {
        if (e) {
          if ('string' === typeof e) return se(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return (
            'Object' === n && e.constructor && (n = e.constructor.name),
            'Map' === n || 'Set' === n
              ? Array.from(e)
              : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? se(e, t)
              : void 0
          );
        }
      }
      function ce(e) {
        if ('undefined' !== typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
      }
      function le(e) {
        if (Array.isArray(e)) return se(e);
      }
      function se(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function ue() {
        return (
          (ue =
            Object.assign ||
            function(e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            }),
          ue.apply(this, arguments)
        );
      }
      function pe(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      function fe(e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
      }
      function me(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function de(e, t, n) {
        return t && me(e.prototype, t), n && me(e, n), e;
      }
      function ye(e, t) {
        if ('function' !== typeof t && null !== t)
          throw new TypeError('Super expression must either be null or a function');
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          t && ge(e, t);
      }
      function ge(e, t) {
        return (
          (ge =
            Object.setPrototypeOf ||
            function(e, t) {
              return (e.__proto__ = t), e;
            }),
          ge(e, t)
        );
      }
      function be(e) {
        var t = Oe();
        return function() {
          var n,
            r = we(e);
          if (t) {
            var a = we(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return he(this, n);
        };
      }
      function he(e, t) {
        return !t || ('object' !== re(t) && 'function' !== typeof t) ? ve(e) : t;
      }
      function ve(e) {
        if (void 0 === e)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
      }
      function Oe() {
        if ('undefined' === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ('function' === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0;
        } catch (e) {
          return !1;
        }
      }
      function we(e) {
        return (
          (we = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
              }),
          we(e)
        );
      }
      (ne.Meta = ee), (ne.contextTypes = { grid: M['any'], itemLayout: M['string'] });
      var Ee = function(e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var a = 0;
            for (r = Object.getOwnPropertySymbols(e); a < r.length; a++)
              t.indexOf(r[a]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[a]) &&
                (n[r[a]] = e[r[a]]);
          }
          return n;
        },
        Ce = (function(e) {
          ye(n, e);
          var t = be(n);
          function n(e) {
            var r;
            fe(this, n),
              (r = t.call(this, e)),
              (r.defaultPaginationProps = { current: 1, total: 0 }),
              (r.keys = {}),
              (r.onPaginationChange = r.triggerPaginationEvent('onChange')),
              (r.onPaginationShowSizeChange = r.triggerPaginationEvent('onShowSizeChange')),
              (r.renderItem = function(e, t) {
                var n,
                  a = r.props,
                  o = a.renderItem,
                  i = a.rowKey;
                return o
                  ? ((n = 'function' === typeof i ? i(e) : 'string' === typeof i ? e[i] : e.key),
                    n || (n = 'list-item-'.concat(t)),
                    (r.keys[t] = n),
                    o(e, t))
                  : null;
              }),
              (r.renderEmpty = function(e, t) {
                var n = r.props.locale;
                return a['createElement'](
                  'div',
                  { className: ''.concat(e, '-empty-text') },
                  (n && n.emptyText) || t('List')
                );
              }),
              (r.renderList = function(e) {
                var t,
                  n = e.getPrefixCls,
                  o = e.renderEmpty,
                  i = r.state,
                  c = i.paginationCurrent,
                  l = i.paginationSize,
                  u = r.props,
                  p = u.prefixCls,
                  f = u.bordered,
                  m = u.split,
                  d = u.className,
                  y = u.children,
                  g = u.itemLayout,
                  b = u.loadMore,
                  h = u.pagination,
                  v = u.grid,
                  O = u.dataSource,
                  w = void 0 === O ? [] : O,
                  E = u.size,
                  C = u.header,
                  x = u.footer,
                  j = u.loading,
                  k = Ee(u, [
                    'prefixCls',
                    'bordered',
                    'split',
                    'className',
                    'children',
                    'itemLayout',
                    'loadMore',
                    'pagination',
                    'grid',
                    'dataSource',
                    'size',
                    'header',
                    'footer',
                    'loading',
                  ]),
                  S = n('list', p),
                  P = j;
                'boolean' === typeof P && (P = { spinning: P });
                var N = P && P.spinning,
                  R = '';
                switch (E) {
                  case 'large':
                    R = 'lg';
                    break;
                  case 'small':
                    R = 'sm';
                    break;
                  default:
                    break;
                }
                var _ = s()(
                    S,
                    d,
                    ((t = {}),
                    pe(t, ''.concat(S, '-vertical'), 'vertical' === g),
                    pe(t, ''.concat(S, '-').concat(R), R),
                    pe(t, ''.concat(S, '-split'), m),
                    pe(t, ''.concat(S, '-bordered'), f),
                    pe(t, ''.concat(S, '-loading'), N),
                    pe(t, ''.concat(S, '-grid'), v),
                    pe(t, ''.concat(S, '-something-after-last-item'), r.isSomethingAfterLastItem()),
                    t)
                  ),
                  D = ue(
                    ue(ue({}, r.defaultPaginationProps), {
                      total: w.length,
                      current: c,
                      pageSize: l,
                    }),
                    h || {}
                  ),
                  M = Math.ceil(D.total / D.pageSize);
                D.current > M && (D.current = M);
                var L,
                  H = h
                    ? a['createElement'](
                        'div',
                        { className: ''.concat(S, '-pagination') },
                        a['createElement'](
                          T['a'],
                          ue({}, D, {
                            onChange: r.onPaginationChange,
                            onShowSizeChange: r.onPaginationShowSizeChange,
                          })
                        )
                      )
                    : null,
                  B = ae(w);
                if (
                  (h &&
                    w.length > (D.current - 1) * D.pageSize &&
                    (B = ae(w).splice((D.current - 1) * D.pageSize, D.pageSize)),
                  (L = N && a['createElement']('div', { style: { minHeight: 53 } })),
                  B.length > 0)
                ) {
                  var F = B.map(function(e, t) {
                      return r.renderItem(e, t);
                    }),
                    U = [];
                  a['Children'].forEach(F, function(e, t) {
                    U.push(a['cloneElement'](e, { key: r.keys[t] }));
                  }),
                    (L = v
                      ? a['createElement'](z['a'], { gutter: v.gutter }, U)
                      : a['createElement']('ul', { className: ''.concat(S, '-items') }, U));
                } else y || N || (L = r.renderEmpty(S, o));
                var J = D.position || 'bottom';
                return a['createElement'](
                  'div',
                  ue({ className: _ }, Object(I['a'])(k, ['rowKey', 'renderItem', 'locale'])),
                  ('top' === J || 'both' === J) && H,
                  C && a['createElement']('div', { className: ''.concat(S, '-header') }, C),
                  a['createElement'](A['a'], P, L, y),
                  x && a['createElement']('div', { className: ''.concat(S, '-footer') }, x),
                  b || (('bottom' === J || 'both' === J) && H)
                );
              });
            var o = e.pagination,
              i = o && 'object' === re(o) ? o : {};
            return (
              (r.state = {
                paginationCurrent: i.defaultCurrent || 1,
                paginationSize: i.defaultPageSize || 10,
              }),
              r
            );
          }
          return (
            de(n, [
              {
                key: 'getChildContext',
                value: function() {
                  return { grid: this.props.grid, itemLayout: this.props.itemLayout };
                },
              },
              {
                key: 'triggerPaginationEvent',
                value: function(e) {
                  var t = this;
                  return function(n, r) {
                    var a = t.props.pagination;
                    t.setState({ paginationCurrent: n, paginationSize: r }),
                      a && a[e] && a[e](n, r);
                  };
                },
              },
              {
                key: 'isSomethingAfterLastItem',
                value: function() {
                  var e = this.props,
                    t = e.loadMore,
                    n = e.pagination,
                    r = e.footer;
                  return !!(t || n || r);
                },
              },
              {
                key: 'render',
                value: function() {
                  return a['createElement'](p['a'], null, this.renderList);
                },
              },
            ]),
            n
          );
        })(a['Component']);
      (Ce.Item = ne),
        (Ce.childContextTypes = { grid: M['any'], itemLayout: M['string'] }),
        (Ce.defaultProps = {
          dataSource: [],
          bordered: !1,
          split: !0,
          loading: !1,
          pagination: !1,
        });
      n('BoS7');
      var xe,
        je,
        ke = n('Sdc0'),
        Se = n('2Taf'),
        Pe = n.n(Se),
        Ne = n('vZ4D'),
        Re = n.n(Ne),
        _e = n('l4Ni'),
        De = n.n(_e),
        Me = n('ujKo'),
        Ie = n.n(Me),
        Ae = n('MhPg'),
        Te = n.n(Ae),
        ze = n('p0pE'),
        Le = n.n(ze),
        He = (n('OaEy'), n('2fM7')),
        Be = n('Y2fQ'),
        Fe = n('P5Jw'),
        Ue = n('MuoO'),
        Je = n('BFsb'),
        We = n.n(Je),
        qe = n('jehZ'),
        Ye = n.n(qe),
        Qe = n('Y/ft'),
        Ke = n.n(Qe),
        Xe = n('4Ofr'),
        Ze = n.n(Xe),
        Ge = function(e) {
          var t = e.color,
            n = e.check,
            r = Ke()(e, ['color', 'check']);
          return o.a.createElement(
            'div',
            Ye()({}, r, { style: { backgroundColor: t } }),
            n ? o.a.createElement(u['a'], { type: 'check' }) : ''
          );
        },
        Ve = function(e) {
          var t = e.colors,
            n = e.title,
            r = e.value,
            a = e.onChange,
            i = t;
          return (
            t ||
              (i = [
                { key: 'dust', color: '#F5222D' },
                { key: 'volcano', color: '#FA541C' },
                { key: 'sunset', color: '#FAAD14' },
                { key: 'cyan', color: '#13C2C2' },
                { key: 'green', color: '#52C41A' },
                { key: 'daybreak', color: '#1890FF' },
                { key: 'geekblue', color: '#2F54EB' },
                { key: 'purple', color: '#722ED1' },
              ]),
            o.a.createElement(
              'div',
              { className: Ze.a.themeColor },
              o.a.createElement('h3', { className: Ze.a.title }, n),
              o.a.createElement(
                'div',
                { className: Ze.a.content },
                i.map(function(e) {
                  var t = e.key,
                    n = e.color;
                  return o.a.createElement(
                    D['a'],
                    {
                      key: n,
                      title: Object(Be['formatMessage'])({
                        id: 'app.setting.themecolor.'.concat(t),
                      }),
                    },
                    o.a.createElement(Ge, {
                      className: Ze.a.colorBlock,
                      color: n,
                      check: r === n,
                      onClick: function() {
                        return a && a(n);
                      },
                    })
                  );
                })
              )
            )
          );
        },
        $e = Ve,
        et = function(e) {
          var t = e.value,
            n = e.onChange,
            r = e.list;
          return o.a.createElement(
            'div',
            { className: We.a.blockChecbox, key: t },
            r.map(function(e) {
              return o.a.createElement(
                D['a'],
                { title: e.title, key: e.key },
                o.a.createElement(
                  'div',
                  {
                    className: We.a.item,
                    onClick: function() {
                      return n(e.key);
                    },
                  },
                  o.a.createElement('img', { src: e.url, alt: e.key }),
                  o.a.createElement(
                    'div',
                    {
                      className: We.a.selectIcon,
                      style: { display: t === e.key ? 'block' : 'none' },
                    },
                    o.a.createElement(u['a'], { type: 'check' })
                  )
                )
              );
            })
          );
        },
        tt = et;
      function nt(e, t, n) {
        return (
          (t = Ie()(t)),
          De()(e, rt() ? Reflect.construct(t, n || [], Ie()(e).constructor) : t.apply(e, n))
        );
      }
      function rt() {
        try {
          var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        } catch (e) {}
        return (rt = function() {
          return !!e;
        })();
      }
      var at = He['a'].Option,
        ot = function(e) {
          var t = e.children,
            n = e.title,
            r = e.style;
          return o.a.createElement(
            'div',
            { style: Le()({}, r, { marginBottom: 24 }) },
            o.a.createElement('h3', { className: We.a.title }, n),
            t
          );
        },
        it =
          ((xe = Object(Ue['connect'])(function(e) {
            var t = e.setting;
            return { setting: t };
          })),
          xe(
            (je = (function(e) {
              function t() {
                var e;
                Pe()(this, t);
                for (var n = arguments.length, r = new Array(n), a = 0; a < n; a++)
                  r[a] = arguments[a];
                return (
                  (e = nt(this, t, [].concat(r))),
                  (e.state = { collapse: !1 }),
                  (e.getLayoutSetting = function() {
                    var t = e.props.setting,
                      n = t.contentWidth,
                      r = t.fixedHeader,
                      a = t.layout,
                      i = t.autoHideHeader,
                      c = t.fixSiderbar;
                    return [
                      {
                        title: Object(Be['formatMessage'])({ id: 'app.setting.content-width' }),
                        action: o.a.createElement(
                          He['a'],
                          {
                            value: n,
                            size: 'small',
                            onSelect: function(t) {
                              return e.changeSetting('contentWidth', t);
                            },
                            style: { width: 80 },
                          },
                          'sidemenu' === a
                            ? null
                            : o.a.createElement(
                                at,
                                { value: 'Fixed' },
                                Object(Be['formatMessage'])({
                                  id: 'app.setting.content-width.fixed',
                                })
                              ),
                          o.a.createElement(
                            at,
                            { value: 'Fluid' },
                            Object(Be['formatMessage'])({ id: 'app.setting.content-width.fluid' })
                          )
                        ),
                      },
                      {
                        title: Object(Be['formatMessage'])({ id: 'app.setting.fixedheader' }),
                        action: o.a.createElement(ke['a'], {
                          size: 'small',
                          checked: !!r,
                          onChange: function(t) {
                            return e.changeSetting('fixedHeader', t);
                          },
                        }),
                      },
                      {
                        title: Object(Be['formatMessage'])({ id: 'app.setting.hideheader' }),
                        disabled: !r,
                        disabledReason: Object(Be['formatMessage'])({
                          id: 'app.setting.hideheader.hint',
                        }),
                        action: o.a.createElement(ke['a'], {
                          size: 'small',
                          checked: !!i,
                          onChange: function(t) {
                            return e.changeSetting('autoHideHeader', t);
                          },
                        }),
                      },
                      {
                        title: Object(Be['formatMessage'])({ id: 'app.setting.fixedsidebar' }),
                        disabled: 'topmenu' === a,
                        disabledReason: Object(Be['formatMessage'])({
                          id: 'app.setting.fixedsidebar.hint',
                        }),
                        action: o.a.createElement(ke['a'], {
                          size: 'small',
                          checked: !!c,
                          onChange: function(t) {
                            return e.changeSetting('fixSiderbar', t);
                          },
                        }),
                      },
                    ];
                  }),
                  (e.changeSetting = function(t, n) {
                    var r = e.props.setting,
                      a = Le()({}, r);
                    (a[t] = n),
                      'layout' === t
                        ? (a.contentWidth = 'topmenu' === n ? 'Fixed' : 'Fluid')
                        : 'fixedHeader' !== t || n || (a.autoHideHeader = !1),
                      e.setState(a, function() {
                        var t = e.props.dispatch;
                        t({ type: 'setting/changeSetting', payload: e.state });
                      });
                  }),
                  (e.togglerContent = function() {
                    var t = e.state.collapse;
                    e.setState({ collapse: !t });
                  }),
                  (e.renderLayoutSettingItem = function(e) {
                    var t = o.a.cloneElement(e.action, { disabled: e.disabled });
                    return o.a.createElement(
                      D['a'],
                      { title: e.disabled ? e.disabledReason : '', placement: 'left' },
                      o.a.createElement(
                        Ce.Item,
                        { actions: [t] },
                        o.a.createElement(
                          'span',
                          { style: { opacity: e.disabled ? '0.5' : '' } },
                          e.title
                        )
                      )
                    );
                  }),
                  e
                );
              }
              return (
                Te()(t, e),
                Re()(t, [
                  {
                    key: 'render',
                    value: function() {
                      var e = this,
                        t = this.props.setting,
                        n = t.navTheme,
                        a = t.primaryColor,
                        i = t.layout,
                        c = t.colorWeak,
                        l = this.state.collapse;
                      return o.a.createElement(
                        r['a'],
                        {
                          visible: l,
                          width: 300,
                          onClose: this.togglerContent,
                          placement: 'right',
                          handler: o.a.createElement(
                            'div',
                            { className: We.a.handle, onClick: this.togglerContent },
                            o.a.createElement(u['a'], {
                              type: l ? 'close' : 'setting',
                              style: { color: '#fff', fontSize: 20 },
                            })
                          ),
                          style: { zIndex: 999 },
                        },
                        o.a.createElement(
                          'div',
                          { className: We.a.content },
                          o.a.createElement(
                            ot,
                            { title: Object(Be['formatMessage'])({ id: 'app.setting.pagestyle' }) },
                            o.a.createElement(tt, {
                              list: [
                                {
                                  key: 'dark',
                                  url:
                                    'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',
                                  title: Object(Be['formatMessage'])({
                                    id: 'app.setting.pagestyle.dark',
                                  }),
                                },
                                {
                                  key: 'light',
                                  url:
                                    'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',
                                  title: Object(Be['formatMessage'])({
                                    id: 'app.setting.pagestyle.light',
                                  }),
                                },
                              ],
                              value: n,
                              onChange: function(t) {
                                return e.changeSetting('navTheme', t);
                              },
                            })
                          ),
                          o.a.createElement($e, {
                            title: Object(Be['formatMessage'])({ id: 'app.setting.themecolor' }),
                            value: a,
                            onChange: function(t) {
                              return e.changeSetting('primaryColor', t);
                            },
                          }),
                          o.a.createElement(_['a'], null),
                          o.a.createElement(
                            ot,
                            {
                              title: Object(Be['formatMessage'])({
                                id: 'app.setting.navigationmode',
                              }),
                            },
                            o.a.createElement(tt, {
                              list: [
                                {
                                  key: 'sidemenu',
                                  url:
                                    'https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg',
                                  title: Object(Be['formatMessage'])({
                                    id: 'app.setting.sidemenu',
                                  }),
                                },
                                {
                                  key: 'topmenu',
                                  url:
                                    'https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg',
                                  title: Object(Be['formatMessage'])({ id: 'app.setting.topmenu' }),
                                },
                              ],
                              value: i,
                              onChange: function(t) {
                                return e.changeSetting('layout', t);
                              },
                            })
                          ),
                          o.a.createElement(Ce, {
                            split: !1,
                            dataSource: this.getLayoutSetting(),
                            renderItem: this.renderLayoutSettingItem,
                          }),
                          o.a.createElement(_['a'], null),
                          o.a.createElement(
                            ot,
                            {
                              title: Object(Be['formatMessage'])({
                                id: 'app.setting.othersettings',
                              }),
                            },
                            o.a.createElement(Ce, {
                              split: !1,
                              renderItem: this.renderLayoutSettingItem,
                              dataSource: [
                                {
                                  title: Object(Be['formatMessage'])({
                                    id: 'app.setting.weakmode',
                                  }),
                                  action: o.a.createElement(ke['a'], {
                                    size: 'small',
                                    checked: !!c,
                                    onChange: function(t) {
                                      return e.changeSetting('colorWeak', t);
                                    },
                                  }),
                                },
                              ],
                            })
                          ),
                          o.a.createElement(_['a'], null),
                          o.a.createElement(
                            Fe['CopyToClipboard'],
                            {
                              text: JSON.stringify(Object(I['a'])(t, ['colorWeak']), null, 2),
                              onCopy: function() {
                                return R['a'].success(
                                  Object(Be['formatMessage'])({ id: 'app.setting.copyinfo' })
                                );
                              },
                            },
                            o.a.createElement(
                              N['a'],
                              { block: !0, icon: 'copy' },
                              Object(Be['formatMessage'])({ id: 'app.setting.copy' })
                            )
                          ),
                          o.a.createElement(P, {
                            type: 'warning',
                            className: We.a.productionHint,
                            message: o.a.createElement(
                              'div',
                              null,
                              Object(Be['formatMessage'])({ id: 'app.setting.production.hint' }),
                              ' ',
                              o.a.createElement(
                                'a',
                                {
                                  href: 'https://u.ant.design/pro-v2-default-settings',
                                  target: '_blank',
                                  rel: 'noopener noreferrer',
                                },
                                'src/defaultSettings.js'
                              )
                            ),
                          })
                        )
                      );
                    },
                  },
                ])
              );
            })(a['Component']))
          ) || je);
      t['default'] = it;
    },
    YkAm: function(e, t, n) {
      e.exports = {
        'ant-alert': 'ant-alert',
        'ant-alert-no-icon': 'ant-alert-no-icon',
        'ant-alert-closable': 'ant-alert-closable',
        'ant-alert-icon': 'ant-alert-icon',
        'ant-alert-description': 'ant-alert-description',
        'ant-alert-success': 'ant-alert-success',
        'ant-alert-info': 'ant-alert-info',
        'ant-alert-warning': 'ant-alert-warning',
        'ant-alert-error': 'ant-alert-error',
        'ant-alert-close-icon': 'ant-alert-close-icon',
        'anticon-close': 'anticon-close',
        'ant-alert-close-text': 'ant-alert-close-text',
        'ant-alert-with-description': 'ant-alert-with-description',
        'ant-alert-message': 'ant-alert-message',
        'ant-alert-closing': 'ant-alert-closing',
        'ant-alert-slide-up-leave': 'ant-alert-slide-up-leave',
        antAlertSlideUpOut: 'antAlertSlideUpOut',
        'ant-alert-banner': 'ant-alert-banner',
        antAlertSlideUpIn: 'antAlertSlideUpIn',
      };
    },
    rHrb: function(e, t, n) {
      'use strict';
      function r(e) {
        '@babel/helpers - typeof';
        return (
          (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          r(e)
        );
      }
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.CopyToClipboard = void 0);
      var a = c(n('q1tI')),
        o = c(n('+QRC')),
        i = ['text', 'onCopy', 'options', 'children'];
      function c(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function l(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function s(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? l(Object(n), !0).forEach(function(t) {
                E(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : l(Object(n)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
              });
        }
        return e;
      }
      function u(e, t) {
        if (null == e) return {};
        var n,
          r,
          a = p(e, t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (r = 0; r < o.length; r++)
            (n = o[r]),
              t.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n]));
        }
        return a;
      }
      function p(e, t) {
        if (null == e) return {};
        var n,
          r,
          a = {},
          o = Object.keys(e);
        for (r = 0; r < o.length; r++) (n = o[r]), t.indexOf(n) >= 0 || (a[n] = e[n]);
        return a;
      }
      function f(e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
      }
      function m(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function d(e, t, n) {
        return (
          t && m(e.prototype, t),
          n && m(e, n),
          Object.defineProperty(e, 'prototype', { writable: !1 }),
          e
        );
      }
      function y(e, t) {
        if ('function' !== typeof t && null !== t)
          throw new TypeError('Super expression must either be null or a function');
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(e, 'prototype', { writable: !1 }),
          t && g(e, t);
      }
      function g(e, t) {
        return (
          (g =
            Object.setPrototypeOf ||
            function(e, t) {
              return (e.__proto__ = t), e;
            }),
          g(e, t)
        );
      }
      function b(e) {
        var t = O();
        return function() {
          var n,
            r = w(e);
          if (t) {
            var a = w(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return h(this, n);
        };
      }
      function h(e, t) {
        if (t && ('object' === r(t) || 'function' === typeof t)) return t;
        if (void 0 !== t)
          throw new TypeError('Derived constructors may only return object or undefined');
        return v(e);
      }
      function v(e) {
        if (void 0 === e)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
      }
      function O() {
        if ('undefined' === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ('function' === typeof Proxy) return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
        } catch (e) {
          return !1;
        }
      }
      function w(e) {
        return (
          (w = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
              }),
          w(e)
        );
      }
      function E(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      var C = (function(e) {
        y(n, e);
        var t = b(n);
        function n() {
          var e;
          f(this, n);
          for (var r = arguments.length, i = new Array(r), c = 0; c < r; c++) i[c] = arguments[c];
          return (
            (e = t.call.apply(t, [this].concat(i))),
            E(v(e), 'onClick', function(t) {
              var n = e.props,
                r = n.text,
                i = n.onCopy,
                c = n.children,
                l = n.options,
                s = a['default'].Children.only(c),
                u = (0, o['default'])(r, l);
              i && i(r, u),
                s && s.props && 'function' === typeof s.props.onClick && s.props.onClick(t);
            }),
            e
          );
        }
        return (
          d(n, [
            {
              key: 'render',
              value: function() {
                var e = this.props,
                  t = (e.text, e.onCopy, e.options, e.children),
                  n = u(e, i),
                  r = a['default'].Children.only(t);
                return a['default'].cloneElement(r, s(s({}, n), {}, { onClick: this.onClick }));
              },
            },
          ]),
          n
        );
      })(a['default'].PureComponent);
      (t.CopyToClipboard = C), E(C, 'defaultProps', { onCopy: void 0, options: void 0 });
    },
  },
]);
