import React, { useEffect, useState, useRef } from "react";
import TopHeader from "../doms/TopHeader";
import Button from "../doms/Button";
import { useHistory } from "react-router-dom";

export default function Address(props){
    const history = useHistory();
    const nameRef = useRef();
    const countryRef = useRef();
    const districtRef = useRef();
    const cityRef = useRef();
    const detailsRef = useRef();

    const [name,setName] = useState("");
    const [country,setCountry] = useState("");
    const [district,setDistrict] = useState("");
    const [city,setCity] = useState("");
    const [details,setDetails] = useState("");
    useEffect(()=>{
        let id = props.match.params.id;
        if (id !== undefined)
        {
            let addresses = JSON.parse(localStorage.getItem("addresses"));
            setName(addresses[id].name);
            setCountry(addresses[id].country);
            setDistrict(addresses[id].district);
            setCity(addresses[id].city);
            setDetails(addresses[id].details);
            nameRef.current.value = addresses[id].name;
            countryRef.current.value = addresses[id].country;
            districtRef.current.value = addresses[id].district;
            cityRef.current.value = addresses[id].city;
            detailsRef.current.value = addresses[id].details;
        }
    },[]);
    const add_address = ()=>{
        if (!name || !country || !district || !city || !details){
            alert("Please fill all the boxes."); return;
        }
        let addresses = JSON.parse(localStorage.getItem("addresses"));
        let address = addresses.find(e=>{return e.name.toLowerCase() == name.toLowerCase()});
        if (address){
            if (props.match.params.id !== undefined){
                addresses[props.match.params.id] = {...address, country,district,city,details};
                localStorage.setItem("addresses",JSON.stringify(addresses));
                history.goBack();
                return;
            }
            alert("An address with this name already exists."); return;
        }
        addresses.push({
            name,country,district,city,details
        });
        localStorage.setItem("addresses",JSON.stringify(addresses));
        history.goBack();
    }
    return (
        <>
            <TopHeader text_content="Address" />
            <div style={{
                display:"flex", flexDirection:"column",
                padding: "2.5em"
            }}>
                <label className="pad-label">Address name</label>

                <input ref={nameRef} className="text-box" type="text" onChange={(e)=>{setName(e.target.value)}} readOnly={props.match.params.id !== undefined} />

                <label className="pad-label">Country</label>

                <input ref={countryRef} className="text-box" type="text" onChange={(e)=>{setCountry(e.target.value)}}  />

                <label className="pad-label">District</label>

                <input ref={districtRef} className="text-box" type="text" onChange={(e)=>{setDistrict(e.target.value)}}  />

                <label className="pad-label">City</label>

                <input ref={cityRef} className="text-box" type="text" onChange={(e)=>{setCity(e.target.value)}}  />

                <label className="pad-label">Details</label>
                
                <textarea ref={detailsRef} rows="5" className="text-box" style={{resize:"none"}} onChange={(e)=>{setDetails(e.target.value)}} />
                
                <div style={{ marginTop: "3em", height:"50px"}} onClick={add_address} >
                    <Button value="Add / Update Address" />
                </div>
            </div>

        </>
    );
}