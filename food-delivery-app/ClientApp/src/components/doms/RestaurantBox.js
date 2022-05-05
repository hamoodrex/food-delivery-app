import React from "react";

export default function RestaurantBox(props){
    return (
        <div className="address">
            <div style={{
                width:"120px",
                height:"100%",
                backgroundColor:"lightgrey",
                position: "relative",
                display:"flex",
                alignItems:"center",
                justifyContent:"center"
            }}>
                <label style={{position:"absolute", top: "2px",left:"2px"}}>⛤{props.rating}</label>
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
        </div>
    );
}
