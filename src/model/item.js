import {nextId} from "../utils/id-generator";
import {getRandomInt} from "../utils/random-generator";

export const ItemCategory = {
        meat: 'meat',
        eggs_and_dairy: 'eggs and dairy',
        fruits: 'fruits',
        vegetables: 'vegetables',
        beverages: 'beverages',
        bakery: 'bakery',
        frozen: 'frozen',
        spices: 'spices',
        snacks: 'snacks',
        cleaning: 'cleaning',
        bath: 'bath',
        body_care: 'body care',
        other: 'other'
    };

export class Item {
    id;
    name;
    quantity;
    checked;
    category;

    constructor(name, quantity, category = 'other') {
        this.name = name;
        this.quantity = quantity;
        this.id = nextId();
        // for mock
        this.checked = getRandomInt(1, 2) % 2 === 0;
        // this.checked = false;
        if (this.validateCategory(category))
            this.category = category;
        else
            throw new Error('Category not valid!')
    }

    validateCategory(category) {
        return Object.keys(ItemCategory).find(key => ItemCategory[key] === category) !== undefined;
    }
}