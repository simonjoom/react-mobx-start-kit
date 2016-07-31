'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _feathersAuthentication = require('feathers-authentication');

var _feathersAuthentication2 = _interopRequireDefault(_feathersAuthentication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Strategy as FacebookStrategy } from 'passport-facebook';
// import FacebookTokenStrategy from 'passport-facebook-token';
// import { Strategy as GithubStrategy } from 'passport-github';
// import GithubTokenStrategy from 'passport-github-token';

var _default = function _default() {
  var app = this;

  var config = app.get('auth');

  // config.facebook.strategy = FacebookStrategy;
  // config.facebook.tokenStrategy = FacebookTokenStrategy;
  // config.github.strategy = GithubStrategy;
  // config.github.tokenStrategy = GithubTokenStrategy;

  app.set('auth', config);
  app.configure((0, _feathersAuthentication2.default)(config));
};

exports.default = _default;
(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'api/auth.js');
})();

