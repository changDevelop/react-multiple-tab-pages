import  "babel-polyfill";
import 'url-search-params-polyfill';
import React from 'react'
import { render } from 'react-dom'
import './config/globalConfig'
import store from './redux';
import {Provider} from 'react-redux';
import RouterPage from './routerPage'
render(
    <Provider store={store}>
        <RouterPage />
    </Provider>,document.getElementById('root')
)
