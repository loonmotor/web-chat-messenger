import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './react/components/app';
import store from './react/redux/store';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

render((
    <Provider store={store}>
        <App socket={socket}/>
    </Provider>
), document.getElementById('app'));