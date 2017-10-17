import {Item} from "../model/item";
import {ShoppingList} from "../model/shopping-list";
import {getRandomInt} from "../utils/random-generator";

export function getShoppingLists() {
    const shoppingLists = [];
    for (let i = 0; i < 10; i++) {
        let products = [];
        for (let j = 0; j< 5; j++) {
            products.push(new Item(`descSH${i}P${j}`, getRandomInt(1,10)));
        }
        shoppingLists.push(new ShoppingList(products));
    }

    return shoppingLists;
}

