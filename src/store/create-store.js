import {getReducers} from "./reducers";
import {createStore, applyMiddleware, compose} from "redux";
import {routerMiddleware} from 'react-router-redux'
import logger from 'redux-logger'
import reduxThunk from 'redux-thunk'


export function createInitialStore(history) {
    const middlewares = [routerMiddleware(history), reduxThunk];
    const reducers = getReducers();
    if (process.env.NODE_ENV === 'development')
        middlewares.push(logger);
    return createStore(
        reducers,
        compose(applyMiddleware(...middlewares))
    )
}