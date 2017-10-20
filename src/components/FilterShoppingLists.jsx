import React, {Component} from 'react'
import styles from './style.css'
import {availableStatusFilters} from "../model/shopping-list";

export class FilterShoppingListsComponent extends Component {
    timeout;
    container;

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: '',
            status: availableStatusFilters.any.key,
            date: 'any',
            items: {newItem: '', selectedItems: []}
        };
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return <div ref={(event) => this.container = event}>
            {!this.state.open && <div className={styles['toggle-button']}>
                Show filters
                <button onClick={() => {
                    this.setState({...this.state, open: !this.state.open})
                }}><span>&rArr;</span></button>
                </div>
            }
            <div data-open={this.state.open} className={styles['filter-container']}>
                <div className={`${styles.input} ${styles.col}`}>
                    <label className={styles.label}>Title</label>
                    <input className={styles['input-field']} value={this.state.title}
                           onChange={(event) => this.updateFilters('title', event.target.value, () => this.filterItems(800))}/>
                </div>
                <div className={`${styles.input} ${styles.col}`}>
                    <label className={styles.label}>Status</label>
                    <select className={styles['input-field']} value={this.state.status}
                            onChange={(event) => this.updateFilters('status', event.target.value, this.filterItems)}>
                        {Object.keys(availableStatusFilters).map(key => {
                            let filter = availableStatusFilters[key];
                            return <option key={key} value={filter.key}>{filter.value}</option>
                        })}
                    </select>
                </div>
                <div className={`${styles.input} ${styles.col}`}>
                    <label className={styles.label}>Item</label>
                    <input className={styles['input-field']} value={this.state.items.newItem}
                           onChange={(event) => this.setState({
                               ...this.state,
                               items: {
                                   newItem: event.target.value,
                                   selectedItems: this.state.items.selectedItems
                               }
                           })}
                           onKeyPress={(event) => event.charCode === 13 && this.addFilterItem(event.target.value)}/>
                </div>
                <div>
                    {this.state.items.selectedItems.map((item, index) => {
                        return <span key={index} className={styles.badge}>
                            {item}
                            <span onClick={() => this.removeFilterItem(item)}
                                  className={`${styles.close}`}>&times;</span>
                        </span>
                    })}
                </div>
            </div>
        </div>
    }

    handleClick(event) {
        if (!this.container.contains(event.target) && this.state.open)
            this.setState({...this.state, open: false});
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, true);
    }

    removeFilterItem(item) {
        let filteredItems = this.state.items.selectedItems.filter(fItem => fItem !== item);
        this.updateFilters('items', {...this.state.items, selectedItems: filteredItems}, this.filterItems);
    }

    addFilterItem(value) {
        let filterItems = {selectedItems: [...this.state.items.selectedItems], newItem: ''};
        if (!this.state.items.selectedItems.find(item => item === value)) {
            filterItems.selectedItems.push(value);
        }
        this.updateFilters('items', filterItems, this.filterItems);
    }

    updateFilters(key, value, callback) {
        this.setState({...this.state, [key]: value}, callback);
    }

    filterItems(delay = 0) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.props.filterShoppingLists(this.state), delay);
    }
}