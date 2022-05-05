import React, { useEffect, useState } from 'react';
import TopHeader from '../doms/TopHeader';
import AddressBox from '../doms/AddressBox';
import Button from '../doms/Button';
import { Link } from 'react-router-dom';

export default function Addresses(props) {
    const [addresses, setAddresses] = useState([]);
    useEffect(()=>{
        setAddresses(JSON.parse(localStorage.getItem("addresses")));
    }, []);
    return (
        <>
            <TopHeader text_content="Addresses" />
            <div className="address-list">
                {addresses.map((e, i) => {
                    let values = Object.values(e);
                    values = values.slice(1,values.length);
                    return (<AddressBox key={i} title={e.name} details={values.join(", ")} />)
                })}
            </div>
            <div style={{
                position:"fixed", bottom:"0",height:"7em",width:"100vw", padding:"2em 3em 2em 3em"
            }} className="center">
                <Link style={{textDecoration:"none",height:"100%", width:"100%",
            }} to="address"><Button value="Add Address" /></Link>
            </div>
        </>
    );

}