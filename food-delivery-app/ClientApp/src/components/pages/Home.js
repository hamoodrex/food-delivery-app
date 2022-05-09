import React from 'react';
import TopHeader from '../doms/TopHeader';
import { Link, useHistory } from 'react-router-dom';
import Button from '../doms/Button';


export default function Home(props) {
    const history = useHistory();
    return (
        <div className="home-div">
            <TopHeader noBack text_content="Food Order" />
            <div className="center restaurants-btn-div">
                <div className="max-height-width" style={{position:"relative"}} 
                onClick={()=>{
                    if (!localStorage.getItem("address")){
                        alert("Please select an address first in ( Addresses -> Add Address )");
                        return;
                    }
                    if (Object.keys(JSON.parse(localStorage.getItem("personal_info"))).length == 0){
                        alert("Please fill your personal information in ( Settings -> Personal Information )");
                        return;
                    }
                    history.push("/restaurants");
                }} >
                    <Button value="Restaurants" />
                </div>
            </div>
            <div className="ad">
                <div className="ad-content-bg"></div>

                <div className="ad-bar-bg">
                    <div className="ad-bar-nobg">
                    </div>
                </div>
            </div>
            <div className="menu">
                <Link style={{ textDecoration: 'none' }} to="/addresses"><div className="menu-btn">Addresses</div></Link>
                <Link style={{ textDecoration: 'none' }} to="/order_history"><div className="menu-btn">Order History</div></Link>
                <Link style={{ textDecoration: 'none' }} to="/settings"><div className="menu-btn">Settings</div></Link>
            </div>
        </div>
    );
}