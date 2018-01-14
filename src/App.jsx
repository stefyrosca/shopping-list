import React, {Component} from 'react';
import styles from './App.css';
import {Route, Router, Switch} from 'react-router'
import {routes} from './pages'
import {Link} from "react-router-dom";
import {createInitialStore} from "./store/create-store";
import Provider from "react-redux/es/components/Provider";
import createHistory from 'history/createBrowserHistory'
import {MuiThemeProvider} from "material-ui";

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
                                        <ul className={`${styles.nav} ${styles['navbar-nav']}`}>
                                            {routes
                                                .filter(route => route.shouldDisplay)
                                                .map((route, index) => {
                                                    return <li key={index}><Link
                                                        to={route.path}>{route.display}</Link></li>
                                                })}
                                        </ul>
                                    </div>

                                </nav>
                            </div>
                            <div className={styles.App}>
                                <Switch>
                                    {routes.map((route, index) => {
                                        return <Route component={route.component} path={route.path} exact={route.exact}
                                                      key={index}/>
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


const history = createHistory();

const store = createInitialStore(history);

export const Wrapper = (Component, props = {}) => {
    return <Provider store={store}>
        <Component {...props}/>
    </Provider>;
};

export default Wrapper(App, {history});
