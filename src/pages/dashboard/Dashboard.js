import React, {Component} from 'react'
import {connect} from "react-redux";

export class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {dashboards: []};
    }

    render() {
        return <div>Dashboard</div>
    }
}

export default connect(state => ({...state}), {})(DashboardComponent);