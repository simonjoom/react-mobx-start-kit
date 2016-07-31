'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _default = {
  model: 'user',
  namespace: '/user',
  options: {
    id: 'uuid',
    paginate: {
      default: 25,
      max: 50
    }
  }
};
exports.default = _default;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'api/services/user/config.js');
})();

;