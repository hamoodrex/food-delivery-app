import React from "react";
import { useHistory } from "react-router-dom";
import TopHeader from "../doms/TopHeader";


const inline_css = {height:"70px",borderBottom: "1px solid black"};

export default function Settings(props){
    const history = useHistory()
    return (
        <>
            <TopHeader text_content="Settings" />
            <b className="center" style={inline_css} onClick={()=>{
                history.push("/personal_information");
            }}>Personal Information</b>
            <b className="center" style={inline_css}>About</b>
        </>
    );
} 