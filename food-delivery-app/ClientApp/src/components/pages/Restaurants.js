import React, { useEffect, useState } from 'react';
import TopHeader from '../doms/TopHeader';
import { get_restaurants } from '../../api/fetch';
import RestaurantBox from '../doms/RestaurantBox';
import { Link } from 'react-router-dom';
import { get_current_address } from '../../storage/Address';


export default function Restaurants(){
    const [restaurants,setRestaurants] = useState([]);
    useEffect(()=>{
        (async ()=>{
            let address = get_current_address();
            let obj = {country: address.country, district: address.district,city: address.city,details: address.details};
            setRestaurants(JSON.parse(await get_restaurants(obj)));
        })();
        
    }, [])
    return (
        <>
            <TopHeader text_content="Restaurants" />
            {restaurants?.map((e) => {
                return (
                <Link key={e.id} style={{textDecoration:"none"}} to={`menu/${e.id}`}>
                    <RestaurantBox name={e.name} description={e.description} rating={e.rating} />
                </Link>);
            })}
        </>
    );
};