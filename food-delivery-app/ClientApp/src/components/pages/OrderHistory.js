import React, { useEffect, useState } from "react";
import OrderBox from "../doms/OrderBox";
import TopHeader from "../doms/TopHeader";
import Button from '../doms/Button';
import {get_orders} from '../../storage/Order';
import { get_status, request } from "../../api/fetch";

export default function OrderHistory(props){
    const [orders,setOrders] = useState([]);
    const [order,setOrder] = useState(false);
    useEffect(()=>{
        setOrders(get_orders());
    },[]);

    return (
        <>
            <TopHeader text_content="Order History" />
            {!order && orders.map((e) =>{
                return <OrderBox key={e.id} order_id={e.id} time={new Date(e.date).toLocaleString()} orders={orders} setOrder={setOrder} />
            })
            || <DetailedView order={order} setOrder={setOrder} />}
        </>
    );
}

const status = {
    "NOT_REVIEWED": {name: "Not Reviewed", color:"#555555"},
    "ACCEPTED": {name: "Accepted", color:"#00CC00"},
    "PREPARING": {name: "Preparing", color:"#4449AD"},
    "ON_THE_WAY": {name: "On The Way", color:"#CCCC08"},
    "DELIVERED": {name: "Delivered", color:"#00CC00"},
    "REJECTED": {name: "Rejected", color:"#CB1400"}
}

function DetailedView(props){
    const [statusName,setStatusName] = useState("");
    const [restaurant,setRestaurant] = useState("");

    useEffect(()=>{
        (async ()=>{
            let status_obj = JSON.parse(await get_status(props.order.id));
            setStatusName(status_obj.status);
            setRestaurant(await request("get",`restaurant?id=${props.order.restaurant_id}`));
        })();
    },[]);
    return (
        <div style={{display:"flex", flexDirection:"column", padding:"3em"}}>
            <p><b>Status:</b> {<span style={{color:status[statusName]?.color}}>{status[statusName]?.name}</span>}</p>
            <p><b>Restaurant name:</b> {restaurant}</p>
            <p><b>Payment method:</b> {props.order.payment_method == 0 && "Cash" || props.order.payment_method == 1 && "Credit Card"}</p>
            <p><b>Total price:</b> {props.order.price}</p>
            <p><b>Address</b><br/>{`${props.order.address.country}, ${props.order.address.district}, ${props.order.address.city}, ${props.order.address.details}`}</p>
            <b>Order</b>{
                props.order?.cart?.map((item,i) => {
                    return (
                    <p key={i}>
                     {item.name} ({item.quantity}) {
                        item.selections.map(selection => {
                            return selection.name;
                        }).join(", ")
                     }<br/>
                    </p>);
                })
            }
            <p>
                <b>Comments</b><br/>
                {props.order.comments}
            </p>
            <div style={{width:"100%", height:"40px"}}>
                <Button value="Go Back" onClick={()=>{props.setOrder(false)}} />
            </div>
        </div>
    );
}