import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        const authon = localStorage.getItem('user');
        if(authon){
            navigate('/')
        }
      })
    
    const onSubmit = async(e)=>{
        e.preventDefault();

        let result = await fetch('http://localhost:5000/register',{
            method: "post",
            body: JSON.stringify({name,email,password}),
            headers: {
                "Content-Type" : "application/json"
            }
        });

        result = await result.json();
        console.log(result);

        if(result){
            setEmail("");
            setName("");
            setPassword("");
            navigate('/')
            localStorage.setItem('user', JSON.stringify(result.result));
            localStorage.setItem('token', JSON.stringify(result.auth));
        }
    }

  return (  
    <>
     <h1 className="my-5 mx-5">Register</h1>
      <form className="mx-5 my-5" style={{width:"70%"}}>

      <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Username
          </label>
          <input
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            type="text"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" onClick={onSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}


export default Register;