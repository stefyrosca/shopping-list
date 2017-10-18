import {nextId} from "../utils/id-generator";

export class ShoppingList {
    id;
    timestamp;
    items;
    title;
    checked;

    constructor(title, items) {
        this.title = title;
        this.timestamp = new Date();
        this.items = items;
        this.id = nextId();
        // while using mocks
        this.checked = this.items.filter(item => !item.checked).length === 0;
        // this.checked = false;
    }
}