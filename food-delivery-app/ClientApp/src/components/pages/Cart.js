import React, { useEffect, useState } from "react";
import Item from "../doms/Item";
import TopHeader from "../doms/TopHeader";
import Button from "../doms/Button";
import { get_cart } from "../../storage/Cart";
import { useHistory } from "react-router-dom";

export default function Cart(props){
    const [cart,setCart] = useState([]);
    const [price,setPrice] = useState(0);
    const [update,setUpdate] = useState(false);
    const history = useHistory();
    useEffect(()=>{
        let items = get_cart(props.match.params.id)
        let total = 0;
        items.forEach(item=>{
            total += calc_price(item)*item.quantity;
            item.highlighted = false;
        });
        setCart(items);
        setPrice(total);
    }, [update]);

    const calc_price = (item)=>{
        if (!item.selections) return;
        let sum = 0;
        for (let selection of item.selections)
            if(selection.selected)
                sum += selection.price;
        return item.price + sum;
    }

    return (<>
        <div style={{borderBottom:"1px solid black"}}><TopHeader text_content="Food Cart" /></div>
        <div>
            {cart.map((item,i) => {
                let cost = calc_price(item)*item.quantity;
                return (
                    <div key={i} 
                    onClick={()=>{
                        let items = [...cart];
                        let current_state = item.highlighted;
                        if (!current_state)
                            items.forEach(e=>{e.highlighted = false;});
                        items[i].highlighted = !current_state;
                        setCart(items);
                    }}>
                        <Item id={i} update={[update,setUpdate]} restaurant_id={props.match.params.id} name={item.name} description={item.description} quantity={item.quantity} price={cost} highlighted={item.highlighted} />
                    </div>);
            })}
        </div>
        <div style={{
            position: "absolute", bottom:"0",width:"100vw", height: "200px",
            display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center",
            padding:"3.5em 4em 3.5em 4em"
        }}>
            <b style={{marginBottom: "1em"}}>Total price: ${price}</b>
            <div style={{height:"100%", width:"100%"}} onClick={()=>{
                if (cart.length == 0){
                    alert("Your cart is empty");
                    return;
                }
                history.push(`/checkout/${props.match.params.id}`);
            }}>
                <Button value="Proceed to checkout" />
            </div>
        </div>
        
    </>);
}