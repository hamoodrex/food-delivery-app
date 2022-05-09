import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { get_cart } from "../../storage/Cart";

export default function Item(props){
    return (
    <div style={{position: "relative"}} className="address">
        <div style={{
            width:"120px",
            height:"100%",
            backgroundColor:"lightgrey",
            position: "relative",
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
        }}>
            <label style={{fontWeight:"bolder"}}>Icon</label>
        </div>
        <div style={{
            position: "absolute",
            top:"0",
            left: "120px"
        }} className="inner-padding">
            <label><b>{props.name}</b></label>
            <p>{props.description}</p>
        </div>
        {props.quantity && <p style={{position:"absolute", right:"1em",top:"1em", color: "#939090", fontWeight: "bolder"}}>Qty. {props.quantity}</p>}

        <p style={{position:"absolute", right:"1em",bottom:"0", color: "#939090", fontWeight: "bolder"}}>{props.price && `$${props.price}` || "Free"}</p>
        {props.quantity && props.highlighted && <Highlight id={props.id} update={props.update} restaurant_id={props.restaurant_id} />}
    </div>);
}

function Highlight(props){
    const history = useHistory();
    const [update,setUpdate] = props.update;
    return (
        <div className="selected">
            <div style={{ background: '#BB3939'}} className="selected-btn center" onClick={()=>{
                let cart = get_cart(props.restaurant_id);
                cart.splice(props.id, 1);
                let obj = JSON.parse(localStorage.getItem("cart"));
                if (cart.length == 0) delete obj[props.restaurant_id];
                else obj[props.restaurant_id] = cart;
                localStorage.setItem("cart", JSON.stringify(obj));
                setUpdate(!update);
            }}>Remove</div>
        </div>
    );
}