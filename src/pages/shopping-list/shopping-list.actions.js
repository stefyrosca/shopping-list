export const ShoppingListActions = {
    FILTER_SHOPPING_LISTS: 'FILTER_SHOPPING_LISTS '
};

export const filterShoppingLists = (title) => {
    return {type: ShoppingListActions.FILTER_SHOPPING_LISTS, payload: title}
};