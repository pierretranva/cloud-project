import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate , useNavigate} from 'react-router-dom';
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
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = (currentUser) => {
    setUser(currentUser)
    setSignedIn(true);
    navigate("/profile")
  };
  const handleLogout =() =>{
    setUser(null)
    setSignedIn(false)
  }


  return (
    <>
      <Navbar signedIn={signedIn} handleSignIn={handleSignIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="about" element={<About />} />
        <Route path="explore" element={<Explore ageRange={ageRange} setAgeRange={setAgeRange} setSelectedTags={setSelectedTags} />} />
        <Route path="map" element={<MapPage />} />
        <Route path="profile" element={signedIn ? <UserProfile ageRange={ageRange} selectedTags={selectedTags} /> : <Navigate to="/" />} />
        <Route path="login" element={<Login handleSignIn={handleSignIn} />} />
        <Route path="register" element={<Register />} />
      </Routes>
  </>
  );
}

export default App;
