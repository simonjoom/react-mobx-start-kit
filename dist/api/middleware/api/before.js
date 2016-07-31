'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressCors = require('express-cors');

var _expressCors2 = _interopRequireDefault(_expressCors);

var _logger = require('../../logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  (0, _logger.log)('Init API Middleware: Before');

  var app = this;
  app.use((0, _expressCors2.default)({ credentials: true, allowedOrigins: ['http://localhost:3001', 'http://localhost:3000', 'http://localhost:3030'] }));
  // app.use(cors({ origin: true }));
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
};

exports.default = _default;
(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'api/middleware/api/before.js');
})();

