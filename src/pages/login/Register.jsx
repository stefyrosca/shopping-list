import React, {Component} from "react";
import {Card, CardActions, CardText, CardTitle, RaisedButton, TextField} from "material-ui"
import {red300} from "material-ui/styles/colors"
import {connect} from "react-redux";
import {clientApi} from "../../api/client-api";
import {PATHS} from "../index";
import {loginSucceeded} from "./auth.actions";
import {bindActionCreators} from "redux";

class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
            error: null
        }
    }

    register = () => {
        //TODO: move logic to actions
        clientApi.post('register', null, {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        })
            .then(response => {
                this.props.loginSucceeded(response);
                this.props.history.replace(PATHS.DASHBOARD);
            })
            .catch(error => {
                this.setState({error: error})
            });
    };

    componentWillMount() {
        this.props.auth.isLoggedIn && this.props.history.replace(PATHS.DASHBOARD);
    }

    render() {
        return <div>
            <Card style={{width: 800, margin: 'auto', display: 'flex', flex: 1, flexDirection: 'column'}}>
                <CardTitle title="Enter your data"/>
                <TextField
                    floatingLabelText={'First name'}
                    value={this.state.firstName}
                    onChange={(event) => this.setState({firstName: event.target.value})}
                />
                <br/>
                <TextField
                    floatingLabelText={'Last name'}
                    value={this.state.lastName}
                    onChange={(event) => this.setState({lastName: event.target.value})}
                />
                <br/>
                <TextField
                    floatingLabelText={'Username'}
                    value={this.state.username}
                    onChange={(event) => this.setState({username: event.target.value})}
                />
                <br/>
                <TextField
                    floatingLabelText={'Password'}
                    value={this.state.password}
                    type={'password'}
                    onChange={(event) => this.setState({password: event.target.value})}
                />
                <br/>
                <TextField
                    floatingLabelText={'Confirm password'}
                    value={this.state.confirmPassword}
                    type={'password'}
                    onChange={(event) => this.setState({confirmPassword: event.target.value})}
                    errorText={this.state.confirmPassword.length > 0 &&
                    this.state.password !== this.state.confirmPassword && 'Your passwords don\'t match'}
                />
                <br/>
                <CardActions>
                    <RaisedButton
                        label={'Register'}
                        primary={true}
                        onClick={this.register}
                        disabled={Object.keys(this.state).find(key => key !== 'error' && this.state[key].length === 0) !== undefined}
                    />
                </CardActions>
                {this.state.error &&
                <CardText color={red300}>
                    {'Something went wrong, please try again'}
                </CardText>
                }
            </Card>
        </div>
    }
}

export default connect(state => ({auth: state.auth}), (dispatch) => bindActionCreators({loginSucceeded}, dispatch))(RegisterComponent);