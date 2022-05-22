import TopHeader from "../doms/TopHeader";
import Button from "../doms/Button";
import { useHistory } from "react-router-dom";
import { login } from "../../api/fetch";
import { useState } from "react";
export default function Login(){
    const history = useHistory();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    return (
        <>
            <TopHeader text_content="Login" noBack />
            <div style={{display:"flex", flexDirection:"column", padding:"3em"}}>
                <label className="pad-label">E-Mail</label>
                <input className="text-box" onChange={(e)=>{setEmail(e.target.value)}}/>
                <label className="pad-label">Password</label>
                <input className="text-box" onChange={(e)=>{setPassword(e.target.value)}}/>
                <div style={{height:"40px"}}></div>
                <Button value="Login" onClick={async ()=>{
                    let email_regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
                    if (!email_regex.test(email) || password.length < 8)
                    {
                        alert("Please enter proper credentails");
                        return;
                    }
                    let response = await login({email,password});
                    if (!response) return;
                    console.log(JSON.parse(response));
                    // localStorage.setItem("auth", response);
                    //history.replace("/");
                }}/>
            </div>
        </>
    );
}