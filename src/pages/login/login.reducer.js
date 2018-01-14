const actionHandler = {};

export default (state = {}, action) => {
    const handler = actionHandler[action.type];
    return handler ? handler(state, action) : state;
}