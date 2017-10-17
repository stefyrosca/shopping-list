import {getShoppingLists} from "../mocks/shopping-list.mock";

const actionHandler = {};

const initialState = {
    items: getShoppingLists()
};

export function shoppingListReducer (state = initialState, action) {
    let handler = actionHandler[action.type];
    return handler ?  handler(state, action) : state;
}