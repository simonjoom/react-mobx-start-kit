import ReactDOM from 'react-dom'
import {render} from 'react-dom';
import FastClick from 'fastclick';
//import createBrowserhistory from 'history/lib/createBrowserhistory'
//import { useRouterhistory } from 'react-router'
//import { synchistoryWithStore } from 'react-router-redux'
//import createStore from './store/createStore'
import configureStore from './store/configureStore';
import {match} from 'universal-router';
import routes from './routes';
import history from './core/history';
import {readState, saveState} from 'history/lib/DOMStateStorage';
import App from './components/App';
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'mobx-react';
import jsonStringifySafe from 'json-stringify-safe';
import {toJS} from 'mobx';
import $store from '~/src/store/stores'; // initialize stores
require("font-awesome-webpack");


import {
    addEventListener, removeEventListener, windowScrollX, windowScrollY,
} from './core/DOMUtils';
let removeHistoryListener = () => {
};

const context = {
    muiTheme: {},
    insertCss: (...styles) => {
        const removeCss = styles.map(style => style._insertCss()); // eslint-disable-line no-underscore-dangle, max-len
        return () => {
            removeCss.forEach(f => f());
        }
    },
    setTitle: value => (document.title = value),
    setMeta: (name, content) => {
        // Remove and create a new <meta /> tag in order to make it work
        // with bookmarks in Safari
        const elements = document.getElementsByTagName('meta');
        Array.from(elements).forEach((element) => {
            if (element.getAttribute('name') === name) {
                element.parentNode.removeChild(element);
            }
        })
        const meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document
            .getElementsByTagName('head')[0]
            .appendChild(meta);
    }
};
function restoreScrollPosition(state) {
    if (state && state.scrollY !== undefined) {
        window.scrollTo(state.scrollX, state.scrollY);
    } else {
        window.scrollTo(0, 0);
    }
}

let component,
    mconfig,
    ctx;
let setinjectTapEventPlugin = true;
// ========================================================
// Render Setup
// ========================================================


let renderComplete = (state) => {
    const elem = document.getElementById('css');
    if (elem) elem.parentNode.removeChild(elem);

    renderComplete = (s) => {
        restoreScrollPosition(s);

        // Google Analytics tracking. Don't send 'pageview' event after
        // the initial rendering, as it was already sent
        if (window.ga) {
            window.ga('send', 'pageview');
        }
    };
};

export function dehydrate(store) {
    // convert store to json
    return jsonStringifySafe(toJS(store, true));
}


function hotRehydrate(store) {
    if (!window.__STORE) {
        window.__STORE = $store.set(store); //configureStore( store );

    }
    return window.__STORE;
}
const initialState = JSON.parse(document.getElementById('source').getAttribute('data-initial-state'));

//const appstate = configureStore(initialState);
const appstate = initialState;

function createApp(history) {
    if (!history) {
        //  history = useQueries(createBrowserHistory)(); // eslint-disable-line no-param-reassign
    }
    let currentLocation = "";
    let result;
    // Make taps on links and buttons work fast on mobiles
    FastClick.attach(document.body);

    async function onLocationChange(location) {

        // Save the page scroll position into the current location's state
        if (location.key) {
            saveState(location.key, {
                ...readState(location.key),
                scrollX: windowScrollX(),
                scrollY: windowScrollY(),
            });
        }

        ctx = {
            path: location.pathname,
            query: location.query,
            hash: location.hash,
            history,
            ...context
            // ...(context instanceof Function ? context() : context),
        };
        //   return async () => {
        try {
            const MOUNT_NODE = document.getElementById('root')

            if (location.pathname !== currentLocation)
                result = await match(routes, ctx);

            currentLocation = location.pathname;

            // Handle redirect
            if (result && (result.status === 301 || result.status === 302)) {
                location.push(result.content);
                return;
            }

            if (result && result.component) {
                await new Promise((resolve, reject) => {
                    try {
                        if (__DEV__) {
                            console.log('React rendering. Stat:');
                            if (window.location.search.includes('debugRender')) {
                                const {whyDidYouUpdate} = require('why-did-you-update')
                                whyDidYouUpdate(React)
                            }
                        }
                        let store = hotRehydrate(appstate)
                        component = React.createElement(result.component, result.props);
                        if (setinjectTapEventPlugin) {
                            store.ui.myinjectTapEventPlugin(); // material-ui fix
                        }
                        ReactDOM.render(
                            <Provider context={ context }
                                      appstate={ store }>
                                <AppContainer>
                                    <App children={ component }/>
                                </AppContainer>
                            </Provider>, MOUNT_NODE, () => {
                                document.title = result.title || '';
                                renderComplete("t")
                                resolve()
                            });
                    } catch (err) {
                        console.log("err");
                        reject(err);
                    }
                });
                /* if (onRenderComplete) {
                 onRenderComplete();
                 }*/
            } else {
                console.log("err");
                const error = new Error('Not found');
                error.status = 404;
                throw error;
            }
        } catch (error) {
            error.status = error.status || 500;
            try {
                result = await match(routes, {
                    ...ctx,
                    canonicalPath: location.pathname,
                    path: '/error',
                    error,
                });
                if (result && result.component) {
                    await new Promise((resolve, reject) => {
                        try {
                            component = React.createElement(result.component, result.props);
                            ReactDOM.render(
                                <Provider
                                    context={ ctx }
                                    appstate={ hotRehydrate( appstate ) }>

                                    <App children={ component }/>

                                </Provider>, MOUNT_NODE, () => {
                                    document.title = result.title || '';
                                    renderComplete("t")
                                    resolve();
                                });
                        } catch (err) {
                            console.log("err");
                            reject(err);
                        }
                    });
                }
            } catch (err) {
                console.log("err");
                console.error(err.stack); // eslint-disable-line no-console
                throw err;
            }
            console.log("err");
            console.error(error.stack); // eslint-disable-line no-console
            throw error;
        }
    }

    removeHistoryListener = history.listen(onLocationChange);
    history.replace(location);

    let originalScrollRestoration;
    if (window.history && 'scrollRestoration' in window.history) {
        originalScrollRestoration = window.history.scrollRestoration;
        window.history.scrollRestoration = 'manual';
    }


    // Prevent listeners collisions during history navigation
    addEventListener(window, 'pagehide', function onPageHide() {
        removeEventListener(window, 'pagehide', onPageHide);
        removeHistoryListener();
        if (originalScrollRestoration) {
            window.history.scrollRestoration = originalScrollRestoration;
            originalScrollRestoration = undefined;
        }
    });
}


if (__DEV__ && module.hot) {
    module.hot.accept(['./routes/index', './components/App/App'], async function () {
        let routes = require('./routes/index').default
        // Require the new version and render it instead

        let result = await match(routes, ctx);
        if (result && result.component) {
            component = React.createElement(result.component, result.props);
            let store = hotRehydrate(appstate)
            ReactDOM.render(
                <Provider context={ context }
                          appstate={ store }>
                    <AppContainer>
                        <App children={ component }/>
                    </AppContainer>
                </Provider>, document.getElementById('root'), () => {
                    document.title = result.title || '';
                    renderComplete("t")
                });
        }
    })
}
if ([
        'complete',
        'loaded',
        'interactive'
    ].includes(document.readyState) && document.body) {
    createApp.bind(null, history)
} else {

    document.addEventListener('DOMContentLoaded', createApp.bind(null, history), false);
}
