import React from "react";

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

            </div>);
}