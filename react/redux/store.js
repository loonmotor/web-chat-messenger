import {createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import * as reducers from './reducer';
import {webSocket, chatMessageScroll} from './middleware';

const
    reducer = combineReducers({...reducers})
    , middleware = applyMiddleware(logger(), webSocket, chatMessageScroll, thunk, promise());

export default createStore(reducer, middleware);