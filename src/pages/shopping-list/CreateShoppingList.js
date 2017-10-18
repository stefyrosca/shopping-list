import React, {Component} from 'react'
import {connect} from "react-redux";
import styles from './style.css'
import {Item} from "../../model/item";
import {ShoppingList} from "../../model/shopping-list";
import {addShoppingList} from "./shopping-list.actions";
import {PATHS} from "../index";

class CreateShoppingListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {items: [], title: '', newItem: {description: '', quantity: 1}};

        this.reset = this.reset.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    render() {
        return <div className={styles['list-group']}>
            <div><h3>Create new shopping list</h3></div>
            <div>
                <label className={styles.label}>Title</label>
                <input className={styles['input-text']}
                       value={this.state.title}
                       onChange={(event) => this.setState({...this.state, title: event.target.value})}/>
            </div>
            <div>
                <ul>
                    {this.state.items.map((item, index) => {
                        return <li key={index} className={styles['list-group-item-info']}>
                            <div className={styles.row}>
                                <div className={`${styles['col-3']} ${styles['align-start']} `}>{item.name}</div>
                                <div className={styles['col']}>{item.quantity}</div>
                            </div>
                        </li>
                    })}
                    {this.state.items.length === 0 &&
                    <li className={styles['list-group-item-info']}>
                        <span>No products added</span>
                    </li>
                    }
                </ul>
            </div>
            <div className={styles['align-start']}>
                <div className={styles.row}>
                    <div className={styles['col-3']}>
                        <span className={styles.label}>Description</span>
                        <input className={styles['input-text']}
                               value={this.state.newItem.description}
                               onChange={(event) => this.updateValue('description', event.target.value)}/>
                    </div>
                    <div className={styles['col']}>
                        <span className={styles.label}>Quantity</span>
                        <input className={styles['input-number']}
                               type={"number"} value={this.state.newItem.quantity}
                               onChange={(event) => this.updateValue('quantity', event.target.value)}/>
                    </div>
                </div>
            </div>
            <div>
                <button className={styles['btn-primary-left']} onClick={this.reset}>
                    Reset
                </button>
                <button className={styles['btn-primary-right']} onClick={this.addNewItem}>
                    Add
                </button>
                <button className={styles['btn-primary-right']} onClick={this.onSave}>
                    Save
                </button>
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
        let item = new Item(this.state.newItem.description, this.state.newItem.quantity);
        this.setState({...this.state, items: [...this.state.items, item], newItem: {quantity: 1, description: ''}});
    }

    onSave() {
        let shoppingList = new ShoppingList(this.state.title, this.state.items);
        this.props.addShoppingList(shoppingList);
        this.props.history.push(PATHS.DASHBOARD);
    }
}

export default connect((state) => state, {addShoppingList})(CreateShoppingListComponent)