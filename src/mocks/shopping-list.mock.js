import {Item, ItemCategory} from "../model/item";
import {ShoppingList} from "../model/shopping-list";
import {getRandomInt} from "../utils/random-generator";

function mockProducts() {
    return [{name: 'eggs', category: ItemCategory.eggs_and_dairy},
        {name: 'tomatoes', category: ItemCategory.vegetables},
        {name: 'potatoes', category: ItemCategory.vegetables},
        {name: 'milk', category: ItemCategory.eggs_and_dairy},
        {name: 'sugar', category: ItemCategory.other},
        {name: 'pepper', category: ItemCategory.spices},
        {name: 'salt', category: ItemCategory.spices},
        {name: 'basil', category: ItemCategory.spices},
        {name: 'water', category: ItemCategory.beverages},
        {name: 'coffee', category: ItemCategory.beverages},
        {name: 'tea', category: ItemCategory.beverages},
        {name: 'cola', category: ItemCategory.beverages},
        {name: 'orange juice', category: ItemCategory.beverages},
        {name: 'oranges', category: ItemCategory.fruits},
        {name: 'apples', category: ItemCategory.fruits},
        {name: 'chicken', category: ItemCategory.meat},
        {name: 'beef', category: ItemCategory.meat},
        {name: 'pork', category: ItemCategory.meat},
        {name: 'lamb', category: ItemCategory.meat},
        {name: 'grapes', category: ItemCategory.fruits},
        {name: 'wine', category: ItemCategory.beverages},
        {name: 'olive oil', category: ItemCategory.spices}
    ];
}

export function getShoppingLists() {
    const shoppingLists = [];
    const mockProductsList = mockProducts();
    for (let i = 0; i < 23; i++) {
        let products = {};
        for (let j = 0; j < getRandomInt(1, 15); j++) {
            let product = mockProductsList[getRandomInt(0, mockProductsList.length - 1)];
            if (!products[product.category])
                products[product.category] = [];
            products[product.category].push(new Item(product.name, getRandomInt(1, 10), product.category));
        }
        shoppingLists.push(new ShoppingList(`title${i}`, products));
    }

    return shoppingLists;
}
