import React, {Component} from 'react'
import styles from '../shopping-list/style.css'
import localStyles from './style.css'
import {formatDate} from "../../utils/format-date";
import {editShoppingList, toggleItemCheck} from "../shopping-list/shopping-list.actions";
import {connect} from "react-redux";
import {PATHS} from "../index";
import {Link} from 'react-router-dom'

class EditShoppingListComponent extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    render() {
        let shoppingList = this.props.shoppingList.items[this.props.match.params.id];
        if (!shoppingList)
            return <div>
                <h3>No such element!</h3>
                <Link to={PATHS.HOME}>Go home</Link>
            </div>
        return <div className={localStyles.wrapper}>
            <div className={styles.panel} data-checked={shoppingList.checked}>
                <div className={styles['panel-heading']}>
                    <h3 className={styles['panel-title']}>{shoppingList.title}</h3>
                </div>
                <div className={styles["panel-body"]}>
                    {shoppingList.items.map((item, index) => {
                        return <div className={styles['panel-content']} key={index}>
                            <div className={styles.row}>
                                <div className={styles.col}>
                                    <input
                                        onChange={(event) => this.props.toggleItemCheck(shoppingList.id, item.id, event.target.checked)}
                                        checked={item.checked} type={"checkbox"}/>
                                </div>
                                <div className={`${styles['col-3']} ${styles['align-start']}`}>{item.name}</div>
                                <div className={styles['col']}>{item.quantity}</div>
                            </div>
                        </div>
                    })}
                </div>
                <div className={`${styles['panel-footer']} ${styles['align-end']}`}>
                    {formatDate(shoppingList.timestamp)}
                </div>
            </div>
        </div>
    }
}

export default connect(state => ({...state}), {editShoppingList, toggleItemCheck})(EditShoppingListComponent);