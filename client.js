import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './react/components/app';
import store from './react/redux/store';

render((
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById('app'));