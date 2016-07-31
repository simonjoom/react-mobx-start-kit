import webpack from 'webpack'
import webpackConfig from '../build/webpack.config'
import express from 'express';
import cors from 'express-cors';

import _debug from 'debug'
import config from '../src/config'
import run from './run';
import runServer from './runServer';
import WebpackDevServer from 'webpack-dev-server';
import webpackMiddleware from 'webpack-middleware'
import webpackdevMiddleware from 'webpack-dev-middleware'
import applyExpressMiddleware from './lib/apply-express-middleware'


const debug = _debug('app:server')
const paths = config.utils_paths
const app = express();


app.use(express.static(paths.dist('assets')));
app.use(cors({
    credentials: true, allowedOrigins: [
        'http://localhost:8080', 'http://localhost:3000', 'http://localhost:8000'
    ]
}))

// Enable koa-proxy if it has been enabled in the config.
/*if (config.proxy && config.proxy.enabled) {
 app.use(convert(proxy(config.proxy.options)))
 }
 */
// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement isomorphic
// rendering, you'll want to remove this middleware.
/*app.use(convert(historyApiFallback({
 verbose: false
 })))

 */
const compiler = webpack(webpackConfig)
let bundleStart, bundleStart0;
let hotMiddlewares, webpackDevMiddlewareInstance, ignoreAssets2, ignoreAssets, publicPath, middl, enmid0, enmid1, isdone;
// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {


    publicPath = webpackConfig[0].output.publicPath
    let addscript = [];

    compiler.compilers[0].plugin('compile', function () {
        console.log('Bundling...');
        bundleStart0 = Date.now();
    });
    compiler.compilers[1].plugin('compile', function () {
        console.log('Bundling...');
        bundleStart = Date.now();
    });


    compiler.compilers[0].plugin('done', function (statsData) {
        var stats = statsData.toJson();
        console.log('Bundled in ' + (Date.now() - bundleStart0) + 'ms!');
        console.log(stats.assetsByChunkName);
        if (isdone) {
            app.use(...hotMiddlewares)

            app.use(webpackDevMiddlewareInstance)
        }
    });

    compiler.compilers[1].plugin('done', function (statsData) {
        var stats = statsData.toJson();
        console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
        console.log(stats.assetsByChunkName);
        if (!isdone) {

            hotMiddlewares = compiler.compilers.filter(c => c.options.target !== 'node').map(c => {
                middl = new WebpackDevServer(c, {
                    publicPath: publicPath,
                    hot: true,
                    quiet: config.compiler_quiet,
                    noInfo: config.compiler_quiet,
                    lazy: false,
                    stats: config.compiler_stats
                })
                middl.listen("8000", "localhost");
                return middl.middleware;
            });

        }
    });


    webpackDevMiddlewareInstance = webpackMiddleware(compiler, {
        publicPath: publicPath,
        hot: true,
        quiet: config.compiler_quiet,
        noInfo: config.compiler_quiet,
        lazy: false,
        stats: config.compiler_stats
    });

    // Serve static assets from ~/src/static since Webpack is unaware of
    // these files. This middleware doesn't need to be enabled outside
    // of development since this directory will be copied into ~/dist
    // when the application is compiled.
//app.use(serve(paths.client('static')))

//path.join(__dirname, '..', 'build/assets')

    //app.use(express.static(paths.dist()));
} else {
    debug(
        'Server is being run outside of live development mode, meaning it will ' +
        'only serve the compiled application bundle in ~/dist. Generally you ' +
        'do not need an application server for this and can instead use a web ' +
        'server such as nginx to serve your static files. See the "deployment" ' +
        'section in the README for more information on deployment strategies.'
    )

    // Serving ~/dist by default. Ideally these files should be served by
    // the web server and not the app server, but this helps to demo the
    // server in production.
// app.use(express.static(paths.dist()))
}


//runserver fromdirectory

// const bs = require('browser-sync').create();

const startbs = (err)=> {
    if (!err) {
        //todo browser-sync
        /*
         bs.init({
         proxy: {
         target: 'localhost:3000', // <- where Node.js app is running
         middleware: [...hotMiddlewares,webpackDevMiddlewareInstance]
         },
         files: ['src/assets/*.*']
         })*/

    }
};

let handleServerBundleComplete = (publicPath) => {

// We need to add a configuration to our proxy server,
// as we are now proxying outside localhost
    runServer(startbs);

    //runServer(null);

    // handleServerBundleComplete = runServer(startbs);
};

compiler.plugin('done', () => {
    if (!isdone) {

        // app.use(webpackDevMiddlewareInstance)
        handleServerBundleComplete(publicPath);

        isdone = true;
    }
})

export default app

