import React, { useEffect, useState } from 'react';
import TopHeader from '../doms/TopHeader';
import { get_restaurants } from '../../api/fetch';
import RestaurantBox from '../doms/RestaurantBox';
import { Link } from 'react-router-dom';


export default function Restaurants(){
    const [restaurants,setRestaurants] = useState([]);
    useEffect(()=>{
        (async ()=>{
            setRestaurants(JSON.parse(await get_restaurants()));
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