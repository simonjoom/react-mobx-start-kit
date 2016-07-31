require('dotenv').config();
import webpack from 'webpack'
import path from 'path'
import extend from 'extend'
//import cssnano from 'cssnano'
import AssetsPlugin from 'assets-webpack-plugin'
//import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import Browsersync from 'browser-sync-webpack-plugin';
import config from '../src/config'
import _debug from 'debug'
var HappyPack = require('happypack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const debug = _debug('app:webpack:config');;

const VERBOSE = process.argv.includes('--verbose');

const paths = config.utils_paths;;
const {__DEV__, __PROD__, __TEST__} = config.globals;;
const __DEBUG = true;
const AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1',
];
const exposevar = {
    'process': {
        'env': {
            'BROWSER': true,
            'NODE_ENV': JSON.stringify(config.env),
            'WEB_HOST': JSON.stringify(process.env['WEB_HOST']),
            'WEB_PORT': JSON.stringify(process.env['WEB_PORT']),
            'API_HOST': JSON.stringify(process.env['API_HOST']),
            'API_PORT': JSON.stringify(process.env['API_PORT']),
            'IO_HOST': JSON.stringify(process.env['IO_HOST']),
            'IO_PORT': JSON.stringify(process.env['IO_PORT'])
        }
    }
};;
console.log(exposevar);;
debug('Create configuration.');;
const webpackConfig = {
// name: 'app',
    plugins: [],
    context: path.resolve(__dirname, '../'),
    devtool: config.compiler_devtool,
    //devtool:'inline-eval-cheap-source-map',
    output: {
        path: paths.dist('public/build'),
        publicPath: '/assets/',
        sourcePrefix: '  ',
    },
    resolve: {
        root: paths.client(),
        modulesDirectories: ['node_modules'],
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
    },
    cache: __DEBUG,
    debug: __DEBUG,

    module: {},
    postcss(bundler) {
        return {

            default: [
                // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
                // https://github.com/postcss/postcss-import
                require('postcss-import')({addDependencyTo: bundler}),
                // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
                // https://github.com/postcss/postcss-custom-properties
                require('postcss-custom-properties')(),
                // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
                // https://github.com/postcss/postcss-custom-media
                require('postcss-custom-media')(),
                // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
                // https://github.com/postcss/postcss-media-minmax
                require('postcss-media-minmax')(),
                // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
                // https://github.com/postcss/postcss-custom-selectors
                require('postcss-custom-selectors')(),
                // W3C calc() function, e.g. div { height: calc(100px - 2em); }
                // https://github.com/postcss/postcss-calc
                require('postcss-calc')(),
                // Allows you to nest one style rule inside another
                // https://github.com/jonathantneal/postcss-nesting
                require('postcss-nesting')(),
                // W3C color() function, e.g. div { background: color(red alpha(90%)); }
                // https://github.com/postcss/postcss-color-function
                require('postcss-color-function')(),
                // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
                // https://github.com/iamvdo/pleeease-filters
                require('pleeease-filters')(),
                // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
                // https://github.com/robwierzbowski/node-pixrem
                require('pixrem')(),
                // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
                // https://github.com/postcss/postcss-selector-matches
                require('postcss-selector-matches')(),
                // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
                // https://github.com/postcss/postcss-selector-not
                require('postcss-selector-not')(),
                // Add vendor prefixes to CSS rules using values from caniuse.com
                // https://github.com/postcss/autoprefixer
                require('autoprefixer')({browsers: AUTOPREFIXER_BROWSERS}),
                //  require('postcss-url')('inline')
            ],
            sass: [
                require('autoprefixer')({browsers: AUTOPREFIXER_BROWSERS}),
            ],
        };
    }
};;


// Don't split bundles during testing, since we only want import one bundle
/*if (!__TEST__) {
 webpackConfig.plugins.push(
 new webpack.optimize.CommonsChunkPlugin({
 names: ['vendor']
 })
 )
 }*/

// ------------------------------------
// Pre-Loaders
// ------------------------------------
/*
 [ NOTE ]
 We no longer use eslint-loader due to it severely impacting build
 times for larger projects. `npm run lint` still exists to aid in
 deploy processes (such as with CI), and it's recommended that you
 use a linting plugin for your IDE in place of this loader.

 If you do wish to continue using the loader, you can uncomment
 the code below and run `npm i --save-dev eslint-loader`. This code
 will be removed in a future release.

 webpackConfig.module.preLoaders = [{
 test: /\.(js|jsx)$/,
 loader: 'eslint',
 exclude: /node_modules/
 }]

 webpackConfig.eslint = {
 configFile: paths.base('.eslintrc'),
 emitWarning: __DEV__
 }
 */

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.loaders = [{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    include: [path.resolve(__dirname, '../node_modules/react-routing/src'),
        path.resolve(__dirname, '../src'),
    ],
    // happy: { id: 'js' }
},
    {
        test: /\.css/,
        loaders: [
            'isomorphic-style-loader',
            `css-loader?${JSON.stringify({
                sourceMap: __DEV__,
                // CSS Modules https://github.com/css-modules/css-modules
                modules: true,
                localIdentName: __DEV__ ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
                // CSS Nano http://cssnano.co/options/
                minimize: true,
            })}`,
            'postcss-loader?pack=default',
        ],
        // happy: { id: 'css' }
    },
    {
        test: /\.scss$/,
        loaders: [
            'isomorphic-style-loader',
            `css-loader?${JSON.stringify({sourceMap: __DEV__, minimize: true})}`,
            'postcss-loader?pack=sass',
            'sass-loader',
        ],
    },
    {
        test: /\.json$/,
        loader: 'json-loader',
    }
];;

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
/*const BASE_CSS_LOADER = 'css?sourceMap&-minimize'

 // Add any packge names here whose styles need to be treated as CSS modules.
 // These paths will be combined into a single regex.
 const PATHS_TO_TREAT_AS_CSS_MODULES = [
 // 'react-toolbox', (example)
 ]

 // If config has CSS modules enabled, treat this project's styles as CSS modules.
 if (config.compiler_css_modules) {
 PATHS_TO_TREAT_AS_CSS_MODULES.push(
 paths.client().replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&') // eslint-disable-line
 )
 }

 const isUsingCSSModules = !!PATHS_TO_TREAT_AS_CSS_MODULES.length
 const cssModulesRegex = new RegExp(`(${PATHS_TO_TREAT_AS_CSS_MODULES.join('|')})`)
 */
// Loaders for styles that need to be treated as CSS modules.
/*if (isUsingCSSModules) {
 const cssModulesLoader = [
 BASE_CSS_LOADER,
 'modules',
 'importLoaders=1',
 'localIdentName=[name]__[local]___[hash:base64:5]'
 ].join('&')

 webpackConfig.module.loaders.push({
 test: /\.scss$/,
 include: cssModulesRegex,
 loaders: [
 'style',
 cssModulesLoader,
 'postcss',
 'sass?sourceMap'
 ]
 })

 webpackConfig.module.loaders.push({
 test: /\.css$/,
 include: cssModulesRegex,
 loaders: [
 'style',
 cssModulesLoader,
 'postcss'
 ]
 })
 }

 // Loaders for files that should not be treated as CSS modules.
 const excludeCSSModules = isUsingCSSModules ? cssModulesRegex : false
 webpackConfig.module.loaders.push({
 test: /\.scss$/,
 exclude: excludeCSSModules,
 loaders: [
 'style',
 BASE_CSS_LOADER,
 'postcss',
 'sass?sourceMap'
 ]
 })
 webpackConfig.module.loaders.push({
 test: /\.css$/,
 exclude: excludeCSSModules,
 loaders: [
 'style',
 BASE_CSS_LOADER,
 'postcss'
 ]
 })

 // ------------------------------------
 // Style Configuration
 // ------------------------------------
 webpackConfig.sassLoader = {
 includePaths: paths.client('styles')
 }
 */

/*
 webpackConfig.postcss = [
 cssnano({
 autoprefixer: {
 add: true,
 remove: true,
 browsers: ['last 2 versions']
 },
 discardComments: {
 removeAll: true
 },
 discardUnused: false,
 mergeIdents: false,
 reduceIdents: false,
 safe: true,
 sourcemap: true
 })
 ]*/

// File loaders
/* eslint-disable */
webpackConfig.module.loaders.push(
    {
        test: /\.woff(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
    },
    {
        test: /\.woff2(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
    },
    {test: /\.otf(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'},
    {
        test: /\.ttf(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
    },
    {test: /\.eot(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]'},
    {test: /\.svg(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'},
    {test: /\.(png|jpg)$/, loader: 'url?limit=8192'}
);;
/* eslint-enable */
/*
 webpackConfig.plugins.push(
 new Browsersync(
 // BrowserSync options
 {
 host: 'localhost',
 port: 3000,
 proxy: 'http://localhost:8000'
 },
 // plugin options
 {
 reload: false
 }
 ))*/
// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
    debug('Apply ExtractTextPlugin to CSS loaders.');;
    webpackConfig.module.loaders.filter((loader) =>
        loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
    ).forEach((loader) => {
        const [first, ...rest] = loader.loaders;;
        console.log(first, rest.join('!'));;
        loader.loader = ExtractTextPlugin.extract(first, rest.join('!'));;
        Reflect.deleteProperty(loader, 'loaders')
    });;

    webpackConfig.plugins.push(
        new ExtractTextPlugin('[name].[contenthash].css', {
            allChunks: true
        })
    )
}

//export default webpackConfig

const clientConfig = extend(true, {}, webpackConfig, {
    name: 'app',
    target: 'web',
    output: {
        filename: `[name]${config.compiler_hash_type}.js`,
        library: '[name]'
    },
    externals: {
        'ajv': 'Ajv'
    },
    plugins: [
        new webpack.DefinePlugin(extend(true, {}, config.globals, exposevar)),
        /*new HappyPack({ id: 'js' }),
         new HappyPack({ id: 'css' }),
         */
        new webpack.ProvidePlugin({
            "React": "react"
        }),
        //no dev new CopyWebpackPlugin([ { from: 'src/assets', to: './public/build/assets' } ]),
        new CopyWebpackPlugin([{from: 'src/assets', to: ''}]),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new AssetsPlugin({
            path: paths.dist('public/build'),
            filename: 'myassets.js',
            processOutput: x => `module.exports = ${JSON.stringify(x)};`,
        })
    ],
    // Choose a developer tool to enhance debugging
    // http://webpack.github.io/docs/configuration.html#devtool
    devtool: __DEV__ ? 'cheap-module-eval-source-map' : false,
//devtool: __DEV__ ? 'inline-eval-cheap-source-map' : false,
});
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATHS = [
    paths.client('main.js')
];;

clientConfig.entry = {
    app: __DEV__
        ? [
        "font-awesome-webpack!" + paths.client('font-awesome.config.js'),
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8000/',
        "webpack/hot/only-dev-server"
    ].concat(APP_ENTRY_PATHS)
        : APP_ENTRY_PATHS
    , vendor: config.compiler_vendor
};;


if (__DEV__) {
    debug('Enable plugins for live development (HMR, NoErrors).');;
    /*clientConfig.plugins.push(
     new webpack.optimize.CommonsChunkPlugin({
     names: ['vendor']
     })
     )*/
    clientConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        })
    ),
        clientConfig.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        )
} else if (__PROD__) {
    clientConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        })
    );;
    debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).');;
    clientConfig.plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    )
}

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

config.globals.process.env.BROWSER = false;
const serverConfig = extend(true, {}, webpackConfig, {
    name: 'server',
    output: {
        path: paths.dist('public/build'),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        //path: path.resolve(__dirname, '../dist/assets')
    },

    target: 'node',

    externals: [
        /^\.\/myassets$/,
        /ajv/,
        function filter(context, request, cb) {
            const isExternal =
                request.match(/^[@a-z][a-z\/\.\-0-9]*$/i) && !request.match(/^react-routing/) && !context.match(/[\\/]react-routing/);
            cb(null, Boolean(isExternal));
        },
    ],

    plugins: [
        new webpack.ProvidePlugin({
            "React": "react"
        }),
        //  new HappyPack({ id: 'js' }),
        //  new HappyPack({ id: 'css' }),
        // Define free variables
        // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        new webpack.DefinePlugin(config.globals)

        // Adds a banner to the top of each generated chunk
        // https://webpack.github.io/docs/list-of-plugins.html#bannerplugin
        /* new webpack.BannerPlugin('require("source-map-support").install();',
         { raw: true, entryOnly: false }),*/
        /*new Browsersync(
         // BrowserSync options
         {
         host: 'localhost',
         port: 3000,
         proxy: 'http://localhost:3000'
         },
         // plugin options
         {
         reload: true
         }
         )*/
    ],

    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },

    // devtool: 'source-map',
});

const SERVER_ENTRY_PATHS = [
    paths.client('server.js')
];;

serverConfig.entry = {
    server: SERVER_ENTRY_PATHS
};;
export default [clientConfig, serverConfig];

