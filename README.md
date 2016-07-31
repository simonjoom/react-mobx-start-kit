# React Mobx Starter Kit

This starter kit is designed to get you up and running with a bunch of awesome new front-end technologies, all on top of a configurable, the kit is actually working in developpement mode only .. why? because just i'm lazy and i still not checked webpack config for production...
So it's a boilerplate to start happy developping : We use last react-hot-loader! 

In building this,  The more important thing for us was to have a good SSR (server side rendering) with not too much complicate code

We decided to merge 4 important features

https://github.com/kriasoft/universal-router

https://github.com/kriasoft/react-starter-kit

https://github.com/foxhound87/rfx-stack

https://github.com/gaearon/react-hot-loader

We stopped redux for mobx, not only for performance but Mobx is much simpler and easy to use. Thanks for rfx-stack to help us in this way;

We do not use react-router that everybody use, just because universal-router is more simple and we prefer to know how it's working under the hood
 
Our webpack build system is setup with the last hot reloading, CSS modules with Sass support, unit testing, code coverage reports, bundle splitting, and a whole lot more.

The primary goal of this project is to remain as **unopinionated** as possible. 
Its purpose is not to dictate your project structure or to demonstrate a complete sample application, but to provide a set of tools intended to make front-end development robust, easy, and, most importantly, fun. Check out the full feature list below!

These npm helped us to configurate webpack with react-hot-loader 

font-awesome managed by font-awesome-webpack ! thks to him to help to add font-awesome
https://www.npmjs.com/package/font-awesome-webpack

CopyWebpackPlugin: It was big help too to integrate our asset in memory (we use webpack for hot-reload so asset should to added in memory)
https://www.npmjs.com/package/copy-webpack-plugin

HappyPack: We use it but just it's desactivate due side effect on big change but it's compile much faster!


Finally, This project wouldn't be possible without the help of our many contributors, so [thank you](#thank-you) for all of your help.

## OPENSOURCE 
You can use it for all you need :) be the first to contribute and find bugs


## WE HIRE !
We are tired to work alone on this, we hire everybody with very good skill in feathers and mobx to continu to develop it.


## Getting Started

After confirming that your development environment meets the specified [requirements](#requirements), you can follow these steps to get the project up and running:

```bash
$ git clone https://github.com/simonjoom/react-start-mobxkit
$ cd react-mobx-starter-kit
$ npm install                   # Install project dependencies
$ npm start                     # Compile and launch
```

If everything works, you should see the following:

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`compile`|Compiles the application to disk (`~/dist` by default).|
|`dev`|Same as `npm start`, but enables nodemon for the server as well.|
|`dev:no-debug`|Same as `npm run dev` but disables devtool instrumentation.|
|`test`|Runs unit tests with Karma and generates a coverage report.|
|`test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`deploy`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`deploy:dev`|Same as `deploy` but overrides `NODE_ENV` to "development".|
|`deploy:prod`|Same as `deploy` but overrides `NODE_ENV` to "production".|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|

## Application Structure

The application structure presented in this boilerplate is **fractal**, where functionality is grouped primarily by feature rather than file type. Please note, however, that this structure is only meant to serve as a guide, it is by no means prescriptive. That said, it aims to represent generally accepted guidelines and patterns for building scalable applications. If you wish to read more about this pattern, please check out this [awesome writeup](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure) by [Justin Greenberg](https://github.com/justingreenberg).

```
.
├── bin                      # Build/Start scripts
├── blueprints               # Blueprint files for redux-cli
├── build                    # All build-related configuration
│   └── webpack              # Environment-specific configuration files for webpack
├── config                   # Project configuration settings
├── server                   # Koa application (uses webpack middleware)
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── main.js              # Application bootstrap and rendering
│   ├── components           # Reusable Presentational Components
│   ├── containers           # Reusable Container Components
│   ├── layouts              # Components that dictate major page structure
│   ├── static               # Static assets (not imported anywhere in source code)
│   ├── styles               # Application-wide styles (generally settings)
│   ├── store                # Redux-specific pieces
│   │   ├── store.js         # Create and instrument mobx store
│   │   └── store 
               ├ ui/auth/post #Injection store subclass
│   └── routes               # Main route definitions and async split points
│       ├── index.js         # Bootstrap main application routes with store
│       └── Home             # Fractal route
│           ├── index.js     # Route definitions and async split points 
            ├── Home.css     # some css
            ├── Home.js      # The view for the component of this route 
``` 


## Requirements
* node `^4.2.0`
* npm `^3.0.0`

## Development

#### Developer Tools

**We recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).**
Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn’t require installing any packages.

However, adding the DevTools components to your project is simple. First, grab the packages from npm:

```bash
npm i --save-dev redux-devtools redux-devtools-log-monitor redux-devtools-dock-monitor
```

Then follow the [manual integration walkthrough](https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md).

### Routing
We Do not use `react-router` [route definitions]
`<route>/index.js`) to define units of logic within our application. See the [application structure](#application-structure) section for more information.

## Testing
To add a unit test, simply create a `.spec.js` file anywhere in `~/tests`. Karma will pick up on these files automatically, and Mocha and Chai will be available within your test without the need to import them. If you are using `redux-cli`, test files should automatically be generated when you create a component or redux module.

Coverage reports will be compiled to `~/coverage` by default. If you wish to change what reporters are used and where reports are compiled, you can do so by modifying `coverage_reporters` in `~/config/index.js`.

## Deployment
Out of the box, this starter kit is deployable by serving the `~/dist` folder generated by `npm run deploy` (make sure to specify your target `NODE_ENV` as well). This project does not concern itself with the details of server-side rendering or API structure, since that demands an opinionated structure that makes it difficult to extend the starter kit. However, if you do need help with more advanced deployment strategies, here are a few tips:

### Static Deployments
If you are serving the application via a web server such as nginx, make sure to direct incoming routes to the root `~/dist/index.html` file and let react-router take care of the rest. The Koa server that comes with the starter kit is able to be extended to serve as an API or whatever else you need, but that's entirely up to you.

### Heroku

Heroku has `nodejs buildpack` script that does the following when you deploy your app to Heroku.
1. Find `packages.json` in the root directory.
2. Install `nodejs` and `npm` packages.
3. Run `npm postinstall script`
4. Run `npm start`

Therefore, you need to modify `package.json` before deploying to Heroku. Make the following changes in the `scripts` section of `package.json`.

```
...
"start": "better-npm-run start:prod",
"serve": "better-npm-run start",
"postinstall": "npm run deploy:prod",
"betterScripts": {
  ...
  "start:prod": {
    "command": "babel-node bin/server",
    "env": {
      "NODE_ENV": "production"
    }
  }
  ...
},
```

It's also important to tell Heroku to install all `devDependencies` to successfully compile your app on Heroku's environment. Run the following in your terminal.

```bash
$ heroku config:set NPM_CONFIG_PRODUCTION=false
```

With this setup, you will install all the necessray packages, build your app, and start the webserver (e.g. koa) everytime you push your app to Heroku. Try to deploy to Heroku by running the following commands.

```bash
$ git add .
$ git commit -m 'My awesome commit'
$ git push heroku master
```

If you fail to deploy for an unknown reason, try [this helpful comment](https://github.com/davezuko/react-redux-starter-kit/issues/730#issuecomment-213997120) by [DonHansDampf](https://github.com/DonHansDampf) addressing Heroku deployments.

Have more questions? Feel free to submit an issue or join the Gitter chat!

## Build System

### Configuration

Default project configuration can be found in `~/config/index.js`. Here you'll be able to redefine your `src` and `dist` directories, adjust compilation settings, tweak your vendor dependencies, and more. For the most part, you should be able to make changes in here **without ever having to touch the actual webpack build configuration**.

If you need environment-specific overrides (useful for dynamically setting API endpoints, for example), you can edit `~/config/environments.js` and define overrides on a per-NODE_ENV basis. There are examples for both `development` and `production`, so use those as guidelines. Here are some common configuration options:

|Key|Description|
|---|-----------|
|`dir_src`|application source code base path|
|`dir_dist`|path to build compiled application to|
|`server_host`|hostname for the Koa server|
|`server_port`|port for the Koa server|
|`compiler_css_modules`|whether or not to enable CSS modules|
|`compiler_devtool`|what type of source-maps to generate (set to `false`/`null` to disable)|
|`compiler_vendor`|packages to separate into to the vendor bundle|


### Root Resolve
Webpack is configured to make use of [resolve.root](http://webpack.github.io/docs/configuration.html#resolve-root), which lets you import local packages as if you were traversing from the root of your `~/src` directory. Here's an example:

```js
// current file: ~/src/views/some/nested/View.js
// What used to be this:
import SomeComponent from '../../../components/SomeComponent'

// Can now be this:
import SomeComponent from 'components/SomeComponent' // Hooray!
```

### Globals

These are global variables available to you anywhere in your source code. If you wish to modify them, they can be found as the `globals` key in `~/config/index.js`. When adding new globals, make sure you also add them to `~/.eslintrc`.

|Variable|Description|
|---|---|
|`process.env.NODE_ENV`|the active `NODE_ENV` when the build started|
|`__DEV__`|True when `process.env.NODE_ENV` is `development`|
|`__PROD__`|True when `process.env.NODE_ENV` is `production`|
|`__TEST__`|True when `process.env.NODE_ENV` is `test`|
|`__DEBUG__`|True when `process.env.NODE_ENV` is `development` and cli arg `--no_debug` is not set (`npm run dev:no-debug`)|
|`__BASENAME__`|[history basename option](https://github.com/rackt/history/blob/master/docs/BasenameSupport.md)|

### Styles

Both `.scss` and `.css` file extensions are supported out of the box and are configured to use [CSS Modules](https://github.com/css-modules/css-modules). After being imported, styles will be processed with [PostCSS](https://github.com/postcss/postcss) for minification and autoprefixing, and will be extracted to a `.css` file during production builds.

### Server

This starter kit comes packaged with an Koa server. It's important to note that the sole purpose of this server is to provide `webpack-dev-middleware` and `webpack-hot-middleware` for hot module replacement. Using a custom Koa app in place of [webpack-dev-server](https://github.com/webpack/webpack-dev-server) makes it easier to extend the starter kit to include functionality such as API's, universal rendering, and more -- all without bloating the base boilerplate.

### Production Optimization

Babel is configured to use [babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime) so transforms aren't inlined. Additionally, in production, we use [react-optimize](https://github.com/thejameskyle/babel-react-optimize) to further optimize your React code.

In production, webpack will extract styles to a `.css` file, minify your JavaScript, and perform additional optimizations such as module deduplication.

## Learning Resources

* [Starting out with mobx](https://mobxjs.github.io/mobx/getting-started.html) is an introduction to the components used in this starter kit with a small example in the end.

Just some simple, declarative components that form our complete UI. And which are derived completely, reactively from our state. You are now ready to start using the mobx and mobx-react packages in your own applications. A short summary of the things you learned so far:

    Use the @observable decorator or observable(object or array) functions to make objects trackable for MobX.
    The @computed decorator can be used to create functions that can automatically derive their value from the state.
    Use autorun to automatically run functions that depend on some observable state. This is useful for logging, making network requests etc.
    Use the @observer decorator from the mobx-react package to make your React components truly reactive. They will update automatically and efficiently. Even when used in large complex applications with large amounts of data.

## FAQ

Having trouble? Check out our [FAQ](https://github.com/davezuko/react-redux-starter-kit/wiki/FAQ:-Frequently-Asked-Questions) or submit an issue. Please be considerate by only posting issues that are directly related to this project; questions about how to implement certain React or Redux features are both best suited for StackOverflow or their respective repositories.

## Thank You
