import React, { Component } from 'react';
import TopHeader from '../doms/TopHeader';
import RestaurantsButton from '../doms/RestaurantsButton';
import { Link } from 'react-router-dom';


export default class Home extends Component {

    static displayName = Home.name;
    render() {
        return (
            <div className="home-div">
                <TopHeader text_content="Food Order" />
                <div className="center restaurants-btn-div">
                    <input type="button" className="restaurants-btn" value="Restaurants" />
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
                    <div className="menu-btn">Order History</div>
                    <div className="menu-btn">Settings</div>
                </div>
            </div>
        );
    }
}