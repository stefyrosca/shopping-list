import React, {Component} from 'react';
import styles from './App.css';
import {Redirect, Route, Router, Switch} from 'react-router'
import {routes} from './pages'
import {Link} from "react-router-dom";
import {createInitialStore} from "./store/create-store";
import Provider from "react-redux/es/components/Provider";
import createHistory from 'history/createBrowserHistory'
import {MuiThemeProvider} from "material-ui";
import {PATHS} from "./pages/index";
import {connect} from "react-redux";

class App extends Component {
    render() {
        return (
            <div>
                <Router history={this.props.history}>
                    <MuiThemeProvider>
                        <div>
                            <div className={styles['navbar']}>
                                <nav className={`${styles.navbar} ${styles['navbar-inverse']}`}>
                                    <div className={styles['container-fluid']}>
                                        <div className={styles["navbar-header"]}>
                                            <h1 className={styles["App-header"]}>Shopping list</h1>
                                        </div>
                                        {this.props.auth.isLoggedIn &&
                                            <ul className={`${styles.nav} ${styles['navbar-nav']}`}>
                                                {routes
                                                    .filter(route => route.shouldDisplay)
                                                    .map((route, index) => {
                                                        return <li key={index}><Link
                                                            to={route.path}>{route.display}</Link></li>
                                                    })}
                                            </ul>
                                        }
                                    </div>

                                </nav>
                            </div>
                            <div className={styles.App}>
                                <Switch>
                                    {routes.map((route, index) => {
                                        if (route.private)
                                            return <PrivateRoute component={route.component} path={route.path}
                                                                 exact={route.exact}
                                                                 key={index} {...this.props}/>
                                        return <Route component={route.component} path={route.path} exact={route.exact}
                                                      key={index} {...this.props}/>
                                    })}
                                </Switch>
                            </div>
                        </div>
                    </MuiThemeProvider>
                </Router>
            </div>
        );
    }
}

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => {
            return (
                rest.auth.isLoggedIn ? (
                    <Component {...props}/>
                ) : (
                    <Redirect to={{
                        pathname: PATHS.LOGIN,
                        state: {from: props.location}
                    }}/>
                )
            )
        }}/>
    );
};

const history = createHistory();

const store = createInitialStore(history);

export const Wrapper = (Component, props = {}) => {
    return <Provider store={store}>
        <Component {...props}/>
    </Provider>;
};

export default Wrapper(connect(state => ({...state}), {})(App), {history});
