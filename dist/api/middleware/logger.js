'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require('../logger');

var _default = function _default(app) {
  // Add a logger to our app object for convenience
  app.logger = _logger.log; // eslint-disable-line no-param-reassign

  return function (err, req, res, next) {
    if (err) {
      var url = req.url;
      var code = err.code;
      var message = err.message;

      var msg = (code ? '(' + code + ')' : '') + ' Route: ' + url + ' - ' + message;

      if (err.code === 404) {
        (0, _logger.log)(msg);
      } else {
        (0, _logger.logerreur)(msg);
        (0, _logger.log)(err.stack);
      }
    }
    next(err);
  };
};

exports.default = _default;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'api/middleware/logger.js');
})();

;