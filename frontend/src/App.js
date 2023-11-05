import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from "./Navbar.js"
import UserProfile from './Components/Profile';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="about" element={<div>About Page</div>} />
        <Route path="explore" element={<div>Explore Page</div>} />
        <Route path="map" element={<div>Map Page</div>} />
        <Route path="profile" element={<UserProfile />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
