import {getReducers} from "./reducers";
import {createStore, applyMiddleware} from "redux";
import {routerMiddleware} from 'react-router-redux'


export function createInitialStore(history) {
    const middleware = routerMiddleware(history);
    const reducers = getReducers();
    return createStore(
        reducers,
        applyMiddleware(middleware)
    )
}