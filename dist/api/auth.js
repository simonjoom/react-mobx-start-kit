'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _feathersAuthentication = require('feathers-authentication');

var _feathersAuthentication2 = _interopRequireDefault(_feathersAuthentication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { Strategy as GithubStrategy } from 'passport-github';
//import GithubTokenStrategy from 'passport-github-token';

var FacebookStrategy = require('passport-facebook').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');
var InstagramStrategy = require('passport-instagram').Strategy;
var InstagramTokenStrategy = require('passport-instagram-token');

//const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const GoogleTokenStrategy = require('passport-google-token').Strategy;

var _default = function _default() {
  var app = this;

  var config = app.get('auth');
  console.log(config);

  config.facebook.strategy = FacebookStrategy;
  config.facebook.tokenStrategy = FacebookTokenStrategy;
  config.instagram.strategy = InstagramStrategy;
  config.instagram.tokenStrategy = InstagramTokenStrategy;
  //config.google.strategy = GoogleStrategy;
  //config.google.tokenStrategy = GoogleTokenStrategy;

  app.set('auth', config);
  app.configure((0, _feathersAuthentication2.default)(config));
};

exports.default = _default;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(FacebookStrategy, 'FacebookStrategy', 'api/auth.js');

  __REACT_HOT_LOADER__.register(InstagramStrategy, 'InstagramStrategy', 'api/auth.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'api/auth.js');
})();

;