import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from "./Navbar.js"
import Explore from './Components/Explore';
import UserProfile from './Components/Profile';
import MapPage from './Components/MapPage';
import About from './Components/About.js';
import Login from './Components/Login';
import Register from './Components/Register';

const App = () => {
  const [ageRange, setAgeRange] = useState([20, 80]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
  };

  return (
    <BrowserRouter>
      <Navbar authToken={authToken} />
      <Routes>
        <Route path="/" element={<About authToken={authToken} />} />
        <Route path="about" element={<About authToken={authToken} />} />
        <Route path="explore" element={<Explore ageRange={ageRange} setAgeRange={setAgeRange} setSelectedTags={setSelectedTags} />} />
        <Route path="map" element={<MapPage />} />
        <Route path="profile" element={<UserProfile />} />

        {!authToken && (
          <>
            <Route path="login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="register" element={<Register />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
