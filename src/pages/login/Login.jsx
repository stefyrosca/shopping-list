import React, {Component} from "react";
import {Card, CardActions, CardText, CardTitle, RaisedButton, TextField} from "material-ui"
import {red300} from "material-ui/styles/colors"
import {connect} from "react-redux";
import {clientApi} from "../../api/client-api";
import {PATHS} from "../index";

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: null
        }
    }

    login = () => {
        clientApi.post('login', null, {username: this.state.username, password: this.state.password})
            .then(response => {
                this.props.history.replace(PATHS.DASHBOARD);
            })
            .catch(error => {
                this.setState({error: error})
            });
    };

    render() {
        return <div>
            <Card style={{width: 800, margin: 'auto', display: 'flex', flex: 1, flexDirection: 'column'}}>
                <CardTitle title="Enter your username and password "/>
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
                <CardActions>
                    <RaisedButton
                        label={'Login'}
                        primary={true}
                        onClick={this.login}
                        disabled={this.state.username === '' || this.state.password === ''}
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

export default connect(state => state.auth, {})(LoginComponent);