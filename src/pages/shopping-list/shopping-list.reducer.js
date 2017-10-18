import {getShoppingLists} from "../../mocks/shopping-list.mock";
import {ShoppingListActions} from "./shopping-list.actions";

const actionHandler = {};

actionHandler[ShoppingListActions.FILTER_SHOPPING_LISTS] = (state, action) => {
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