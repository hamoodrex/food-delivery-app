import React, { useEffect } from 'react';
import { Route, Routes, withRouter } from 'react-router';
import {useHistory} from 'react-router-dom';
import './custom.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import Orders from './components/pages/Orders';
import Login from './components/pages/Login';
import { get_active_orders } from './api/fetch';

export default function App() {
    const history = useHistory();
    useEffect(()=>{
        if (!localStorage.getItem("auth")) history.replace("/login");
    },[]);
    return (
        <Switch>
            <Route exact path="/" component={Orders} />
            <Route path="/login" component={Login} />
        </Switch>
    );
}