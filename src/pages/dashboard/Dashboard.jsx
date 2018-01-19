import React, {Component} from 'react'
import {connect} from "react-redux";
import {RaisedButton} from "material-ui";
import {ShoppingListComponent} from "../shopping-list/ShoppingList";
import styles from './style.css'
import SvgIcon from 'material-ui/SvgIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import {
    addShoppingList,
    editShoppingList,
    filterShoppingLists,
    toggleItemCheck
} from "../shopping-list/shopping-list.actions";
import {PATHS} from "../index";
import {FilterShoppingListsComponent} from "../../components/FilterShoppingLists";

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: {field: 'none', order: 'asc'},
            shoppingList: this.props.shoppingList
        };
    }

    deleteList(findItem) {
        let shoppingList = this.props.shoppingList;
        for (var key in shoppingList.items) {
            if (shoppingList.items[key].id === findItem.id) {
                delete shoppingList.items[key]
            }
        }
        shoppingList.filteredItems.forEach((item, index) =>{
            if (item === findItem.id) {
                this.props.shoppingList.filteredItems.splice(index, 1)
            }
        });
        this.setState({...this.state, shoppingList: shoppingList});

    }

    render() {
        const DeleteIcon = (props) => (
            <SvgIcon {...props}>
                <svg fill="#000000" height="36" viewBox="0 0 36 36" width="36" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
            </SvgIcon>
        );

        return <div>
            <FilterShoppingListsComponent filterShoppingLists={this.props.filterShoppingLists}/>
            <div className={styles.row}>
                <div className={styles.col}>
                    <RaisedButton
                        onClick={() => this.props.history.push(PATHS.CREATE_LIST)}
                        label={"Add new shopping list"}
                        primary={true}
                    />
                </div>
            </div>
            <div className={styles['wrapper-4']}>
                {this.props.shoppingList.filteredItems.map((id, index) => {
                    return <div key={index} className={styles.panel}  style={{position: 'relative'}}>
                        <DeleteIcon style={{top: '20px', left: '32px', cursor: 'pointer', position: 'absolute', zIndex: '9999'}}
                                onClick={() => this.deleteList(this.props.shoppingList.items[id])}>
                        </DeleteIcon>
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

}

export default connect(state => ({...state}), {
    filterShoppingLists,
    addShoppingList,
    editShoppingList,
    toggleItemCheck
})(DashboardComponent);