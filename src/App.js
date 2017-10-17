import React, {Component} from 'react';
import './App.css';
import Dashboard from "./pages/dashboard/Dashboard";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Shopping list</h1>
                </header>
                <Dashboard/>
            </div>
        );
    }
}

export default App;
