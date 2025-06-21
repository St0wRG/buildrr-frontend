import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Quote from './pages/Quote';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

// Configuration de l'API
const API_BASE_URL = 'http://localhost:5001/api';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-white">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/quote" element={<Quote apiBaseUrl={import.meta.env.VITE_API_URL} />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact apiBaseUrl={API_BASE_URL} />} />
            <Route path="/login" element={<Login apiBaseUrl={API_BASE_URL} />} />
            <Route path="/register" element={<Register apiBaseUrl={API_BASE_URL} />} />
            <Route path="/dashboard" element={<Dashboard apiBaseUrl={API_BASE_URL} />} />
            <Route path="/admin" element={<AdminDashboard apiBaseUrl={API_BASE_URL} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

