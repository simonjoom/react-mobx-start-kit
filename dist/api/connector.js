'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connector = connector;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connector(config) {
  var host = config.host;
  var port = config.port;
  var name = config.name;

  var uri = ['mongodb://', host, ':', port, '/', name].join('');
  _mongoose2.default.Promise = global.Promise;
  return _mongoose2.default.connect(uri);
}
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(connector, 'connector', 'api/connector.js');
})();

;