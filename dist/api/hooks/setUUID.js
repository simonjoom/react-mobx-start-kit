'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUUID = setUUID;

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assignUUID(item) {
  item.uuid = _nodeUuid2.default.v4(); // eslint-disable-line no-param-reassign
}

function setUUID() {
  return function (hook, next) {
    var data = hook.data;

    if (Array.isArray(data)) {
      data.map(function (item) {
        return assignUUID(item);
      });
      return next();
    }

    assignUUID(data);
    return next();
  };
}
(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(assignUUID, 'assignUUID', 'api/hooks/setUUID.js');

  __REACT_HOT_LOADER__.register(setUUID, 'setUUID', 'api/hooks/setUUID.js');
})();

