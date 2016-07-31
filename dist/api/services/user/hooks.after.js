'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _feathersHooks = require('feathers-hooks');

var _feathersHooks2 = _interopRequireDefault(_feathersHooks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  Hook: after
  Service: user
*/
var _default = {
  all: [_feathersHooks2.default.remove('__v', 'password')],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
exports.default = _default;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'api/services/user/hooks.after.js');
})();

;