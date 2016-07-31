"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDelay = addDelay;
// Add a delay to test slower connections
function addDelay(delay) {
  return function (hook, next) {
    setTimeout(next, delay);
  };
}
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(addDelay, "addDelay", "api/hooks/addDelay.js");
})();

;