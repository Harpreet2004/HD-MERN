import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/Homepage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route 
          path='/dashboard' 
          element={loggedIn ? <Dashboard /> : <Navigate to="/signup" replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
