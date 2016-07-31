'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return function (req, res, next) {
    return next(new _feathersErrors2.default.NotFound('Page not found'));
  };
};

exports.default = _default;
(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'api/middleware/notFound.js');
})();

