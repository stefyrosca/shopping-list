import React, {Component} from 'react'
import styles from './style.css'
import {availableStatusFilters} from "../model/shopping-list";
import {Chip, Drawer, MenuItem, RaisedButton, SelectField, TextField} from "material-ui";
import {blueGrey50, blueGrey800} from "material-ui/styles/colors";

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
        let inputStyle = {
            padding: '0.2em 0.25em',
            fontSize: '1.1em',
            color: blueGrey800,
            backgroundColor: blueGrey50
        };
        return <div ref={(event) => this.container = event}>
            {!this.state.open && <div className={styles['toggle-button']}>
                <RaisedButton
                    onClick={() => {
                        this.setState({...this.state, open: !this.state.open})
                    }}
                    label={'Show filters'}
                    secondary={true}
                />
            </div>
            }
            <Drawer open={this.state.open} className={styles['filter-container']}>
                <div><h4>Filter by:</h4></div>
                <TextField
                    floatingLabelText={'Title'}
                    value={this.state.title}
                    onChange={(event) => this.updateFilters('title', event.target.value, () => this.filterItems(800))}
                    style={inputStyle}
                />
                <SelectField
                    floatingLabelText={'Status'}
                    value={this.state.status}
                    onChange={(event, index, value) => this.updateFilters('status', value, () => this.filterItems(0))}
                    style={inputStyle}
                >
                    {Object.keys(availableStatusFilters).map(key => {
                        let filter = availableStatusFilters[key];
                        return <MenuItem key={key} value={filter.key} primaryText={filter.value}/>
                    })}
                </SelectField>
                <TextField
                    floatingLabelText={'Item'}
                    value={this.state.items.newItem}
                    onChange={(event) => this.setState({
                        ...this.state,
                        items: {
                            newItem: event.target.value,
                            selectedItems: this.state.items.selectedItems
                        }
                    })}
                    style={inputStyle}
                    onKeyPress={(event) => event.charCode === 13 && this.addFilterItem(event.target.value)}
                />
                <div>
                    {this.state.items.selectedItems.map((item, index) => {
                        return <span key={index}>
                            <Chip
                                onRequestDelete={() => this.removeFilterItem(item)}
                            >
                            {item}
                            </Chip>
                        </span>
                    })}
                </div>
            </Drawer>
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