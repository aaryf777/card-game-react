import React from 'react'
import Gamepage from './Gamepage'
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom"
import Home from './Home';
import Protectedroute from './Protectedroute';
import Login from './Login';
import Profile from './Profile';
import Account from './Account';
import Header from './Header';
import Setting from './Setting';
import Howtoplay from './Howtoplay';
import About from './About';
import Help from './Help';
import Signup from './Signup';
import Adminsignup from './admin/Adminsignup';
import Adminlogin from './admin/Adminlogin';
import AdminDashboard from './admin/AdminDashboard';
import ResponsiblePlay from './ResponsiblePlay';
const App = () => {
  return (
    <BrowserRouter>
     
      <div className='flex flex-col bg-gray-8 text-white items-center w-full min-h-[100vh]'>
      <Header/>
        <Routes>
          <Route element={<Protectedroute/>}>
            <Route path='/start' element={<Gamepage/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/account' element={<Account/>} />
            <Route path='/setting' element={<Setting/>} />
            <Route path='/admin/dashboard' element={<AdminDashboard/>} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/how-to-play" element={<Howtoplay />} />
          <Route path="/responsible-play" element={<ResponsiblePlay />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/signup" element={<Adminsignup />} />
          <Route path="/admin/login" element={<Adminlogin />} />
         
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App