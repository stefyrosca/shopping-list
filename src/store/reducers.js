import {shoppingListReducer} from "../pages/shopping-list/shopping-list.reducer";
import authReducer from "../pages/login/login.reducer";
import {combineReducers} from "redux";

export function getReducers() {
    return combineReducers({shoppingList: shoppingListReducer, auth: authReducer})
}
