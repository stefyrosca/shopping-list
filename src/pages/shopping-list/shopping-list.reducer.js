import {getShoppingLists} from "../../mocks/shopping-list.mock";
import {ShoppingListActions} from "./shopping-list.actions";
import {availableStatusFilters} from "../../model/shopping-list";

const actionHandler = {};

actionHandler[ShoppingListActions.FILTER_SHOPPING_LISTS] = (state, action) => {
    const filteredItems = Object.keys(state.items).filter(id => {
        let list = state.items[id];
        let matching = list.title.toLowerCase().indexOf(action.payload.description.toLowerCase()) !== -1;
        switch (action.payload.status) {
            case availableStatusFilters.completed.key:
                matching = matching && list.checked;
                break;
            case availableStatusFilters.uncompleted.key:
                matching = matching && !list.checked;
                break;
            case availableStatusFilters.any.key:
            default:
                break;
        }
        return matching;
    });
    return {...state, filteredItems};
};
actionHandler[ShoppingListActions.ADD_SHOPPING_LIST] = (state, action) => {
    const items = {...state.items, [action.payload.id]: action.payload};
    const filteredItems = [...state.filteredItems, action.payload.id];
    return {...state, items, filteredItems};
};
actionHandler[ShoppingListActions.EDIT_SHOPPING_LIST] = (state, action) => {
    let checked = action.payload.items.find(item => !item.checked) === undefined;
    const items = {...state.items, [action.payload.id]: {...action.payload, checked, timestamp: new Date()}};
    return {...state, items};
};
actionHandler[ShoppingListActions.TOGGLE_ITEM_CHECK] = (state, action) => {
    let {shoppingListId, itemId, checked} = action.payload;
    let shoppingList = {...state.items[shoppingListId]};
    let done = checked;
    shoppingList.items = shoppingList.items.map(item => {
        if (item.id === itemId)
            return {...item, checked};
        if (item.checked === false) {
            done = false;
        }
        return item;
    });
    shoppingList.checked = done;
    const items = {...state.items, [shoppingListId]: shoppingList};
    return {...state, items};
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

export function shoppingListReducer(state = initialState(), action) {
    let handler = actionHandler[action.type];
    return handler ? handler(state, action) : state;
}