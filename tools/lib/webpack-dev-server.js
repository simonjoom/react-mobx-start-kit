

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
//import runServer from './runServer';
import webpackConfig from './webpack.config';

    const bundler = webpack(webpackConfig);

  bundler.plugin('compile', function() {
    console.log('Bundling...');
    bundleStart = Date.now();
  });

  // We also give notice when it is done compiling, including the
  // time it took. Nice to have
  bundler.plugin('done', function() {
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  });

new WebpackDevServer(webpack(webpackConfig), {
    headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: false,
  hot:true,
 // publicPath: webpackConfig[0].output.publicPath,
   contentBase: 'http://localhost:8082',
  /* proxy: {
  '*':'http://localhost:8082'
  },*/
    quiet: true,
    lazy: false ,
    noInfo: false,
    stats: webpackConfig[0].stats
  }).listen(7070, 'localhost');
