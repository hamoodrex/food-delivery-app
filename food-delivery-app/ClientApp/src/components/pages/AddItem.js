import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom'; 
import Item from "../doms/Item";
import TopHeader from '../doms/TopHeader';
import Button from "../doms/Button";

import { add_to_cart } from "../../storage/Cart";
import { get_item } from "../../api/fetch";

export default function AddItem(props){
    const [item,setItem] = useState({});
    const [quantity, setQuantity] = useState(1);
    const history = useHistory();
    const calc_price = ()=>{
        if (!item.selections) return;
        let sum = 0;
        for (let selection of item.selections)
            if(selection.selected)
                sum += selection.price;
        return item.price + sum;
    }
    useEffect(()=> {
        (async () => {
            setItem(JSON.parse(await get_item(props.match.params.id)));
        })();
    },[]);
    const handleClick = (ref) => {
        console.log(item.selections);
    }
    return (
        <>
            <div style={{borderBottom:"1px solid black"}}><TopHeader text_content="Add Item" /></div>
            <div>
                <Item name={item.name} description={item.description} price={quantity*calc_price() + " in total"} />
                <SelectionHeader title="Selections" />
                {item.selections?.map(e => {
                    if (!e.optional)
                        return (
                            <Selection key={e.id} title={e.name} update={()=>{setItem({...item})}} selection={e} handleClick={handleClick} />
                        );
                })}
                <SelectionHeader title="Optional Selections" />
                {item.selections?.map(e => {
                    if (e.optional)
                        return (
                            <Selection key={e.id} title={e.name} update={()=>{setItem({...item})}} selection={e} price={e.price} />
                        );
                })}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto auto auto auto auto", gridTemplateRows: "auto auto auto auto",
             gap:"0.5em",width:"100vw",
             height: "140px"}}>
                 <div className="qty-btn" 
                    onClick={()=>{
                        let valid = item.selections.find(e => {return !e.optional}) === undefined || item.selections.find(e => {return !e.optional && e.selected}) !== undefined;
                        if (!valid){
                            alert("You must choose at least one non-optional selection.")
                            return;
                        }
                        add_to_cart({...item, quantity}, props.match.params.restaurant_id);
                        history.goBack();
                    }}>
                    <Button value={`Add (${quantity})`} />
                 </div>
                 <div className="qtyadd-btn" onClick={() => {
                     setQuantity(quantity+1);
                 }}>
                     <Button value={<b>+</b>} />
                 </div>
                 <div className="qtydel-btn" onClick={()=>{
                     if (quantity > 1)
                        setQuantity(quantity-1);  
                 }}>
                     <Button value={<b>-</b>} background="red" />
                 </div>
             </div>
        </>
    );
}

function SelectionHeader(props){
    return (
        <div
            style={{
                background: "rgba(236, 232, 232, 0.87)",
                borderBottom:"1px solid black",
                padding: "1em"
            }}
        >
            <b>{props.title}</b>
        </div>
    );
}

function Selection(props){
    const [selected,setSelected] =  useState(false);
    useEffect(()=>{
        props.selection.selected = selected;
        props.update();
    },[selected]);
    return (
        <div onClick={() => {
            setSelected(!selected);
        }}
            style={{
                borderBottom:"1px solid black",
                padding: "1em",
                display:"flex",
                justifyContent: "space-between"
            }}
        ><div>{props.title}</div> <div>{ selected ? <b style={{color:"#00CC00"}}>✓ </b>:''}
        {props.price && `$${props.price}` || "Free"} 
        </div>
        </div>
    );
}

