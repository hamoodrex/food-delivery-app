import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../doms/Button";
import TopHeader from "../doms/TopHeader";
import { delete_cart, get_cart } from "../../storage/Cart";
import { get_current_address } from "../../storage/Address";
import { create_order } from "../../api/fetch";
import { add_order } from "../../storage/Order";

export default function Checkout(props){
    const history = useHistory();
    const [comments, setComments] = useState("");
    const [price,setPrice] = useState(0);
    const [addressDetails,setAddressDetails] = useState("");
    const [method,setMethod] = useState(0);
    const [address, setAddress] = useState({});
    const [cart,setCart] = useState({});

    const calc_price = (item)=>{
        if (!item.selections) return;
        let sum = 0;
        for (let selection of item.selections)
            if(selection.selected)
                sum += selection.price;
        return item.price + sum;
    }

    useEffect(()=>{
        let items = get_cart(props.match.params.id);
        setCart(items);
        let total = 0;
        items.forEach(item=>{
            item.selections = item.selections.filter(selection => {return selection.selected});
            total += calc_price(item)*item.quantity;
        });
        setPrice(total);

        let addr = get_current_address();
        if (!addr)
            return;
        setAddress(addr);
        setAddressDetails([`Country: ${addr.country}`, `District / State / Province: ${addr.district}`, `City: ${addr.city}`, `Details:\n${addr.details}` ].join("\n"));
    },[]);
    return (
        <>
            <TopHeader text_content="Checkout" />
            <div style={{
                display:"flex", flexDirection:"column",
                padding: "2.5em"
            }}>
                <label className="pad-label">Payment method</label>
                <select className="text-box" onChange={(e)=>{setMethod(parseInt(e.target.value))}}>
                    <option value={0}>Cash</option>
                    <option value={1}>Credit Card</option>
                </select>

                <label className="pad-label">Address details</label>
                <textarea className="text-box" rows="7" style={{resize:"none"}} readOnly value={addressDetails} />

                <label className="pad-label">Extra comments</label>
                <textarea placeholder="Extra requests for the order" className="text-box" rows="3" style={{resize:"none"}} onChange={(e)=>{setComments(e.target.value)}} />
            </div>
            <div style={{
                    width:"100vw", height: "200px",
                    display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center",
                    padding:"3.5em 4em 3.5em 4em"
                }}>
                <b style={{marginBottom: "1em"}}>Total price: ${price}</b>
                <div style={{height:"100%", width:"100%"}} onClick={()=>{
                    (async ()=>{
                        add_order(JSON.parse(await create_order({restaurant_id: props.match.params.id,payment_method: method, date: Date.now(),address,cart,price, comments})));
                        delete_cart(props.match.params.id);
                        history.push("/");
                    })();
                }}>
                    <Button value="Confirm Order" />
                </div>
            </div>
            
        </>
    );
}