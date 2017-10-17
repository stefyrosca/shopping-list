import React, {Component} from 'react'

export class ShoppingListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    render() {
        return <div>
            {this.props.shoppingList.items.map((item, index) => {
                return <div key={index}><span><strong>{item.name}</strong></span> {item.quantity}</div>
            })}
            <hr/>
        </div>
    }
}

// export default connect(state => ({...state}), {})(ShoppingListComponent);