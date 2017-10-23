import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from "./Dashboard";
import {Wrapper} from "../../App";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(Wrapper(Dashboard), div);
});
