import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Highlighted(props){
    const history = useHistory();
    const remove = () =>{
        let addresses = JSON.parse(localStorage.getItem("addresses"));
        let index = addresses.findIndex(e => {return e.name.toLowerCase() == props.address.toLowerCase()});
        if (index != -1)
            addresses.splice(index,1);
        localStorage.setItem("addresses", JSON.stringify(addresses));
        window.location.reload();
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