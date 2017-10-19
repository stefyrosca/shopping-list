import React, {Component} from 'react'
import {connect} from "react-redux";
import {ShoppingListComponent} from "../shopping-list/ShoppingList";
import styles from './style.css'
import {
    addShoppingList, editShoppingList, filterShoppingLists,
    toggleItemCheck
} from "../shopping-list/shopping-list.actions";
import {PATHS} from "../index";
import {availableStatusFilters} from "../../model/shopping-list";

class DashboardComponent extends Component {
    timeout;

    constructor(props) {
        super(props);
        this.state = {
            filters: {title: '', status: availableStatusFilters.any.key, date: 'any'},
            sort: {field: 'none', order: 'asc'}
        };
        this.filterItems = this.filterItems.bind(this);
    }

    render() {
        return <div>
            <div className={styles.row}>
                <div className={`${styles.input} ${styles.col}`}>
                    <label className={styles.label}>Title</label>
                    <input className={styles['input-field']} value={this.state.filters.title}
                           onChange={(event) => this.filterItems('title', event.target.value, 800)}/>
                </div>
                <div className={`${styles.input} ${styles.col}`}>
                    <label className={styles.label}>Status</label>
                    <select className={styles['input-field']} value={this.state.filters.status}
                            onChange={(event) => this.filterItems('status', event.target.value)}>
                        {Object.keys(availableStatusFilters).map(key => {
                            let filter = availableStatusFilters[key];
                            return <option key={key} value={filter.key}>{filter.value}</option>
                        })}
                    </select>
                </div>
                <div className={styles.input}>
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

    filterItems(key, value, delay = 0) {
        clearTimeout(this.timeout);
        this.setState({...this.state, filters: {...this.state.filters, [key]: value}}, () => {
            this.timeout = setTimeout(() => this.props.filterShoppingLists(this.state.filters), delay);
        })
    }
}

export default connect(state => ({...state}), {
    filterShoppingLists,
    addShoppingList,
    editShoppingList,
    toggleItemCheck
})(DashboardComponent);