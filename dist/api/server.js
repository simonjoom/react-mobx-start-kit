'use strict';

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _expressCors = require('express-cors');

var _expressCors2 = _interopRequireDefault(_expressCors);

var _feathers = require('feathers');

var _feathers2 = _interopRequireDefault(_feathers);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _feathersConfiguration = require('feathers-configuration');

var _feathersConfiguration2 = _interopRequireDefault(_feathersConfiguration);

var _feathersHooks = require('feathers-hooks');

var _feathersHooks2 = _interopRequireDefault(_feathersHooks);

var _feathersRest = require('feathers-rest');

var _feathersRest2 = _interopRequireDefault(_feathersRest);

var _feathersSocketio = require('feathers-socketio');

var _feathersSocketio2 = _interopRequireDefault(_feathersSocketio);

var _logger = require('./logger');

var _before = require('./middleware/api/before');

var _before2 = _interopRequireDefault(_before);

var _after = require('./middleware/api/after');

var _after2 = _interopRequireDefault(_after);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _feathersMongoose = require('feathers-mongoose');

var _feathersMongoose2 = _interopRequireDefault(_feathersMongoose);

var _connector = require('./connector');

var _services = require('./services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { startApiServer as start } from '../utils/server.start';

(0, _services.setupServicesAutoload)({
  dir: __dirname,
  adapter: _feathersMongoose2.default,
  connector: _connector.connector
}); //require('../server.babel');


var app = (0, _feathers2.default)().configure((0, _feathersConfiguration2.default)(_path2.default.join(__dirname, '/config'), 'feathers'));

app.use((0, _expressCors2.default)({ credentials: true, allowedOrigins: ['http://localhost:3001', 'http://localhost:8000', 'http://localhost:3000'] }));

app.use((0, _compression2.default)()).configure(_before2.default).configure((0, _feathersHooks2.default)()).configure((0, _feathersRest2.default)()).configure((0, _feathersSocketio2.default)(function (io) {
  return io.set('origins', '*:*');
})).configure(_auth2.default).configure(_services.initServicesAutoload).configure(_after2.default);
//  .configure(start);

var server = app.listen(3030);
server.on('listening', function () {
  return (0, _logger.logServerConfig)('API');
});
(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(app, 'app', 'api/server.js');

  __REACT_HOT_LOADER__.register(server, 'server', 'api/server.js');
})();

