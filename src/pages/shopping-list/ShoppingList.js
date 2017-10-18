import React, {Component} from 'react'
import styles from './style.css'
import {formatDate} from "../../utils/format-date";

export class ShoppingListComponent extends Component {
    render() {
        return <div className={styles.panel} data-checked={this.props.shoppingList.checked}>
            <div className={styles['panel-heading']}>
                <h3 className={styles['panel-title']}>{this.props.shoppingList.title}</h3>
            </div>
            <div className={styles["panel-body"]}>
                {this.props.shoppingList.items.map((item, index) => {
                    return <div className={styles['panel-content']} key={index}>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <input onChange={(event)=>this.props.onCheckItem(this.props.shoppingList.id, item.id, event.target.checked)} checked={item.checked} type={"checkbox"}/>
                            </div>
                            <div className={`${styles['col-3']} ${styles['align-start']}`}>{item.name}</div>
                            <div className={styles['col']}>{item.quantity}</div>
                        </div>
                    </div>
                })}
            </div>
            <div className={styles['panel-footer']}>
                {formatDate(this.props.shoppingList.timestamp)}
            </div>
        </div>
    }
}
