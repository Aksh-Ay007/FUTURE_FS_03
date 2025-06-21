import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { addCaptain } from "../utils/captainSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const user = useSelector(store => store.user);
  const captain = useSelector(store => store.captain);

  console.log("Redux store state:", { user, captain });
  console.log("Current path:", location.pathname);

  const fetchUser = async () => {
    console.log("fetchUser called for path:", location.pathname);
    
    try {
      if (location.pathname.includes('captain')) {
        console.log("Attempting to fetch captain profile...");
        
        const captainRes = await axios.get(BASE_URL + "/captain/profile", {
          withCredentials: true,
        });
        
        const captainData = captainRes.data;
        console.log("Captain data received:", captainData);
        dispatch(addCaptain(captainData));
        console.log("Captain data dispatched to Redux store");
        
      } else {
        console.log("Attempting to fetch user profile...");
        
        const userRes = await axios.get(BASE_URL + "/profile", {
          withCredentials: true,
        });
        
        const userData = userRes.data;
        console.log("User data received:", userData);
        dispatch(addUser(userData));
        console.log("User data dispatched to Redux store");
      }
    } catch (error) {
      console.error("API Error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      
      // Handle auth failure
      if (location.pathname.includes('captain')) {
        console.log("Redirecting to captain login due to auth failure");
        navigate('/captain-login');
      } else {
        console.log("Redirecting to user login due to auth failure");
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    console.log("Body useEffect triggered");
    console.log("Current user state:", user);
    console.log("Current captain state:", captain);
    console.log("Location pathname:", location.pathname);
    
    // Always fetch data - remove the early return condition for now
    fetchUser();
  }, [location.pathname]); // Re-run when path changes

  console.log("Body component rendered");

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;