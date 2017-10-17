import {shoppingListReducer} from "./shopping-list.reducer";
import {combineReducers} from "redux";

export function getReducers() {
    return combineReducers({shoppingList: shoppingListReducer})
}
