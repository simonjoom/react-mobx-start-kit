'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _feathersAuthentication = require('feathers-authentication');

var _setUUID = require('../../hooks/setUUID');

/**
  Hook: before
  Service: user
*/
var _default = {
  all: [],
  find: [_feathersAuthentication.hooks.verifyToken(), _feathersAuthentication.hooks.populateUser(), _feathersAuthentication.hooks.restrictToAuthenticated()],
  get: [_feathersAuthentication.hooks.verifyToken(), _feathersAuthentication.hooks.populateUser(), _feathersAuthentication.hooks.restrictToAuthenticated(), _feathersAuthentication.hooks.restrictToOwner({ ownerField: '_id' })],
  create: [(0, _setUUID.setUUID)(), _feathersAuthentication.hooks.hashPassword()],
  update: [_feathersAuthentication.hooks.verifyToken(), _feathersAuthentication.hooks.populateUser(), _feathersAuthentication.hooks.restrictToAuthenticated(), _feathersAuthentication.hooks.restrictToOwner({ ownerField: '_id' })],
  patch: [_feathersAuthentication.hooks.verifyToken(), _feathersAuthentication.hooks.populateUser(), _feathersAuthentication.hooks.restrictToAuthenticated(), _feathersAuthentication.hooks.restrictToOwner({ ownerField: '_id' })],
  remove: [_feathersAuthentication.hooks.verifyToken(), _feathersAuthentication.hooks.populateUser(), _feathersAuthentication.hooks.restrictToAuthenticated(), _feathersAuthentication.hooks.restrictToOwner({ ownerField: '_id' })]
};
exports.default = _default;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'api/services/user/hooks.before.js');
})();

;