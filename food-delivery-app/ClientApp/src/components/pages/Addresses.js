import React, { useEffect, useLayoutEffect, useState } from 'react';
import TopHeader from '../doms/TopHeader';
import AddressBox from '../doms/AddressBox';
import Button from '../doms/Button';
import { Link } from 'react-router-dom';

export default function Addresses(props) {
    const [addresses, setAddresses] = useState([]);
    const [update, setUpdate] = useState(false);
    useEffect(()=>{
        setAddresses(JSON.parse(localStorage.getItem("addresses")));
    }, [update]);

    const choose = (name)=>{
        let arr = [...addresses];
        if (arr.find(e=>{return e.selected})) return;
        let index = arr.findIndex(e => {return e.name.toLowerCase() == name.toLowerCase()});
        if (index > -1){
            arr.forEach((e,i) => {
                if (i == index) {
                    e.chosen = !e.chosen;
                }
                else e.chosen = false;
            });
            localStorage.setItem("address",arr[index].name);
            setAddresses(arr);
        }
    }

    const select = (name) =>{
        let arr = [...addresses];
        let index = arr.findIndex(e => {return e.name.toLowerCase() == name.toLowerCase()});
        if (index > -1) 
            arr.forEach((e,i) => {
                if (i == index) {
                    e.selected = !e.selected;
                }
                else e.selected = false;
            });
        setAddresses(arr);
    }
    return (
        <>
            <TopHeader text_content="Addresses" />
            <div className="address-list">
                {addresses.map((e, i) => {
                    let values = Object.values(e);
                    values = values.slice(1,5);
                    return (<AddressBox key={i} update={[update,setUpdate]} title={e.name} details={values.join(", ")} 
                        select={select} selected={e.selected} 
                        choose={choose} chosen={localStorage.getItem("address").toLowerCase() == e.name.toLowerCase()} />)
                })}
            </div>
            <p style={{textAlign:"center", width: "100vw", marginTop:"1em", color:"grey"}}>
                Click on an address to select it.<br />Hold touch to view more options!</p>
            <div style={{
                height:"7em",width:"100vw", padding:"2em 3em 2em 3em"
            }} className="center">
                <Link style={{textDecoration:"none",height:"100%", width:"100%",
            }} to="address"><Button value="Add Address" /></Link>
            </div>
        </>
    );

}