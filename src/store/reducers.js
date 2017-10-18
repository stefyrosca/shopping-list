import {shoppingListReducer} from "../pages/shopping-list/shopping-list.reducer";
import {combineReducers} from "redux";

export function getReducers() {
    return combineReducers({shoppingList: shoppingListReducer})
}
