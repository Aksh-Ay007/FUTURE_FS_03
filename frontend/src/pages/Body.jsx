import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const user=useSelector(store=>store.user)
  
  const fetchUser = async () => {

    if(user) return;
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
     

      const user=res.data
       console.log("body", user);


      dispatch(addUser(user));
    } catch (error) {

     if(error.status===401){
       navigate('/login')
     }
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchUser()
  },[])

  return (
    <div>
      <Navbar />
      <Outlet />

      <Footer />
    </div>
  );
};

export default Body;
