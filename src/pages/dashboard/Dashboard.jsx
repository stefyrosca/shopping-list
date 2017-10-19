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
            filters: {description: ''}
        };
        this.filterItems = this.filterItems.bind(this);
    }

    render() {
        return <div>
            <div>
                <div className={styles.input}>
                    <label className={styles.label}>Filter shopping lists</label>
                    <input className={styles['input-field']} value={this.state.filters.description}
                           onChange={this.filterItems}/>
                </div>
            </div>
            <div>
                <div className={styles.input}>
                    <button className={styles['btn-primary']}
                            onClick={() => this.props.history.push(PATHS.CREATE_LIST)}> Add new shopping list
                    </button>
                </div>

            </div>
            <div className={styles['wrapper-4']}>
                {this.props.shoppingList.filteredItems.map((id, index) => {
                    return <div key={index} >
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

    filterItems(event) {
        clearTimeout(this.timeout);
        this.setState({...this.state, filters: {...this.state.filter, description: event.target.value}}, () => {
            this.timeout = setTimeout(() => this.props.filterShoppingLists(this.state.filters.description), 800);
        })
    }
}

export default connect(state => ({...state}), {
    filterShoppingLists,
    addShoppingList,
    editShoppingList,
    toggleItemCheck
})(DashboardComponent);