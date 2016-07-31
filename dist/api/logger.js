"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logServerConfig = exports.logInit = exports.logerreur = exports.log = undefined;

var _debug2 = require("debug");

var _debug3 = _interopRequireDefault(_debug2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _debug3.default)("API:info");
var logerreur = (0, _debug3.default)("API:error");

function logInit() {
  log('------------------------------------------');
  log('--------------- RFX STACK ----------------');
  log('------------------------------------------');
}

function logServerConfig() {
  var type = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

  var port = type === 'API' ? process.env['API_PORT'] : process.env['WEB_PORT'];
  var host = type === 'API' ? process.env['API_HOST'] : process.env['WEB_HOST'];

  var url = ['http://', host, ':', port].join('');

  if (type === 'API') {
    log('------------------------------------------');
    log('API Listening at:', url);
    log('------------------------------------------');
    log('Database Host:', process.env['DB_HOST']);
    log('Database Name:', process.env['DB_NAME']);
    log('Database Port:', process.env['DB_PORT']);
    log('------------------------------------------');
  }

  if (type !== 'API') {
    log('WEB Listening at:', url);
    log('Environment:', process.env['NODE_ENV']);
    log('------------------------------------------');
    log('IO Host:', process.env['IO_HOST']);
    log('IO Port:', process.env['IO_PORT']);
    log('------------------------------------------');
  }
}

exports.log = log;
exports.logerreur = logerreur;
exports.logInit = logInit;
exports.logServerConfig = logServerConfig;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(log, "log", "api/logger.js");

  __REACT_HOT_LOADER__.register(logerreur, "logerreur", "api/logger.js");

  __REACT_HOT_LOADER__.register(logInit, "logInit", "api/logger.js");

  __REACT_HOT_LOADER__.register(logServerConfig, "logServerConfig", "api/logger.js");
})();

;