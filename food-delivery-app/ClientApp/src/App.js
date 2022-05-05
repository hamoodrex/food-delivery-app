import React, { Component, useEffect } from 'react';
import { Route, Routes, withRouter } from 'react-router';
import Home from './components/pages/Home';
import Addresses from './components/pages/Addresses';
import './custom.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Restaurants from './components/pages/Restaurants';
import Restaurant from './components/pages/Restaurant';
import AddItem from './components/pages/AddItem';
import Cart from './components/pages/Cart';
import Address from './components/pages/Address';
import OrderHistory from './components/pages/OrderHistory';
import Settings from './components/pages/Settings';

export const customHistory = createBrowserHistory();


export default function App() {
    useEffect(()=>{
        if (!localStorage.getItem("cart"))
            localStorage.setItem("cart",JSON.stringify([]));
        if (!localStorage.getItem("addresses"))
            localStorage.setItem("addresses", JSON.stringify([]));
        if (!localStorage.getItem("personal_info"))
            localStorage.setItem("personal_info", JSON.stringify({}));
        if (!localStorage.getItem("order_history"))
            localStorage.setItem("order_history", JSON.stringify([]));
    },[]);
    return (
        <BrowserRouter history={customHistory}>
            <Switch>
                <Route exact path="/" component={Home} / >
                <Route path="/addresses" component={Addresses} />
                <Route path="/restaurants" component={Restaurants} />
                <Route path="/menu/:id" component={Restaurant} />
                <Route path="/add_item/:id" component={AddItem} />
                <Route path="/cart/:id" component={Cart} />
                <Route path="/address/:id?" component={Address} />
                <Route path="/order_history" component={OrderHistory} />
                <Route path="/settings" component={Settings} />
            </Switch>
        </BrowserRouter>
    );
}