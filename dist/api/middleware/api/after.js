'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handler = require('feathers-errors/handler');

var _handler2 = _interopRequireDefault(_handler);

var _notFound = require('../notFound');

var _notFound2 = _interopRequireDefault(_notFound);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _logger3 = require('../../logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  (0, _logger3.log)('Init API Middleware: After');

  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  var app = this;

  app.use((0, _notFound2.default)());
  app.use((0, _logger2.default)(app));
  app.use((0, _handler2.default)({ html: false }));
};

exports.default = _default;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'api/middleware/api/after.js');
})();

;