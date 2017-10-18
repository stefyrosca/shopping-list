import React, {Component} from 'react'
import {connect} from "react-redux";
import {ShoppingListComponent} from "../shopping-list/ShoppingList";
import styles from './style.css'
import {filterShoppingLists} from "../shopping-list/shopping-list.actions";

class DashboardComponent extends Component {
    timeout;
    constructor(props) {
        super(props);
        this.state = {
            filterValue: ''
        };
        this.filterItems = this.filterItems.bind(this);
    }

    render() {
        return <div>
            <div className={styles.input}>
                <label>Filter shopping lists</label>
                <input className={styles['input-field']} value={this.state.filterValue} onChange={this.filterItems}/>
            </div>
            <div className={styles.container}>
                {this.props.shoppingList.filteredItems.map((shoppingList, index) => {
                    return <div key={index} className={styles.col}><ShoppingListComponent shoppingList={shoppingList}/></div>
                })}
            </div>
        </div>
    }

    filterItems(event) {
        this.setState({...this.state, filterValue: event.target.value}, ()=> {
            clearTimeout(this.timeout);
            setTimeout(()=>this.props.filterShoppingLists(this.state.filterValue), 800);
        })
    }

}

export default connect(state => ({...state}), {filterShoppingLists})(DashboardComponent);