import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from "./Navbar.js"
import Explore from './Components/Explore';
import UserProfile from './Components/Profile';
import MapPage from './Components/MapPage';
const App = () => {
  const [ageRange, setAgeRange] = useState([20, 80]);
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="about" element={<div>About Page</div>} />
        <Route path="explore" element={<Explore ageRange={ageRange} setAgeRange={setAgeRange} setSelectedTags={setSelectedTags} />} />
        <Route path="map" element={<MapPage></MapPage>} />
        <Route path="profile" element={<UserProfile ageRange={ageRange} selectedTags={selectedTags} />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
