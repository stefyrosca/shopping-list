import React, {Component} from 'react';
import './App.css';
import {Route, Router, Switch} from 'react-router'
import createHistory from 'history/createBrowserHistory'
import {routes} from './pages'

const history = createHistory();

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Shopping list</h1>
                </header>
                <div>
                    <Router history={history}>
                        <Switch>
                            {routes.map((route, index) => {
                                return <Route component={route.component} path={route.path} exact={route.exact}
                                              key={index}/>
                            })}
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

export default App;
