import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get_menu } from "../../api/fetch";
import Item from '../doms/Item'
import {get_cart} from '../../storage/Cart';
import TopHeader from "../doms/TopHeader";

export default function Restaurant(props){
    const [menu, setMenu] = useState({});
    const [amount,setAmount] = useState(0);
    useEffect(()=>{
        (async () => {
            setMenu(JSON.parse(await get_menu(props.match.params.id)));
            const cart = await get_cart(props.match.params.id);
            setAmount(cart.length);
        })();
    },[])

    return (
        <>
            <div style={{borderBottom:"1px sold black"}}><TopHeader text_content={menu.name} /></div>
            <div style={{borderBottom:"none"}} className="address">
                <div style={{
                    width:"120px",
                    height:"100%",
                    backgroundColor:"lightgrey",
                    position: "relative",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center"
                }}>
                    <label style={{fontWeight:"bolder"}}>Icon</label>
                </div>
                <div style={{
                    position: "absolute",
                    top:"0",
                    left: "120px"
                }} className="inner-padding">
                    <p>{menu.description}</p>
                </div>
            </div>
            <div style={{borderBottom: "1px solid black", height:"70px", display: "flex",justifyContent:"space-between", alignItems:"center", padding:"0 1em 0 1em"}}>
                <div>Rating &nbsp;⛤&nbsp;{menu.rating}</div>
                <div style={{position:"relative"}}>
                    <div style={{ position:"absolute", top:"-14px", zIndex:"-1", fontSize:"12px",
                        backgroundColor:"#00bb00", maxWidth:"fit-content", padding:"0.5em", borderRadius:"50%",
                        color:"white", lineHeight:"8px"
                    }}>{amount}</div>
                    <Link to={`/cart/${menu.id}`}>
                        <img style={{
                            height:"40px"
                        }} src="images/shopping-cart.svg" />
                    </Link>
                    
                </div>
            </div>
            {menu.menu?.sub_menus.map((e) =>{
                return ( <div key={e.id}>
                    <SubMenuHeader title={e.title}/>
                    {e?.items.map((e1) => {
                        return (
                        <Link key={`${e.id}:${e1.id}`} style={{textDecoration:"none"}} to={`/add_item/${menu.id}/${e1.id}`}>
                            <Item key={`${e.id}:${e1.id}`} name={e1.name} description={e1.description} price={e1.price} />
                        </Link>
                        );
                    })}
                </div>);
            })}
        </>
    );

}

function SubMenuHeader(props){
    return (
        <div
            style={{
                background: "rgba(236, 232, 232, 0.87)",
                borderBottom:"1px solid black",
                padding: "1em"
            }}
        >
            <b>{props.title}</b>
        </div>
    );
}