import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import AboutPage from "./AboutPage/AboutPage";
import LoginPage from "./LoginPage/LoginPage";


function App() {
  return (
    <Router className="App">
      <Menu/>
      <Hero/>
      <div className="mainContainer">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      <HomePage/>
      <Footer/>
    </Router>
  );
}

export default App;
