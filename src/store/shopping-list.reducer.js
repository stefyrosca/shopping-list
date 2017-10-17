import {getShoppingLists} from "../mocks/shopping-list.mock";

const actionHandler = {};

const FILTER_SHOPPING_LISTS = 'FILTER_SHOPPING_LISTS ';
export const filter = (title) => {
    return {type: FILTER_SHOPPING_LISTS, payload: title}
};
actionHandler[FILTER_SHOPPING_LISTS] = (state, action) => {
  const filteredItems = state.items.filter(item => item.title.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1);
  return {...state, filteredItems};
};

const initialState = () => {
    const initialItems = getShoppingLists();
    return {
        items: initialItems,
        filteredItems: initialItems
    }
};

export function shoppingListReducer (state = initialState(), action) {
    let handler = actionHandler[action.type];
    return handler ?  handler(state, action) : state;
}