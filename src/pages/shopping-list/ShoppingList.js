import React, {Component} from 'react'
import styles from './style.css'

export class ShoppingListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    render() {
        return <div className={styles.panel}>
            <h3 className={styles['panel-title']}>{this.props.shoppingList.title}</h3>
            <div className={styles["panel-body"]}>
                {this.props.shoppingList.items.map((item, index) => {
                    return <div className={styles['panel-content']} key={index}>
                        <div className={styles.row}>
                            <div className={styles.col}>{item.name}</div>
                            <div className={styles.col}>{item.quantity}</div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    }
}

// export default connect(state => ({...state}), {})(ShoppingListComponent);