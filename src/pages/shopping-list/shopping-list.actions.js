export const ShoppingListActions = {
    FILTER_SHOPPING_LISTS: 'FILTER_SHOPPING_LISTS ',
    ADD_SHOPPING_LIST: 'ADD_SHOPPING_LIST',
    EDIT_SHOPPING_LIST: 'EDIT_SHOPPING_LIST',
    TOGGLE_ITEM_CHECK: 'TOGGLE_ITEM_CHECK'
};

export const filterShoppingLists = (filters) => ({type: ShoppingListActions.FILTER_SHOPPING_LISTS, payload: filters});
export const addShoppingList = (shoppingList) => ({type: ShoppingListActions.ADD_SHOPPING_LIST, payload: shoppingList});
export const editShoppingList = (shoppingList) => ({
    type: ShoppingListActions.EDIT_SHOPPING_LIST,
    payload: shoppingList
});
export const toggleItemCheck = (shoppingListId, itemId, category, checked) => ({
    type: ShoppingListActions.TOGGLE_ITEM_CHECK,
    payload: {shoppingListId, itemId, category, checked}
});