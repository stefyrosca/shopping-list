import React, { Component } from 'react'
import { connect } from "react-redux";
import { ShoppingListComponent } from "../shopping-list/ShoppingList";
import styles from './style.css'
import {
    addShoppingList,
    editShoppingList,
    filterShoppingLists,
    toggleItemCheck
} from "../shopping-list/shopping-list.actions";
import { PATHS } from "../index";
import { FilterShoppingListsComponent } from "../../components/FilterShoppingLists";

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: { field: 'none', order: 'asc' }
        };
    }

    render() {
        return <div>
            <FilterShoppingListsComponent filterShoppingLists={this.props.filterShoppingLists} />
            <div className={styles.row}>
                <div className={styles.col}>
                    <button className={styles['btn-primary']}
                        onClick={() => this.props.history.push(PATHS.CREATE_LIST)}> Add new shopping list
                    </button>
                </div>
            </div>
            <div className={styles['wrapper-4']}>
                {this.props.shoppingList.filteredItems.map((id, index) => {
                    return <div key={index}>
                        <ShoppingListComponent
                            onClick={() => this.props.history.push(PATHS.VIEW_LIST.replace(':id', id))}
                            className={`${styles.col} ${styles.click}`}
                            shoppingList={this.props.shoppingList.items[id]}
                        />
                    </div>
                })}
            </div>
        </div>
    }

}

export default connect(state => ({ ...state }), {
    filterShoppingLists,
    addShoppingList,
    editShoppingList,
    toggleItemCheck
})(DashboardComponent);