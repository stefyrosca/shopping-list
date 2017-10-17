import React, {Component} from 'react'
import {connect} from "react-redux";
import {ShoppingListComponent} from "../shopping-list/ShoppingList";

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {dashboards: []};
    }

    render() {
        return <div>Dashboard
            <div>
                {this.props.shoppingList.items.map((shoppingList, index) => {
                    return <ShoppingListComponent key={index} shoppingList={shoppingList}/>
                })}
            </div>
        </div>
    }
}

export default connect(state => ({...state}), {})(DashboardComponent);