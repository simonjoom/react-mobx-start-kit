"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timestamp = timestamp;
function timestamp(name) {
  return function (hook, next) {
    var data = hook.data;
    data[name] = new Date();
    next();
  };
}
(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(timestamp, "timestamp", "api/hooks/timestamp.js");
})();

