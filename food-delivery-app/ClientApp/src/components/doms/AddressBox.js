import React, { useState } from 'react';
import Highlighted from './Highlighted';

export default function AddressBox(props){
    const [selected, setSelected] = useState(false);
    const trigger = (e) => {
        e.preventDefault();
        setSelected(!selected);
    }
    return (
        <div className="address" onContextMenu={trigger}>
            <div className="inner-padding">
                <label><b>{props.title}</b></label>
                <p>{props.details}</p>
            </div>
            {selected && <Highlighted address={props.title} />}
        </div>
    );
}

