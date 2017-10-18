import React, {Component} from 'react'
import {connect} from "react-redux";
import {ShoppingListComponent} from "../shopping-list/ShoppingList";
import styles from './style.css'
import {
    addShoppingList, editShoppingList, filterShoppingLists,
    toggleItemCheck
} from "../shopping-list/shopping-list.actions";
import {PATHS} from "../index";

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
            <div>
                <div className={styles.input}>
                    <label className={styles.label}>Filter shopping lists</label>
                    <input className={styles['input-field']} value={this.state.filterValue}
                           onChange={this.filterItems}/>
                </div>
                <div className={styles.input}>
                    <button className={styles['btn-primary']}
                            onClick={() => this.props.history.push(PATHS.CREATE_LIST)}> Add new shopping list
                    </button>
                </div>
            </div>
            <div className={styles['wrapper-4']}>
                {this.props.shoppingList.filteredItems.map((id, index) => {
                    return <div key={index} className={styles.col}>
                        <ShoppingListComponent
                            shoppingList={this.props.shoppingList.items[id]}
                            onCheckItem={this.props.toggleItemCheck}
                        />
                    </div>
                })}
            </div>
        </div>
    }

    filterItems(event) {
        clearTimeout(this.timeout);
        this.setState({...this.state, filterValue: event.target.value}, () => {
            this.timeout = setTimeout(() => this.props.filterShoppingLists(this.state.filterValue), 800);
        })
    }

}

export default connect(state => ({...state}), {
    filterShoppingLists,
    addShoppingList,
    editShoppingList,
    toggleItemCheck
})(DashboardComponent);