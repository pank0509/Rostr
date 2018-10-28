import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './Redux/create';
import { HashRouter } from 'react-router-dom';
import ApiClient from './helper/ApiClient';
import { Provider } from 'react-redux'
import './index.css';
import Routes from './Routes';
const client = new ApiClient();

const url = '/';
const store = createStore(url, client, window.__data);

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <Routes />
        </Provider>
    </HashRouter>,
    document.getElementById('root')
);
