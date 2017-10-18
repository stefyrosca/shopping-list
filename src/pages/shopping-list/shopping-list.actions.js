export const ShoppingListActions = {
    FILTER_SHOPPING_LISTS: 'FILTER_SHOPPING_LISTS ',
    ADD_SHOPPING_LIST: 'ADD_SHOPPING_LIST'
};

export const filterShoppingLists = (title) => ({type: ShoppingListActions.FILTER_SHOPPING_LISTS, payload: title});
export const addShoppingList = (shoppingList) => ({type: ShoppingListActions.ADD_SHOPPING_LIST, payload: shoppingList});