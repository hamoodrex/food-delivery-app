import { useEffect, useState } from 'react';
import { get_active_orders } from '../../api/fetch';
import OrderBox from '../doms/OrderBox';
import TopHeader from '../doms/TopHeader';

export default function Orders(){
    const [orders,setOrders] = useState([]);
    useEffect(()=>{
        // fetch orders that are not delivered
        (async ()=>{
            let restaurant_id = localStorage.getItem("restaurant_id");
            let response = JSON.parse(await get_active_orders(restaurant_id));
            setOrders(response);
        })();
    },[]);
    return (
        <>
            <TopHeader text_content="Orders" />
            {orders.map((e,i) => {
                const date = new Date(e.date);
                const date_str = date.toDateString() + " " + date.toLocaleTimeString();
                return (
                    <OrderBox key={e.id} status={e.status} date={date_str} />
                );
            })}
        </>
    );
}