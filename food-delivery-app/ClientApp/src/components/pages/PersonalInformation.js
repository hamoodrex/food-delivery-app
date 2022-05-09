import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../doms/Button";
import TopHeader from "../doms/TopHeader";



export default function PersonalInformation(){
    const history = useHistory();
    const [first,setFirst] = useState("");
    const [last,setLast] = useState("");
    const [phone,setPhone] = useState("");
    const firstRef = useRef();
    const lastRef = useRef();
    const phoneRef = useRef();

    useEffect(()=>{
        let info = JSON.parse(localStorage.getItem("personal_info"));
        setFirst(info.first_name);
        setLast(info.last_name);
        setPhone(info.phone_number);
        firstRef.current.value = info.first_name || "";
        lastRef.current.value = info.last_name || "";
        phoneRef.current.value = info.phone_number || "";
    },[]);
    return (
        <>
            <TopHeader text_content="Personal Information" />
            <div style={{
                display:"flex", flexDirection:"column",
                padding: "2.5em"
            }}>
                <label className="pad-label">First name</label>
                <input ref={firstRef} type="text" className="text-box" onChange={(e)=>{setFirst(e.target.value)}} />

                <label className="pad-label">Last name</label>
                <input ref={lastRef} type="text" className="text-box" onChange={(e)=>{setLast(e.target.value)}} />

                <label className="pad-label">Phone number</label>
                <input ref={phoneRef} type="text" className="text-box" onChange={(e)=>{setPhone(e.target.value)}} />

                <div style={{height:"50px", marginTop:"1em"}} onClick={()=>{
                    if (!first || !last || !phone){
                        alert("Please fill all the boxes");
                        return;
                    }
                    let obj = {first_name: first, last_name: last, phone_number: phone};
                    localStorage.setItem("personal_info", JSON.stringify(obj));
                    history.goBack();
                }}>
                    <Button value="Update Information" />
                </div>
            </div>
        </>
    );
}