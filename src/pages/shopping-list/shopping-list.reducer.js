import {getShoppingLists} from "../../mocks/shopping-list.mock";
import {ShoppingListActions} from "./shopping-list.actions";

const actionHandler = {};

actionHandler[ShoppingListActions.FILTER_SHOPPING_LISTS] = (state, action) => {
  const filteredItems = Object.keys(state.items).filter(id => state.items[id].title.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1);
  return {...state, filteredItems};
};
actionHandler[ShoppingListActions.ADD_SHOPPING_LIST] = (state, action) => {
  const items = {...state.items, [action.payload.id]: action.payload};
  const filteredItems = [...state.filteredItems, action.payload.id];
  return {...state, items, filteredItems};
};

const initialState = () => {
    const initialItemsList = getShoppingLists();
    const filteredItems = [];
    const initialItems = {};
    initialItemsList.forEach(item => {
        initialItems[item.id] = item;
        filteredItems.push(item.id);
    })
    return {
        items: initialItems,
        filteredItems: filteredItems
    }
};

export function shoppingListReducer (state = initialState(), action) {
    let handler = actionHandler[action.type];
    return handler ?  handler(state, action) : state;
}