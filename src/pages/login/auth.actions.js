export const AuthActions = {
    LOGIN:'LOGIN',
    LOGIN_SUCCEEDED: 'LOGIN_SUCCEEDED',
    REGISTER_SUCCEEDED: 'REGISTER_SUCCEEDED',
    LOGIN_FAILED: 'LOGIN_FAILED'
};

export const login = (username, password) => ({type: AuthActions.LOGIN, payload: {username, password}});
export const loginSucceeded = (response) => ({type: AuthActions.LOGIN_SUCCEEDED, payload: response});
export const registerSucceeded = () => ({type: AuthActions.REGISTER_SUCCEEDED});
