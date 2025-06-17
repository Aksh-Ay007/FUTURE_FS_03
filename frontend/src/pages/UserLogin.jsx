import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const UserLogin = () => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const [error, setError] = useState("");


    const navigate = useNavigate()

    const handleLogin=async(e)=>{
        e.preventDefault();

    try {

      await axios.post(BASE_URL+"/login",{
        email,
        password
      },{withCredentials:true});

      return  navigate('/home')
      
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
         <img
          className="w-16 mb-10"
          src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png"
          alt=""
        />
      <form onSubmit={handleLogin}>
        <h3 className="text-lg  font-medium mb-2">What's your email</h3>
        <input required value={email} 
        
        onChange={(e) => setEmail(e.target.value)}

        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" type="email" placeholder="email@example.com" />
        <h3 className="text-lg  font-medium mb-2">Enter your password</h3>
        <input
          required
value={password} 
        
        onChange={(e) => setPassword(e.target.value)}

          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
          type="password"
          placeholder="Enter your password"
        ></input>
        <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base" >Login</button>
        <p className="text-center">New Here? <Link  to='/signup' className="text-blue-600">
        Create New Account
        </Link></p>
       
      </form>
      </div>
      <div>
        <Link to='/captain-login'  className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base" >
          Sign in as Rider
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
