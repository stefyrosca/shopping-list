import React, {Component} from 'react'
import {connect} from "react-redux";

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {dashboards: []};
    }

    render() {
        return <div>Dashboard</div>
    }
}

export default connect(state => ({...state}), {})(Dashboard);