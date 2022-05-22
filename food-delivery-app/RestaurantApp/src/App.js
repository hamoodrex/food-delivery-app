import React, { Component, useEffect } from 'react';
import { Route, Routes, withRouter } from 'react-router';
import './custom.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import Orders from './components/pages/Orders';
import Login from './components/pages/Login';

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Orders} />
                <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    );
}