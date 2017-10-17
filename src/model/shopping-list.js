import {nextId} from "../utils/id-generator";

export class ShoppingList {
    id;
    timestamp;
    items;

    constructor(items) {
        this.timestamp = new Date();
        this.items = items;
        this.id = nextId();
    }
}