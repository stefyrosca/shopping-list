import React, {Component} from 'react'
import {connect} from "react-redux";
import styles from './style.css'
import {Item, ItemCategory} from "../../model/item";
import {ShoppingList} from "../../model/shopping-list";
import {addShoppingList} from "./shopping-list.actions";
import {PATHS} from "../index";
import {List, ListItem, MenuItem, RaisedButton, SelectField, TextField} from "material-ui";

class CreateShoppingListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {items: [], title: '', newItem: {description: '', quantity: 1, category: ItemCategory.other}};

        this.reset = this.reset.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    render() {
        return <div className={styles['list-group']}>
            <div><h3>Create new shopping list</h3></div>
            <TextField
                floatingLabelText={'Title'}
                value={this.state.title}
                onChange={(event) => this.setState({...this.state, title: event.target.value})}
                className={styles['input-text']}
            />
            <div>
                <List>
                    {Object.keys(this.state.items)
                        .map(category => this.state.items[category])
                        .map((items, index) => {
                            return <ListItem key={index} className={styles['list-group-item-info']}
                                             primaryText={items[0].category}
                                             primaryTogglesNestedList={true}
                                             initiallyOpen={true}
                                             disabled={true}
                                             nestedItems={items.map((item, index) => {
                                                 return <div className={styles.row} key={index}>
                                                     <div
                                                         className={`${styles['col-3']} ${styles['align-start']} `}>{item.name}</div>
                                                     <div className={styles['col']}>{item.quantity}</div>
                                                 </div>
                                             })}
                            >
                            </ListItem>
                        })}
                    {this.state.items.length === 0 &&
                    <ListItem className={styles['list-group-item-info']} primaryText={<span>No products added</span>}/>
                    }
                </List>
            </div>
            <div className={styles['align-start']}>
                <div className={styles.row}>
                    <div className={styles['col-2']}>
                        <TextField
                            floatingLabelText={'Description'}
                            value={this.state.newItem.description}
                            onChange={(event) => this.updateValue('description', event.target.value)}
                            className={styles['input-text']}
                        />
                    </div>
                    <div className={styles['col-2']}>
                        <TextField
                            floatingLabelText={'Quantity'}
                            value={this.state.newItem.quantity}
                            onChange={(event) => this.updateValue('quantity', event.target.value)}
                            className={styles['input-number']}
                        />
                    </div>
                    <div className={styles['col-2']}>
                        <SelectField
                            floatingLabelText={'Category'}
                            value={this.state.newItem.category}
                            onChange={(event, index, value) => this.updateValue('category', value)}
                            className={styles['input-field']}
                        >
                            {Object.keys(ItemCategory).map(key => {
                                return <MenuItem key={key} value={key} primaryText={ItemCategory[key]}/>
                            })}
                        </SelectField>
                    </div>
                </div>
            </div>
            <div>
                <RaisedButton style={{margin: '6px 12px'}} secondary={true} onClick={this.reset} label={'Reset'}/>
                <RaisedButton style={{margin: '6px 12px'}} secondary={true} onClick={this.addNewItem} label={'Add'}/>
                <RaisedButton style={{margin: '6px 12px'}} primary={true} onClick={this.onSave} label={'Save'}/>
            </div>
        </div>
    }

    reset() {
        this.setState({...this.state, items: [], title: ''});
    }

    updateValue(key, value) {
        let newItem = {...this.state.newItem, [key]: value};
        this.setState({...this.state, newItem});
    }


    addNewItem() {
        let item = new Item(this.state.newItem.description, this.state.newItem.quantity, this.state.newItem.category);
        let categoryItems = this.state.items[item.category] ? [...this.state.items[item.category], item] : [item];
        this.setState({
            ...this.state,
            items: {...this.state.items, [item.category]: categoryItems},
            newItem: {quantity: 1, description: '', category: ItemCategory.other}
        });
    }

    onSave() {
        let shoppingList = new ShoppingList(this.state.title, this.state.items);
        this.props.addShoppingList(shoppingList);
        this.props.history.push(PATHS.DASHBOARD);
    }
}

export default connect((state) => state, {addShoppingList})(CreateShoppingListComponent)