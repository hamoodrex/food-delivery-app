import React from "react";

export default function Button(props){
    return (
    <div className="unselectable" style={{display: "flex", justifyContent:"center", alignItems:"center", fontSize: "100%",padding:"0.5em 0 0.5em",
        background: props.background || "#5BBB39", borderRadius: "17px", color:"white", width: "100%", height: "100%"}} onClick={props.onClick}>
        {props.value}
    </div>);
}