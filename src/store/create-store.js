import {getReducers} from "./reducers";
import {createStore} from "redux";

export function createInitialStore() {
    const reducers = getReducers();
    return createStore(reducers);
}