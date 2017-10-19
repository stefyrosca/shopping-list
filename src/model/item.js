import {nextId} from "../utils/id-generator";
import {getRandomInt} from "../utils/random-generator";

export class Item {
    id;
    name;
    quantity;
    checked;

    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
        this.id = nextId();
        // for mock
        this.checked = getRandomInt(1,2) % 2 === 0;
        // this.checked = false;
    }
}