'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setUUID = require('../../hooks/setUUID');

/**
  Hook: before
  Service: post
*/
var _default = {
  all: [
    // auth.verifyToken(),
  ],
  find: [],
  get: [],
  create: [(0, _setUUID.setUUID)()],
  update: [],
  patch: [],
  remove: []
}; // import { hooks as auth } from 'feathers-authentication';

exports.default = _default;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'api/services/post/hooks.before.js');
})();

;