import React, {Component} from 'react'
import styles from '../shopping-list/style.css'
import localStyles from './style.css'
import {formatDate} from "../../utils/format-date";
import {editShoppingList, toggleItemCheck} from "../shopping-list/shopping-list.actions";
import {connect} from "react-redux";
import {PATHS} from "../index";
import {Link} from 'react-router-dom'
import {Item} from "../../model/item";

class EditShoppingListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editView: false,
            shoppingList: this.props.shoppingList.items[this.props.match.params.id],
            newItem: {description: '', quantity: 1}
        };
        this.reset = this.reset.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.onSave = this.onSave.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    render() {
        let shoppingList = this.state.editView ? this.state.shoppingList : this.props.shoppingList.items[this.props.match.params.id];
        if (!shoppingList)
            return <div>
                <h3>No such element!</h3>
                <Link to={PATHS.HOME}>Go home</Link>
            </div>;
        return <div className={localStyles.wrapper}>
            <div className={styles.panel} data-checked={shoppingList.checked}>
                <div className={styles['panel-heading']}>
                    <h3 className={styles['panel-title']}>{shoppingList.title}</h3>
                </div>
                <div className={styles["panel-body"]}>
                    {shoppingList.items.map((item, index) => {
                        return <div key={index} className={styles.row}>
                            <div className={styles.col}>
                                <input
                                    onChange={(event) => this.toggleItemCheck(shoppingList.id, item.id, event.target.checked)}
                                    checked={item.checked} type={"checkbox"}/>
                            </div>
                            <div className={`${styles['col-3']} ${styles['align-start']}`}>
                                {this.state.editView ?
                                    <input className={localStyles['input-text']} value={item.name}
                                           onChange={(event) => this.updateItem(item.id, 'name', event.target.value)}
                                    /> : item.name}
                            </div>
                            <div className={styles['col']}>
                                {this.state.editView ? <input className={localStyles['input-number']} type={'number'}
                                                              value={item.quantity}
                                                              onChange={(event) => this.updateItem(item.id, 'quantity', event.target.value)}
                                /> : item.quantity}
                            </div>
                            <div className={styles['col']}>
                                <button className={localStyles.btn} onClick={() => this.removeItem(item.id)}><span
                                    className={styles.close}>&times;</span></button>
                            </div>
                        </div>
                    })}
                    {this.state.editView && <div className={`${styles['row']} ${styles['align-start']}`}>
                        <div className={styles['col']}/>
                        <div className={styles['col-3']}>
                            <span className={localStyles.label}>Description</span>
                            <br/>
                            <input className={styles['input-text']}
                                   value={this.state.newItem.description}
                                   onChange={(event) => this.updateNewItem('description', event.target.value)}/>
                        </div>
                        <div className={styles['col']}>
                            <span className={localStyles.label}>Quantity</span>
                            <br/>
                            <input className={styles['input-number']}
                                   type={"number"} value={this.state.newItem.quantity}
                                   onChange={(event) => this.updateNewItem('quantity', event.target.value)}/>
                        </div>
                        <div className={styles['col']}/>
                    </div>}
                </div>
                <div className={`${styles['panel-footer']} ${styles['align-end']}`}>
                    {formatDate(shoppingList.timestamp)}
                </div>
                <div>
                    {this.state.editView ? <div>
                            <div>
                                <button className={styles['btn-primary-left']} onClick={() => this.reset(true)}>
                                    Reset
                                </button>
                                <button className={styles['btn-primary-right']} onClick={this.addNewItem}>
                                    Add
                                </button>
                                <button className={styles['btn-primary-right']} onClick={this.onSave}>
                                    Save
                                </button>
                            </div>
                            <div>
                                <button className={styles['btn-primary-right']} onClick={() => this.reset(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div> :
                        <div>
                            <button className={styles['btn-primary-left']}
                                    onClick={this.goBack}>
                                Back to home page
                            </button>
                            <button className={styles['btn-primary-right']}
                                    onClick={() => this.reset(true)}>
                                Edit
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    }

    goBack() {
        this.props.history.push(PATHS.HOME);
    }

    updateNewItem(key, value) {
        let newItem = {...this.state.newItem, [key]: value};
        this.setState({...this.state, newItem});
    }

    addNewItem() {
        let item = new Item(this.state.newItem.description, this.state.newItem.quantity);
        this.setState({
            ...this.state,
            shoppingList: {...this.state.shoppingList, items: [...this.state.shoppingList.items, item]},
            newItem: {quantity: 1, description: ''}
        });
    }

    updateItem(itemId, key, value) {
        let updatedItems = this.state.shoppingList.items.map(item => {
            if (item.id === itemId) {
                return {...item, [key]: value}
            }
            return item;
        });
        this.setState({...this.state, shoppingList: {...this.state.shoppingList, items: updatedItems}});
    }

    removeItem(itemId) {
        let shoppingList = this.state.editView ? this.state.shoppingList : this.props.shoppingList.items[this.props.match.params.id];
        let newShoppingList = {...shoppingList, items: shoppingList.items.filter(item => item.id !== itemId)};
        if (this.state.editView)
            this.setState({...this.state, shoppingList: newShoppingList});
        else
            this.props.editShoppingList(newShoppingList)
    }

    toggleItemCheck(shoppingListId, itemId, checked) {
        if (this.state.editView) {
            let updatedItems = this.state.shoppingList.items.map(item => {
                if (item.id === itemId)
                    return {...item, checked};
                return item;
            });
            this.setState({...this.state, shoppingList: {...this.state.shoppingList, items: updatedItems}});
        } else {
            this.props.toggleItemCheck(shoppingListId, itemId, checked);
        }
    }

    reset(editView = false) {
        this.setState({
            ...this.state,
            shoppingList: this.props.shoppingList.items[this.props.match.params.id],
            editView
        })
    }

    onSave() {
        this.props.editShoppingList(this.state.shoppingList);
        this.reset();
    }

}

export default connect(state => ({...state}), {editShoppingList, toggleItemCheck})(EditShoppingListComponent);