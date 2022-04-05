import React, { Component } from 'react';
import { Route, Routes, withRouter } from 'react-router';
import Home from './components/pages/Home';
import Addresses from './components/pages/Addresses';
import './custom.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const customHistory = createBrowserHistory();


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <BrowserRouter history={customHistory}>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/addresses">
                        <Addresses />
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
