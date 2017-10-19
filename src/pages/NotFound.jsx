import React, {Component} from 'react'
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {PATHS} from "./index";

class NotFoundComponent extends Component {

    render() {
        return <div>
            <h3>Nothing to see here!</h3>
            <Link to={PATHS.HOME}>Go home</Link>
        </div>
    }
}

export default connect(state => ({...state}), {})(NotFoundComponent);