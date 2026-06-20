import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/about" element={<h1>About</h1>} /> */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;


