import {AuthActions} from "./auth.actions";
import {PATHS} from "../index";

const actionHandler = {};

actionHandler[AuthActions.LOGIN] = (state, action) => {
    if (localStorage.getItem('TOKEN'))
        this.props.history.replace(PATHS.DASHBOARD);
    return state;
};

actionHandler[AuthActions.LOGIN_SUCCEEDED] = (state, action) => {
    localStorage.setItem('TOKEN', JSON.stringify(action.payload));
    return {...state, isLoggedIn: true};
};

const initialState = {
    isLoggedIn: localStorage.getItem('TOKEN') !== null
};

export default (state = initialState, action) => {
    const handler = actionHandler[action.type];
    return handler ? handler(state, action) : state;
}