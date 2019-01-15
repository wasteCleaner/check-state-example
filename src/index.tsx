import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore } from "redux";
import * as serviceWorker from './serviceWorker';

import { reducers } from "./state";
import { Layout } from "./containers/layout";
import './index.css';

const store = createStore(
    reducers,
);

ReactDOM.render(
    <Provider store={store}>
        <Layout />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
