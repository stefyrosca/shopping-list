import React, {Component} from 'react'

export class ShoppingListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {items: []};
        console.log(this.props.shoppingList)
    }

    render() {
        return <div>Shopping list
            {this.props.shoppingList.items.map(item => {
                return <div><span><strong>{item.name}</strong></span> {item.quantity}</div>
            })}
            <hr/>
        </div>
    }
}

// export default connect(state => ({...state}), {})(ShoppingListComponent);