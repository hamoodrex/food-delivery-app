import React, { useEffect, useState, useRef } from "react";
import TopHeader from "../doms/TopHeader";
import Button from "../doms/Button";
import { useHistory } from "react-router-dom";
import countries from '../../storage/countries.json';

export default function Address(props){
    const history = useHistory();
    const nameRef = useRef();
    const countryRef = useRef();
    const districtRef = useRef();
    const cityRef = useRef();
    const detailsRef = useRef();

    const [name,setName] = useState("");
    const [country,setCountry] = useState(countries[0].country);
    const [districts,setDistricts] = useState(countries[0].states);
    const [district,setDistrict] = useState(countries[0].states[0]);
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
            let country_index = countries.findIndex(e=>{return e.country == addresses[id].country});
            countryRef.current.value = country_index;
            setDistricts(countries[country_index].states);
            districtRef.current.value = countries[country_index].states.findIndex(e=>{return e == addresses[id].district});
            cityRef.current.value = addresses[id].city;
            detailsRef.current.value = addresses[id].details;
        }
    },[]);
    const add_address = async ()=>{
        if (!name || !country || !district || !city || !details){
            alert("Please fill all the boxes."); return;
        }
        let addresses = JSON.parse(localStorage.getItem("addresses"));
        let address = addresses.find(e=>{return e.name.toLowerCase() == name.toLowerCase()});
        if (address){
            if (props.match.params.id !== undefined){
                let location = undefined;
                if (confirm("Do you wish to update the location of the address to your current location?")){
                    location = await get_location();
                    if (!loc) {
                        alert("Please enable location services on your phone");
                        return;
                    }

                }
                addresses[props.match.params.id] = {...address, country,district,city,details,long: location.coords.longitude,lat: location.coords.latitude};
                localStorage.setItem("addresses",JSON.stringify(addresses));
                history.goBack();
                return;
            }
            alert("An address with this name already exists."); return;
        }
        let location = await get_location();
        if (!location){
            alert("Please enable location services in order to add an address");
            return;
        }
        addresses.push({
            name,country,district,city,details,long: location.coords.longitude,lat: location.coords.latitude
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

                <select ref={countryRef} className="text-box" 
                onChange={(e)=>{
                    setDistricts(countries[e.target.value].states);
                    setCountry(countries[e.target.value].country);
                    setDistrict(countries[e.target.value].states[0]);
                }}>
                    {countries.map((e,i) => {
                        return <option key={i} value={i}>{e.country}</option>
                    })}
                </select>

                <label className="pad-label">District / State / Province</label>

                <select ref={districtRef} className="text-box" type="text" onChange={(e)=>{setDistrict(districts[e.target.value])}} >
                    {districts.map((e,i) => {
                        return <option key={i} value={i}>{e}</option>
                    })}
                </select>

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

const get_location = ()=>{
    return new Promise((resolve,reject) => {
        navigator.geolocation.getCurrentPosition((s) =>{
            resolve(s);
        }, (e) =>{
            resolve(undefined);
        });
    });
}