
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from "./Navbar.js"

const App = () => {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="about" element={<></>}/>
            <Route path="explore" element={<></>}/>
            <Route path="map" element={<></>}/>
            <Route path="profile" element={<></>}/>
        </Routes>
    </BrowserRouter>
     
  );
}
export default App;
