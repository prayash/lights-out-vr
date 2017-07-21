(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/App.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('aframe');

require('aframe-template-component');

require('aframe-animation-component');

require('aframe-particle-system-component');

var _preact = require('preact');

var _aframeReact = require('aframe-react');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var matrix = [[1, 1, 0, 1, 1], [1, 0, 1, 0, 1], [0, 1, 1, 1, 0], [1, 0, 1, 0, 1], [1, 1, 0, 1, 1]];

var textures = ['x', 'step', 'circle', 'fcircle', 'rect', 'frect', 'dstrips', 'hstrips', 'vstrips', 'dots', 'waves'];

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = { color: 'white' };
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'changeColor',
    value: function changeColor() {
      var colors = ['red', 'orange', 'yellow', 'green', 'blue'];
      this.setState({
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(
        _aframeReact.Scene,
        null,
        (0, _preact.h)(
          'a-assets',
          null,
          (0, _preact.h)('img', { crossOrigin: true, id: 'x', src: 'img/x.png' }),
          (0, _preact.h)('img', { crossOrigin: true, id: 'step', src: 'img/step.png' }),
          (0, _preact.h)('img', { crossOrigin: true, id: 'circle', src: 'img/circle.png' }),
          (0, _preact.h)('img', { crossOrigin: true, id: 'fcircle', src: 'img/fcircle.png' }),
          (0, _preact.h)('img', { crossOrigin: true, id: 'rect', src: 'img/rect.png' }),
          (0, _preact.h)('img', { crossOrigin: true, id: 'frect', src: 'img/frect.png' }),
          (0, _preact.h)('img', { crossOrigin: true, id: 'dstrips', src: 'img/dstrips.png' }),
          (0, _preact.h)('img', { crossOrigin: true, id: 'hstrips', src: 'img/hstrips.png' }),
          (0, _preact.h)('img', { crossOrigin: true, id: 'vstrips', src: 'img/vstrips.png' }),
          (0, _preact.h)('img', { crossOrigin: true, id: 'dots', src: 'img/dots.png' }),
          (0, _preact.h)('img', { crossOrigin: true, id: 'waves', src: 'img/waves.png' })
        ),
        (0, _preact.h)(_aframeReact.Entity, { primitive: 'a-light', type: 'ambient', color: '#445451' }),
        (0, _preact.h)(_aframeReact.Entity, {
          primitive: 'a-light',
          type: 'point',
          intensity: '2',
          position: '2 4 4'
        }),
        (0, _preact.h)(_aframeReact.Entity, { primitive: 'a-sky', color: '#111', width: '2048', position: '0 0 0' }),
        (0, _preact.h)(_aframeReact.Entity, {
          'particle-system': { preset: 'dust', particleCount: 200, opacity: 0.5 }
        }),
        matrix.map(function (row, rowIndex) {
          return row.map(function (col, colIndex) {
            return (0, _preact.h)(_aframeReact.Entity, {
              primitive: 'a-plane',
              height: '1',
              width: '1',
              src: '#' + textures[Math.floor(Math.random() * textures.length)],
              material: {
                color: 'white',
                opacity: 0.95
              },
              position: {
                x: colIndex * _config2.default.SCALE + _config2.default.X_OFFSET,
                y: rowIndex * _config2.default.SCALE + _config2.default.Y_OFFSET,
                z: 0
              }
            });
          });
        }),
        (0, _preact.h)(
          _aframeReact.Entity,
          { position: { x: 2, y: 3, z: 8 } },
          (0, _preact.h)(
            _aframeReact.Entity,
            { primitive: 'a-camera', 'wasd-controls-enabled': false },
            (0, _preact.h)(_aframeReact.Entity, {
              primitive: 'a-cursor',
              animation__click: {
                property: 'scale',
                startEvents: 'click',
                from: '0.1 0.1 0.1',
                to: '1 1 1',
                dur: 150
              }
            })
          )
        )
      );
    }
  }]);

  return App;
}(_preact.Component);

exports.default = App;

});

require.register("config/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  X_OFFSET: -1,
  Y_OFFSET: 2,
  SCALE: 1.5
};

});

require.register("initialize.js", function(exports, require, module) {
'use strict';

var _preact = require('preact');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  (0, _preact.render)((0, _preact.h)(_App2.default, null), document.querySelector('#app'));
});

});

require.alias("buffer/index.js", "buffer");
require.alias("process/browser.js", "process");
require.alias("preact", "react");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map