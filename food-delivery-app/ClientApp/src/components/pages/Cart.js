import React, { useEffect, useState } from "react";
import Item from "../doms/Item";
import TopHeader from "../doms/TopHeader";
import { get_cart } from "../../storage/Cart";
//props.match.params.id

export default function Cart(props){
    const [cart,setCart] = useState([]);
    useEffect(()=>{
        (async ()=>{
            setCart(await get_cart(props.match.params.id));
        })();
    }, []);
    return (<>
        <div style={{borderBottom:"1px solid black"}}><TopHeader text_content="Food Cart" /></div>
        {cart.map(item => {
            return <Item key={item.id} name={item.name} description={item.description} quantity={item.quantity} />
        })}
    </>);
}