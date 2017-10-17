import {nextId} from "../utils/id-generator";

export class Item {
    id;
    name;
    quantity;
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
        this.id = nextId();
    }
}