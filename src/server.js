import path from 'path';
import express from 'express';
import cors from 'express-cors';
import _debug from 'debug'
import bodyParser from 'body-parser';
import mobx from 'mobx';
import {toJS} from 'mobx';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
/*import expressJwt from 'express-jwt';
 import expressGraphQL from 'express-graphql';
 import jwt from 'jsonwebtoken';*/
import Html from './components/Html';
import {ErrorPage} from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import PrettyError from 'pretty-error';
import passport from './core/passport';
import models from './data/models';
import schema from './data/schema';
import myassets from './myassets';
import routes from './routes';
import cookieParser from 'cookie-parser';
import $store from './store/stores';
//import { setRuntimeVariable } from './actions/runtime';

import App from './components/App';
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'mobx-react';

import {auth, databaseUrl} from './configauth';
import config from './config';
const paths = config.utils_paths;

//import AppState from './store/stores/appstate';
import jsonStringifySafe from 'json-stringify-safe';

import {createMemoryHistory, useQueries} from 'history';
import {match} from 'universal-router';
//import withContext from './withContext';
var proxy = require('http-proxy-middleware');
const debug = _debug('app:server');;


const app = express();


const port = process.env.PORT || 3000;

//if(__DEV__){
//import webpack from 'webpack';
//import extend from 'extend';
//import AssetsPlugin from 'assets-webpack-plugin';
//}
//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
//global.navigator = global.navigator || {};
//global.navigator.userAgent = global.navigator.userAgent || 'all';
let initialState = {
    //     cookie: req.headers.cookie,
};
let context;
let mconfig = {};

//
// Register Node.js middleware
// -----------------------------------------------------------------------------

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/assets/*', proxy({
        target: 'http://localhost:8000', changeOrigin: true
    }
));


//
// Authentication
// -----------------------------------------------------------------------------
/*
 app.use(expressJwt({
 secret: auth.jwt.secret,
 credentialsRequired: false,
 getToken: req => req.cookies.id_token,
 }));
 app.use(passport.initialize());

 app.get('/login/facebook',
 passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false })
 );
 app.get('/login/facebook/return',
 passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
 (req, res) => {
 const expiresIn = 60 * 60 * 24 * 180; // 180 days
 const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
 res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
 res.redirect('/');
 }
 );
 */
let setinjectTapEventPlugin = true;;
let css = [];
const data = {
    lang: 'en',
    title: 'un titre',
    description: 'ma description pour tout le site',
    script: myassets.app.js,
    scriptvendor: myassets.vendor.js
};
//
// Register API middleware
// -----------------------------------------------------------------------------
/*app.use('/graphql', expressGraphQL(req => ({
 schema,
 graphiql: true,
 rootValue: { request: req },
 pretty: process.env.NODE_ENV !== 'production',
 })));
 */
//function p2(){
//return async (req, res, next) => {

function render(template, component, context, actionResult, store, appstate) {
//css=[];
    if (setinjectTapEventPlugin) {
        appstate.ui.myinjectTapEventPlugin(); // material-ui fix
    }
    const content = renderToString(
        <Provider context={ context }
                  appstate={ appstate }>
            <App children={ component }/>
        </Provider>
    );;

    /* withContext({
     //insertCss: styles => css.push(styles._getCss()), // eslint-disable-line
     ...context,
     }, component));*/
    return content && `<!doctype html>\n${renderToStaticMarkup(
            React.createElement(template || Html, {
                /* start: default values */
                meta: [],
                style: css.join(''),
                ...context,
                store,
                //  ...actionResult,
                children: content,
            })
        )}`;
}
function createApp({routes, context, template, storetostore, store} = {}) {
    return async(req, res, next) => {
        let result;
        let html;
        let ctx;

        try {
            ctx = {
                path: req.path,
                query: req.query,
                hash: null,
                history: useQueries(createMemoryHistory)(req.originalUrl),
                ...context
                //...(context instanceof Function ? context(req) : context),
            };
            result = await match(routes, ctx);

            // Handle redirect
            if (result && (result.status === 301 || result.status === 302)) {
                res.redirect(result.status, result.content);
                return;
            }

            // Render React component
            if (result && result.component) {
                context.title = result.title;
                html = render(template, React.createElement(result.component, result.props), context, result, storetostore, store);
            }

            if (!html) {
                const error = new Error('Not found');
                error.status = 404;
                throw error;
            }

            res.status(result.status || 200).send(html);
        } catch (error) {
            console.log("error");;
            console.log(error);;
            error.status = error.status || 500;
            try {
                result = await match(routes, {...ctx, canonicalPath: req.path, path: '/error', error});

                if (result && result.component) {
                    html = render(template, React.createElement(result.component, result.props), ctx, result, storetostore, store);
                }

                if (html) {
                    res.status(error.status).send(html);
                } else {
                    next(error);
                }
            } catch (err) {
                next(err);
            }
        }
    };
}

function initapp() {

    return async(req, res, next) => {
//app.get('*', async (req, res, next) => {
        let addscript = [];
        console.log(req.path);;
        try {
            if ((/(\.ico|\.png|\.js|\.jpg|\.map|\.xml|\.txt)$/.test(req.path)) || (/socket.*/.test(req.path)) || (/sockjs-node.*/.test(req.path))) {
                console.log(req.path);;
                await next()
            } else {

                initialState = {
                    app: {ssrLocation: req.url},
                    ui: {
                        theme: {mui: {userAgent: JSON.stringify(req.headers['user-agent'])}}
                    }
                };;
                let store = $store.set(initialState);

                console.log(store);

                let statusCode = 200;
                let storetostore = toJS(store);

//hack pourquoi dois je faire cela??
                /*   store=jsonStringifySafe( storetostore)
                 store = $store.set(JSON.parse(store));

                 storetostore = toJS(store);
                 console.log(storetostore);*/
//console.log(storetostore)
                context = {
                    ...data,
                    insertCss: styles => css.push(styles._getCss()),
                    /* insertCss: (...styles) => {
                     styles.forEach(style => css.push(style._getCss()));
                     },*/
                    setTitle: value => (data.title = value),
                    setMeta: (key, value) => (data[key] = value),
                    muiTheme: {}
                };
                /*
                 store.dispatch(setRuntimeVariable({
                 name: 'initialNow',
                 value: Date.now(),
                 }));*/

                return createApp({routes, context, template: null, storetostore, store})(req, res, next);
                await next();

            }
        } catch (err) {
            console.log("erroe");
            await next(err);
        }
//   await next()


    };;
    //)
}
//}
app.use(initapp());;


app.listen(3000, () => {
    console.log(`The server is running at http://localhost:3000/`);
});

/*
 //
 // Error handling
 // -----------------------------------------------------------------------------
 const pe = new PrettyError();
 pe.skipNodeFiles();
 pe.skipPackage('express');

 app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
 console.log(pe.render(err)); // eslint-disable-line no-console
 const statusCode = err.status || 500;
 const html = renderToStaticMarkup(
 <Html
 title="Internal Server Error"
 description={err.message}
 style={errorPageStyle._getCss()} // eslint-disable-line no-underscore-dangle
 >
 {renderToString(<ErrorPage error={err} />)}
 </Html>
 );
 res.status(statusCode);
 res.send(`<!doctype html>${html}`);
 });
 */
/*
 models.sync().catch(err => console.error(err.stack)).then(() => {
 app.listen(port, () => {
 console.log(`The server is running at http://localhost:${port}/`);
 });
 });

 */
