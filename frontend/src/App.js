import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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
  const [signedIn, setSignedIn] = useState(false);

  const handleSignIn = (status) => {
    setSignedIn(status);
  };

  const checkSignedIn = () => {
    return signedIn;
  };

  return (
    <BrowserRouter>
      <Navbar signedIn={signedIn} handleSignIn={handleSignIn} />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="about" element={<About />} />
        <Route path="explore" element={<Explore ageRange={ageRange} setAgeRange={setAgeRange} setSelectedTags={setSelectedTags} />} />
        <Route path="map" element={<MapPage />} />
        <Route path="profile" element={checkSignedIn() ? <UserProfile ageRange={ageRange} selectedTags={selectedTags} /> : <Navigate to="/" />} />
        <Route path="login" element={<Login handleSignIn={handleSignIn} />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
