import React, {Component} from 'react'
import {connect} from "react-redux";
import {Link} from 'react-router-dom'

class NotFoundComponent extends Component {

    render() {
        return <div>
            <h3>Nothing to see here!</h3>
            <Link to={"/"}>Go home</Link>
        </div>
    }
}

export default connect(state => ({...state}), {})(NotFoundComponent);