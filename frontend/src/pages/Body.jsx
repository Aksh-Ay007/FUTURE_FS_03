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
  const wholeStore = useSelector(store => store); // Debug: log entire store

  console.log("Redux store state:", wholeStore); // Debug log
  console.log("User from store:", user);
  console.log("Captain from store:", captain);

  const fetchUser = async () => {
    if (user || captain) return;
    
    try {
      if (location.pathname.includes('captain')) {
        // Try captain first for captain routes
        const captainRes = await axios.get(BASE_URL + "/captain/profile", {
          withCredentials: true,
        });
        
        const captainData = captainRes.data;
        console.log("body captain", captainData);
        dispatch(addCaptain(captainData));
      } else {
        // Try user first for user routes
        const userRes = await axios.get(BASE_URL + "/profile", {
          withCredentials: true,
        });
        
        const userData = userRes.data;
        console.log("body user", userData);
        dispatch(addUser(userData));
      }
    } catch (error) {
      // Handle auth failure
      if (location.pathname.includes('captain')) {
        navigate('/captain-login');
      } else {
        navigate('/login');
      }
      console.log("Auth failed:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Body;