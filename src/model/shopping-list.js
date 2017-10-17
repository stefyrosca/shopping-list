import {nextId} from "../utils/id-generator";

export class ShoppingList {
    id;
    timestamp;
    items;
    title;

    constructor(title, items) {
        this.title = title;
        this.timestamp = new Date();
        this.items = items;
        this.id = nextId();
    }
}