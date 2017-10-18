import {Item} from "../model/item";
import {ShoppingList} from "../model/shopping-list";
import {getRandomInt} from "../utils/random-generator";

function mockProducts() {
    return ['eggs', 'tomatoes', 'potatoes', 'milk', 'sugar', 'spices', 'water', 'coffee', 'tea', 'cola', 'orange juice',
        'oranges', 'apples', 'chicken', 'beef', 'pork', 'lamb', 'grapes', 'wine', 'olive oil'];
}


export function getShoppingLists() {
    const shoppingLists = [];
    const mockProductsList = mockProducts();
    for (let i = 0; i < 23; i++) {
        let products = [];
        for (let j = 0; j < getRandomInt(1, 15); j++) {
            let descIndex = getRandomInt(0, mockProductsList.length-1);
            products.push(new Item(mockProductsList[descIndex], getRandomInt(1, 10)));
        }
        shoppingLists.push(new ShoppingList(`title${i}`, products));
    }

    return shoppingLists;
}

