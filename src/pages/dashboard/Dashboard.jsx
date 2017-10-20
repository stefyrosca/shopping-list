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
            filters: {
                title: '',
                status: availableStatusFilters.any.key,
                date: 'any',
                items: {newItem: '', selectedItems: []}
            },
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
                           onChange={(event) => this.updateFilters('title', event.target.value, () => this.filterItems(800))}/>
                </div>
                <div className={`${styles.input} ${styles.col}`}>
                    <label className={styles.label}>Status</label>
                    <select className={styles['input-field']} value={this.state.filters.status}
                            onChange={(event) => this.updateFilters('status', event.target.value, this.filterItems)}>
                        {Object.keys(availableStatusFilters).map(key => {
                            let filter = availableStatusFilters[key];
                            return <option key={key} value={filter.key}>{filter.value}</option>
                        })}
                    </select>
                </div>
                <div className={`${styles.input} ${styles.col}`}>
                    <label className={styles.label}>Item</label>
                    <input className={styles['input-field']} value={this.state.filters.items.newItem}
                           onChange={(event) => this.setState({
                               ...this.state,
                               filters: {
                                   ...this.state.filters,
                                   items: {
                                       newItem: event.target.value,
                                       selectedItems: this.state.filters.items.selectedItems
                                   }
                               }
                           })}
                           onKeyPress={(event) => event.charCode === 13 && this.addFilterItem(event.target.value)}/>
                </div>
                <div>
                    {this.state.filters.items.selectedItems.map((item, index) => {
                        return <span key={index} className={styles.badge}>
                            {item}
                            <span onClick={() => this.removeFilterItem(item)}
                                  className={`${styles.close}`}>&times;</span>
                        </span>
                    })}
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

    removeFilterItem(item) {
        let filteredItems = this.state.filters.items.selectedItems.filter(fItem => fItem !== item);
        this.updateFilters('items', {...this.state.filters.items, selectedItems: filteredItems}, this.filterItems);
    }

    addFilterItem(value) {
        let filterItems = {selectedItems: [...this.state.filters.items.selectedItems], newItem: ''};
        if (!this.state.filters.items.selectedItems.find(item => item === value)) {
            filterItems.selectedItems.push(value);
        }
        this.updateFilters('items', filterItems, this.filterItems);
    }

    updateFilters(key, value, callback) {
        this.setState({...this.state, filters: {...this.state.filters, [key]: value}}, callback);
    }

    filterItems(delay = 0) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.props.filterShoppingLists(this.state.filters), delay);
    }
}

export default connect(state => ({...state}), {
    filterShoppingLists,
    addShoppingList,
    editShoppingList,
    toggleItemCheck
})(DashboardComponent);