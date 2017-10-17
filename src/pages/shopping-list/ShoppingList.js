import React, {Component} from 'react'

export class ShoppingListComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>Shopping list</div>
    }
}

// export default connect(state => ({...state}), {})(ShoppingListComponent);