import React, { useEffect, useState } from "react";
import './NavBar.css'
import {Link} from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
function NavBar() {
  const location = useLocation();
  const navigate =  useNavigate()
  const [userName, setUserName] = useState('');
  const [navStyle, setNavStyle] = useState({
    display:"flex",
    width:"100%"
  })
  const [btnStyle, setBtnStyle]=useState({
    display:"block",
  });
  const [LogoutStyle, setLogout]=useState({
    display:"none",
  });

  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
      setBtnStyle({
        display:"none"
      })
      setLogout({
        display:"block"
      });
      setNavStyle({
        display:"flex",
        width:"100%",
      })

      setUserName(`Welcome! ${JSON.parse(auth).name}` )
    }else{
      setNavStyle({
        display:"none",
        width:"100%"
      })
    }
  },[]);

  const logOut = ()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/register')
   }

  return(
    <>
     
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <h1 className="navbar-brand my-1">E-commerce Dashboard</h1>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mx-5 mb-2 mb-lg-0" style={navStyle}>

        <li className="nav-item">
          <Link to="/" className={` nav-link ${location.pathname === "/"? "active":""} `} aria-current="page" >Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/myPro" className={` nav-link ${location.pathname === "/myPro"? "active":""} `} aria-current="page" >My Products</Link>
        </li>
        <li className="nav-item">
          <Link to='/add' className={`nav-link ${location.pathname === "/add"? "active":""}`}>Add Products</Link>
        </li>
        <li className="nav-item">
          <Link to='/profile' className={`nav-link ${location.pathname === "/profile"? "active":""}`}>Profile</Link>
        </li>
      </ul>

      <ul className="navbar-nav d-flex justify-content-end mx-5 mb-2 mb-lg-0 " style={{width:"100%"}}>
        <li className="nav-item my-2 active" style={{width:"100%", textAlign:"center", color:"white", listStyle:"none"}}>
          {userName}
        </li>
        <li className="nav-item mx-3" style={btnStyle}>
        <Link to='/login' className={`sty ${location.pathname === "/register"? "active":""}`}><button type="button" className="btn btn-success">Login</button></Link>
        </li>
        <li className="nav-item" style={btnStyle}>
        <Link to='/register' className={`sty ${location.pathname === "/register"? "active":""}`}><button type="button" className="btn btn-success">Register</button></Link>
        </li>
        <li className="nav-item" style={LogoutStyle}>
        <Link onClick={logOut} className={`sty ${location.pathname === "/register"? "active":""}`}><button type="button" className="btn btn-success">Logout</button></Link>
        </li>

      </ul>
    </div>
  </div>
</nav>

    </>
  )
};

export default NavBar;