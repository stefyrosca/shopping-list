import React, {Component} from 'react';
import styles from './App.css';
import {Route, Router, Switch} from 'react-router'
import {routes} from './pages'
import {Link} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <div>
                <Router history={this.props.history}>
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
                </Router>
            </div>
        );
    }
}

export default App;
