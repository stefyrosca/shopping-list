import {getReducers} from "./reducers";
import {createStore, applyMiddleware, compose} from "redux";
import {routerMiddleware} from 'react-router-redux'
import logger from 'redux-logger'


export function createInitialStore(history) {
    const middlewares = [routerMiddleware(history)];
    const reducers = getReducers();
    if (process.env.NODE_ENV === 'development')
        middlewares.push(logger);
    return createStore(
        reducers,
        compose(applyMiddleware(...middlewares))
    )
}