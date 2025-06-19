import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import appStore from './utils/appStore'
import UserLogin from './pages/UserLogin';
import UserSignUp from './pages/UserSignUp';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import Feed from './pages/Feed'; 
import Body from './pages/Body';
import CaptainFeed from './pages/CaptainFeed';


const App = () => {
  return (
    <div>

          <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
    

  <Provider store={appStore}>

 <BrowserRouter >
 <Routes>

        <Route path='/' element={<Body/>} >

   <Route path='/login' element={<UserLogin/>} />
        <Route path='/signup' element={<UserSignUp/>} />
        <Route path='captain/login' element={<CaptainLogin/>} />
        <Route path='/captain-signup' element={<CaptainSignup/>} />
        <Route path='/' element={<Feed/>} />
        <Route path='/captain-feed' element={<CaptainFeed/>} />


        </Route>
     
      </Routes>

     </BrowserRouter>

  </Provider>
    </div>
  );
};

export default App;