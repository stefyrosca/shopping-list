import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createInitialStore} from "./store/create-store";
import Provider from "react-redux/es/components/Provider";
import createHistory from 'history/createBrowserHistory'

const history = createHistory();

const store = createInitialStore(history);

ReactDOM.render(
    <Provider store={store}>
        <App  history={history}/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
