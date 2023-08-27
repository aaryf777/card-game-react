import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function Protectedroute () {
    let token  = localStorage.getItem('token');
  return (
   
            token ? <Outlet/>
            : <Navigate to='/login' />
      
  )
}
