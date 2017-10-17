import React, {Component} from 'react'
import {connect} from "react-redux";
import {ShoppingListComponent} from "../shopping-list/ShoppingList";
import style from './style.css'

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {dashboards: []};
    }

    render() {
        return <div>Dashboard
            <div className='container'>
                {this.props.shoppingList.items.map((shoppingList, index) => {
                    return <div key={index} className={'col'}><ShoppingListComponent shoppingList={shoppingList}/></div>
                })}
            </div>
        </div>
    }
}

export default connect(state => ({...state}), {})(DashboardComponent);