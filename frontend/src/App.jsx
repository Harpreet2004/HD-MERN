import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';

const App = () => {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
