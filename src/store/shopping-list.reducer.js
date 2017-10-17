const actionHandler = {};

const initialState = {
    items: []
};

export function shoppingListReducer (state = initialState, action) {
    let handler = actionHandler[action.type];
    return handler ?  handler(state, action) : state;
}