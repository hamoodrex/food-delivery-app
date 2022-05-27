import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';

export default function TopHeader(props) {
    const [menu,setMenu] = useState(false);
    const handle = ()=>{
        setMenu(!menu);
    }
    return (
    <>
        <div className="top-header">
            {!props.noMenu &&
            <div className="center" style={{
                position:"absolute",top:"0px", left:"1em", height:"100%"}}>
                <img src="images/menu.svg" style={{height:"1.7em"}} onClick={handle}/>
            </div> }
            { props.text_content }
        </div>
        <div style={{height:"67.2px"}}></div>
        <div style={{position: "absolute", top:"67.2px"}}></div>
        {menu && <Menu />}
    </>
        
    );
}

function Menu(){
    const history = useHistory();
    const inline_css = {height:"70px",borderBottom: "1px solid black",whiteSpace:"nowrap",overflow:"hidden"};
    const logout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("restaurant_id");
        localStorage.removeItem("is_owner");
        history.replace("/login");
    }
    return (
        <div className="animated-menu unselectable">
            <b className="center" style={inline_css}>View all orders</b>
            <b className="center" style={inline_css} onClick={logout}>Logout</b>

        </div>
    );
}