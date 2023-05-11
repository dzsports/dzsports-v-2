import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';
import Interface from './pages/Interface/Interface';
import Settings from './pages/Settings/Settings';

import './App.css';
import Profile from './pages/Interface/Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path='/dzsports/' element={isLoggedIn ? <Navigate to='/dzsports/interface' /> : <Home />} />
        <Route path='/dzsports/login' element={isLoggedIn ? <Navigate to='/dzsports/interface' /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/dzsports/signup' element={isLoggedIn ? <Navigate to='/dzsports/interface' /> : <Signup />} />
        <Route path='/dzsports/interface' element={isLoggedIn ? <Interface /> : <Navigate to='/dzsports/login' /> } />
        <Route path='/dzsports/settings' element={ isLoggedIn ? <Settings /> : <Navigate to='/dzsports/login' />} />
        <Route path='/dzsports/profile/:id' element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
