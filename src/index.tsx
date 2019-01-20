import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import {
    createStore,
    compose,
    applyMiddleware,
    Middleware,
    Action,
} from "redux";
import * as serviceWorker from './serviceWorker';

import * as Type from "./types";
import { reducers } from "./state";
import { Layout } from "./containers/layout";
import * as selectors from "./checkState.config"; // import of all selectors which we will test
import './index.css';

type EnhancedWindow = Window & { // expend base window type (only for strict typescript implementation)
    __checkStoreExtension__: (options: Object) => Middleware;
};

const checkStateMiddleware = (options = {}): Middleware<Type.State, Action> => {
    return window && (window as EnhancedWindow)["__checkStoreExtension__"] ?
        (window as EnhancedWindow)["__checkStoreExtension__"](options) :
        store => next => action => next(action);
};

// Code example for JS implementation (without types)
// const checkStateMiddleware = (options = {}) => {
//     return window && window["__checkStoreExtension__"] ? window["__checkStoreExtension__"](options) :
//         store => next => action => next(action);
// };

const store = createStore(
    reducers,
    compose(applyMiddleware(
        checkStateMiddleware(selectors), // you can add other middlewares here (thunk for example)
    )),
);

ReactDOM.render(
    <Provider store={store}>
        <Layout />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
