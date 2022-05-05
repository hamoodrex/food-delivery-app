import React, { Component, useEffect } from 'react';
import TopHeader from '../doms/TopHeader';
import RestaurantsButton from '../doms/RestaurantsButton';
import { Link } from 'react-router-dom';
import {get_menu} from '../../api/fetch';


export default function Home(props) {
    return (
        <div className="home-div">
            <TopHeader noBack text_content="Food Order" />
            <div className="center restaurants-btn-div">
                <Link style={{ textDecoration: 'none' }} to="/restaurants"><div type="button" className="restaurants-btn">Restaurants</div></Link>
            </div>
            <div className="ad">
                <div className="ad-content-bg"></div>

                <div className="ad-bar-bg">
                    <div className="ad-bar-nobg">
                    </div>
                </div>
            </div>
            <p>hello</p>
            <div className="menu">
                <Link style={{ textDecoration: 'none' }} to="/addresses"><div className="menu-btn">Addresses</div></Link>
                <Link style={{ textDecoration: 'none' }} to="/order_history"><div className="menu-btn">Order History</div></Link>
                <Link style={{ textDecoration: 'none' }} to="/settings"><div className="menu-btn">Settings</div></Link>
            </div>
        </div>
    );
}