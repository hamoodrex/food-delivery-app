import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


export default function AddressBox(props){
    return (
        <div className="address" onContextMenu={(e)=>{e.preventDefault(); props.select(props.title)}} onClick={()=>{props.choose(props.title)}}>
            <div className="inner-padding">
                <label><b>{props.title} {props.chosen && <span style={{color:"#00CC00"}}>✓</span>}</b></label>
                <p>{props.details}</p>
            </div>
            {props.selected && <Highlighted update={props.update} address={props.title} />}
        </div>
    );
}


function Highlighted(props){
    const [update,setUpdate] = props.update;
    const history = useHistory();
    const remove = () =>{
        let addresses = JSON.parse(localStorage.getItem("addresses"));
        let index = addresses.findIndex(e => {return e.name.toLowerCase() == props.address.toLowerCase()});

        if (index != -1){
            if (localStorage.getItem("address").toLowerCase() == addresses[index].name.toLowerCase())
                localStorage.setItem("address", "");
            addresses.splice(index,1);
        }
        localStorage.setItem("addresses", JSON.stringify(addresses));
        setUpdate(!update);
    }
    const edit = () => {
        let addresses = JSON.parse(localStorage.getItem("addresses"));
        let index = addresses.findIndex(e => {return e.name.toLowerCase() == props.address.toLowerCase()});
        if (index != -1)
            history.push(`/address/${index}`);
    }
    return (
        <div className="selected">
            <div style={{ background: '#BB3939'}} className="selected-btn center" onClick={remove}>Remove</div>
            <div style={{ background: '#5BBB39' }} className="selected-btn center" onClick={edit}>Edit</div>
        </div>
    );

}
