'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.setupServicesAutoload = setupServicesAutoload;
exports.initServicesAutoload = initServicesAutoload;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _globule = require('globule');

var _globule2 = _interopRequireDefault(_globule);

var _logger = require('./logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServicesSetup = function () {
    function ServicesSetup() {
        (0, _classCallCheck3.default)(this, ServicesSetup);
    }

    (0, _createClass3.default)(ServicesSetup, [{
        key: 'init',
        value: function init(props) {
            this.adapter = props.adapter;
            this.connector = props.connector;
            this.dir = props.dir;
        }
    }]);
    return ServicesSetup;
}();

/*
 Feathers Services Autoload
 */


var Services = function () {
    function Services(app) {
        (0, _classCallCheck3.default)(this, Services);

        this.app = app;
    }

    (0, _createClass3.default)(Services, [{
        key: 'init',
        value: function init(props) {
            this.pdir = props.dir;
            this.dir = _path2.default.resolve(props.dir, 'services');
            this.connector = props.connector;
            this.adapter = props.adapter;
            this.db = this.connector(this.app.get('server').db);
            this.loadServices();
        }
    }, {
        key: 'loadServices',
        value: function loadServices() {
            var _this = this;

            (0, _logger.log)('------------------------------------------');
            (0, _logger.log)('Loading services...');
            _globule2.default.find(_path2.default.join(this.dir, '*')).map(function ($service) {
                return _this.attachService($service);
            });
            (0, _logger.log)('------------------------------------------');
        }
    }, {
        key: 'attachService',
        value: function attachService($service) {
            var dir = $service.replace(this.pdir, '.'); // require build fix (".replace()")
            var ServiceConfig = require([dir, 'config.js'].join('/')).default;
            var ServiceModel = require([dir, 'model.js'].join('/')).default;

            // extend the service object with related model
            (0, _assign2.default)(ServiceConfig.options, { Model: ServiceModel });

            // Create an instance of the Feather service
            var serviceInstance = this.adapter(ServiceConfig.options);

            // Attach the service to the app server
            (0, _logger.log)('Service', ServiceConfig.namespace);
            this.app.use(ServiceConfig.namespace, serviceInstance);

            // get the service
            var service = this.app.service(ServiceConfig.namespace);

            // Setup our HOOKS (before/after)
            var beforeHooksDir = [dir, 'hooks.before.js'].join('/');
            var afterHooksDir = [dir, 'hooks.after.js'].join('/');
            service.before(require(beforeHooksDir).default);
            service.after(require(afterHooksDir).default);
        }
    }]);
    return Services;
}();

var servicesSetup = new ServicesSetup();

function setupServicesAutoload($props) {
    servicesSetup.init($props);
}

function initServicesAutoload() {
    new Services(this).init(servicesSetup);
}
;

(function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(ServicesSetup, 'ServicesSetup', 'api/services.js');

    __REACT_HOT_LOADER__.register(Services, 'Services', 'api/services.js');

    __REACT_HOT_LOADER__.register(servicesSetup, 'servicesSetup', 'api/services.js');

    __REACT_HOT_LOADER__.register(setupServicesAutoload, 'setupServicesAutoload', 'api/services.js');

    __REACT_HOT_LOADER__.register(initServicesAutoload, 'initServicesAutoload', 'api/services.js');
})();

;