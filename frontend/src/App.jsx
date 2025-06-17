import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserSignUp from './pages/UserSignUp';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import Home from './pages/Home'; 
import RiderHome from './pages/RiderHome'; 


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/signup' element={<UserSignUp/>} />
        <Route path='/captain-login' element={<CaptainLogin/>} />
        <Route path='/captain-signup' element={<CaptainSignup/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/rider-home' element={<RiderHome/>} />
      </Routes>
    </div>
  );
};

export default App;