import React, { Component } from 'react';
import Navbar from './core/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Activate from './components/Activate';
import Home from './components/Home';
import Private from './core/Private';
import Admin from './core/Admin';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/private' element={<PrivateRoute Component={Private} />}/>
        <Route path='/admin' element={<AdminRoute Component={Admin} />}/>
        <Route path='/auth/activate/:token' element={<Activate/>} />
        <Route path='/auth/password/forgot' element={<ForgotPassword/>} />
        <Route path='/auth/password/reset/:token' element={<ResetPassword/>} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
};

export default App;