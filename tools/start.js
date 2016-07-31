
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import run from './run';
import runServer from './runServer';
import webpackConfig from './webpack.config';
import clean from './clean';
import copy from './copy';

import webpackMiddleware from 'webpack-middleware'
import webpackdevMiddleware from 'webpack-dev-middleware'

const DEBUG = !process.argv.includes('--release');
var bundleStart;
/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
  await run(clean);
  await run(copy.bind(undefined, { watch: true }));
  await new Promise(resolve => {
    // Patch the client-side bundle configurations
    // to enable Hot Module Replacement (HMR) and React Transform
    webpackConfig.filter(x => x.target !== 'node').forEach(config => {
      /* eslint-disable no-param-reassign */
    config.entry = ['react-hot-loader/patch'].concat(config.entry);
      config.entry = ['webpack/hot/only-dev-server'].concat(config.entry);
     config.entry = ['webpack-dev-server/client?http://localhost:7070'].concat(config.entry);

      config.output.filename = config.output.filename.replace('[chunkhash]', '[hash]');
      config.output.chunkFilename = config.output.chunkFilename.replace('[chunkhash]', '[hash]');

      config.plugins.push(new webpack.HotModuleReplacementPlugin());
      config.plugins.push(new webpack.NoErrorsPlugin());

      /* eslint-enable no-param-reassign */
    });

const bundler = webpack(webpackConfig);

let webpackDevMiddlewareInstance = webpackMiddleware(bundler,{
    publicPath:webpackConfig[0].output.publicPath
  });

let hotMiddlewares;
hotMiddlewares = bundler.compilers
      .filter(compiler => compiler.options.target !== 'node')
      .map(c => {
      let middl=new WebpackDevServer(c, {
    publicPath:webpackConfig[0].output.publicPath,
   // contentBase: paths.client(),
    contentBase: "http://localhost:8000",
     hot: true,
    quiet: true,
    noInfo: true,
    lazy: false,
    stats: webpackConfig[0].stats
  })
  middl.listen("8000","localhost");
  return  middl.middleware}
  );

    let handleServerBundleComplete = () => {

      runServer((err, host) => {
        if (!err) {

const bs = require('browser-sync').create();
  bs.init({
    proxy: {
      target: 'localhost:3000', // <- where Node.js app is running
      middleware: [webpackDevMiddlewareInstance,...hotMiddlewares]
    },
    files: ['build/public/*.*'],
  },cb
  );
          handleServerBundleComplete = runServer;
        }
      });
    };

    bundler.plugin('done', () => handleServerBundleComplete());
  });
}

export default start;
